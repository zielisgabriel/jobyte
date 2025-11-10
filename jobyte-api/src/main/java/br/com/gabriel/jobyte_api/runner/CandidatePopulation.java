package br.com.gabriel.jobyte_api.runner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import br.com.gabriel.jobyte_api.dto.request.CandidateRegisterRequest;
import br.com.gabriel.jobyte_api.repository.CandidateRepository;
import br.com.gabriel.jobyte_api.service.KeycloakRegistrationService;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

@Profile("dev")
@Component
@RequiredArgsConstructor
@Order(5)
@Slf4j
public class CandidatePopulation implements CommandLineRunner {
  private final CandidateRepository candidateRepository;
  private final KeycloakRegistrationService keycloakRegistrationService;

  private static final String[] FIRST_NAMES = new String[] {
    "Ana", "Bruno", "Carla", "Diego", "Eduarda", "Felipe", "Gabriela", "Heitor", "Isabela", "João",
    "Karen", "Lucas", "Mariana", "Nicolas", "Olívia", "Paulo", "Queila", "Rafael", "Sofia", "Thiago",
    "Úrsula", "Victor", "Wesley", "Xavier", "Yasmin", "Zeca"
  };

  private static final String[] LAST_NAMES = new String[] {
    "Silva", "Souza", "Oliveira", "Pereira", "Santos", "Rodrigues", "Almeida", "Gomes", "Araujo", "Costa",
    "Carvalho", "Barbosa", "Correia", "Teixeira", "Ferreira", "Rocha", "Moura", "Mendes", "Ribeiro", "Vieira"
  };

  private String digitString(int length, long seed) {
    StringBuilder sb = new StringBuilder(length);
    long x = seed;
    for (int i = 0; i < length; i++) {
      x = (x * 1103515245 + 12345) & 0x7fffffff;
      sb.append((int)(x % 10));
    }
    return sb.toString();
  }

  private String randomCpf(int idx) {
    // 11 dígitos numéricos (sem validação de dígitos verificadores para simplificar)
    return digitString(11, idx * 137 + 73);
  }

  private String randomPhone(int idx) {
    // 11 dígitos (ex: 1198XXXXXXX)
    String base = "11" + (90 + (idx % 10));
    return (base + digitString(7, idx * 31 + 17)).substring(0, 11);
  }

  @Override
  public void run(String... args) throws Exception {
    long currentCount = candidateRepository.count();
    int target = 120;
    
    if (currentCount >= target) {
      log.info("[Population] Candidatos já populados ({} existentes). Pulando população.", currentCount);
      return;
    }

    int created = 0;
    log.info("[Population] Iniciando população de {} candidatos (atuais: {})", target, currentCount);

    for (int i = 1; i <= target; i++) {
      String first = FIRST_NAMES[i % FIRST_NAMES.length];
      String last = LAST_NAMES[i % LAST_NAMES.length];
      String fullName = first + " " + last + " "+ i;
      String email = (first + "." + last + i + "@example.com").toLowerCase().replace(" ", "");
      String password = "Passw0rd!"; // senha padrão para dev
      String phone = randomPhone(i);
      String address = "Rua " + last + ", " + (100 + i);
      String cpf = randomCpf(i);

      CandidateRegisterRequest req = new CandidateRegisterRequest(
        fullName,
        email,
        password,
        phone,
        address,
        cpf
      );

      try {
        String userId = keycloakRegistrationService.createCandidateUser(req);
        created++;
        if (created % 20 == 0) {
          log.info("[Population] Criados {} candidatos... (último userId={})", created, userId);
        }
      } catch (Exception e) {
        // Provavelmente usuário já existe no Keycloak; apenas loga e continua
        log.warn("[Population] Falha ao criar candidato {} (email={}): {}", i, email, e.getMessage());
      }
    }

    long total = candidateRepository.count();
    log.info("[Population] População finalizada. Criados ~{} (total na base={})", created, total);
  }
}
