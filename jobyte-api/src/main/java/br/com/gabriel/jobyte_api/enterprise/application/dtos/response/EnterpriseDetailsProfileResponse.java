package br.com.gabriel.jobyte_api.enterprise.application.dtos.response;

import java.time.LocalDateTime;

import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseDetailsValueObject;

public record EnterpriseDetailsProfileResponse(
  Long id,
  String companyName,
  String cnpj,
  String address,
  String phone,
  LocalDateTime createdAt,
  LocalDateTime updatedAt
) {
  public static EnterpriseDetailsProfileResponse fromValueObject(EnterpriseDetailsValueObject profile) {
    return new EnterpriseDetailsProfileResponse(
      profile.id(),
      profile.companyName(),
      profile.cnpj(),
      profile.address(),
      profile.phone(),
      profile.createdAt(),
      profile.updatedAt()
    );
  }
}
