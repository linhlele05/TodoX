package com.example.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.backend.dto.response.APIResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<APIResponse<Object>> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        APIResponse<Object> apiResponse = new APIResponse<>();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    };

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<APIResponse<Object>> handlingMethodArgumentNotValidException(
            MethodArgumentNotValidException exception) {
        ErrorCode errorCode = ErrorCode.UNCATEGORIZED_EXCEPTION;
        var fieldError = exception.getFieldError();
        if (fieldError != null) {
            String enumKey = fieldError.getDefaultMessage();
            try {
                if (enumKey != null) {
                    errorCode = ErrorCode.valueOf(enumKey);
                }
            } catch (IllegalArgumentException e) {
            }
        }
        APIResponse<Object> apiResponse = new APIResponse<>();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    };

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<APIResponse<Object>> handlingException(Exception exception) {
        APIResponse<Object> apiResponse = new APIResponse<>();
        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }
}
