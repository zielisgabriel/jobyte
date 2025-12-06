package br.com.gabriel.jobyte_api.candidate.infrastructure.web.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.candidate.application.dtos.request.UpdateProfileRequest;
import br.com.gabriel.jobyte_api.candidate.application.dtos.response.ProfileDetailsResponse;
import br.com.gabriel.jobyte_api.candidate.application.dtos.response.ProfileSimpleResponse;
import br.com.gabriel.jobyte_api.candidate.application.usecases.GetCandidateProfileUseCase;
import br.com.gabriel.jobyte_api.candidate.application.usecases.UpdateCandidateProfileUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/candidate/profile")
@PreAuthorize("hasRole('CANDIDATE')")
@RequiredArgsConstructor
public class CandidateProfileController {
  private final GetCandidateProfileUseCase getCandidateProfileUseCase;
  private final UpdateCandidateProfileUseCase updateCandidateProfileUseCase;

  @GetMapping("/simple")
  public ResponseEntity<ProfileSimpleResponse> getSimpleProfile(JwtAuthenticationToken token) {
    String keycloakId = token.getName();
    ProfileSimpleResponse response = this.getCandidateProfileUseCase.getSimpleProfile(keycloakId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/details")
  public ResponseEntity<ProfileDetailsResponse> getDetailsProfile(JwtAuthenticationToken token) {
    String keycloakId = token.getName();
    ProfileDetailsResponse response = this.getCandidateProfileUseCase.getDetailsProfile(keycloakId);
    return ResponseEntity.ok(response);
  }

  @PutMapping
  public ResponseEntity<ProfileDetailsResponse> updateProfile(
      JwtAuthenticationToken token,
      @Valid
      @RequestBody
      UpdateProfileRequest request
    ) {
    String keycloakId = token.getName();
    ProfileDetailsResponse response = this.updateCandidateProfileUseCase.execute(keycloakId, request);
    return ResponseEntity.ok(response);
  }
}
