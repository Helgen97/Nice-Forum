package com.diploma.forum.configuration;

import com.diploma.forum.entities.Role;
import com.diploma.forum.entities.User;
import com.diploma.forum.repositories.UserRepository;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@org.springframework.context.annotation.Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class Configuration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CommandLineRunner demo(final UserRepository userRepository,
                                  final PasswordEncoder encoder) {
        return new CommandLineRunner() {
            @Override
            public void run(String... strings) throws Exception {
                if (!userRepository.existsByNickname("Helgen")) {
                    User user = new User();
                    user.setEmail("drmegman@gmail.com");
                    user.setPassword(encoder.encode("1234"));
                    user.setNickname("Helgen");
                    user.setFirstName("Dmytro");
                    user.setLastName("Donchenko");
                    user.setBirthday(new Date());
                    user.setAvatarUrl("https://cdn1.iconfinder.com/data/icons/diversity-avatars-volume-01-v2/64/matrix-neo-man-white-512.png");
                    user.setRegistrationDate(new Date());
                    user.setRole(Role.ADMIN);
                    user.setNotified(true);
                    userRepository.save(user);
                }
            }
        };
    }

    @Bean
    public OpenAPI niceForumApi() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Nice-Forum Back-End API")
                                .version("1.0.0")
                                .description("API description for project")
                                .contact(
                                        new Contact()
                                                .email("drmegman@gmail.com")
                                                .name("Dmytro Donchenko")
                                                .url("https://github.com/Helgen97")
                                ));
    }
}
