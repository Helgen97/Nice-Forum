package com.diploma.forum.controllers;

import com.diploma.forum.exceptions.PasswordMismatchException;
import com.diploma.forum.responces.MessageResponse;
import com.diploma.forum.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Login Controller", description = "Controller for checking users login, nickname and password, changing password")
@RestController
@CrossOrigin(value = "http://localhost:3000", maxAge = 3600)
public class LoginController {

    private static final Logger LOGGER = LogManager.getLogger(LoginController.class.getName());

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/check/user")
    public void getCurrentUser(@AuthenticationPrincipal User user) {
        System.out.println(user);
    }

    @PostMapping("/api/check/email")
    public MessageResponse checkEmail(String email) {

        LOGGER.info(String.format("Checking is email '%s' free.", email));

        return userService.checkEmail(email)
                ? new MessageResponse("Эмейл занят", false)
                : new MessageResponse("Эмейл свободен", true);
    }

    @PostMapping("/api/check/nickname")
    public MessageResponse checkNickname(String nickname) {
        LOGGER.info(String.format("Checking is nickname '%s' free.", nickname));
        return userService.checkNickname(nickname)
                ? new MessageResponse("Ник занят", false)
                : new MessageResponse("Ник свободен", true);
    }

    @PostMapping("change/password")
    public void changePassword(String oldPassword, String newPassword, @AuthenticationPrincipal User user) {
        LOGGER.info(String.format("Checking user %s password.", user.getUsername()));
        if (!userService.changePassword(oldPassword, newPassword, user.getUsername()))
            throw new PasswordMismatchException();
    }
}
