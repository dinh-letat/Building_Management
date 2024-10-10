package com.microservice.identity_service.controller;

import com.microservice.identity_service.dto.ApiResponse;
import com.microservice.identity_service.dto.request.UserCreationRequest;
import com.microservice.identity_service.model.User;
import com.microservice.identity_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;


}
