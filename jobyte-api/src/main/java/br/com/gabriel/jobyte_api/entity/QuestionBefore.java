package br.com.gabriel.jobyte_api.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "questions_before")
public class QuestionBefore {
  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "candidate_id", nullable = false, referencedColumnName = "id")
  private CandidateProfile candidateProfile;

  @ManyToOne
  @JoinColumn(name = "vacancy_id", nullable = false, referencedColumnName = "id")
  private Vacancy vacancy;

  @ManyToOne
  @JoinColumn(name = "plataform_id", nullable = false, referencedColumnName = "id")
  private Platform plataform;

  @Column(name = "has_acquaintance_in_company", nullable = false)
  private boolean hasAcquaintanceInCompany;

  @Column(name = "acquaintance_name", nullable = true)
  private String acquaintanceName;

  @Column(name = "acquaintance_email", nullable = true)
  private String acquaintanceEmail;

  @Column(name = "you_work_at_company", nullable = false)
  private boolean youWorkAtCompany;

  @Column(name = "created_at", nullable = false)
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
