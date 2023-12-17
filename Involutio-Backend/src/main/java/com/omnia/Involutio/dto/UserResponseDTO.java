package com.omnia.Involutio.dto;

import com.omnia.Involutio.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDTO {
    Long id;
    String fio;
    String login;
    String role;

    public UserResponseDTO(UserEntity user) {
        this.id = user.getId();
        this.fio = user.getFio();
        this.login = user.getLogin();
        this.role = user.getRole().name();
    }
}
