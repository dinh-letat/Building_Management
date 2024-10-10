package com.microservice.identity_service.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public enum ErrorCode {
    USER_EXISTED(
            1001, "User existed"
    );
    private int code;

    private String message;

}
