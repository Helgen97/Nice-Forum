package com.diploma.forum.security.configuration;

import com.diploma.forum.security.authEntryPoint.AuthEntryPoint;
import com.diploma.forum.security.filters.AuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableConfigurationProperties
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFilter authenticationFilter;
    private final AuthEntryPoint exceptionHandler;

    @Autowired
    public SecurityConfiguration(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder, AuthenticationFilter authenticationFilter, AuthEntryPoint authEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationFilter = authenticationFilter;
        this.exceptionHandler = authEntryPoint;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests().antMatchers("/favicon.ico", "/robots.txt", "/sitemap.txt", "/apple-touch-icon-180x180-precomposed.png", "/apple-touch-icon-152x152-precomposed.png", "/apple-touch-icon-144x144-precomposed.png", "/apple-touch-icon-114x114-precomposed.png", "/apple-touch-icon-72x72-precomposed.png", "/apple-touch-icon-precomposed.png", "/favicon.png").permitAll()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.POST, "/login").permitAll()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
                .and()
                .authorizeRequests().antMatchers(HttpMethod.POST, "/users").permitAll()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.PUT, "/users").authenticated()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.DELETE, "/users").hasRole("ADMIN")
                .and()
                .authorizeRequests().antMatchers(HttpMethod.POST, "/sections").hasRole("ADMIN")
                .and()
                .authorizeRequests().antMatchers(HttpMethod.PUT, "/sections").hasRole("ADMIN")
                .and()
                .authorizeRequests().antMatchers(HttpMethod.DELETE, "/sections").hasRole("ADMIN")
                .and()
                .authorizeRequests().antMatchers(HttpMethod.GET, "/sections", "/topics", "/comments", "/tags", "/search").permitAll()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.POST, "/topics", "/comments").authenticated()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.PUT, "/topics", "/comments").authenticated()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.PUT, "/topics/{id}/like", "/topics/{id}/dislike", "/comments/{id}/like", "/comments/{id}/dislike").authenticated()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.DELETE, "/topics", "/comments").authenticated()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.POST, "/check/email", "/check/nickname").permitAll()
                .and()
                .authorizeRequests().antMatchers(HttpMethod.POST, "/change/password", "/change/avatar").authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(exceptionHandler)
                .and()
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder);
    }

    @Bean
    public AuthenticationManager getAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(false);
        configuration.applyPermitDefaultValues();

        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
