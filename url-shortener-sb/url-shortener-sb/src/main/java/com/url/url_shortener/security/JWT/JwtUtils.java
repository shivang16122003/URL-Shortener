package com.url.url_shortener.security.JWT;

import com.url.url_shortener.service.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
       @Value("${jwt.secret}")
    private String jwtSecret;
       @Value("${jwt.expiration}")
    private int jwtExpiration;


       //getting the jwt from the header
    public String getJwtFromHeader(HttpServletRequest httpServletRequest){
        String bearerToken=httpServletRequest.getHeader("Authorization");
        if(bearerToken!=null && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }
     public String generateJwtToken(UserDetailsImpl userDetailimp){
        String username=userDetailimp.getUsername();

                 List<String> roles=userDetailimp.getAuthorities().stream().map(auth->auth.getAuthority()).collect(Collectors.toList());
                 return Jwts.builder()
                         .subject(username)
                         .claim("roles",roles)
                         .issuedAt(new Date())
                         .expiration(new Date(new Date().getTime()+jwtExpiration))
                         .signWith(key())
                         .compact();}
    public String getUserFromJwtToken(String token){
        return Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String token){

        try {
            Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(token);
                    return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
    public Key key(){
        return  Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }


     }

