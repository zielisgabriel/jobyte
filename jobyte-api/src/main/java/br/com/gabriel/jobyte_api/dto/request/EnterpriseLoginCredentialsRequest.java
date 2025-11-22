package br.com.gabriel.jobyte_api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record EnterpriseLoginCredentialsRequest(
  @Email
  String email,
  @Size(min = 6, max = 50, message = "A senha deve ter entre 6 e 50 caracteres")
  String password
) {}
