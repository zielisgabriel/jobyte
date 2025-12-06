package br.com.gabriel.jobyte_api.vacancy.infrastructure.persistence.mappers;

import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.infrastructure.persistence.entities.VacancyEntity;

public class VacancyMapper {
  
  private VacancyMapper() {}

  public static Vacancy toDomain(VacancyEntity entity) {
    if (entity == null) return null;
    
    return new Vacancy(
      entity.getId(),
      entity.getTitle(),
      entity.getDescription(),
      entity.getEnterpriseId(),
      entity.getStatus(),
      entity.getCreatedAt(),
      entity.getUpdatedAt()
    );
  }

  public static VacancyEntity toEntity(Vacancy domain) {
    if (domain == null) return null;

    VacancyEntity entity = new VacancyEntity();
    entity.setId(domain.getId());
    entity.setTitle(domain.getTitle());
    entity.setDescription(domain.getDescription());
    entity.setEnterpriseId(domain.getEnterpriseId());
    entity.setStatus(domain.getStatus());
    entity.setCreatedAt(domain.getCreatedAt());
    entity.setUpdatedAt(domain.getUpdatedAt());
    return entity;
  }

  public static void updateEntity(VacancyEntity entity, Vacancy domain) {
    entity.setTitle(domain.getTitle());
    entity.setDescription(domain.getDescription());
    entity.setStatus(domain.getStatus());
    entity.setUpdatedAt(domain.getUpdatedAt());
  }
}
