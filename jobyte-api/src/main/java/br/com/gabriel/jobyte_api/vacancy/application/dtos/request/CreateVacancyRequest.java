package br.com.gabriel.jobyte_api.vacancy.application.dtos.request;

import jakarta.validation.constraints.NotBlank;

public record CreateVacancyRequest(
  @NotBlank(message = "Título é obrigatório")
  String title,
  
  @NotBlank(message = "Descrição é obrigatória")
  String description
) {}
