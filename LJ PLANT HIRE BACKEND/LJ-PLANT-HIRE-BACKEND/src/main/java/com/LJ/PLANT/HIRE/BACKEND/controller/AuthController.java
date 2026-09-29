package com.LJ.PLANT.HIRE.BACKEND.controller;

import com.LJ.PLANT.HIRE.BACKEND.dto.LoginRequestDto;
import com.LJ.PLANT.HIRE.BACKEND.model.AdminUser;
import com.LJ.PLANT.HIRE.BACKEND.repository.AdminUserRepository;
import com.LJ.PLANT.HIRE.BACKEND.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto request) {
        AdminUser admin = adminUserRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (admin == null || !passwordEncoder.matches(request.getPassword(), admin.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password"));
        }

        String token = jwtUtil.generateToken(admin.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }
}