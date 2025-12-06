package br.com.gabriel.jobyte_api.enterprise.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseDetailsProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseSimpleProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;
import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.shared.domain.exceptions.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetEnterpriseProfileUseCase {
  private final EnterpriseRepositoryPort enterpriseRepository;

  public EnterpriseSimpleProfileResponse getSimpleProfile(String keycloakUserId) {
    EnterpriseProfile profile = this.enterpriseRepository
      .findByKeycloakUserId(keycloakUserId)
      .orElseThrow(() -> new EntityNotFoundException("Perfil da empresa", keycloakUserId));
    
      return EnterpriseSimpleProfileResponse.fromDomain(profile);
  }

  public EnterpriseDetailsProfileResponse getDetailsProfile(String keycloakUserId) {
    EnterpriseProfile profile = this.enterpriseRepository
      .findByKeycloakUserId(keycloakUserId)
      .orElseThrow(() -> new EntityNotFoundException("Perfil da empresa", keycloakUserId));

    return EnterpriseDetailsProfileResponse.fromDomain(profile);
  }
}
