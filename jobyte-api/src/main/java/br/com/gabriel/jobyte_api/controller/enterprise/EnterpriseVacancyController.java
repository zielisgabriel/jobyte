package br.com.gabriel.jobyte_api.controller.enterprise;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.dto.request.CreateVacancyRequest;
import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.service.enterprise.EnterpriseVacancyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/enterprise/vacancies")
public class EnterpriseVacancyController {
  private final EnterpriseVacancyService enterpriseVacancyService;

  @PostMapping("/create")
  @ResponseStatus(code = HttpStatus.CREATED)
  public void createVacancy(CreateVacancyRequest request, JwtAuthenticationToken authentication) {
    String keycloakId = authentication.getName();
    this.enterpriseVacancyService.createVacancy(request, keycloakId);
  }

  @GetMapping("/list")
  @ResponseStatus(code = HttpStatus.OK)
  public List<Vacancy> getVacancies(@RequestParam int page, JwtAuthenticationToken authentication) {
    String keycloakId = authentication.getName();
    return this.enterpriseVacancyService.getVacancies(page, keycloakId);
  }

  @GetMapping("/{id}")
  @ResponseStatus(code = HttpStatus.OK)
  public Vacancy getVacancy(@PathVariable UUID id, JwtAuthenticationToken authentication) {
    String keycloakId = authentication.getName();
    return this.enterpriseVacancyService.getVacancy(id, keycloakId);
  }
}
