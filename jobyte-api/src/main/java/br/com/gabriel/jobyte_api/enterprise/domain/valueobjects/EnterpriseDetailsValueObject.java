package br.com.gabriel.jobyte_api.enterprise.domain.valueobjects;

import java.time.LocalDateTime;

public record EnterpriseDetailsValueObject(
  long id,
  String companyName,
  String cnpj,
  String address,
  String phone,
  LocalDateTime createdAt,
  LocalDateTime updatedAt
) {}
