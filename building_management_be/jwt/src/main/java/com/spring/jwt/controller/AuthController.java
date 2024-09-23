package com.spring.jwt.controller;

import com.spring.jwt.dto.ResReq;
import com.spring.jwt.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ResReq> signup(@RequestBody ResReq signUpRequest){
        return ResponseEntity.ok(authService.signUp(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<ResReq> signin(@RequestBody ResReq signIpRequest){
        return ResponseEntity.ok(authService.signIn(signIpRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ResReq> refreshToken(@RequestBody ResReq refreshTokenRequest){
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }

    @GetMapping("/user/alone")
    public ResponseEntity<Object> userAlone(){
        return ResponseEntity.ok("User alone can access this api only");
    }

    @GetMapping("/adminuser/both")
    public ResponseEntity<Object> bothAdminUserApi(){
        return ResponseEntity.ok("Both Admin and User can access this api");
    }
}
