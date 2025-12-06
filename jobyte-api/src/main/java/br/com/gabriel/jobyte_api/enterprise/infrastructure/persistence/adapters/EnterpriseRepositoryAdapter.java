package br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.adapters;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;
import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.entities.EnterpriseProfileEntity;
import br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.mappers.EnterpriseProfileMapper;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EnterpriseRepositoryAdapter implements EnterpriseRepositoryPort {
  private final EnterpriseProfileJpaRepository jpaRepository;

  @Override
  public Optional<EnterpriseProfile> findById(UUID id) {
    return jpaRepository.findById(id)
      .map(EnterpriseProfileMapper::toDomain);
  }

  @Override
  public Optional<EnterpriseProfile> findByKeycloakUserId(String keycloakUserId) {
    return jpaRepository.findByKeycloakUserId(keycloakUserId)
      .map(EnterpriseProfileMapper::toDomain);
  }

  @Override
  public EnterpriseProfile save(EnterpriseProfile enterprise) {
    EnterpriseProfileEntity entity;
    
    if (enterprise.getId() != null) {
      entity = jpaRepository.findById(enterprise.getId()).orElse(null);
      if (entity != null) {
        EnterpriseProfileMapper.updateEntity(entity, enterprise);
      } else {
        entity = EnterpriseProfileMapper.toEntity(enterprise);
      }
    } else {
      entity = EnterpriseProfileMapper.toEntity(enterprise);
    }
    
    EnterpriseProfileEntity savedEntity = jpaRepository.save(entity);
    return EnterpriseProfileMapper.toDomain(savedEntity);
  }

  @Override
  public void delete(EnterpriseProfile enterprise) {
    if (enterprise.getId() != null) {
      jpaRepository.deleteById(enterprise.getId());
    }
  }

  @Override
  public boolean existsByKeycloakUserId(String keycloakUserId) {
    return jpaRepository.existsByKeycloakUserId(keycloakUserId);
  }

  @Override
  public boolean existsByCnpj(String cnpj) {
    return jpaRepository.existsByCnpj(cnpj);
  }
}
