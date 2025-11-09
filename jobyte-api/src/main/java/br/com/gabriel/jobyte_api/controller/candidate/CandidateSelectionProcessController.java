package br.com.gabriel.jobyte_api.controller.candidate;

import java.util.UUID;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.service.candidate.CandidateSelectionProcessService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/candidate/selectionProcess")
public class CandidateSelectionProcessController {
  private final CandidateSelectionProcessService candidateSelectionService;

  @PostMapping("/apply/{vacancyId}")
  public void applyToSelectionProcess(@PathVariable UUID vacancyId, JwtAuthenticationToken authentication) {
    String keycloakId = authentication.getName();
    this.candidateSelectionService.applyToSelectionProcess(vacancyId, keycloakId);
  }
}
