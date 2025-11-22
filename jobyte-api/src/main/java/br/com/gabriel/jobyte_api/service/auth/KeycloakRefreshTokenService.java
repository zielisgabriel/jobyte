package br.com.gabriel.jobyte_api.service.auth;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class KeycloakRefreshTokenService {
  @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
  private String keycloakIssuerUri;

  @Value("${keycloak.admin-client.client-id}")
  private String keycloakAdminClientId;

  @Value("${keycloak.admin-client.client-secret}")
  private String keycloakAdminClientSecret;

  public void refreshToken(
    HttpServletRequest request,
    HttpServletResponse response
  ) {
    RestTemplate restTemplate = new RestTemplate();
    String refreshToken = getRefreshTokenFromCookies(request);

    if (refreshToken == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token not found in cookies");
    }

    MultiValueMap<String, String> formData = new LinkedMultiValueMap<String, String>();
    formData.add("grant_type", "refresh_token");
    formData.add("client_id", this.keycloakAdminClientId);
    formData.add("client_secret", this.keycloakAdminClientSecret);
    formData.add("refresh_token", refreshToken);

    HttpHeaders headers = new HttpHeaders();
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    HttpEntity<MultiValueMap<String, String>> requestKeycloak = new HttpEntity<>(formData, headers);

    ResponseEntity<Map<String, Object>> responseKeycloak = restTemplate.exchange(
      this.keycloakIssuerUri + "/protocol/openid-connect/token",
      HttpMethod.POST,
      requestKeycloak,
      new ParameterizedTypeReference<Map<String, Object>>() {}
    );

    Cookie accessTokenCookie = new Cookie(
      "access_token",
      (String) responseKeycloak.getBody().get("access_token")
    );
    accessTokenCookie.setHttpOnly(true);
    accessTokenCookie.setSecure(false);
    accessTokenCookie.setPath("/");
    accessTokenCookie.setMaxAge((Integer) responseKeycloak.getBody().get("expires_in"));
    response.addCookie(accessTokenCookie);
    
    Cookie refreshTokenCookie = new Cookie(
      "refresh_token",
      (String) responseKeycloak.getBody().get("refresh_token")
    );
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setSecure(false);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setMaxAge(((Number) responseKeycloak.getBody().get("refresh_expires_in")).intValue());
    response.addCookie(refreshTokenCookie);
  }

  private String getRefreshTokenFromCookies(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies == null) {
      return null;
    }
    for (Cookie cookie : cookies) {
      if ("refresh_token".equals(cookie.getName())) {
        return cookie.getValue();
      }
    }
    return null;
  }
}
