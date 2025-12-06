package br.com.gabriel.jobyte_api.vacancy.infrastructure.web.controllers;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyListResponse;
import br.com.gabriel.jobyte_api.vacancy.application.dtos.response.VacancyResponse;
import br.com.gabriel.jobyte_api.vacancy.application.usecases.ListOpenVacanciesUseCase;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/candidate/vacancy")
@PreAuthorize("hasRole('CANDIDATE')")
@RequiredArgsConstructor
public class CandidateVacancyController {
  private final ListOpenVacanciesUseCase listOpenVacanciesUseCase;

  @GetMapping("/list")
  public ResponseEntity<VacancyListResponse> listOpenVacancies(
      @RequestParam(defaultValue = "0") int page) {
    VacancyListResponse response = listOpenVacanciesUseCase.execute(page);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<VacancyResponse> getVacancyById(@PathVariable UUID id) {
    VacancyResponse response = listOpenVacanciesUseCase.getById(id);
    return ResponseEntity.ok(response);
  }
}
