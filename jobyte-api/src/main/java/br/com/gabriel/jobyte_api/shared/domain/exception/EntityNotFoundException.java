package br.com.gabriel.jobyte_api.shared.domain.exception;

import br.com.gabriel.jobyte_api.enterprise.domain.valueobjects.EnterpriseDetailsValueObject;
import jakarta.ws.rs.NotFoundException;

public class EntityNotFoundException extends NotFoundException {
  public EntityNotFoundException() {
    super("Perfil não encontrada para o usuário autenticado.");
  }

  public EntityNotFoundException(String message) {
    super(message);
  }

  public EntityNotFoundException(EnterpriseDetailsValueObject profile, Object id) {
    super(String.format("%s não encontrado(a) com id: %s", profile, id));
  }
}
