package br.com.gabriel.jobyte_api.vacancy.application.dtos.response;

import java.time.LocalDateTime;

import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.domain.enums.VacancyStatus;

public record VacancyResponse(
  Long id,
  String title,
  String description,
  Long enterpriseId,
  VacancyStatus status,
  LocalDateTime createdAt,
  LocalDateTime updatedAt
) {
  public static VacancyResponse fromDomain(Vacancy vacancy) {
    return new VacancyResponse(
      vacancy.getId(),
      vacancy.getTitle(),
      vacancy.getDescription(),
      vacancy.getEnterpriseId(),
      vacancy.getStatus(),
      vacancy.getCreatedAt(),
      vacancy.getUpdatedAt()
    );
  }
}
