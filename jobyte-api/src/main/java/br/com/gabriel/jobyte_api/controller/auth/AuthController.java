package br.com.gabriel.jobyte_api.controller.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.dto.request.CandidateRegisterRequest;
import br.com.gabriel.jobyte_api.dto.request.EnterpriseRegisterRequest;
import br.com.gabriel.jobyte_api.service.auth.KeycloakRegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final KeycloakRegistrationService registrationService;

  @ResponseStatus(code = HttpStatus.CREATED)
  @PostMapping("/enterprise/register")
  public void registerEnterprise(@Valid @RequestBody EnterpriseRegisterRequest enterpriseRegisterRequest) {
    this.registrationService.createEnterpriseUser(enterpriseRegisterRequest);
  }

  @ResponseStatus(code = HttpStatus.CREATED)
  @PostMapping("/candidate/register")
  public void registerCandidate(@Valid @RequestBody CandidateRegisterRequest candidateRegisterRequest) {
    this.registrationService.createCandidateUser(candidateRegisterRequest);
  }
}
