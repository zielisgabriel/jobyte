package br.com.gabriel.jobyte_api.shared.domain.exceptions;

import jakarta.ws.rs.BadRequestException;

public class BusinessException extends BadRequestException {
  public BusinessException(String message) {
    super(message);
  }
}
