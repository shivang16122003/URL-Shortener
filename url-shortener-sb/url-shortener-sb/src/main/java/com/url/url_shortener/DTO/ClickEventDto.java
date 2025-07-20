package com.url.url_shortener.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ClickEventDto {

    public LocalDate clickTimeAndDate;
    public Long noOfCount;


}
