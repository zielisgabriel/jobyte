package br.com.gabriel.jobyte_api.shared.infrastructure.web;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoderInitializationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.gabriel.jobyte_api.shared.domain.exceptions.BusinessException;
import br.com.gabriel.jobyte_api.shared.domain.exceptions.EntityNotFoundException;
import br.com.gabriel.jobyte_api.shared.domain.exceptions.ValidationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleEntityNotFound(EntityNotFoundException ex) {
    ErrorResponse error = new ErrorResponse(
      HttpStatus.NOT_FOUND.value(),
      "Not Found",
      ex.getMessage(),
      LocalDateTime.now()
    );
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }

  @ExceptionHandler(BusinessException.class)
  public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException ex) {
    ErrorResponse error = new ErrorResponse(
      HttpStatus.BAD_REQUEST.value(),
      "Bad Request",
      ex.getMessage(),
      LocalDateTime.now()
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  @ExceptionHandler(ValidationException.class)
  public ResponseEntity<ErrorResponse> handleValidationException(ValidationException ex) {
    ErrorResponse error = new ErrorResponse(
      HttpStatus.UNPROCESSABLE_ENTITY.value(),
      "Validation Error",
      ex.getMessage(),
      LocalDateTime.now()
    );
    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(error);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
    String message = ex.getBindingResult().getFieldErrors().stream()
      .map(error -> error.getField() + ": " + error.getDefaultMessage())
      .reduce((a, b) -> a + "; " + b)
      .orElse("Erro de validação");

    ErrorResponse error = new ErrorResponse(
      HttpStatus.BAD_REQUEST.value(),
      "Validation Error",
      message,
      LocalDateTime.now()
    );
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  @ExceptionHandler(JwtDecoderInitializationException.class)
  public ResponseEntity<ErrorResponse> handleJwtDecoderInitializationException(JwtDecoderInitializationException ex) {
    ErrorResponse error = new ErrorResponse(
      HttpStatus.UNAUTHORIZED.value(),
      "Unauthorized",
      "Falha na validação do token JWT",
      LocalDateTime.now()
    );
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
  }

  // @ExceptionHandler(Exception.class)
  // public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
  //   ErrorResponse error = new ErrorResponse(
  //     HttpStatus.INTERNAL_SERVER_ERROR.value(),
  //     "Internal Server Error",
  //     "Ocorreu um erro interno no servidor",
  //     LocalDateTime.now()
  //   );
  //   return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
  // }

  public record ErrorResponse(
    int status,
    String error,
    String message,
    LocalDateTime timestamp
  ) {}
}
