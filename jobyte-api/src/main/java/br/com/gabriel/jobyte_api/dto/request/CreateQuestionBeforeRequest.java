package br.com.gabriel.jobyte_api.dto.request;

import java.util.Optional;
import java.util.UUID;

public record CreateQuestionBeforeRequest(
  UUID candidateId,
  UUID plataformId,
  Boolean hasAcquaintanceInCompany,
  Optional<String> acquaintanceName,
  Optional<String> acquaintanceEmail,
  Boolean youWorkAtCompany
) {}
