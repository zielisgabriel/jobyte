package br.com.gabriel.jobyte_api.enterprise.application.dtos.response;

import java.util.UUID;

import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;

public record EnterpriseSimpleProfileResponse(
  UUID id,
  String companyName
) {
  public static EnterpriseSimpleProfileResponse fromDomain(EnterpriseProfile entity) {
    return new EnterpriseSimpleProfileResponse(
      entity.getId(),
      entity.getCompanyName()
    );
  }
}
