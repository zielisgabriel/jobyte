package br.com.gabriel.jobyte_api.service;

import java.util.List;
import java.util.Map;

import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.dto.request.EnterpriseRegisterRequest;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class KeycloakRegistrationService {
  private final RealmResource realmResource;

  public void createCadidateUser() {
    // TODO implement method
  }

  public String createEnterpriseUser(EnterpriseRegisterRequest request) {
    try {
      UserRepresentation user = new UserRepresentation();
      user.setUsername(request.email());
      user.setEmail(request.email());
      user.setFirstName(request.companyName());
      user.setEnabled(true);
      user.setEmailVerified(true);
      user.setAttributes(Map.of(
        "cnpj", List.of(request.cnpj()),
        "address", List.of(request.address())
      ));
      user.setCredentials(List.of(createPasswordCredentials(request.password())));

      Response response = realmResource.users().create(user);

      if (response.getStatus() != 201) throw new RuntimeException("Failed to create user in Keycloak: " + response.getStatusInfo());
      
      String userId = CreatedResponseUtil.getCreatedId(response);
      log.info("Enterprise user created with ID: {}", userId);

      RoleRepresentation enterpriseRole = realmResource.roles()
        .get("ROLE_ENTERPRISE")
        .toRepresentation();

      UserResource userResource = realmResource.users().get(userId);
      userResource.roles().realmLevel().add(List.of(enterpriseRole));

      return userId;
    } catch (Exception e) {
      throw new RuntimeException("Failed to create enterprise user", e);
    }
  }

  private CredentialRepresentation createPasswordCredentials(String password) {
    CredentialRepresentation credential = new CredentialRepresentation();
    credential.setType(CredentialRepresentation.PASSWORD);
    credential.setValue(password);
    credential.setTemporary(false);
    return credential;
  }
}
