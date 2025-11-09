package br.com.gabriel.jobyte_api.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import br.com.gabriel.jobyte_api.entity.SelectionProcess;

public interface SelectionProcessRepository extends CrudRepository<SelectionProcess, UUID> {
  
}
