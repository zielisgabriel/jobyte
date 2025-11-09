package br.com.gabriel.jobyte_api.service.candidate;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.entity.CandidateProfile;
import br.com.gabriel.jobyte_api.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateProfileService {
  private final CandidateRepository candidateRepository;

  public CandidateProfile getProfile(String keycloakId) {
    return this.candidateRepository.findByKeycloakUserId(keycloakId)
      .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
  }
}
