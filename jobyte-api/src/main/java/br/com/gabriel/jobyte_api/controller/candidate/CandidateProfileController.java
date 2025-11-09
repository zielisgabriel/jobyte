package br.com.gabriel.jobyte_api.controller.candidate;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.entity.CandidateProfile;
import br.com.gabriel.jobyte_api.service.candidate.CandidateProfileService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/candidate/profile")
@RequiredArgsConstructor
public class CandidateProfileController {
  private final CandidateProfileService candidateProfileService;

  @GetMapping("/me")
  public CandidateProfile getCandidateProfile(JwtAuthenticationToken authentication) {
    String keycloakId = authentication.getName();
    return this.candidateProfileService.getProfile(keycloakId);
  }
}
