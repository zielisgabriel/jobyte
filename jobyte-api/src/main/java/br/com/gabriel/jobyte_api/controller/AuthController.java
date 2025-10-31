package br.com.gabriel.jobyte_api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.dto.request.EnterpriseRegisterRequest;
import br.com.gabriel.jobyte_api.service.KeycloakRegistrationService;
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
  @PostMapping("/register")
  public void registerEnterprise(@Valid @RequestBody EnterpriseRegisterRequest enterpriseRegisterRequest) {
    log.info("Registering enterprise user with email: {}", enterpriseRegisterRequest.email());
    this.registrationService.createEnterpriseUser(enterpriseRegisterRequest);
  }
}
