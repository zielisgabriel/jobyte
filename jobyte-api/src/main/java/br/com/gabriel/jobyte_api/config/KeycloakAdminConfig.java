package br.com.gabriel.jobyte_api.config;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakAdminConfig {
  @Value("${keycloak.auth-server-url}")
  private String authServerUrl;

  @Value("${keycloak.realm}")
  private String realm;

  @Value("${keycloak.admin-client.client-id}")
  private String clientId;

  @Value("${keycloak.admin-client.client-secret}")
  private String clientSecret;

  @Value("${keycloak.admin-client.grant-type}")
  private String grantType;

  @Bean
  public Keycloak keycloakAdminClient() {
    return KeycloakBuilder.builder()
      .serverUrl(authServerUrl)
      .realm(realm)
      .clientId(clientId)
      .clientSecret(clientSecret)
      .grantType(grantType)
      .build();
  }

  @Bean
  public RealmResource realmResource(Keycloak keycloak) {
    return keycloak.realm(realm);
  }
}
