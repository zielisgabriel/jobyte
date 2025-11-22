package br.com.gabriel.jobyte_api.controller.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.dto.request.EnterpriseLoginCredentialsRequest;
import br.com.gabriel.jobyte_api.dto.request.EnterpriseRegisterRequest;
import br.com.gabriel.jobyte_api.service.auth.KeycloakLoginService;
import br.com.gabriel.jobyte_api.service.auth.KeycloakRefreshTokenService;
import br.com.gabriel.jobyte_api.service.auth.KeycloakRegistrationService;
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
  private final KeycloakRegistrationService registrationService;
  private final KeycloakLoginService loginService;
  private final KeycloakRefreshTokenService refreshTokenService;

  @ResponseStatus(code = HttpStatus.CREATED)
  @PostMapping("/enterprise/register")
  public void registerEnterprise(@Valid @RequestBody EnterpriseRegisterRequest enterpriseRegisterRequest) {
    this.registrationService.createEnterpriseUser(enterpriseRegisterRequest);
  }

  @ResponseStatus(code = HttpStatus.OK)
  @PostMapping("/enterprise/login")
  public void loginEnterprise(
    @Valid @RequestBody EnterpriseLoginCredentialsRequest credentials,
    HttpServletResponse response
  ) {
    this.loginService.loginEnterprise(credentials, response);
  }

  @ResponseStatus(code = HttpStatus.OK)
  @PostMapping("/enterprise/refresh-token")
  public void refreshEnterpriseToken(
    HttpServletRequest request,
    HttpServletResponse response

  ) {
    this.refreshTokenService.refreshToken(request, response);
  }
}
