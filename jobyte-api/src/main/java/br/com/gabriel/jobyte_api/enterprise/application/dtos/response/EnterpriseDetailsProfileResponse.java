package br.com.gabriel.jobyte_api.enterprise.application.dtos.response;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;

public record EnterpriseDetailsProfileResponse(
  UUID id,
  String companyName,
  String cnpj,
  String address,
  String phone,
  LocalDateTime createdAt,
  LocalDateTime updatedAt
) {
  public static EnterpriseDetailsProfileResponse fromDomain(EnterpriseProfile profile) {
    return new EnterpriseDetailsProfileResponse(
      profile.getId(),
      profile.getCompanyName(),
      profile.getCnpj(),
      profile.getAddress(),
      profile.getPhone(),
      profile.getCreatedAt(),
      profile.getUpdatedAt()
    );
  }
}
