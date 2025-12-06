package br.com.gabriel.jobyte_api.candidate.application.dtos.request;

import jakarta.validation.constraints.NotBlank;

public record UpdateProfileRequest(
  @NotBlank(message = "Nome completo é obrigatório")
  String fullName,
  
  String phone,
  String address,
  String bio
) {}
