package br.com.gabriel.jobyte_api.service.enterprise;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.dto.request.CreateVacancyRequest;
import br.com.gabriel.jobyte_api.entity.EnterpriseProfile;
import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.enumerate.VacancyStatus;
import br.com.gabriel.jobyte_api.repository.VacancyRepository;
import jakarta.ws.rs.ForbiddenException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnterpriseVacancyService {
  private final EnterpriseProfileService enterpriseProfileService;
  private final VacancyRepository vacancyRepository;

  public Vacancy createVacancy(CreateVacancyRequest createVacancyRequest, String keycloakUserId) {
    EnterpriseProfile enterprise = this.enterpriseProfileService.getProfile(keycloakUserId);

    if (enterprise.getId() == null) {
      throw new ForbiddenException("Perfil da empresa inválido");
    }

    try {
      UUID bodyEnterpriseId = UUID.fromString(
        createVacancyRequest.enterpriseId() == null ? "" : createVacancyRequest.enterpriseId().trim()
      );

      if (!enterprise.getId().equals(bodyEnterpriseId)) {
        throw new ForbiddenException("Conteúdo enterpriseId alterado!");
      }
    } catch (IllegalArgumentException ex) {
      throw new ForbiddenException("Conteúdo enterpriseId inválido");
    }

    Vacancy vacancy = new Vacancy();
    vacancy.setTitle(createVacancyRequest.title());
    vacancy.setDescription(createVacancyRequest.description());
    vacancy.setEnterprise(enterprise);
    vacancy.setStatus(VacancyStatus.OPEN);

    return this.vacancyRepository.save(vacancy);
  }

  public List<Vacancy> listVacancies(Optional<String> page, String keycloakUserId) {
    EnterpriseProfile enterprise = this.enterpriseProfileService.getProfile(keycloakUserId);
    Pageable pageable = PageRequest.of(Integer.parseInt(page.orElse("0")), 30);
    List<Vacancy> vacancies = this.vacancyRepository
      .findByEnterpriseIdOrderByCreatedAtDesc(enterprise.getId(), pageable);

    return vacancies;
  }

  public Vacancy fetchVacancyById(UUID id, String keycloakUserId) {
    EnterpriseProfile enterprise = this.enterpriseProfileService.getProfile(keycloakUserId);
    Vacancy vacancy = this.vacancyRepository.findById(id)
      .orElseThrow(() -> new ForbiddenException("Vaga não encontrada com ID: " + id));

    if (!vacancy.getEnterprise().getId().equals(enterprise.getId())) {
      throw new ForbiddenException("Acesso negado à vaga com ID: " + id);
    }

    return vacancy;
  }
}
