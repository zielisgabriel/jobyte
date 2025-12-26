package br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.adapters;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.entities.EnterpriseProfileEntity;
import br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.projection.EnterpriseDetailsProjection;
import br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.projection.EnterpriseSimpleProjection;

interface EnterpriseProfileJpaRepository extends JpaRepository<EnterpriseProfileEntity, Long> {

  @Query("""
      SELECT u.id as id,
      u.companyName as companyName,
      u.cnpj as cnpj,
      u.address as address,
      u.phone as phone,
      u.createdAt as createdAt,
      u.updatedAt as updatedAt
      FROM EnterpriseProfileEntity u
      WHERE u.keycloakUserId = :keycloakUserId
      """)
  Optional<EnterpriseDetailsProjection> findProfileDetailsByKeycloakUserId(
    @Param("keycloakUserId") String keycloakUserId
  );

  @Query("""
      SELECT u.id as id,
      u.companyName as companyName
      FROM EnterpriseProfileEntity u
      WHERE u.keycloakUserId = :keycloakUserId
      """)
  Optional<EnterpriseSimpleProjection> findProfileSimpleByKeycloakUserId(
    @Param("keycloakUserId") String keycloakUserId
  );

  Optional<EnterpriseProfileEntity> findById(long id);
  Optional<EnterpriseProfileEntity> findByKeycloakUserId(String keycloakUserId);
}
