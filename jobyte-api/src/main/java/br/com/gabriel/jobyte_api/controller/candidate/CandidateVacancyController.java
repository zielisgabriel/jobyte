package br.com.gabriel.jobyte_api.controller.candidate;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.service.candidate.CandidateVacancyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/candidate/vacancies")
public class CandidateVacancyController {
  private final CandidateVacancyService candidateVacancyService;
  
  @GetMapping("/list")
  @ResponseStatus(code = HttpStatus.OK)
  public List<Vacancy> getVacanciesCandidate(@RequestParam int page) {
    return this.candidateVacancyService.getVacancies(page);
  }
}
