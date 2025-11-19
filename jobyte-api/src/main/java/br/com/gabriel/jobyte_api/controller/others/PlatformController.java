package br.com.gabriel.jobyte_api.controller.others;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gabriel.jobyte_api.entity.Platform;
import br.com.gabriel.jobyte_api.service.others.PlatformService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/platform")
public class PlatformController {
  private final PlatformService platformService;

  @GetMapping("/all")
  public List<Platform> getAllPlatforms() {
    return this.platformService.getAllPlatforms();
  }
}
