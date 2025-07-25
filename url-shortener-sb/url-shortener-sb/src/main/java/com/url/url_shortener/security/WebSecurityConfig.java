package com.url.url_shortener.security;

import com.url.url_shortener.security.JWT.JwtAuthenticationFilter;
import com.url.url_shortener.service.UserDetailsImpl;
import com.url.url_shortener.service.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class WebSecurityConfig {
    private UserDetailsServiceImpl userDetailsService;
 public JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
        }


    @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

   @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
       DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
       return authenticationProvider;}

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
           http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(auth->
                   auth.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                           .requestMatchers(("/api/auth/**")).permitAll()
                           .requestMatchers("/api/url/**").authenticated()
                           .requestMatchers("/{shortUrl}").permitAll()
                           .anyRequest().authenticated());
          // if using daoauthenticationprovider then http.suthenticationprovider(daoauthenticationprovider);
           http.userDetailsService(userDetailsService);

           http.addFilterBefore(jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class);
           return http.build();
        }



}
