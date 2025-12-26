package br.com.gabriel.jobyte_api.vacancy.domain.entities;

import java.time.LocalDateTime;

import br.com.gabriel.jobyte_api.vacancy.domain.enums.VacancyStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Vacancy {
  private Long id;
  private String title;
  private String description;
  private Long enterpriseId;
  private VacancyStatus status;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public static Vacancy create(
    Long id,
    String title,
    String description,
    Long enterpriseId
  ) {
    return new Vacancy(
      id,
      title, 
      description, 
      enterpriseId, 
      VacancyStatus.DRAFT,
      LocalDateTime.now(),
      LocalDateTime.now()
    );
  }

  public void publish() {
    if (this.status == VacancyStatus.DRAFT || this.status == VacancyStatus.PAUSED) {
      this.status = VacancyStatus.OPEN;
      this.updatedAt = LocalDateTime.now();
    }
  }

  public void pause() {
    if (this.status == VacancyStatus.OPEN) {
      this.status = VacancyStatus.PAUSED;
      this.updatedAt = LocalDateTime.now();
    }
  }

  public void close() {
    this.status = VacancyStatus.CLOSED;
    this.updatedAt = LocalDateTime.now();
  }

  public void update(String title, String description) {
    this.title = title;
    this.description = description;
    this.updatedAt = LocalDateTime.now();
  }

  public boolean isOpen() {
    return this.status == VacancyStatus.OPEN;
  }

  public boolean belongsToEnterprise(Long enterpriseId) {
    return this.enterpriseId.equals(enterpriseId);
  }
}
