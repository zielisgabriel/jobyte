package br.com.gabriel.jobyte_api.service.others;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.gabriel.jobyte_api.entity.Platform;
import br.com.gabriel.jobyte_api.repository.PlatformRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlatformService {
  private final PlatformRepository platformRepository;

  public List<Platform> getAllPlatforms() {
    return (List<Platform>) this.platformRepository.findAll();
  }

  public void createPlatformIfNotExists(String name) {
    if (!this.platformRepository.existsByNameIgnoreCase(name)) {
      var platform = new br.com.gabriel.jobyte_api.entity.Platform();
      platform.setName(name);
      this.platformRepository.save(platform);
    }
  }
}
