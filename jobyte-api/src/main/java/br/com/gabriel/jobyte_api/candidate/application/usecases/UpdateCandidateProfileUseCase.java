package br.com.gabriel.jobyte_api.candidate.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.candidate.application.dtos.request.UpdateProfileRequest;
import br.com.gabriel.jobyte_api.candidate.application.dtos.response.ProfileDetailsResponse;
import br.com.gabriel.jobyte_api.candidate.domain.entities.CandidateProfile;
import br.com.gabriel.jobyte_api.candidate.domain.ports.CandidateRepositoryPort;
import br.com.gabriel.jobyte_api.shared.domain.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateCandidateProfileUseCase {
  private final CandidateRepositoryPort candidateRepository;

  public ProfileDetailsResponse execute(String keycloakUserId, UpdateProfileRequest request) {
    CandidateProfile profile = candidateRepository
      .findByKeycloakUserId(keycloakUserId)
      .orElseThrow(() -> new EntityNotFoundException());

    profile.updateProfile(
      request.fullName(),
      request.phone(),
      request.address(),
      request.bio()
    );

    CandidateProfile savedProfile = candidateRepository.save(profile);
    return ProfileDetailsResponse.fromDomain(savedProfile);
  }
}
