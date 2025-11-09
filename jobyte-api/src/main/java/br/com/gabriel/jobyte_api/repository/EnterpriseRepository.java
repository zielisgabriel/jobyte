package br.com.gabriel.jobyte_api.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.gabriel.jobyte_api.entity.EnterpriseProfile;

public interface EnterpriseRepository extends CrudRepository<EnterpriseProfile, String> {
  Optional<EnterpriseProfile> findByKeycloakUserId(String keycloakUserId);
}
