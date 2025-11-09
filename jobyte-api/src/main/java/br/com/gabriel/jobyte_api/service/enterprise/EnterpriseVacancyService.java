package br.com.gabriel.jobyte_api.service.enterprise;

import java.util.List;
import java.util.UUID;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import br.com.gabriel.jobyte_api.dto.request.CreateVacancyRequest;
import br.com.gabriel.jobyte_api.entity.EnterpriseProfile;
import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.enumerate.VacancyStatus;
import br.com.gabriel.jobyte_api.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnterpriseVacancyService {
  private final VacancyRepository vacancyRepository;
  private final EnterpriseProfileService enterpriseProfileService;

  @PreAuthorize("hasRole('ENTERPRISE')")
  public void createVacancy(CreateVacancyRequest request, String keycloakId) {
    EnterpriseProfile enterprise = this.enterpriseProfileService.getProfile(keycloakId);

    Vacancy vacancy = new Vacancy();
    vacancy.setTitle(request.title());
    vacancy.setDescription(request.description());
    vacancy.setStatus(VacancyStatus.OPEN);
    vacancy.setEnterprise(enterprise);

    this.vacancyRepository.save(vacancy);
  }

  public List<Vacancy> getVacancies(int page, String keycloakId) {
    EnterpriseProfile enterprise = this.enterpriseProfileService.getProfile(keycloakId);
    Pageable pageable = PageRequest.of(page, 10);
    List<Vacancy> vacancies = this.vacancyRepository.findByEnterpriseIdOrderByCreatedAtDesc(enterprise.getId(), pageable);

    return vacancies;
  }
      
  public Vacancy getVacancy(UUID id, String keycloakId) {
    EnterpriseProfile enterprise = this.enterpriseProfileService.getProfile(keycloakId);
    Vacancy vacancy = this.vacancyRepository.findByIdAndEnterpriseId(id, enterprise.getId())
        .orElseThrow(() -> new RuntimeException("Vacancy not found"));

    return vacancy;
  }
}
