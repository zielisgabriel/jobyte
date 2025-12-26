package br.com.gabriel.jobyte_api.enterprise.application.dtos.response;

import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseSimpleValueObject;

public record EnterpriseSimpleProfileResponse(
  Long id,
  String companyName
) {
  public static EnterpriseSimpleProfileResponse fromValueObject(EnterpriseSimpleValueObject profile) {
    return new EnterpriseSimpleProfileResponse(
      profile.id(),
      profile.companyName()
    );
  }
}
