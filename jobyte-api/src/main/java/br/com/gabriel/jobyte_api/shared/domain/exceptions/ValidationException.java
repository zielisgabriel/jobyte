package br.com.gabriel.jobyte_api.shared.domain.exceptions;

public class ValidationException extends RuntimeException {
  public ValidationException(String message) {
    super(message);
  }
}
