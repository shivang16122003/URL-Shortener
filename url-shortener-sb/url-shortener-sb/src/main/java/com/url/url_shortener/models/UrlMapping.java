package com.url.url_shortener.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name="urlMappings")
public class UrlMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String ogUrl;
    private String babyUrl;
    private LocalDateTime creationDateTime;
    private int noOFClicks;
    @ManyToOne
    @JoinColumn(name="user_Id")
    private User user;

    @OneToMany(mappedBy = "urlMapping",cascade = CascadeType.ALL,orphanRemoval = true)
   private List<ClickEvent> clickEventList;


}
