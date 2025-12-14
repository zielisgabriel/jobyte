package br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.adapters;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.entities.EnterpriseProfileEntity;

interface EnterpriseProfileJpaRepository extends JpaRepository<EnterpriseProfileEntity, UUID> {
  Optional<EnterpriseProfileEntity> findByKeycloakUserId(String keycloakUserId);
  boolean existsByKeycloakUserId(String keycloakUserId);
  boolean existsByCnpj(String cnpj);
}
