package br.com.gabriel.jobyte_api.enterprise.application.dtos.request;

import jakarta.validation.constraints.NotBlank;

public record UpdateEnterpriseProfileRequest(
  @NotBlank(message = "Nome da empresa é obrigatório")
  String companyName,
  
  String address,
  String phone
) {}
