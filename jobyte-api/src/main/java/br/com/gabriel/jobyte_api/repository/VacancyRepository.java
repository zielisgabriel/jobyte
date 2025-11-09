package br.com.gabriel.jobyte_api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.enumerate.VacancyStatus;

public interface VacancyRepository extends CrudRepository<Vacancy, UUID> {
  Optional<Vacancy> findByEnterpriseId(UUID enterpriseId);
  Optional<Vacancy> findByIdAndEnterpriseId(UUID id, UUID enterpriseId);
  List<Vacancy> findByEnterpriseIdOrderByCreatedAtDesc(UUID enterpriseId, Pageable pageable);
  List<Vacancy> findByStatusOrderByCreatedAtDesc(VacancyStatus status, Pageable pageable);
}
