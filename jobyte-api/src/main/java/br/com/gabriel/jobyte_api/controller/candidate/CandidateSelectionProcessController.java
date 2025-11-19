package br.com.gabriel.jobyte_api.controller.candidate;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.dto.request.CreateQuestionBeforeRequest;
import br.com.gabriel.jobyte_api.service.candidate.CandidateQuestionBeforeService;
import br.com.gabriel.jobyte_api.service.candidate.CandidateSelectionProcessService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/candidate/selection-process")
public class CandidateSelectionProcessController {
  private final CandidateSelectionProcessService candidateSelectionService;
  private final CandidateQuestionBeforeService candidateQuestionBeforeService;

  @PostMapping("/apply/{vacancyId}")
  @ResponseStatus(code = HttpStatus.CREATED)
  public void applyToSelectionProcess(
    @PathVariable UUID vacancyId,
    @RequestBody CreateQuestionBeforeRequest createQuestionBeforeRequest,
    JwtAuthenticationToken authentication
  ) {
    String keycloakId = authentication.getName();
    this.candidateQuestionBeforeService.createQuestionBefore(
      createQuestionBeforeRequest,
      vacancyId,
      keycloakId
    );
    this.candidateSelectionService.applyToSelectionProcess(vacancyId, keycloakId);
  }
}
