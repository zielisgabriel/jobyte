package br.com.gabriel.jobyte_api.vacancy.application.dtos.response;

import java.util.List;

public record VacancyListResponse(
  List<VacancyResponse> vacancies,
  int currentPage,
  int totalPages,
  long totalElements
) {}
