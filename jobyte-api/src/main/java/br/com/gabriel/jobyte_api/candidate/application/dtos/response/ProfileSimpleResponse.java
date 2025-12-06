package br.com.gabriel.jobyte_api.candidate.application.dtos.response;

import br.com.gabriel.jobyte_api.candidate.domain.entities.CandidateProfile;

public record ProfileSimpleResponse(
  String fullName
) {
  public static ProfileSimpleResponse fromDomain(CandidateProfile profile) {
    return new ProfileSimpleResponse(profile.getFullName());
  }
}
