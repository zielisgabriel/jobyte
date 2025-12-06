package br.com.gabriel.jobyte_api.vacancy.application.usecases;

import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.vacancy.application.dtos.request.CreateVacancyRequest;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyResponse;
import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.domain.repositories.VacancyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateVacancyUseCase {
  private final VacancyRepository vacancyRepository;

  public VacancyResponse execute(UUID enterpriseId, CreateVacancyRequest request) {
    Vacancy vacancy = Vacancy.create(
      request.title(),
      request.description(),
      enterpriseId
    );

    Vacancy savedVacancy = vacancyRepository.save(vacancy);
    return VacancyResponse.fromDomain(savedVacancy);
  }
}
