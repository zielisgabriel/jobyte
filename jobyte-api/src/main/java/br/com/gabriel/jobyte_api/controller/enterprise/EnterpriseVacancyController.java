package br.com.gabriel.jobyte_api.controller.enterprise;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.RequestBody;
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
@RequestMapping("/api/enterprise/vacancy")
public class EnterpriseVacancyController {
  private final EnterpriseVacancyService enterpriseVacancyService;

  @PostMapping("/create")
  @ResponseStatus(code = HttpStatus.CREATED)
  public Vacancy createVacancy(
    @RequestBody CreateVacancyRequest createVacancyRequest,
    JwtAuthenticationToken authentication
  ) {
    String keycloakUserId = authentication.getToken().getSubject();

    return this.enterpriseVacancyService.createVacancy(createVacancyRequest, keycloakUserId);
  }

  @GetMapping("/list")
  public List<Vacancy> listVacancies(
    @RequestParam Optional<String> page,
    JwtAuthenticationToken authentication
  ) {
    String keycloakUserId = authentication.getToken().getSubject();

    return this.enterpriseVacancyService.listVacancies(page, keycloakUserId);
  }

  @GetMapping("/{id}")
  public Vacancy fetchVacancyById(@PathVariable UUID id, JwtAuthenticationToken authentication) {
    String keycloakUserId = authentication.getToken().getSubject();

    return this.enterpriseVacancyService.fetchVacancyById(id, keycloakUserId);
  }
}
