package com.diploma.forum;

import com.diploma.forum.entities.*;
import com.diploma.forum.repositories.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class DataBaseSetUpForTests {

    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;
    private final TopicRepository topicRepository;
    private final CommentRepository commentRepository;
    private final TagRepository tagRepository;
    private final PasswordEncoder passwordEncoder;

    public DataBaseSetUpForTests(UserRepository userRepository,
                                 SectionRepository sectionRepository,
                                 TopicRepository topicRepository,
                                 CommentRepository commentRepository,
                                 TagRepository tagRepository,
                                 PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.sectionRepository = sectionRepository;
        this.topicRepository = topicRepository;
        this.commentRepository = commentRepository;
        this.tagRepository = tagRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void setUpUserForDetailsService() {
        User testUser = new User();
        testUser.setEmail("new@mail.com");
        testUser.setPassword(passwordEncoder.encode("1234"));
        testUser.setNickname("Test");
        testUser.setFirstName("Test");
        testUser.setLastName("Test");
        testUser.setNotified(true);
        testUser.setRole(Role.ADMIN);
        testUser.setBirthday(new Date());
        userRepository.save(testUser);
    }

    public void setUp() {
        resetDB();

        User admin = new User();
        admin.setEmail("admin@mail.com");
        admin.setPassword(passwordEncoder.encode("1234"));
        admin.setNickname("ADMIN");
        admin.setFirstName("ADMIN");
        admin.setLastName("ADMIN");
        admin.setNotified(true);
        admin.setRole(Role.ADMIN);
        admin.setBirthday(new Date());

        User user = new User();
        user.setEmail("user@mail.com");
        user.setPassword(passwordEncoder.encode("1234"));
        user.setNickname("USER");
        user.setFirstName("USER");
        user.setLastName("USER");
        user.setNotified(true);
        user.setRole(Role.USER);
        user.setBirthday(new Date());

        userRepository.saveAll(List.of(admin, user));

        Section sectionOne = new Section();
        sectionOne.setTitle("Section one");
        sectionOne.setDescription("Section one description");

        Section sectionTwo = new Section();
        sectionTwo.setTitle("Section two");
        sectionTwo.setDescription("Section two description");

        sectionRepository.saveAll(List.of(sectionOne, sectionTwo));

        Tag tagOne = new Tag();
        tagOne.setTagName("TagOne");

        Tag tagTwo = new Tag();
        tagTwo.setTagName("TagTwo");

        tagRepository.saveAll(List.of(tagOne, tagTwo));

        Topic topicOne = new Topic();
        topicOne.setTitle("Topic one");
        topicOne.setDescription("Topic one description");
        topicOne.setSection(sectionOne);
        topicOne.setCreator(admin);
        topicOne.setDate(LocalDateTime.now());
        topicOne.setText("Topic one text");
        topicOne.setTopicTags(Set.of(tagOne));

        Topic topicTwo = new Topic();
        topicTwo.setTitle("Topic one");
        topicTwo.setDescription("Topic one description");
        topicTwo.setSection(sectionOne);
        topicTwo.setCreator(admin);
        topicTwo.setDate(LocalDateTime.now());
        topicTwo.setText("Topic one text");
        topicTwo.setTopicTags(Set.of(tagTwo));

        topicRepository.saveAll(List.of(topicOne, topicTwo));

        Comment commentOne = new Comment();
        commentOne.setText("Comment One");
        commentOne.setCommentTopic(topicOne);
        commentOne.setCommentCreator(admin);
        commentOne.setDateCreation(LocalDateTime.now());

        Comment commentTwo = new Comment();
        commentTwo.setText("Comment Two");
        commentTwo.setCommentTopic(topicTwo);
        commentTwo.setCommentCreator(user);
        commentTwo.setDateCreation(LocalDateTime.now());

        commentRepository.saveAll(List.of(commentOne, commentTwo));
    }

    public void resetDB() {
        commentRepository.deleteAll();
        topicRepository.deleteAll();
        tagRepository.deleteAll();
        sectionRepository.deleteAll();
        userRepository.deleteAll();
    }

}
