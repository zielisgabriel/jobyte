package br.com.gabriel.jobyte_api.service.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.gabriel.jobyte_api.dto.request.EnterpriseLoginCredentialsRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class KeycloakLoginService {
  @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
  private String KEYCLOAK_ISSUER_URI;

  @Value("${keycloak.admin-client.client-id}")
  private String KEYCLOAK_ADMIN_CLIENT_ID;

  @Value("${keycloak.admin-client.client-secret}")
  private String KEYCLOAK_ADMIN_CLIENT_SECRET;

  public void loginEnterprise(
    EnterpriseLoginCredentialsRequest credentials,
    HttpServletResponse response
  ) throws JsonMappingException, JsonProcessingException {
    MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
    formData.add("grant_type", "password");
    formData.add("client_id", this.KEYCLOAK_ADMIN_CLIENT_ID);
    formData.add("client_secret", this.KEYCLOAK_ADMIN_CLIENT_SECRET);
    formData.add("username", credentials.email());
    formData.add("password", credentials.password());

    HttpHeaders headers = new HttpHeaders();
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(formData, headers);

    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<String> tokenResponse = restTemplate.postForEntity(
      this.KEYCLOAK_ISSUER_URI + "/protocol/openid-connect/token",
      request,
      String.class
    );
    
    ObjectMapper mapper = new ObjectMapper();
    JsonNode responeJson = mapper.readTree(tokenResponse.getBody());

    String accessToken = responeJson.get("access_token").asText();
    int accessTokenExpiresIn = responeJson.get("expires_in").asInt();
    String refreshToken = responeJson.get("refresh_token").asText();
    int refreshTokenExpiresIn = responeJson.get("refresh_expires_in").asInt();

    Cookie accessCookie = new Cookie("access_token", accessToken);
    accessCookie.setHttpOnly(true);
    accessCookie.setSecure(false);
    accessCookie.setPath("/");
    accessCookie.setMaxAge(accessTokenExpiresIn);

    Cookie refreshCookie = new Cookie("refresh_token", refreshToken);
    refreshCookie.setHttpOnly(true);
    refreshCookie.setSecure(false);
    refreshCookie.setPath("/");
    refreshCookie.setMaxAge(refreshTokenExpiresIn);

    response.addCookie(accessCookie);
    response.addCookie(refreshCookie);
  }
}
