package com.microservice.identity_service.service;

import com.microservice.identity_service.dto.request.UserCreationRequest;
import com.microservice.identity_service.exception.AppException;
import com.microservice.identity_service.exception.ErrorCode;
import com.microservice.identity_service.model.User;
import com.microservice.identity_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(UserCreationRequest request){
        User user = new User();

        if (userRepository.existsByUsername(request.getUsername())) throw new AppException(ErrorCode.USER_EXISTED);

        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setDob(request.getDob());

        return userRepository.save(user);
    }

    public User getUserById(String user_id){
        return userRepository.findById(user_id).orElseThrow(
                () -> new RuntimeException("User Not Found!")
        );
    }

    public User updateUser(String user_id, User updateUser){
        User user = userRepository.findById(user_id).orElseThrow(
                () -> new RuntimeException("User Not Found!")
        );

        user.setUsername(updateUser.getUsername());
        user.setPassword(updateUser.getPassword());
        user.setFirstname(updateUser.getFirstname());
        user.setLastname(updateUser.getLastname());
        user.setDob(updateUser.getDob());

        return userRepository.save(user);
    }

    public void deleteUser(String user_id){
        userRepository.deleteById(user_id);
    }
    public List<User> getUser(){
        return userRepository.findAll();
    }
}
