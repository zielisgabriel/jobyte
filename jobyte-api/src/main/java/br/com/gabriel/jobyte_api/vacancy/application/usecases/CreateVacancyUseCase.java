package br.com.gabriel.jobyte_api.vacancy.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.shared.domain.provider.IdGenerator;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.request.CreateVacancyRequest;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyResponse;
import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.domain.repositories.VacancyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateVacancyUseCase {
  private final VacancyRepository vacancyRepository;
  private final IdGenerator idGenerator;

  public VacancyResponse execute(Long enterpriseId, CreateVacancyRequest request) {
    long vacancyId = this.idGenerator.nextId();

    Vacancy vacancy = Vacancy.create(
      vacancyId,
      request.title(),
      request.description(),
      enterpriseId
    );

    Vacancy savedVacancy = vacancyRepository.save(vacancy);
    return VacancyResponse.fromDomain(savedVacancy);
  }
}
