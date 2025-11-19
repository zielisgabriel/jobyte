package br.com.gabriel.jobyte_api.service.candidate;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.entity.CandidateProfile;
import br.com.gabriel.jobyte_api.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateProfileService {
  private final CandidateRepository candidateRepository;

  @PreAuthorize("hasRole('CANDIDATE')")
  public CandidateProfile getProfile(String keycloakId) {
    CandidateProfile candidate = this.candidateRepository.findByKeycloakUserId(keycloakId)
      .orElseGet(() -> {
        CandidateProfile defaultProfile = new CandidateProfile();
        defaultProfile.setFullName("Unknown");
        return defaultProfile;
      });

    return candidate;
  }
}
