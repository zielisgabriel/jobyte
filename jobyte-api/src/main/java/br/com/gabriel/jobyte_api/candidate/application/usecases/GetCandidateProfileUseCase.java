package br.com.gabriel.jobyte_api.candidate.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.candidate.application.dtos.response.ProfileDetailsResponse;
import br.com.gabriel.jobyte_api.candidate.application.dtos.response.ProfileSimpleResponse;
import br.com.gabriel.jobyte_api.candidate.domain.entities.CandidateProfile;
import br.com.gabriel.jobyte_api.candidate.domain.ports.CandidateRepositoryPort;
import br.com.gabriel.jobyte_api.shared.domain.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetCandidateProfileUseCase {
  private final CandidateRepositoryPort candidateRepository;

  public ProfileSimpleResponse getSimpleProfile(String keycloakUserId) {
    CandidateProfile profile = findProfileByKeycloakUserId(keycloakUserId);
    return ProfileSimpleResponse.fromDomain(profile);
  }

  public ProfileDetailsResponse getDetailsProfile(String keycloakUserId) {
    CandidateProfile profile = findProfileByKeycloakUserId(keycloakUserId);
    return ProfileDetailsResponse.fromDomain(profile);
  }

  private CandidateProfile findProfileByKeycloakUserId(String keycloakUserId) {
    return candidateRepository
      .findByKeycloakUserId(keycloakUserId)
      .orElseThrow(() -> new EntityNotFoundException("Perfil do candidato", keycloakUserId));
  }
}
