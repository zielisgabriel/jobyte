package br.com.gabriel.jobyte_api.candidate.domain.ports;

import java.util.Optional;
import java.util.UUID;

import br.com.gabriel.jobyte_api.candidate.domain.entities.CandidateProfile;

public interface CandidateRepositoryPort {
  Optional<CandidateProfile> findById(UUID id);
  Optional<CandidateProfile> findByKeycloakUserId(String keycloakUserId);
  CandidateProfile save(CandidateProfile candidate);
  void delete(CandidateProfile candidate);
  boolean existsByKeycloakUserId(String keycloakUserId);
}
