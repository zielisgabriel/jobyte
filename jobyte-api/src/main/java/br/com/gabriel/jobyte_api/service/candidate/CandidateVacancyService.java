package br.com.gabriel.jobyte_api.service.candidate;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.enumerate.VacancyStatus;
import br.com.gabriel.jobyte_api.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateVacancyService {
  private final VacancyRepository vacancyRepository;

  public List<Vacancy> getVacancies(int page) {
    Pageable pageable = PageRequest.of(page, 20);
    List<Vacancy> vacancies = this.vacancyRepository.findByStatusOrderByCreatedAtDesc(VacancyStatus.OPEN, pageable);

    return vacancies;
  }
}
