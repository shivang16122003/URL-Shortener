package com.url.url_shortener.service;

import com.url.url_shortener.DTO.LoginRequestDto;
import com.url.url_shortener.DTO.RegistrationDto;
import com.url.url_shortener.models.UrlMapping;
import com.url.url_shortener.models.User;
import com.url.url_shortener.repository.UserRepository;
import com.url.url_shortener.security.JWT.JwtAuthenticationResponse;
import com.url.url_shortener.security.JWT.JwtUtils;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class UrlMappingService //listen the url mapping service class is users service class and the user service call is url service I am sorry

{

    @Autowired
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtils jwtUtils;
    private AuthenticationManager authenticationManager;

public void registerUser(RegistrationDto registrationDto)
{
    User user =new User();
    user.setUsername(registrationDto.getUsername());
    user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
    user.setEmail(registrationDto.getEmail());
    user.setRoles("ROLE_USER");
      userRepository.save(user);
}
    public JwtAuthenticationResponse loginRequest(LoginRequestDto dto) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(auth);

            UserDetailsImpl principal = (UserDetailsImpl) auth.getPrincipal();
            String token = jwtUtils.generateJwtToken(principal);

            return new JwtAuthenticationResponse(token);

        } catch (AuthenticationException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, ex.getMessage());
        }
    }

public User findUserByUsername(String username) {
    return userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("user with username"+username+" not found"));
}

}
