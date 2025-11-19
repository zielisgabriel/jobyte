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
public class VacancyMetricsResponse {
  private UUID vacancyId;
  private String vacancyTitle;
  private String status;
  private MetricsData metrics;
  private List<MonthlyProcessData> monthlyProcesses;
  private LocalDateTime lastUpdated;

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class MetricsData {
    private Integer totalViews;
    private Integer totalApplications;
    private Integer totalQuestionBefore;
    private Double conversionRate;
    private Double avgTimeToApplyHours;
  }

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class MonthlyProcessData {
    private Integer month;
    private Integer year;
    private Integer count;
    private String monthName;
  }
}
