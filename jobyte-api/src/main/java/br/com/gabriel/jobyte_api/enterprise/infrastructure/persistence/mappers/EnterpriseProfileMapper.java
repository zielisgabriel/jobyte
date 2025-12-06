package br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.mappers;

import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;
import br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.entities.EnterpriseProfileEntity;

public class EnterpriseProfileMapper {
  
  private EnterpriseProfileMapper() {}

  public static EnterpriseProfile toDomain(EnterpriseProfileEntity entity) {
    if (entity == null) return null;
    
    return new EnterpriseProfile(
      entity.getId(),
      entity.getKeycloakUserId(),
      entity.getCompanyName(),
      entity.getCnpj(),
      entity.getAddress(),
      entity.getPhone()
    );
  }

  public static EnterpriseProfileEntity toEntity(EnterpriseProfile domain) {
    if (domain == null) return null;

    EnterpriseProfileEntity entity = new EnterpriseProfileEntity();
    entity.setId(domain.getId());
    entity.setKeycloakUserId(domain.getKeycloakUserId());
    entity.setCompanyName(domain.getCompanyName());
    entity.setCnpj(domain.getCnpj());
    entity.setAddress(domain.getAddress());
    entity.setPhone(domain.getPhone());
    return entity;
  }

  public static void updateEntity(EnterpriseProfileEntity entity, EnterpriseProfile domain) {
    entity.setCompanyName(domain.getCompanyName());
    entity.setAddress(domain.getAddress());
    entity.setPhone(domain.getPhone());
  }
}
