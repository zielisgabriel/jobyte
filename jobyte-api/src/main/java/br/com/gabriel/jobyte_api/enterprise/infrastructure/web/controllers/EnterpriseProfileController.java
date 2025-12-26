package br.com.gabriel.jobyte_api.enterprise.infrastructure.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.enterprise.application.dtos.request.FillEnterpriseProfileRequest;
import br.com.gabriel.jobyte_api.enterprise.application.dtos.request.UpdateEnterpriseProfileRequest;
import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseDetailsProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseSimpleProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.application.usecases.ExistEnterpriseProfileUseCase;
import br.com.gabriel.jobyte_api.enterprise.application.usecases.FillEnterpriseProfileUseCase;
import br.com.gabriel.jobyte_api.enterprise.application.usecases.GetEnterpriseProfileUseCase;
import br.com.gabriel.jobyte_api.enterprise.application.usecases.UpdateEnterpriseProfileUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/enterprise/profile")
@RequiredArgsConstructor
public class EnterpriseProfileController {
  private final ExistEnterpriseProfileUseCase existEnterpriseProfileUseCase;
  private final GetEnterpriseProfileUseCase getEnterpriseProfileUseCase;
  private final UpdateEnterpriseProfileUseCase updateEnterpriseProfileUseCase;
  private final FillEnterpriseProfileUseCase fillEnterpriseProfileUseCase;

  @ResponseStatus(code = HttpStatus.OK)
  @GetMapping("/exist")
  public boolean existProfile(JwtAuthenticationToken token) {
    String keycloakUserId = token.getName();

    return this.existEnterpriseProfileUseCase.execute(keycloakUserId);
  }

  @GetMapping("/simple")
  @ResponseStatus(code = HttpStatus.OK)
  public EnterpriseSimpleProfileResponse getSimpleProfile(JwtAuthenticationToken token) {
    String keycloakUserId = token.getName();
    EnterpriseSimpleProfileResponse response = this.getEnterpriseProfileUseCase
      .getSimpleProfile(keycloakUserId);
    return response;
  }

  @GetMapping("/details")
  @ResponseStatus(code = HttpStatus.OK)
  public EnterpriseDetailsProfileResponse getDetailsProfile(JwtAuthenticationToken token) {
    String keycloakUserId = token.getName();
    EnterpriseDetailsProfileResponse response = this.getEnterpriseProfileUseCase
      .getDetailsProfile(keycloakUserId);
    return response;
  }

  @PutMapping("/update-details")
  @ResponseStatus(code = HttpStatus.OK)
  public EnterpriseDetailsProfileResponse updateProfile(
      JwtAuthenticationToken token,
      @Valid @RequestBody UpdateEnterpriseProfileRequest request) {
    String keycloakUserId = token.getName();
    EnterpriseDetailsProfileResponse response = this.updateEnterpriseProfileUseCase
      .execute(keycloakUserId, request);
    return response;
  }

  @PostMapping("/fill-profile")
  @ResponseStatus(code = HttpStatus.CREATED)
  public void fillProfile(
    JwtAuthenticationToken token,
    @Valid
    @RequestBody
    FillEnterpriseProfileRequest request
  ) {
    String keycloakUserId = token.getName();
    this.fillEnterpriseProfileUseCase.execute(keycloakUserId, request);
  }
}
