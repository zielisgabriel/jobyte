package br.com.gabriel.jobyte_api.enterprise.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.enterprise.application.dtos.request.UpdateEnterpriseProfileRequest;
import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseDetailsProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;
import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.shared.domain.exceptions.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateEnterpriseProfileUseCase {
  private final EnterpriseRepositoryPort enterpriseRepository;

  public EnterpriseDetailsProfileResponse execute(String keycloakUserId, UpdateEnterpriseProfileRequest request) {
    EnterpriseProfile profile = enterpriseRepository
      .findByKeycloakUserId(keycloakUserId)
      .orElseThrow(() -> new EntityNotFoundException("Perfil da empresa", keycloakUserId));

    profile.updateProfile(
      request.companyName(),
      request.address(),
      request.phone()
    );

    EnterpriseProfile savedProfile = enterpriseRepository.save(profile);
    return EnterpriseDetailsProfileResponse.fromDomain(savedProfile);
  }
}
