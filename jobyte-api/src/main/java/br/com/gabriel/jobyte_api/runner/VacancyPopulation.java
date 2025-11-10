package br.com.gabriel.jobyte_api.runner;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import br.com.gabriel.jobyte_api.entity.EnterpriseProfile;
import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.enumerate.VacancyStatus;
import br.com.gabriel.jobyte_api.repository.EnterpriseRepository;
import br.com.gabriel.jobyte_api.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Profile("dev")
@Component
@RequiredArgsConstructor
@Order(20)
@Slf4j
public class VacancyPopulation implements CommandLineRunner {

  private final EnterpriseRepository enterpriseRepository;
  private final VacancyRepository vacancyRepository;

  private static final String[] VACANCY_TITLES = {
    "Desenvolvedor Backend", "Desenvolvedor Frontend", "Engenheiro de Dados", "Cientista de Dados",
    "Analista de QA", "Product Owner", "Scrum Master", "DevOps Engineer", "Mobile Developer", "UI/UX Designer"
  };

  private static final String[] STACK_PHRASES = {
    "Stack: Java, Spring Boot, PostgreSQL", "Stack: Node.js, NestJS, MongoDB", "Stack: React, Next.js, Tailwind CSS",
    "Stack: Python, FastAPI, Redis", "Stack: Go, gRPC, Kubernetes", "Stack: Kotlin, Micronaut, Kafka"
  };

  private static final Random RANDOM = new Random();

  @Override
  public void run(String... args) throws Exception {
    long currentVacancyCount = vacancyRepository.count();
    int expectedMinimum = 75; // 15 empresas × 5 vagas
    
    if (currentVacancyCount >= expectedMinimum) {
      log.info("[Population-Vacancy] Vagas já populadas ({} existentes). Pulando população.", currentVacancyCount);
      return;
    }

    int vacanciesPerEnterprise = 5;
    List<EnterpriseProfile> enterprises = new ArrayList<>();
    enterpriseRepository.findAll().forEach(enterprises::add);

    if (enterprises.isEmpty()) {
      log.warn("[Population-Vacancy] Sem empresas. Rode EnterprisePopulation antes.");
      return;
    }

    log.info("[Population-Vacancy] Criando vagas. Empresas: {}", enterprises.size());

    int created = 0;
    for (EnterpriseProfile enterprise : enterprises) {
      for (int v = 0; v < vacanciesPerEnterprise; v++) {
        Vacancy vacancy = new Vacancy();
        vacancy.setEnterprise(enterprise);
        vacancy.setStatus(VacancyStatus.OPEN);
        String title = VACANCY_TITLES[(v + enterprise.getCompanyName().length()) % VACANCY_TITLES.length];
        vacancy.setTitle(title);
        String desc = "Oportunidade para " + title + " em empresa " + enterprise.getCompanyName() + ". " + STACK_PHRASES[RANDOM.nextInt(STACK_PHRASES.length)] + ".";
        vacancy.setDescription(desc);
        vacancyRepository.save(vacancy);
        created++;
      }
    }

    log.info("[Population-Vacancy] Vagas criadas: {}", created);
  }
}
