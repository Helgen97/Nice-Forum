package com.diploma.forum.configuration;

import com.diploma.forum.entities.*;
import com.diploma.forum.repositories.SectionRepository;
import com.diploma.forum.repositories.TagRepository;
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
import java.util.HashSet;
import java.util.List;

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
                                  final TagRepository tagRepository,
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

                User user1 = new User();
                user1.setEmail("mail");
                user1.setPassword(encoder.encode("1234"));
                user1.setNickname("Admin");
                user1.setFirstName("admin");
                user1.setLastName("admin");
                user1.setBirthday(new Date());
                user1.setRegistrationDate(new Date());
                user1.setRole(Role.USER);
                user1.setNotified(true);

                Section section = new Section();
                section.setTitle("О форуме!");
                section.setDescription("Здесь собрана вся информация по форуму");

                Section sectionTwo = new Section();
                sectionTwo.setTitle("Разговоры");
                sectionTwo.setDescription("Общение и знакомства.");

                Tag one = new Tag();
                Tag two = new Tag();
                Tag three = new Tag();
                one.setTagName("Новости");
                two.setTagName("Тест");
                three.setTagName("Разработка");

                tagRepository.saveAll(List.of(one, two, three));

                Topic topic = new Topic();
                topic.setTitle("Новости форума");
                topic.setDescription("Тут наши новости");
                topic.setSection(section);
                topic.setText("Новости!\nФорум работает в тестовом режиме!\nПробуем и дорабатываем!");
                topic.setCreator(user);
                topic.setDate(LocalDateTime.now());
                topic.setTopicTags(new HashSet<>(Arrays.asList(one, two, three)));

                Topic topicTwo = new Topic();
                topicTwo.setTitle("Правила!");
                topicTwo.setDescription("Правила общения на форуме!");
                topicTwo.setSection(section);
                topicTwo.setText("Свод правил! \n 1. Без оскорблений! \n 2. Адекватные ники и названия тем!");
                topicTwo.setCreator(user);
                topicTwo.setDate(LocalDateTime.now());

                Topic topicThree = new Topic();
                topicThree.setTitle("Знакомства");
                topicThree.setDescription("Узнаем друг друга лучше!");
                topicThree.setSection(sectionTwo);
                topicThree.setText("Приветствую на форуме! Я тут главный!");
                topicThree.setCreator(user);
                topicThree.setDate(LocalDateTime.now());

                Topic topicFour = new Topic();
                topicFour.setTitle("Флудильня");
                topicFour.setDescription("Разговоры ни о чём");
                topicFour.setSection(sectionTwo);
                topicFour.setText("Как ваши дела?");
                topicFour.setCreator(user);
                topicFour.setDate(LocalDateTime.now());

                userRepository.save(user);
                userRepository.save(user1);
                sectionRepository.save(section);
                sectionRepository.save(sectionTwo);
                topicRepository.save(topic);
                topicRepository.save(topicTwo);
                topicRepository.save(topicThree);
                topicRepository.save(topicFour);
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
