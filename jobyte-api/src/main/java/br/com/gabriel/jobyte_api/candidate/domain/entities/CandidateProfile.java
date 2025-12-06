package br.com.gabriel.jobyte_api.candidate.domain.entities;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateProfile {
  private UUID id;
  private String keycloakUserId;
  private String fullName;
  private String cpf;
  private String phone;
  private String address;
  private String bio;

  public static CandidateProfile create(
    String keycloakUserId,
    String fullName, 
    String cpf,
    String phone,
    String address,
    String bio
  ) {
    return new CandidateProfile(null, keycloakUserId, fullName, cpf, phone, address, bio);
  }

  public void updateProfile(String fullName, String phone, String address, String bio) {
    this.fullName = fullName;
    this.phone = phone;
    this.address = address;
    this.bio = bio;
  }

  public boolean hasCompleteProfile() {
    return fullName != null && !fullName.isBlank() 
        && cpf != null && !cpf.isBlank()
        && phone != null && !phone.isBlank();
  }
}
