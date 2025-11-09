package br.com.gabriel.jobyte_api.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import br.com.gabriel.jobyte_api.entity.CandidateProfile;

public interface CandidateRepository extends CrudRepository<CandidateProfile, UUID> {
  Optional<CandidateProfile> findByKeycloakUserId(String keycloakId);  
}
