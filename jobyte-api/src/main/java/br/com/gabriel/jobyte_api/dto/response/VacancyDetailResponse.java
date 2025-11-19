package br.com.gabriel.jobyte_api.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VacancyDetailResponse {
  private UUID id;
  private String title;
  private String description;
  private String status;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private EnterpriseInfo enterprise;

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class EnterpriseInfo {
    private UUID id;
    private String companyName;
    private String cnpj;
    private String address;
    private String phone;
  }
}
