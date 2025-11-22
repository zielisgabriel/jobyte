package br.com.gabriel.jobyte_api.service.auth;

import java.util.Map;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import br.com.gabriel.jobyte_api.dto.request.EnterpriseLoginCredentialsRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class KeycloakLoginService {
  @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
  private String keycloakIssuerUri;

  @Value("${keycloak.admin-client.client-id}")
  private String keycloakAdminClientId;

  @Value("${keycloak.admin-client.client-secret}")
  private String keycloakAdminClientSecret;

  public void loginEnterprise(
    EnterpriseLoginCredentialsRequest credentials,
    HttpServletResponse response
  ) {
    RestTemplate restTemplate = new RestTemplate();
    
    MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
    formData.add("grant_type", "password");
    formData.add("username", credentials.email());
    formData.add("password", credentials.password());
    formData.add("client_id", this.keycloakAdminClientId);
    formData.add("client_secret", this.keycloakAdminClientSecret);
    
    HttpHeaders headers = new HttpHeaders();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    
    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(formData, headers);
    
    ResponseEntity<Map<String, Object>> responseKeycloak = restTemplate.exchange(
      this.keycloakIssuerUri + "/protocol/openid-connect/token",
      HttpMethod.POST,
      request,
      new ParameterizedTypeReference<Map<String, Object>>() {}
    );
    
    Cookie accessTokenCookie = new Cookie(
      "access_token",
      (String) responseKeycloak.getBody().get("access_token")
    );
    accessTokenCookie.setHttpOnly(true);
    accessTokenCookie.setPath("/");
    accessTokenCookie.setSecure(false);
    accessTokenCookie.setMaxAge(((Number) responseKeycloak.getBody().get("expires_in")).intValue());
    response.addCookie(accessTokenCookie);

    Cookie refreshTokenCookie = new Cookie(
      "refresh_token",
      (String) responseKeycloak.getBody().get("refresh_token")
    );
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setSecure(false);
    refreshTokenCookie.setMaxAge(((Number) responseKeycloak.getBody().get("refresh_expires_in")).intValue());
    response.addCookie(refreshTokenCookie);
  }
}
