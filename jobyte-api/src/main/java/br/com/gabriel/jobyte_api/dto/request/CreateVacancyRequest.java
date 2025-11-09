package br.com.gabriel.jobyte_api.dto.request;

import java.util.UUID;

public record CreateVacancyRequest(
  String title,
  String description,
  UUID enterpriseId
) {}
