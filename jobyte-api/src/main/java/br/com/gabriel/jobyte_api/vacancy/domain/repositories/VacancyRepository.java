package br.com.gabriel.jobyte_api.vacancy.domain.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.domain.enums.VacancyStatus;

public interface VacancyRepository {
  Optional<Vacancy> findById(UUID id);
  Optional<Vacancy> findByIdAndEnterpriseId(UUID id, UUID enterpriseId);
  List<Vacancy> findByEnterpriseId(UUID enterpriseId, int page, int size);
  List<Vacancy> findByStatus(VacancyStatus status, int page, int size);
  List<Vacancy> findOpenVacancies(int page, int size);
  Vacancy save(Vacancy vacancy);
  void delete(Vacancy vacancy);
  long count();
  long countByEnterpriseId(UUID enterpriseId);
}
