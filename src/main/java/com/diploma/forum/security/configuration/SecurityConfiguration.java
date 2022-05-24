package com.diploma.forum.security.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableConfigurationProperties
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfiguration(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
                //.csrf().disable()
//                .authorizeRequests().antMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.POST, "/users").permitAll()
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.PUT, "/users").authenticated()
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.DELETE, "/users").hasRole("ADMIN")
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.POST, "/sections").hasRole("ADMIN")
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.PUT, "/sections").hasRole("ADMIN")
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.DELETE, "/sections").hasRole("ADMIN")
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.GET, "/sections", "/topics", "/comments", "/tags", "/search").permitAll()
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.POST, "/topics", "/comments").authenticated()
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.PUT, "/topics", "/comments").authenticated()
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.PUT, "/topics/{id}/like", "/topics/{id}/dislike", "/comments/{id}/like", "/comments/{id}/dislike").authenticated()
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.DELETE, "/topics", "/comments").authenticated()
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.POST, "/check/email", "/check/nickname").permitAll()
//                .and()
//                .authorizeRequests().antMatchers(HttpMethod.POST, "/change/password").authenticated()
                //.and().httpBasic()
                //.and().sessionManagement().disable();
        http.csrf().disable().authorizeRequests()
                .antMatchers("/api/users", "/api/topics", "/api/sections", "/api/comments", "/api/tags", "/check/email", "/check/nickname", "/change/password", "/check/user").permitAll()
                .and()
                .formLogin()
                .loginProcessingUrl("/perform_login")
                .defaultSuccessUrl("http://localhost:3000/",true)
                .failureUrl("http://localhost:3000/login?error=true")
                .and().logout()
                .logoutUrl("/perform_logout");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder);
    }
}
