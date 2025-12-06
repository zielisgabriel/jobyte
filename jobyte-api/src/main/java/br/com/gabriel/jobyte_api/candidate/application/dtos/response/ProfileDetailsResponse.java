package br.com.gabriel.jobyte_api.candidate.application.dtos.response;

import java.util.UUID;

import br.com.gabriel.jobyte_api.candidate.domain.entities.CandidateProfile;

public record ProfileDetailsResponse(
  UUID id,
  String fullName,
  String cpf,
  String phone,
  String address,
  String bio
) {
  public static ProfileDetailsResponse fromDomain(CandidateProfile profile) {
    return new ProfileDetailsResponse(
      profile.getId(),
      profile.getFullName(),
      profile.getCpf(),
      profile.getPhone(),
      profile.getAddress(),
      profile.getBio()
    );
  }
}
