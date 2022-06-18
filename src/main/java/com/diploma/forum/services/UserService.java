package com.diploma.forum.services;

import com.diploma.forum.dto.UserDTO;
import com.diploma.forum.entities.Role;
import com.diploma.forum.entities.User;
import com.diploma.forum.repositories.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class UserService {

    private static final Logger LOGGER = LogManager.getLogger(UserService.class.getName());

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getAll(int page, int limit) {
        LOGGER.info("Getting list of all users.");
        Page<User> usersPage = userRepository.findAll(PageRequest.of(page, limit));
        return usersPage.map(new Function<User, UserDTO>() {
            @Override
            public UserDTO apply(User user) {
                return UserDTO.of(user);
            }
        });
    }

    @Transactional(readOnly = true)
    public Optional<User> getOne(Long id) {
        LOGGER.info("Getting user with id: " + id + ".");
        return userRepository.findById(id);
    }

    @Transactional
    public User create(User user) {
        LOGGER.info("Register new user.");
        user.setNotified(false);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        user.setRegistrationDate(new Date());
        return userRepository.save(user);
    }

    @Transactional
    public Optional<User> updatePersonalInfo(User user, Long id) {
        LOGGER.info("Update user info with id: " + id + ".");
        Optional<User> oldUser = userRepository.findById(id);
        if (oldUser.isPresent()) {
            oldUser.get().setEmail(user.getEmail());
            oldUser.get().setFirstName(user.getFirstName());
            oldUser.get().setNickname(user.getNickname());
            oldUser.get().setLastName(user.getLastName());
            oldUser.get().setBirthday(user.getBirthday());
            return oldUser;
        }
        return oldUser;
    }

    @Transactional
    public Optional<User> updateUserRole(Long id, String role) {
        LOGGER.info("Update user role with id: " + id + ".");
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            user.get().setRole(Role.valueOf(role));
            return user;
        }
        return user;
    }

    @Transactional
    public void delete(Long id) {
        LOGGER.info("Deleting user with id: " + id + ".");
        User user = userRepository.getById(id);
        user.getUserTopics().forEach(topic -> topic.setCreator(null));
        user.getUserComments().forEach(comment -> comment.setCommentCreator(null));
        userRepository.deleteById(id);
    }

    @Transactional
    public List<User> findNewUsers() {
        List<User> newUsers = userRepository.findUsersByNotified(false);
        LOGGER.info("Notified new users. New users: " + newUsers.size() + ".");
        newUsers.forEach((e) -> e.setNotified(true));
        userRepository.saveAll(newUsers);

        return newUsers;
    }

    @Transactional(readOnly = true)
    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public boolean checkNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public boolean changePassword(String oldPassword, String newPassword, String nickname) {
        User user = userRepository.findUserByNickname(nickname);
        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
    public String changeAvatarUrl(String url, Long id) {
        User user = userRepository.getById(id);
        user.setAvatarUrl(url);
        return userRepository.save(user).getAvatarUrl();
    }
}
