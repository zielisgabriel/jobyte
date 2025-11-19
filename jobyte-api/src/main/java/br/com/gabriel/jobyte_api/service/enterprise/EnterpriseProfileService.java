package br.com.gabriel.jobyte_api.service.enterprise;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.entity.EnterpriseProfile;
import br.com.gabriel.jobyte_api.repository.EnterpriseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnterpriseProfileService {
  private final EnterpriseRepository enterpriseRepository;

  public EnterpriseProfile getProfile(String keycloakId) {
    EnterpriseProfile enterpriseProfile = this.enterpriseRepository.findByKeycloakUserId(keycloakId)
      .orElseGet(() -> {
        EnterpriseProfile defaultProfile = new EnterpriseProfile();
        defaultProfile.setCompanyName("Unknown");
        return defaultProfile;
      });

    return enterpriseProfile;
  }
}
