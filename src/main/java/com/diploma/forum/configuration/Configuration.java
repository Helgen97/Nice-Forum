package com.diploma.forum.configuration;

import com.diploma.forum.entities.*;
import com.diploma.forum.repositories.SectionRepository;
import com.diploma.forum.repositories.TopicRepository;
import com.diploma.forum.repositories.UserRepository;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays;
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
                                  final SectionRepository sectionRepository,
                                  final TopicRepository topicRepository,
                                  final PasswordEncoder encoder) {
        return new CommandLineRunner() {
            @Override
            public void run(String... strings) throws Exception {
                User user = new User();
                user.setEmail("drmegman@gmail.com");
                user.setPassword(encoder.encode("1234"));
                user.setNickname("Helgen");
                user.setFirstName("Dima");
                user.setLastName("Donchenko");
                user.setBirthday(new Date());
                user.setRegistrationDate(new Date());
                user.setRole(Role.ADMIN);
                user.setNotified(true);

                Section section = new Section();
                section.setName("О форуме!");
                section.setDescription("Здесь собрана вся информация по форуму");

                Section sectionTwo = new Section();
                sectionTwo.setName("Глава 2");
                sectionTwo.setDescription("Здесь собрана вся информация по главе 2");

                Tag one = new Tag();
                Tag two = new Tag();
                Tag three = new Tag();
                one.setTagName("News");
                two.setTagName("Add");
                three.setTagName("Test");

                Topic topic = new Topic();
                topic.setTitle("Новости форума");
                topic.setDescription("Тут наши новости");
                topic.setSection(section);
                topic.setText("Новости!\nВот такие новости!\nПривет всем!");
                topic.setCreator(user);
                topic.setDate(LocalDateTime.now());
                topic.setTopicTags(Arrays.asList(one, two, three));


                Topic topicTwo = new Topic();
                topicTwo.setTitle("Новости форума");
                topicTwo.setDescription("Тут наши новости");
                topicTwo.setSection(section);
                topicTwo.setText("Новости!\nВот такие новости!\nПривет всем!");
                topicTwo.setCreator(user);
                topicTwo.setDate(LocalDateTime.now());

                Topic topicThree = new Topic();
                topicThree.setTitle("Новости форума");
                topicThree.setDescription("Тут наши новости");
                topicThree.setSection(section);
                topicThree.setText("Новости!\nВот такие новости!\nПривет всем!");
                topicThree.setCreator(user);
                topicThree.setDate(LocalDateTime.now());

                Topic topicFour = new Topic();
                topicFour.setTitle("Новости форума");
                topicFour.setDescription("Тут наши новости");
                topicFour.setSection(sectionTwo);
                topicFour.setText("Новости!\nВот такие новости!\nПривет всем!");
                topicFour.setCreator(user);
                topicFour.setDate(LocalDateTime.now());

                Topic topicFive = new Topic();
                topicFive.setTitle("Новости форума");
                topicFive.setDescription("Тут наши новости");
                topicFive.setSection(sectionTwo);
                topicFive.setText("Новости!\nВот такие новости!\nПривет всем!");
                topicFive.setCreator(user);
                topicFive.setDate(LocalDateTime.now());

                userRepository.save(user);
                sectionRepository.save(section);
                sectionRepository.save(sectionTwo);
                topicRepository.save(topic);
                topicRepository.save(topicTwo);
                topicRepository.save(topicThree);
                topicRepository.save(topicFour);
                topicRepository.save(topicFive);

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
