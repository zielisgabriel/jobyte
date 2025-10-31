package br.com.gabriel.jobyte_api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/enterprise")
public class TestController {
  @GetMapping("/resource")
  public String hello() {
    return "resource";
  }
}
