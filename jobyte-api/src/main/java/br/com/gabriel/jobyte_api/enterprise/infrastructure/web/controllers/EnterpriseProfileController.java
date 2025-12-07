package br.com.gabriel.jobyte_api.enterprise.infrastructure.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.enterprise.application.dtos.request.UpdateEnterpriseProfileRequest;
import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseDetailsProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseSimpleProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.application.usecases.GetEnterpriseProfileUseCase;
import br.com.gabriel.jobyte_api.enterprise.application.usecases.UpdateEnterpriseProfileUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/enterprise/profile")
@RequiredArgsConstructor
public class EnterpriseProfileController {
  private final GetEnterpriseProfileUseCase getEnterpriseProfileUseCase;
  private final UpdateEnterpriseProfileUseCase updateEnterpriseProfileUseCase;

  @GetMapping("/simple")
  @ResponseStatus(code = HttpStatus.OK)
  public EnterpriseSimpleProfileResponse getSimpleProfile(JwtAuthenticationToken token) {
    String keycloakId = token.getName();
    EnterpriseSimpleProfileResponse response = this.getEnterpriseProfileUseCase
      .getSimpleProfile(keycloakId);
    return response;
  }

  @GetMapping("/details")
  @ResponseStatus(code = HttpStatus.OK)
  public EnterpriseDetailsProfileResponse getDetailsProfile(JwtAuthenticationToken token) {
    String keycloakId = token.getName();
    EnterpriseDetailsProfileResponse response = this.getEnterpriseProfileUseCase
      .getDetailsProfile(keycloakId);
    return response;
  }

  @PutMapping
  @ResponseStatus(code = HttpStatus.OK)
  public EnterpriseDetailsProfileResponse updateProfile(
      JwtAuthenticationToken token,
      @Valid @RequestBody UpdateEnterpriseProfileRequest request) {
    String keycloakId = token.getName();
    EnterpriseDetailsProfileResponse response = this.updateEnterpriseProfileUseCase
      .execute(keycloakId, request);
    return response;
  }
}
