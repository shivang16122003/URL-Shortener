package com.url.url_shortener.controller;


import com.url.url_shortener.DTO.ClickEventDto;
import com.url.url_shortener.DTO.UrlMappingDto;
import com.url.url_shortener.models.UrlMapping;
import com.url.url_shortener.models.User;
import com.url.url_shortener.service.UrlMappingService;
import com.url.url_shortener.service.UserDetailsServiceImpl;
import com.url.url_shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {


    //UrlMappingService urlMappingService;
    UserService userService;
    UserDetailsServiceImpl userDetailsService;
    UrlMappingService urlMappingService;
    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> shortenUrl(@RequestBody Map<String,String> request, Principal principal){
        String username=principal.getName();
        String ogUrl=request.get("originalUrl");
        User user=urlMappingService.findUserByUsername(username);
       UrlMappingDto urlMappingDto= userService.shorten(user,ogUrl);
       return ResponseEntity.ok(urlMappingDto);

    }

    @GetMapping("/myUrls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDto> >myUrls(Principal principal){
        User user=urlMappingService.findUserByUsername(principal.getName());
        return ResponseEntity.ok(userService.findTheUrls(user));
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDto>> getUrlAnalytics(@PathVariable String shortUrl,
                                                               @RequestParam("startDate") String startDate,
                                                               @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        List<ClickEventDto> clickEventDTOS = userService.countClicksOnDates(shortUrl, start, end);
        return ResponseEntity.ok(clickEventDTOS);
    }


    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(Principal principal,
                                                                     @RequestParam("startDate") String startDate,
                                                                     @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        User user = urlMappingService.findUserByUsername(principal.getName());
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);
        Map<LocalDate, Long> totalClicks = userService.getClicksByUserAndDate(user, start, end);
        return ResponseEntity.ok(totalClicks);
    }
}
