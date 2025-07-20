package com.url.url_shortener.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class RegistrationDto {
public String username;
public  String password;
public String email;
public Set<String> roles;
}
