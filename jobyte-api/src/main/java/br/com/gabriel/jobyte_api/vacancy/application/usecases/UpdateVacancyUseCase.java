package br.com.gabriel.jobyte_api.vacancy.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.shared.domain.exception.BusinessException;
import br.com.gabriel.jobyte_api.shared.domain.exception.EntityNotFoundException;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.request.UpdateVacancyRequest;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyResponse;
import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.domain.repositories.VacancyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateVacancyUseCase {
  private final VacancyRepository vacancyRepository;

  public VacancyResponse execute(Long vacancyId, Long enterpriseId, UpdateVacancyRequest request) {
    Vacancy vacancy = this.vacancyRepository.findById(vacancyId)
      .orElseThrow(() -> new EntityNotFoundException());

    if (!vacancy.belongsToEnterprise(enterpriseId)) {
      throw new BusinessException("Você não tem permissão para editar esta vaga");
    }

    vacancy.update(request.title(), request.description());
    Vacancy savedVacancy = vacancyRepository.save(vacancy);
    
    return VacancyResponse.fromDomain(savedVacancy);
  }
}
