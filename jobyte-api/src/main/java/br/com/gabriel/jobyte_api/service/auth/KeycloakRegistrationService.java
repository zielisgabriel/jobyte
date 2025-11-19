package br.com.gabriel.jobyte_api.service.auth;

import java.util.List;

import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.dto.request.CandidateRegisterRequest;
import br.com.gabriel.jobyte_api.dto.request.EnterpriseRegisterRequest;
import br.com.gabriel.jobyte_api.entity.CandidateProfile;
import br.com.gabriel.jobyte_api.entity.EnterpriseProfile;
import br.com.gabriel.jobyte_api.repository.CandidateRepository;
import br.com.gabriel.jobyte_api.repository.EnterpriseRepository;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class KeycloakRegistrationService {
  private final RealmResource realmResource;
  private final EnterpriseRepository enterpriseRepository;
  private final CandidateRepository candidateRepository;

  public String createEnterpriseUser(EnterpriseRegisterRequest request) {
    try {
      List<UserRepresentation> existingUsers = realmResource.users()
          .search(request.email(), true);

      if (!existingUsers.isEmpty()) {
        throw new BadRequestException("Usuário já existe no Keycloak com o e-mail: " + request.email());
      }

      UserRepresentation user = new UserRepresentation();
      user.setUsername(request.email());
      user.setEmail(request.email());
      user.setFirstName(request.companyName());
      user.setEnabled(true);
      user.setEmailVerified(true);
      user.setCredentials(List.of(createPasswordCredentials(request.password())));

      Response response = realmResource.users().create(user);

      if (response.getStatus() != 201) throw new BadRequestException("Failed to create user in Keycloak: " + response.getStatusInfo());
      
      String userId = CreatedResponseUtil.getCreatedId(response);

      RoleRepresentation enterpriseRole = realmResource.roles()
        .get("ROLE_ENTERPRISE")
        .toRepresentation();

      UserResource userResource = realmResource.users().get(userId);
      userResource.roles().realmLevel().add(List.of(enterpriseRole));

      EnterpriseProfile enterpriseProfile = new EnterpriseProfile();
      enterpriseProfile.setCompanyName(request.companyName());
      enterpriseProfile.setCnpj(request.cnpj());
      enterpriseProfile.setPhone(request.phone());
      enterpriseProfile.setAddress(request.address());
      enterpriseProfile.setKeycloakUserId(userId);

      this.enterpriseRepository.save(enterpriseProfile);

      return userId;
    } catch (Exception e) {
      throw new BadRequestException("Failed to create enterprise user", e);
    }
  }

  public String createCandidateUser(CandidateRegisterRequest request) {
    try {
      List<UserRepresentation> existingUsers = realmResource.users()
          .search(request.email(), true);

      if (!existingUsers.isEmpty()) {
        throw new BadRequestException("Usuário já existe no Keycloak com o e-mail: " + request.email());
      }

      UserRepresentation user = new UserRepresentation();
      user.setUsername(request.email());
      user.setEmail(request.email());
      user.setFirstName(request.fullName());
      user.setEnabled(true);
      user.setEmailVerified(true);
      user.setCredentials(List.of(createPasswordCredentials(request.password())));

      Response response = realmResource.users().create(user);

      if (response.getStatus() != 201) {
        throw new BadRequestException("Falha ao criar usuário no Keycloak: " + response.getStatusInfo());
      }

      String userId = CreatedResponseUtil.getCreatedId(response);

      RoleRepresentation candidateRole = realmResource.roles()
          .get("ROLE_CANDIDATE")
          .toRepresentation();

      UserResource userResource = realmResource.users().get(userId);
      userResource.roles().realmLevel().add(List.of(candidateRole));

      CandidateProfile candidateProfile = new CandidateProfile();
      candidateProfile.setFullName(request.fullName());
      candidateProfile.setCpf(request.cpf());
      candidateProfile.setPhone(request.phone());
      candidateProfile.setAddress(request.address());
      candidateProfile.setKeycloakUserId(userId);

      candidateRepository.save(candidateProfile);

      return userId;
    } catch (Exception e) {
      throw new BadRequestException("Failed to create candidate user", e);
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
