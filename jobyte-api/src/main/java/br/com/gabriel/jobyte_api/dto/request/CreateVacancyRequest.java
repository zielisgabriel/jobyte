package br.com.gabriel.jobyte_api.dto.request;

public record CreateVacancyRequest(
  String title,
  String description,
  String enterpriseId
) {}
