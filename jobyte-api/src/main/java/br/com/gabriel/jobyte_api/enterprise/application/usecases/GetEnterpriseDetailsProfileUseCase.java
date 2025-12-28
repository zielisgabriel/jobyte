package br.com.gabriel.jobyte_api.enterprise.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseDetailsProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.shared.domain.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetEnterpriseDetailsProfileUseCase {
  private final EnterpriseRepositoryPort enterpriseRepository;

  public EnterpriseDetailsProfileResponse execute(String keycloakUserId) {
    return this.enterpriseRepository
      .findProfileDetailsByKeycloakUserId(keycloakUserId)
      .map(detailsProfile -> {
        return EnterpriseDetailsProfileResponse.fromValueObject(detailsProfile);
      })
      .orElseThrow(() -> new EntityNotFoundException());
  }
}
