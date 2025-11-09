package br.com.gabriel.jobyte_api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record CandidateRegisterRequest(
  @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
  String fullName,

  @Email(message = "Email must be valid")
  String email,

  @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
  String password,

  @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 characters")
  String phone,

  @Size(min = 2, max = 100, message = "Address must be between 2 and 100 characters")
  String address,

  String cpf
) {}
