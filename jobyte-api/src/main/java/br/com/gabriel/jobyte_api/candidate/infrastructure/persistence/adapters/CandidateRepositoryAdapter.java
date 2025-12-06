package br.com.gabriel.jobyte_api.candidate.infrastructure.persistence.adapters;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import br.com.gabriel.jobyte_api.candidate.domain.entities.CandidateProfile;
import br.com.gabriel.jobyte_api.candidate.domain.ports.CandidateRepositoryPort;
import br.com.gabriel.jobyte_api.candidate.infrastructure.persistence.entities.CandidateProfileEntity;
import br.com.gabriel.jobyte_api.candidate.infrastructure.persistence.mappers.CandidateProfileMapper;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CandidateRepositoryAdapter implements CandidateRepositoryPort {
  private final CandidateProfileJpaRepository jpaRepository;

  @Override
  public Optional<CandidateProfile> findById(UUID id) {
    return jpaRepository.findById(id)
      .map(CandidateProfileMapper::toDomain);
  }

  @Override
  public Optional<CandidateProfile> findByKeycloakUserId(String keycloakUserId) {
    return jpaRepository.findByKeycloakUserId(keycloakUserId)
      .map(CandidateProfileMapper::toDomain);
  }

  @Override
  public CandidateProfile save(CandidateProfile candidate) {
    CandidateProfileEntity candidateEntity;
    
    if (candidate.getId() != null) {
      candidateEntity = jpaRepository.findById(candidate.getId()).orElse(null);
      if (candidateEntity != null) {
        CandidateProfileMapper.updateEntityJpa(candidateEntity, candidate);
      } else {
        candidateEntity = CandidateProfileMapper.toEntity(candidate);
      }
    } else {
      candidateEntity = CandidateProfileMapper.toEntity(candidate);
    }
    
    CandidateProfileEntity savedEntity = jpaRepository.save(candidateEntity);
    return CandidateProfileMapper.toDomain(savedEntity);
  }

  @Override
  public void delete(CandidateProfile candidate) {
    if (candidate.getId() != null) {
      jpaRepository.deleteById(candidate.getId());
    }
  }

  @Override
  public boolean existsByKeycloakUserId(String keycloakUserId) {
    return jpaRepository.existsByKeycloakUserId(keycloakUserId);
  }
}
