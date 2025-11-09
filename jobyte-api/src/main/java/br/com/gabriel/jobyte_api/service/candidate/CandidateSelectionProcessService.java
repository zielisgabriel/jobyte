package br.com.gabriel.jobyte_api.service.candidate;

import java.util.UUID;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.entity.CandidateProfile;
import br.com.gabriel.jobyte_api.entity.SelectionProcess;
import br.com.gabriel.jobyte_api.entity.Vacancy;
import br.com.gabriel.jobyte_api.repository.SelectionProcessRepository;
import br.com.gabriel.jobyte_api.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateSelectionProcessService {
  private final CandidateProfileService candidateProfileService;
  private final SelectionProcessRepository selectionProcessRepository;
  private final VacancyRepository vacancyRepository;

  public void applyToSelectionProcess(UUID vacancyId, String keycloakId) {
    Vacancy vacancy = this.vacancyRepository.findById(vacancyId)
      .orElseThrow(() -> new RuntimeException("Vacancy not found"));
    CandidateProfile candidateProfile = this.candidateProfileService.getProfile(keycloakId);
    SelectionProcess selectionProcess = new SelectionProcess();
    selectionProcess.setCandidate(candidateProfile);
    selectionProcess.setVacancy(vacancy);
    this.selectionProcessRepository.save(selectionProcess);
  }
}
