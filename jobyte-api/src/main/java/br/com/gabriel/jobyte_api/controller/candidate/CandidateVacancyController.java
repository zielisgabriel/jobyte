package br.com.gabriel.jobyte_api.controller.candidate;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.dto.response.VacanciesResponse;
import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.service.candidate.CandidateVacancyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/candidate/vacancy")
public class CandidateVacancyController {
  private final CandidateVacancyService candidateVacancyService;
  
  @GetMapping("/list")
  @ResponseStatus(code = HttpStatus.OK)
  public VacanciesResponse getVacanciesCandidate(@RequestParam Optional<Integer> page) {
    return this.candidateVacancyService.getVacancies(page);
  }

  @GetMapping("/{id}")
  @ResponseStatus(code = HttpStatus.OK)
  public Vacancy getVacancyById(@PathVariable UUID id) {
    return this.candidateVacancyService.getVacancyById(id);
  }
}