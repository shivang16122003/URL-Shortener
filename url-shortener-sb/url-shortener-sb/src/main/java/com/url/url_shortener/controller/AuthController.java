package com.url.url_shortener.controller;

import com.url.url_shortener.DTO.LoginRequestDto;
import com.url.url_shortener.DTO.RegistrationDto;
import com.url.url_shortener.service.UrlMappingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    UrlMappingService urlMappingService;

    @PostMapping("/public/login")
    public ResponseEntity<?> loginRequest(@RequestBody LoginRequestDto loginRequestDto){

        return ResponseEntity.ok(urlMappingService.loginRequest(loginRequestDto));
    }

    @PostMapping("/public/register")
    public ResponseEntity<?> registrationRequest(@RequestBody RegistrationDto registrationDto){
        urlMappingService.registerUser(registrationDto);
        return ResponseEntity.ok("User registered successfully ");
    }



}
