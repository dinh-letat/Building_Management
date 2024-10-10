package com.microservice.identity_service.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationRequest {

    @Size(min = 3, message = "Username must be at least 3 characters")
    private String username;

    @Size(min = 8, max = 16, message = "Password must be at least 8 characters")
    private String password;

    private String firstname;

    private String lastname;

    private LocalDate dob;
}
