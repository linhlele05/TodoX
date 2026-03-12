package com.example.backend.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ErrorCode {

    TASK_NOT_FOUND(4041,"task not found"),
    TASK_EXISTED(4001,"task existed"),
    TITLE_INVALID(4002,"Title cannot be blank"),
    UNCATEGORIZED_EXCEPTION(999,"uncategorized exception");

    private final int code;
    private final String message;
    public int getCode() {
        return code;
    }
    public String getMessage() {
        return message;
    }

    

    

    
}
