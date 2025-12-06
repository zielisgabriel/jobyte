package br.com.gabriel.jobyte_api.candidate.infrastructure.persistence.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "candidate_profiles")
public class CandidateProfileEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  @Column(name = "keycloak_user_id", nullable = false, unique = true)
  private String keycloakUserId;

  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Column(name = "cpf", nullable = true, unique = true)
  private String cpf;

  @Column(name = "phone", nullable = true)
  private String phone;

  @Column(name = "address", nullable = true)
  private String address;

  @Column(name = "bio", nullable = true, columnDefinition = "TEXT")
  private String bio;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
