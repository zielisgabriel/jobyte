package br.com.gabriel.jobyte_api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.gabriel.jobyte_api.entity.Platform;

public interface PlatformRepository extends JpaRepository<Platform, UUID> {
  boolean existsByNameIgnoreCase(String name);
}
