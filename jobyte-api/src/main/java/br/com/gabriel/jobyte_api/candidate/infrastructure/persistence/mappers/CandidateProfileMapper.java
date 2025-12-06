package br.com.gabriel.jobyte_api.candidate.infrastructure.persistence.mappers;

import br.com.gabriel.jobyte_api.candidate.domain.entities.CandidateProfile;
import br.com.gabriel.jobyte_api.candidate.infrastructure.persistence.entities.CandidateProfileEntity;

public class CandidateProfileMapper {
  
  private CandidateProfileMapper() {}

  public static CandidateProfile toDomain(CandidateProfileEntity entity) {
    if (entity == null) return null;
    
    return new CandidateProfile(
      entity.getId(),
      entity.getKeycloakUserId(),
      entity.getFullName(),
      entity.getCpf(),
      entity.getPhone(),
      entity.getAddress(),
      entity.getBio()
    );
  }

  public static CandidateProfileEntity toEntity(CandidateProfile domain) {
    if (domain == null) return null;

    CandidateProfileEntity entity = new CandidateProfileEntity();
    entity.setId(domain.getId());
    entity.setKeycloakUserId(domain.getKeycloakUserId());
    entity.setFullName(domain.getFullName());
    entity.setCpf(domain.getCpf());
    entity.setPhone(domain.getPhone());
    entity.setAddress(domain.getAddress());
    entity.setBio(domain.getBio());
    return entity;
  }

  public static void updateEntityJpa(CandidateProfileEntity entity, CandidateProfile domain) {
    entity.setFullName(domain.getFullName());
    entity.setCpf(domain.getCpf());
    entity.setPhone(domain.getPhone());
    entity.setAddress(domain.getAddress());
    entity.setBio(domain.getBio());
  }
}
