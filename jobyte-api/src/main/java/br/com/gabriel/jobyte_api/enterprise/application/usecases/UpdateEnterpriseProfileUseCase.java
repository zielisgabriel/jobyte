package br.com.gabriel.jobyte_api.enterprise.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.enterprise.application.dtos.request.UpdateEnterpriseProfileRequest;
import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;
import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseDetailsValueObject;
import br.com.gabriel.jobyte_api.shared.domain.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateEnterpriseProfileUseCase {
  private final EnterpriseRepositoryPort enterpriseRepository;

  public void execute(String keycloakUserId, UpdateEnterpriseProfileRequest request) {
    EnterpriseDetailsValueObject profile = this.enterpriseRepository
      .findProfileDetailsByKeycloakUserId(keycloakUserId)
        .orElseThrow(() -> new EntityNotFoundException("Perfil da empresa"));

    EnterpriseProfile profileUpdated = this.enterpriseRepository.findById(profile.id())
      .orElseThrow(() -> new EntityNotFoundException("Perfil da empresa"));

    profileUpdated.updateProfile(
      profile.companyName(),
      profile.address(),
      profile.phone()
    );

    this.enterpriseRepository.save(profileUpdated);
  }
}
