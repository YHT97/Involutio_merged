package com.omnia.Involutio.ecxeptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalHandlerException {
    @ExceptionHandler
    public ResponseEntity<?> notFoundException(NotFoundException ex) {
        log.warn(ex.getMessage());
        return ResponseEntity.status(404).body(ex.getMessage());
    }
}
