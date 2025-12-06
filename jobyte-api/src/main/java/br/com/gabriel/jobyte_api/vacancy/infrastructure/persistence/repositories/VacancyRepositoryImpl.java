package br.com.gabriel.jobyte_api.vacancy.infrastructure.persistence.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import br.com.gabriel.jobyte_api.vacancy.domain.entities.Vacancy;
import br.com.gabriel.jobyte_api.vacancy.domain.enums.VacancyStatus;
import br.com.gabriel.jobyte_api.vacancy.domain.repositories.VacancyRepository;
import br.com.gabriel.jobyte_api.vacancy.infrastructure.persistence.entities.VacancyEntity;
import br.com.gabriel.jobyte_api.vacancy.infrastructure.persistence.mappers.VacancyMapper;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class VacancyRepositoryImpl implements VacancyRepository {
  private final VacancyJpaRepository jpaRepository;

  @Override
  public Optional<Vacancy> findById(UUID id) {
    return jpaRepository.findById(id)
      .map(VacancyMapper::toDomain);
  }

  @Override
  public Optional<Vacancy> findByIdAndEnterpriseId(UUID id, UUID enterpriseId) {
    return jpaRepository.findByIdAndEnterpriseId(id, enterpriseId)
      .map(VacancyMapper::toDomain);
  }

  @Override
  public List<Vacancy> findByEnterpriseId(UUID enterpriseId, int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    return jpaRepository.findByEnterpriseIdOrderByCreatedAtDesc(enterpriseId, pageable)
      .stream()
      .map(VacancyMapper::toDomain)
      .toList();
  }

  @Override
  public List<Vacancy> findByStatus(VacancyStatus status, int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    return jpaRepository.findByStatusOrderByCreatedAtDesc(status, pageable)
      .stream()
      .map(VacancyMapper::toDomain)
      .toList();
  }

  @Override
  public List<Vacancy> findOpenVacancies(int page, int size) {
    return findByStatus(VacancyStatus.OPEN, page, size);
  }

  @Override
  public Vacancy save(Vacancy vacancy) {
    VacancyEntity entity;
    
    if (vacancy.getId() != null) {
      entity = jpaRepository.findById(vacancy.getId()).orElse(null);
      if (entity != null) {
        VacancyMapper.updateEntity(entity, vacancy);
      } else {
        entity = VacancyMapper.toEntity(vacancy);
      }
    } else {
      entity = VacancyMapper.toEntity(vacancy);
    }
    
    VacancyEntity savedEntity = jpaRepository.save(entity);
    return VacancyMapper.toDomain(savedEntity);
  }

  @Override
  public void delete(Vacancy vacancy) {
    if (vacancy.getId() != null) {
      jpaRepository.deleteById(vacancy.getId());
    }
  }

  @Override
  public long count() {
    return jpaRepository.count();
  }

  @Override
  public long countByEnterpriseId(UUID enterpriseId) {
    return jpaRepository.countByEnterpriseId(enterpriseId);
  }
}
