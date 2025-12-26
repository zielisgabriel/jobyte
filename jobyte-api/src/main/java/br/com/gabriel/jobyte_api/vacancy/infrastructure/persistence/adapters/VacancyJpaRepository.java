package br.com.gabriel.jobyte_api.vacancy.infrastructure.persistence.adapters;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gabriel.jobyte_api.vacancy.domain.enums.VacancyStatus;
import br.com.gabriel.jobyte_api.vacancy.infrastructure.persistence.entities.VacancyEntity;

public interface VacancyJpaRepository extends JpaRepository<VacancyEntity, Long> {
  Optional<VacancyEntity> findByIdAndEnterpriseId(Long id, Long enterpriseId);
  List<VacancyEntity> findByEnterpriseIdOrderByCreatedAtDesc(Long enterpriseId, Pageable pageable);
  List<VacancyEntity> findByStatusOrderByCreatedAtDesc(VacancyStatus status, Pageable pageable);
  long countByEnterpriseId(Long enterpriseId);
}
