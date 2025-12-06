package br.com.gabriel.jobyte_api.enterprise.domain.ports;

import java.util.Optional;
import java.util.UUID;

import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;

public interface EnterpriseRepositoryPort {
  Optional<EnterpriseProfile> findById(UUID id);
  Optional<EnterpriseProfile> findByKeycloakUserId(String keycloakUserId);
  EnterpriseProfile save(EnterpriseProfile enterprise);
  void delete(EnterpriseProfile enterprise);
  boolean existsByKeycloakUserId(String keycloakUserId);
  boolean existsByCnpj(String cnpj);
}
