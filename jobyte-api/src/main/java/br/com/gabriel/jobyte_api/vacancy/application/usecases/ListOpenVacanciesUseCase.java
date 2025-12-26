package br.com.gabriel.jobyte_api.vacancy.application.usecases;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.shared.domain.exception.EntityNotFoundException;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyListResponse;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyResponse;
import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.domain.repositories.VacancyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ListOpenVacanciesUseCase {
  private final VacancyRepository vacancyRepository;
  private static final int PAGE_SIZE = 20;

  public VacancyListResponse execute(int page) {
    List<Vacancy> vacancies = vacancyRepository.findOpenVacancies(page, PAGE_SIZE);
    long totalElements = vacancyRepository.count();
    int totalPages = (int) Math.ceil((double) totalElements / PAGE_SIZE);

    List<VacancyResponse> vacancyResponses = vacancies.stream()
      .map(VacancyResponse::fromDomain)
      .toList();

    return new VacancyListResponse(vacancyResponses, page, totalPages, totalElements);
  }

  public VacancyResponse getById(Long id) {
    Vacancy vacancy = this.vacancyRepository.findById(id)
      .orElseThrow(() -> new EntityNotFoundException());
    
    return VacancyResponse.fromDomain(vacancy);
  }
}
