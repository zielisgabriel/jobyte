package br.com.gabriel.jobyte_api.enterprise.domain.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class EnterpriseProfile {
  @Getter
  private UUID id;

  @Getter
  private String keycloakUserId;

  @Getter
  @Setter
  private String companyName;

  @Getter
  private String cnpj;

  @Getter
  @Setter
  private String address;

  @Getter
  @Setter
  private String phone;

  @Getter
  private LocalDateTime createdAt;

  @Getter
  private LocalDateTime updatedAt;

  public static EnterpriseProfile create(
    String keycloakUserId,
    String companyName, 
    String cnpj,
    String address,
    String phone
  ) {
    return new EnterpriseProfile(
      null,
      keycloakUserId,
      companyName,
      cnpj,
      address,
      phone,
      null,
      null
    );
  }

  public void updateProfile(
    String companyName,
    String address,
    String phone
  ) {
    this.companyName = companyName;
    this.address = address;
    this.phone = phone;
  }
}
