package br.com.gabriel.jobyte_api.controller.enterprise;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.entity.EnterpriseProfile;
import br.com.gabriel.jobyte_api.service.enterprise.EnterpriseProfileService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/enterprise/profile")
public class EnterpriseProfileController {
  private final EnterpriseProfileService enterpriseProfileService;

  @GetMapping("/me")
  public EnterpriseProfile getProfile(JwtAuthenticationToken authentication) {
    String keycloakId = authentication.getName();
    return this.enterpriseProfileService.getProfile(keycloakId);
  }
}
