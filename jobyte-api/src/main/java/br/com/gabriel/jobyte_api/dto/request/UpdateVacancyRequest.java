package br.com.gabriel.jobyte_api.dto.request;

import br.com.gabriel.jobyte_api.enumerate.VacancyStatus;
import lombok.Data;

@Data
public class UpdateVacancyRequest {
  private String title;
  private String description;
  private VacancyStatus status;
}
