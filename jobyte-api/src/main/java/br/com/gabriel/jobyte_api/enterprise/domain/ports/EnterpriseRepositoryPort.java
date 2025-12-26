package br.com.gabriel.jobyte_api.enterprise.domain.ports;

import java.util.Optional;

import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;
import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseDetailsValueObject;
import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseSimpleValueObject;

public interface EnterpriseRepositoryPort {
  Optional<EnterpriseProfile> findById(Long id);
  Optional<EnterpriseProfile> findByKeycloakUserId(String keycloakUserId);
  Optional<EnterpriseDetailsValueObject> findProfileDetailsByKeycloakUserId(String keycloakUserId);
  Optional<EnterpriseSimpleValueObject> findProfileSimpleByKeycloakUserId(String keycloakUserId);
  EnterpriseProfile save(EnterpriseProfile enterprise);
}
