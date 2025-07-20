package com.url.url_shortener.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="clickEvents")
public class ClickEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDateTime clickDateTime;

    @ManyToOne
    @JoinColumn(name = "urlMapping_Id")
    private UrlMapping urlMapping;


}
