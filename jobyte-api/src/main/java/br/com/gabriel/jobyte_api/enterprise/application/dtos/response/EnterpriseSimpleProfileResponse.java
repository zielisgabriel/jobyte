package br.com.gabriel.jobyte_api.enterprise.application.dtos.response;

import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;

public record EnterpriseSimpleProfileResponse(
  String companyName
) {
  public static EnterpriseSimpleProfileResponse fromDomain(EnterpriseProfile entity) {
    return new EnterpriseSimpleProfileResponse(
      entity.getCompanyName()
    );
  }
}
