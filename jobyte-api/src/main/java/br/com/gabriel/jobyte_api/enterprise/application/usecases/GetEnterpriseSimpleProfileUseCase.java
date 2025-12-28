package br.com.gabriel.jobyte_api.enterprise.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseSimpleProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.shared.domain.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetEnterpriseSimpleProfileUseCase {
  private final EnterpriseRepositoryPort enterpriseRepositoryPort;

  public EnterpriseSimpleProfileResponse execute(String keycloakUserId) {
    return this.enterpriseRepositoryPort
      .findProfileSimpleByKeycloakUserId(keycloakUserId)
      .map(simpleProfile -> {
        return EnterpriseSimpleProfileResponse.fromValueObject(simpleProfile);
      })
      .orElseThrow(() -> new EntityNotFoundException());
  }
}
