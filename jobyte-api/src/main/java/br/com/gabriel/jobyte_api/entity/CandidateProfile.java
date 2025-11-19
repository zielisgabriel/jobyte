package br.com.gabriel.jobyte_api.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "candidate_profiles")
public class CandidateProfile {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private UUID id;

  @Column(name = "keycloak_user_id", nullable = false, unique = true)
  private String keycloakUserId;

  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Column(name = "cpf", nullable = true)
  private String cpf;

  @Column(name = "phone", nullable = true)
  private String phone;

  @Column(name = "address", nullable = true)
  private String address;

  @Column(name = "bio", nullable = true, columnDefinition = "TEXT", length = 3000)
  private String bio;
}
