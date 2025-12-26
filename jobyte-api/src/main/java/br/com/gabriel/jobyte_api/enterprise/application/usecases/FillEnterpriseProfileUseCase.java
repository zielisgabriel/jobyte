package br.com.gabriel.jobyte_api.enterprise.application.usecases;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.enterprise.application.dtos.request.FillEnterpriseProfileRequest;
import br.com.gabriel.jobyte_api.enterprise.domain.entities.EnterpriseProfile;
import br.com.gabriel.jobyte_api.enterprise.domain.ports.EnterpriseRepositoryPort;
import br.com.gabriel.jobyte_api.shared.domain.provider.IdGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FillEnterpriseProfileUseCase {
  private final EnterpriseRepositoryPort repository;
  private final IdGenerator idGenerator;

  public void execute(String keycloakUserId, FillEnterpriseProfileRequest request) {
    long profileId = this.idGenerator.nextId();

    EnterpriseProfile profile = EnterpriseProfile.create(
      profileId,
      keycloakUserId,
      request.companyName(),
      request.cnpj(),
      request.address(),
      request.phone()
    );

    this.repository.save(profile);
  }
}
