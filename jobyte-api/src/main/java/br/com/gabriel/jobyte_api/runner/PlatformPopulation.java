package br.com.gabriel.jobyte_api.runner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import br.com.gabriel.jobyte_api.service.others.PlatformService;
import lombok.RequiredArgsConstructor;

@Order(1)
@Component
@RequiredArgsConstructor
public class PlatformPopulation implements CommandLineRunner  {
  private final PlatformService platformService;
  private final String[] platforms = {
      "Indeed",
      "LinkedIn",
      "Glassdoor",
      "Monster",
      "CareerBuilder",
      "SimplyHired",
      "ZipRecruiter",
      "AngelList",
      "Stack Overflow Jobs",
      "GitHub Jobs",
      "Google for Jobs",
      "Other"
    };

  @Override
  public void run(String... args) throws Exception {
    for (String platformName : platforms) {
      this.platformService.createPlatformIfNotExists(platformName);
    }
  }
}
