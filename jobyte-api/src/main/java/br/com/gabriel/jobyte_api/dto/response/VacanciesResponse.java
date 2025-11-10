package br.com.gabriel.jobyte_api.dto.response;

import java.util.List;

import br.com.gabriel.jobyte_api.entity.Vacancy;

public record VacanciesResponse(
  List<Vacancy> vacancies,
  int totalPages
) {}
