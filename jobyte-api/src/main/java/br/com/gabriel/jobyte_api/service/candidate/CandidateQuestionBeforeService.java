package br.com.gabriel.jobyte_api.service.candidate;

import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.dto.request.CreateQuestionBeforeRequest;
import br.com.gabriel.jobyte_api.entity.CandidateProfile;
import br.com.gabriel.jobyte_api.entity.Platform;
import br.com.gabriel.jobyte_api.entity.QuestionBefore;
import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.repository.PlatformRepository;
import br.com.gabriel.jobyte_api.repository.QuestionBeforeRepository;
import br.com.gabriel.jobyte_api.repository.VacancyRepository;
import jakarta.ws.rs.BadRequestException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateQuestionBeforeService {
  private final QuestionBeforeRepository questionBeforeRepository;
  private final CandidateProfileService candidateProfileService;
  private final PlatformRepository plataformRepository;
  private final VacancyRepository vacancyRepository;

  public void createQuestionBefore(
    CreateQuestionBeforeRequest request,
    UUID vacancyId,
    String keycloakUserId
  ) {
    System.out.println("DEBUG: Received request with plataformId: " + request.plataformId());
    
    CandidateProfile candidate = this.candidateProfileService.getProfile(keycloakUserId);
    Vacancy vacancy = this.vacancyRepository.findById(vacancyId)
      .orElseThrow(() -> new BadRequestException("Vaga não encontrada com ID: " + vacancyId));
    Platform plataform = this.plataformRepository.findById(request.plataformId())
      .orElseThrow(() -> new BadRequestException("Plataforma de vagas não encontrada com ID: " + request.plataformId()));

    System.out.println("DEBUG: Platform found: " + plataform);
    System.out.println("DEBUG: Platform ID: " + plataform.getId());

    if (request.hasAcquaintanceInCompany() && (request.acquaintanceEmail().isEmpty() || request.acquaintanceName().isEmpty())) {
      throw new BadRequestException("Nome e e-mail do conhecido são obrigatórios");
    }

    QuestionBefore questionBefore = new QuestionBefore();
    questionBefore.setVacancy(vacancy);
    questionBefore.setCandidateProfile(candidate);
    questionBefore.setPlataform(plataform);
    questionBefore.setAcquaintanceEmail(request.acquaintanceEmail().orElse(null));
    questionBefore.setAcquaintanceName(request.acquaintanceName().orElse(null));
    questionBefore.setHasAcquaintanceInCompany(request.hasAcquaintanceInCompany());
    questionBefore.setYouWorkAtCompany(request.youWorkAtCompany());

    System.out.println("DEBUG: Before save - QuestionBefore plataform: " + questionBefore.getPlataform());
    System.out.println("DEBUG: Before save - QuestionBefore plataform ID: " + (questionBefore.getPlataform() != null ? questionBefore.getPlataform().getId() : "NULL"));
    
    this.questionBeforeRepository.save(questionBefore);
  }
}
