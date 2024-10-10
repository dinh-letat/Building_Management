package com.spring.jwt.service;

import com.spring.jwt.dto.ResReq;
import com.spring.jwt.model.OurUsers;
import com.spring.jwt.repository.OurUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthService {

    @Autowired
    private OurUserRepository ourUserRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public ResReq signUp(ResReq registrationRequest){
        ResReq response = new ResReq();

        try {
            OurUsers ourUsers = new OurUsers();
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setRole("USER");
            OurUsers ourUserResult = ourUserRepository.save(ourUsers);

            if (ourUserResult != null && ourUserResult.getId() > 0){
                response.setOurUsers(ourUserResult);
                response.setMessage("User Saved Successfully!");
                response.setStatusCode(200);
            }
        } catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }

        return response;
    }


    public ResReq signIn(ResReq signinRequest){
        ResReq response = new ResReq();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));
            var user = ourUserRepository.findByEmail(signinRequest.getEmail()).orElseThrow();
            System.out.println("User is: " + user);
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24 hour");
            response.setMessage("Successfully Signed In!");
        } catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }

        return response;
    }


    public ResReq refreshToken(ResReq refreshTokenRegist){
        ResReq response = new ResReq();
        String ourEmail = jwtUtils.extractUsername(refreshTokenRegist.getToken());
        OurUsers users = ourUserRepository.findByEmail(ourEmail).orElseThrow();

        if (jwtUtils.isTokenValid(refreshTokenRegist.getToken(), users)) {
            var jwt = jwtUtils.generateToken(users);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRegist.getToken());
            response.setExpirationTime("24 hour");
            response.setMessage("Successfully Refreshed Token!");
        }
        response.setStatusCode(500);
        return response;
    }
}
