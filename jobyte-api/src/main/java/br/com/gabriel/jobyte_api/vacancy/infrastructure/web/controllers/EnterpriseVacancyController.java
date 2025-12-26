package br.com.gabriel.jobyte_api.vacancy.infrastructure.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.shared.domain.exception.EntityNotFoundException;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.request.CreateVacancyRequest;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.request.UpdateVacancyRequest;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyListResponse;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyResponse;
import br.com.gabriel.jobyte_api.vacancy.application.usecases.CreateVacancyUseCase;
import br.com.gabriel.jobyte_api.vacancy.application.usecases.ListEnterpriseVacanciesUseCase;
import br.com.gabriel.jobyte_api.vacancy.application.usecases.UpdateVacancyUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/enterprise/vacancy")
@RequiredArgsConstructor
public class EnterpriseVacancyController {
  private final CreateVacancyUseCase createVacancyUseCase;
  private final UpdateVacancyUseCase updateVacancyUseCase;
  private final ListEnterpriseVacanciesUseCase listEnterpriseVacanciesUseCase;
  private final EnterpriseRepositoryPort enterpriseRepository;

  @GetMapping("/list")
  public ResponseEntity<VacancyListResponse> listVacancies(
      JwtAuthenticationToken token,
      @RequestParam(defaultValue = "0") int page) {
    Long enterpriseId = getEnterpriseId(token);
    VacancyListResponse response = listEnterpriseVacanciesUseCase.execute(enterpriseId, page);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  public ResponseEntity<VacancyResponse> createVacancy(
      JwtAuthenticationToken token,
      @Valid @RequestBody CreateVacancyRequest request) {
    Long enterpriseId = getEnterpriseId(token);
    VacancyResponse response = createVacancyUseCase.execute(enterpriseId, request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PutMapping("/{id}")
  public ResponseEntity<VacancyResponse> updateVacancy(
      JwtAuthenticationToken token,
      @PathVariable Long id,
      @Valid @RequestBody UpdateVacancyRequest request) {
    Long enterpriseId = getEnterpriseId(token);
    VacancyResponse response = updateVacancyUseCase.execute(id, enterpriseId, request);
    return ResponseEntity.ok(response);
  }

  private Long getEnterpriseId(JwtAuthenticationToken token) {
    String keycloakId = token.getName();
    return enterpriseRepository.findByKeycloakUserId(keycloakId)
      .orElseThrow(() -> new EntityNotFoundException())
      .getId();
  }
}
