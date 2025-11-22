package br.com.gabriel.jobyte_api.service.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class RefreshTokenService {
  @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
  private String KEYCLOAK_ISSUER_URI;

  @Value("${keycloak.admin-client.client-id}")
  private String KEYCLOAK_ADMIN_CLIENT_ID;

  @Value("${keycloak.admin-client.client-secret}")
  private String KEYCLOAK_ADMIN_CLIENT_SECRET;

  public void refreshToken(
    HttpServletRequest request,
    HttpServletResponse response
  ) throws JsonMappingException, JsonProcessingException {
    Cookie[] cookieStore = request.getCookies();
    String refreshToken = null;

    for (Cookie cookie : cookieStore) {
      if (cookie.getName().equals("refresh_token")) {
        refreshToken = cookie.getValue();
        break;
      }
    }

    if (refreshToken == null) {
      throw new ResponseStatusException(HttpStatusCode.valueOf(401), "Refresh token not found in cookies");
    }

    RestTemplate restTemplate = new RestTemplate();

    MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
    formData.add("grant_type", "refresh_token");
    formData.add("client_id", this.KEYCLOAK_ADMIN_CLIENT_ID);
    formData.add("client_secret", this.KEYCLOAK_ADMIN_CLIENT_SECRET);
    formData.add("refresh_token", refreshToken);

    HttpHeaders headers = new HttpHeaders();
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);

    ResponseEntity<String> refreshTokenResponse = restTemplate.exchange(
      this.KEYCLOAK_ISSUER_URI + "/protocol/openid-connect/token",
      HttpMethod.POST,
      requestEntity,
      String.class
    );

    ObjectMapper mapper = new ObjectMapper();
    JsonNode json = mapper.readTree(refreshTokenResponse.getBody());

    String newAccessToken = json.get("access_token").asText();
    int newAccessTokenExpiresIn = json.get("expires_in").asInt();
    String newRefreshToken = json.get("refresh_token").asText();
    int newRefreshTokenExpiresIn = json.get("refresh_expires_in").asInt();

    Cookie accessCookie = new Cookie("access_token", newAccessToken);
    accessCookie.setHttpOnly(true);
    accessCookie.setSecure(false);
    accessCookie.setPath("/");
    accessCookie.setMaxAge(newAccessTokenExpiresIn);

    Cookie refreshCookie = new Cookie("refresh_token", newRefreshToken);
    refreshCookie.setHttpOnly(true);
    refreshCookie.setSecure(false);
    refreshCookie.setPath("/");
    refreshCookie.setMaxAge(newRefreshTokenExpiresIn);

    response.addCookie(accessCookie);
    response.addCookie(refreshCookie);
  }
}
