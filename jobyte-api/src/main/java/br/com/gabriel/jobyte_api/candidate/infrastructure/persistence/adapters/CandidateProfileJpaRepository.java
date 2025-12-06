package br.com.gabriel.jobyte_api.candidate.infrastructure.persistence.adapters;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gabriel.jobyte_api.candidate.infrastructure.persistence.entities.CandidateProfileEntity;

public interface CandidateProfileJpaRepository extends JpaRepository<CandidateProfileEntity, UUID> {
  Optional<CandidateProfileEntity> findByKeycloakUserId(String keycloakUserId);
  boolean existsByKeycloakUserId(String keycloakUserId);
}
