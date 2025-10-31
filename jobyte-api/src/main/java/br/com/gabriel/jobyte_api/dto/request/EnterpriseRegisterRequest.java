package br.com.gabriel.jobyte_api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record EnterpriseRegisterRequest(
  @Size(min = 2, max = 100) String companyName,
  String cnpj,
  @Size(min = 5, max = 100) String address,
  @Email String email,
  @Size(min = 8, max = 20) String password
) {}
