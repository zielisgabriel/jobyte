package br.com.gabriel.jobyte_api.runner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import br.com.gabriel.jobyte_api.dto.request.EnterpriseRegisterRequest;
import br.com.gabriel.jobyte_api.repository.EnterpriseRepository;
import br.com.gabriel.jobyte_api.service.KeycloakRegistrationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Profile("dev")
@Component
@RequiredArgsConstructor
@Order(10)
@Slf4j
public class EnterprisePopulation implements CommandLineRunner {

  private final KeycloakRegistrationService keycloakRegistrationService;
  private final EnterpriseRepository enterpriseRepository;

  private static final String[] COMPANY_PREFIX = {"Tech", "Global", "Prime", "Next", "Nova", "Alpha", "Omni", "Data", "Cloud", "Bright"};
  private static final String[] COMPANY_SUFFIX = {"Soft", "Works", "Solutions", "Systems", "Lab", "Dynamics", "Logic", "Digital", "Group", "Corp"};

  @Override
  public void run(String... args) throws Exception {
    long currentCount = enterpriseRepository.count();
    int enterpriseTarget = 15;
    
    if (currentCount >= enterpriseTarget) {
      log.info("[Population-Enterprise] Empresas já populadas ({} existentes). Pulando população.", currentCount);
      return;
    }

    log.info("[Population-Enterprise] Iniciando criação de {} empresas (atuais: {})", enterpriseTarget, currentCount);

    for (int i = 1; i <= enterpriseTarget; i++) {
      String companyName = COMPANY_PREFIX[i % COMPANY_PREFIX.length] + " " + COMPANY_SUFFIX[i % COMPANY_SUFFIX.length] + " " + i;
      String email = ("contato." + i + "@" + companyName.replace(" ", "").toLowerCase() + ".corp").replace("..", ".");
      String cnpj = randomDigits(14, i * 97 + 11);
      String address = "Avenida " + COMPANY_SUFFIX[i % COMPANY_SUFFIX.length] + ", " + (500 + i);
      String phone = "11" + randomDigits(9, i * 53 + 7);

      EnterpriseRegisterRequest req = new EnterpriseRegisterRequest(
        companyName,
        cnpj,
        address,
        email,
        "StrongPass!1",
        phone
      );

      try {
        keycloakRegistrationService.createEnterpriseUser(req);
      } catch (Exception e) {
        log.warn("[Population-Enterprise] Falha ao criar empresa {} (email={}): {}", i, email, e.getMessage());
      }
    }

    log.info("[Population-Enterprise] Finalizado. Empresas agora: {}", enterpriseRepository.count());
  }

  private String randomDigits(int len, long seed) {
    StringBuilder sb = new StringBuilder(len);
    long x = seed;
    for (int i = 0; i < len; i++) {
      x = (x * 1664525 + 1013904223L) & 0xffffffffL;
      sb.append((int)(x % 10));
    }
    return sb.toString();
  }
}
