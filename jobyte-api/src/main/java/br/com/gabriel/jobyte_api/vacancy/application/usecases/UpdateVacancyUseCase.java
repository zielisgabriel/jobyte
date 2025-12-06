package br.com.gabriel.jobyte_api.vacancy.application.usecases;

import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.shared.domain.exceptions.BusinessException;
import br.com.gabriel.jobyte_api.shared.domain.exceptions.EntityNotFoundException;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.request.UpdateVacancyRequest;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyResponse;
import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.domain.repositories.VacancyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateVacancyUseCase {
  private final VacancyRepository vacancyRepository;

  public VacancyResponse execute(UUID vacancyId, UUID enterpriseId, UpdateVacancyRequest request) {
    Vacancy vacancy = vacancyRepository.findById(vacancyId)
      .orElseThrow(() -> new EntityNotFoundException("Vaga", vacancyId));

    if (!vacancy.belongsToEnterprise(enterpriseId)) {
      throw new BusinessException("Você não tem permissão para editar esta vaga");
    }

    vacancy.update(request.title(), request.description());
    Vacancy savedVacancy = vacancyRepository.save(vacancy);
    
    return VacancyResponse.fromDomain(savedVacancy);
  }
}
