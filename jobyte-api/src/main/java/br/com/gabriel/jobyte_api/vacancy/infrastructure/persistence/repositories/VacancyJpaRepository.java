package br.com.gabriel.jobyte_api.vacancy.infrastructure.persistence.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gabriel.jobyte_api.vacancy.domain.enums.VacancyStatus;
import br.com.gabriel.jobyte_api.vacancy.infrastructure.persistence.entities.VacancyEntity;

public interface VacancyJpaRepository extends JpaRepository<VacancyEntity, UUID> {
  Optional<VacancyEntity> findByIdAndEnterpriseId(UUID id, UUID enterpriseId);
  List<VacancyEntity> findByEnterpriseIdOrderByCreatedAtDesc(UUID enterpriseId, Pageable pageable);
  List<VacancyEntity> findByStatusOrderByCreatedAtDesc(VacancyStatus status, Pageable pageable);
  long countByEnterpriseId(UUID enterpriseId);
}
