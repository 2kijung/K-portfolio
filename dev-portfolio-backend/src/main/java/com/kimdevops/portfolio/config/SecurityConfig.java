package com.kimdevops.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 보안 필터 체인.
     * 이게 없으면 Spring Security 기본 보안이 켜져 모든 요청이 401로 차단된다.
     * (개발 단계) 모든 요청 허용 + CSRF 비활성 + H2 콘솔 허용.
     * JWT 강제 검증은 추후 JWT 필터로 추가 예정.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())                 // 위의 CORS 설정 사용
            .csrf(csrf -> csrf.disable())                    // REST API라 CSRF 불필요
            .headers(headers -> headers.frameOptions(frame -> frame.disable())) // H2 콘솔 iframe 허용
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()                    // 모든 요청 허용 (개발용)
            );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // allowCredentials(true)와 "*"는 setAllowedOrigins에 함께 못 쓴다.
        // → setAllowedOriginPatterns 를 쓰면 와일드카드 + 인증정보 허용이 가능하다. (개발 편의)
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
