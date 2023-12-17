package com.omnia.Involutio.dto;

import lombok.Data;

@Data
public class SignInRequestDTO {
    public String login;
    public String password;

    public SignInRequestDTO() {
    }

    public SignInRequestDTO(String login, String password) {
        this.login = login;
        this.password = password;
    }
}
