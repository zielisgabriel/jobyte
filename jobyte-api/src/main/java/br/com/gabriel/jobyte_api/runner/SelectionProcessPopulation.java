package br.com.gabriel.jobyte_api.runner;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import br.com.gabriel.jobyte_api.entity.CandidateProfile;
import br.com.gabriel.jobyte_api.entity.SelectionProcess;
import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.repository.CandidateRepository;
import br.com.gabriel.jobyte_api.repository.SelectionProcessRepository;
import br.com.gabriel.jobyte_api.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Profile("dev")
@Component
@RequiredArgsConstructor
@Order(30)
@Slf4j
public class SelectionProcessPopulation implements CommandLineRunner {

  private final CandidateRepository candidateRepository;
  private final VacancyRepository vacancyRepository;
  private final SelectionProcessRepository selectionProcessRepository;

  private static final Random RANDOM = new Random();

  @Override
  public void run(String... args) throws Exception {
    long currentProcessCount = selectionProcessRepository.count();
    int expectedMinimum = 200;
    
    if (currentProcessCount >= expectedMinimum) {
      log.info("[Population-SP] Selection processes já populados ({} existentes). Pulando população.", currentProcessCount);
      return;
    }

    List<CandidateProfile> candidates = new ArrayList<>();
    candidateRepository.findAll().forEach(candidates::add);
    List<Vacancy> vacancies = new ArrayList<>();
    vacancyRepository.findAll().forEach(vacancies::add);

    if (candidates.isEmpty() || vacancies.isEmpty()) {
      log.warn("[Population-SP] Sem candidatos ({}) ou vagas ({}). Rode CandidatePopulation/Enterprise+Vacancy antes.", candidates.size(), vacancies.size());
      return;
    }

    int processesTarget = Math.min(200, vacancies.size() * 8);
    int created = 0;
    for (int i = 0; i < processesTarget; i++) {
      CandidateProfile candidate = candidates.get(RANDOM.nextInt(candidates.size()));
      Vacancy vacancy = vacancies.get(RANDOM.nextInt(vacancies.size()));

      try {
        SelectionProcess sp = new SelectionProcess();
        sp.setCandidate(candidate);
        sp.setVacancy(vacancy);
        selectionProcessRepository.save(sp);
        created++;
      } catch (Exception e) {
        // duplicidades etc. ignoradas em ambiente dev
      }
    }

    log.info("[Population-SP] Selection processes criados: {}", created);
  }
}
