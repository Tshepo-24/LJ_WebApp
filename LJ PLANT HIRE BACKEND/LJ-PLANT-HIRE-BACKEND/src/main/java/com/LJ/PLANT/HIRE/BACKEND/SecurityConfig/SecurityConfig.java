package com.LJ.PLANT.HIRE.BACKEND.SecurityConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.LJ.PLANT.HIRE.BACKEND.config.JwtAuthFilter;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired 
private JwtAuthFilter jwtAuthFilter;

    @Bean
public org.springframework.security.crypto.password.PasswordEncoder passwordEncoder() {
    return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
}



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
               .authorizeHttpRequests(auth -> auth
    .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
    .requestMatchers("/api/equipment/**").permitAll()
    .requestMatchers("/api/ping").permitAll()
    .requestMatchers("/api/bookings/**").permitAll()
    .requestMatchers("/api/auth/login").permitAll()
    .anyRequest().authenticated()
)
                        .addFilterBefore(jwtAuthFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(System.getenv().getOrDefault("CORS_ORIGINS", "http://localhost:5173").split(",")));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}