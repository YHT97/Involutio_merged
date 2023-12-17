package com.omnia.Involutio.controllers;

import com.omnia.Involutio.dto.SignInRequestDTO;
import com.omnia.Involutio.dto.UserResponseDTO;
import com.omnia.Involutio.entity.UserEntity;
import com.omnia.Involutio.repository.UserRepository;
import com.omnia.Involutio.service.JWTService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/authentication")
@Slf4j
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository, JWTService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<UserResponseDTO> authenticationToken(Authentication authentication) {
        UserEntity user = (UserEntity) authentication.getPrincipal();
        return ResponseEntity.ok(new UserResponseDTO(user));
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> authentication(HttpServletResponse response, @RequestBody SignInRequestDTO signIn) {
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    signIn.getLogin(),
                    signIn.getPassword()
            ));
            UserEntity user = (UserEntity) auth.getPrincipal();
            Cookie accessCookie = jwtService.createAccessTokenCookie(user);
            response.addCookie(accessCookie);
            log.info(String.format("User with login %s is authenticated", signIn.login));
            return ResponseEntity.ok(new UserResponseDTO(user));
        } catch (UsernameNotFoundException ex) {
            log.error(String.format("User with login %s not found", signIn.login));
            return ResponseEntity.status(404).build();
        } catch (BadCredentialsException ex) {
            log.error(String.format("Bad credentials for user with login %s", signIn.login));
            return ResponseEntity.status(403).build();
        }

    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        Cookie cookie = new Cookie("access_token", "");
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }
}
