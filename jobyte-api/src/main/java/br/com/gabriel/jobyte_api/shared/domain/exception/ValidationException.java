package br.com.gabriel.jobyte_api.shared.domain.exception;

import jakarta.ws.rs.BadRequestException;

public class ValidationException extends BadRequestException {
  public ValidationException(String message) {
    super(message);
  }
}
