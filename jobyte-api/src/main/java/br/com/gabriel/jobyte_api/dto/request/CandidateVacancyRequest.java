package br.com.gabriel.jobyte_api.dto.request;

public record CandidateVacancyRequest(
  String acquaintanceName,
  String acquaintanceEmail,
  boolean hasAcquaintanceInCompany,
  boolean youWorkAtCompany
) {}
