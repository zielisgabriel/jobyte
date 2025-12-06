package br.com.gabriel.jobyte_api.enterprise.domain.entities;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterpriseProfile {
  private UUID id;
  private String keycloakUserId;
  private String companyName;
  private String cnpj;
  private String address;
  private String phone;

  public static EnterpriseProfile create(String keycloakUserId,
    String companyName, 
    String cnpj,
    String address,
    String phone
  ) {
    return new EnterpriseProfile(null, keycloakUserId, companyName, cnpj, address, phone);
  }

  public void updateProfile(String companyName, String address, String phone) {
    this.companyName = companyName;
    this.address = address;
    this.phone = phone;
  }

  public boolean hasCompleteProfile() {
    return companyName != null && !companyName.isBlank()
        && cnpj != null && !cnpj.isBlank();
  }
}
