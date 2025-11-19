package br.com.gabriel.jobyte_api.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VacancyListResponse {
  private List<VacancyItem> vacancies;
  private int currentPage;
  private int totalPages;
  private long totalItems;

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class VacancyItem {
    private UUID id;
    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private MetricsSummary metrics;
  }

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class MetricsSummary {
    private Integer totalViews;
    private Integer totalApplications;
    private Double conversionRate;
  }
}
