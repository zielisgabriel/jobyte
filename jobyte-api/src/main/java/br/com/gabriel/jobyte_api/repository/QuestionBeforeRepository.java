package br.com.gabriel.jobyte_api.repository;

import br.com.gabriel.jobyte_api.entity.QuestionBefore;
import br.com.gabriel.jobyte_api.entity.Vacancy;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface QuestionBeforeRepository extends JpaRepository<QuestionBefore, UUID> {
  List<QuestionBefore> findByVacancy(Vacancy vacancy);
  List<QuestionBefore> findByVacancyId(UUID vacancyId);
}
