package com.rahul.shopsphere.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rahul.shopsphere.dto.AuthResponse;
import com.rahul.shopsphere.dto.LoginRequest;
import com.rahul.shopsphere.dto.RegisterRequest;
import com.rahul.shopsphere.entity.Role;
import com.rahul.shopsphere.entity.User;
import com.rahul.shopsphere.repository.UserRepository;
import com.rahul.shopsphere.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("Email already registered", null);
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CUSTOMER)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return new AuthResponse("User registered successfully", null);
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return new AuthResponse("Invalid email or password", null);
        }

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            return new AuthResponse("Invalid email or password", null);
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse("Login successful", token);
    }
}