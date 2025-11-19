package br.com.gabriel.jobyte_api.service.candidate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.dto.response.VacanciesResponse;
import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.enumerate.VacancyStatus;
import br.com.gabriel.jobyte_api.repository.VacancyRepository;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateVacancyService {
  private final VacancyRepository vacancyRepository;
  private static final int PAGE_SIZE = 20;

  public VacanciesResponse getVacancies(Optional<Integer> page) {
    Pageable pageable = PageRequest.of(page.orElse(0), PAGE_SIZE);
    List<Vacancy> vacancies = this.vacancyRepository.findByStatusOrderByCreatedAtDesc(VacancyStatus.OPEN, pageable);
    int totalPages = (int) Math.ceil((double) this.vacancyRepository.count() / PAGE_SIZE);
    return new VacanciesResponse(vacancies, totalPages);
  }

  public Vacancy getVacancyById(UUID id) {
    Vacancy vacancy = this.vacancyRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("Não foi possível encontrar a vaga: " + id));
    return vacancy;
  }
}
