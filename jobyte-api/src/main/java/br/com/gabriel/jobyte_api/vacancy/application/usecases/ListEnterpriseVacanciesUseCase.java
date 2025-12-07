package br.com.gabriel.jobyte_api.vacancy.application.usecases;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyListResponse;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyResponse;
import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.domain.repositories.VacancyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ListEnterpriseVacanciesUseCase {
  private final VacancyRepository vacancyRepository;
  private static final int PAGE_SIZE = 20;

  public VacancyListResponse execute(UUID enterpriseId, int page) {
    List<Vacancy> vacancies = vacancyRepository.findByEnterpriseId(enterpriseId, page - 1, PAGE_SIZE);
    long totalElements = vacancyRepository.countByEnterpriseId(enterpriseId);
    int totalPages = (int) Math.ceil((double) totalElements / PAGE_SIZE);

    List<VacancyResponse> vacancyResponses = vacancies.stream()
      .map(VacancyResponse::fromDomain)
      .toList();

    return new VacancyListResponse(vacancyResponses, page, totalPages, totalElements);
  }
}
