package com.diploma.forum.security.service;

import com.diploma.forum.repositories.UserRepository;
import com.diploma.forum.security.authUser.CurrentUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;

@Component
@PropertySource("classpath:application-dev.properties")
public class JwtService {

    private final UserRepository userRepository;

    @Autowired
    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    static final long EXPIRATION_TIME = 86400000;
    static final String PREFIX = "Bearer";
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String getToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public UsernamePasswordAuthenticationToken getAuthUser(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (token != null) {
            String user = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace(PREFIX, ""))
                    .getBody()
                    .getSubject();

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(
                        CurrentUser.of(userRepository.findUserByNickname(user)),
                        null,
                        new ArrayList<>());
            }
        }
        return null;


    }
}
