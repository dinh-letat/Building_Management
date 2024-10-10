package com.microservice.identity_service.controller;

import com.microservice.identity_service.dto.request.UserCreationRequest;
import com.microservice.identity_service.model.User;
import com.microservice.identity_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserCreationRequest request){
        User user = userService.createUser(request);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getUser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/{user_id}")
    public ResponseEntity<User> updateUser(@PathVariable("user_id") String user_id, User updateUser){
        User user = userService.updateUser(user_id, updateUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/{user_id}")
    public ResponseEntity<String> deleteUser(@PathVariable("user_id") String user_id){
        userService.deleteUser(user_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
