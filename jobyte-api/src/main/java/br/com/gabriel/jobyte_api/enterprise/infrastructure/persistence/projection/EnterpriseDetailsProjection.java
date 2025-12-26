package br.com.gabriel.jobyte_api.enterprise.infrastructure.persistence.projection;

import java.time.LocalDateTime;

public interface EnterpriseDetailsProjection {
  long getId();
  String getCompanyName();
  String getCnpj();
  String getAddress();
  String getPhone();
  LocalDateTime getCreatedAt();
  LocalDateTime getUpdatedAt();
}
