package com.omnia.Involutio.controllers;

import com.omnia.Involutio.dto.UserResponseDTO;
import com.omnia.Involutio.entity.UserEntity;
import com.omnia.Involutio.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    final private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    /*
    Получение данных пользователя через аутентификацию
     */
    @GetMapping("/")
    ResponseEntity<?> getUserWithAuthentication(Authentication authentication) {
        return ResponseEntity.ok(((UserEntity) authentication.getPrincipal()));
    }

    /*
    Получение данных пользователя через id
     */
    @GetMapping("/{userId}")
    ResponseEntity<?> getUserWithId(@PathVariable Long userId) {
        return ResponseEntity.ok(new UserResponseDTO(userService.getUserById(userId)));
    }
}
