package br.com.gabriel.jobyte_api.controller.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import br.com.gabriel.jobyte_api.dto.request.CandidateRegisterRequest;
import br.com.gabriel.jobyte_api.dto.request.EnterpriseLoginCredentialsRequest;
import br.com.gabriel.jobyte_api.dto.request.EnterpriseRegisterRequest;
import br.com.gabriel.jobyte_api.service.auth.KeycloakLoginService;
import br.com.gabriel.jobyte_api.service.auth.KeycloakRegistrationService;
import br.com.gabriel.jobyte_api.service.auth.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final KeycloakLoginService loginService;
  private final KeycloakRegistrationService registrationService;
  private final RefreshTokenService refreshTokenService;

  @ResponseStatus(code = HttpStatus.OK)
  @PostMapping("/enterprise/login")
  public void loginEnterprise(
    @Valid
    @RequestBody
    EnterpriseLoginCredentialsRequest credentials,
    HttpServletResponse response
  ) throws JsonMappingException, JsonProcessingException {
    this.loginService.loginEnterprise(credentials, response);
  }

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

  @ResponseStatus(code = HttpStatus.OK)
  @PostMapping("/enterprise/refresh-token")
  public void refreshToken(
    HttpServletRequest request,
    HttpServletResponse response
  ) throws JsonMappingException, JsonProcessingException {
    this.refreshTokenService.refreshToken(request, response);
  }
}
