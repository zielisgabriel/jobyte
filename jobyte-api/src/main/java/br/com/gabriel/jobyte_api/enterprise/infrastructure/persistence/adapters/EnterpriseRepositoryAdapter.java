package br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.adapters;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;
import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseDetailsValueObject;
import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseSimpleValueObject;
import br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.entities.EnterpriseProfileEntity;
import br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.mappers.EnterpriseProfileMapper;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
class EnterpriseRepositoryAdapter implements EnterpriseRepositoryPort {
  private final EnterpriseProfileJpaRepository jpaRepository;

  @Override
  public Optional<EnterpriseProfile> findById(Long id) {
    return this.jpaRepository.findById(id)
      .map(EnterpriseProfileMapper::toDomain);
  }

  @Override
  public Optional<EnterpriseProfile> findByKeycloakUserId(String keycloakUserId) {
    return this.jpaRepository.findByKeycloakUserId(keycloakUserId)
      .map(EnterpriseProfileMapper::toDomain);
  }

  @Override
  public Optional<EnterpriseDetailsValueObject> findProfileDetailsByKeycloakUserId(String keycloakUserId) {
    return this.jpaRepository.findProfileDetailsByKeycloakUserId(keycloakUserId)
      .map(profileDetails -> {
        return new EnterpriseDetailsValueObject(
          profileDetails.getId(),
          profileDetails.getCompanyName(),
          profileDetails.getCnpj(),
          profileDetails.getAddress(),
          profileDetails.getPhone(),
          profileDetails.getCreatedAt(),
          profileDetails.getUpdatedAt()
        );
      });
  }

  @Override
  public Optional<EnterpriseSimpleValueObject> findProfileSimpleByKeycloakUserId(String keycloakUserId) {
    return this.jpaRepository.findProfileSimpleByKeycloakUserId(keycloakUserId)
      .map(profileDetails -> {
        return new EnterpriseSimpleValueObject(
          profileDetails.getId(),
          profileDetails.getCompanyName()
        );
      });
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
}
