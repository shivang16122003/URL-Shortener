package com.url.url_shortener.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data

public class UrlMappingDto{
   public long id;
   public String ogUrl;
   public String babyUrl;
   public String username;
   public int clickCount;
   public LocalDateTime birthday;




}
