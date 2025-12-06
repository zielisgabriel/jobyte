package br.com.gabriel.jobyte_api.shared.domain.exceptions;

import jakarta.ws.rs.NotFoundException;

public class EntityNotFoundException extends NotFoundException {
  public EntityNotFoundException(String message) {
    super(message);
  }

  public EntityNotFoundException(String entity, Object id) {
    super(String.format("%s não encontrado(a) com id: %s", entity, id));
  }
}
