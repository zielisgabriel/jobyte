package br.com.gabriel.jobyte_api.dto.request;

import jakarta.validation.constraints.Email;

public record EnterpriseLoginCredentialsRequest(
  @Email(message = "Email inválido")
  String email,
  String password
) {}
