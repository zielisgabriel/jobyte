package br.com.gabriel.jobyte_api.enterprise.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExistEnterpriseProfileUseCase {
  private final EnterpriseRepositoryPort repository;

  public boolean execute(String keycloakUserId) {
    return this.repository.existsByKeycloakUserId(keycloakUserId);
  }
}
