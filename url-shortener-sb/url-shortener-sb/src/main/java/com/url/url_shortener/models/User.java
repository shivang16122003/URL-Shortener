package com.url.url_shortener.models;

import jakarta.persistence.*;
import lombok.Data;
import org.apache.tomcat.util.http.fileupload.util.LimitedInputStream;

import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String email;
    private String password;
    private String roles="ROLE_USER";


   @OneToMany(mappedBy = "user")
    private List<UrlMapping> urlMappings;


}
