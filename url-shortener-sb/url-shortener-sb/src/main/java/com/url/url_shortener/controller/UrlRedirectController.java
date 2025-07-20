package com.url.url_shortener.controller;

import com.url.url_shortener.models.UrlMapping;
import com.url.url_shortener.repository.UrlMappingRepository;
import com.url.url_shortener.service.UrlMappingService;
import com.url.url_shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UrlRedirectController {


public UserService userService;


    @GetMapping("/{shortUrl}")
    public ResponseEntity<?>  redirectUrl(@PathVariable String shortUrl){
        UrlMapping urlMapping1=userService.getOgUrl(shortUrl);
         if(urlMapping1!= null ){
             HttpHeaders httpHeaders=new HttpHeaders();
             httpHeaders.add("Location",urlMapping1.getOgUrl());
             return ResponseEntity.status(302).headers(httpHeaders).build();



         }
         return ResponseEntity.notFound().build();
    }
}

