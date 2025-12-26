package br.com.gabriel.jobyte_api.enterprise.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseDetailsProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.application.dtos.response.EnterpriseSimpleProfileResponse;
import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseDetailsValueObject;
import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseSimpleValueObject;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetEnterpriseProfileUseCase {
  private final EnterpriseRepositoryPort enterpriseRepository;

  public EnterpriseSimpleProfileResponse getSimpleProfile(String keycloakUserId) {
    EnterpriseSimpleValueObject enterpriseSimple = this.enterpriseRepository.findProfileSimpleByKeycloakUserId(keycloakUserId)
      .orElseThrow(() -> new NotFoundException());
    
    return EnterpriseSimpleProfileResponse.fromValueObject(enterpriseSimple);
  }

  public EnterpriseDetailsProfileResponse getDetailsProfile(String keycloakUserId) {
    EnterpriseDetailsValueObject enterpriseDetails = this.enterpriseRepository.findProfileDetailsByKeycloakUserId(keycloakUserId)
      .orElseThrow(() -> new NotFoundException());

    return EnterpriseDetailsProfileResponse.fromValueObject(enterpriseDetails);
  }
}
