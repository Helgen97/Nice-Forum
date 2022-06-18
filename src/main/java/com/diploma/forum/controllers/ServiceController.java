package com.diploma.forum.controllers;

import com.diploma.forum.responces.MessageResponse;
import com.diploma.forum.security.authUser.CurrentUser;
import com.diploma.forum.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Service Controller", description = "Controller for checking users login, nickname and password, changing password")
@RestController
public class ServiceController {

    private static final Logger LOGGER = LogManager.getLogger(ServiceController.class.getName());

    private final UserService userService;

    @Autowired
    public ServiceController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/user")
    public CurrentUser getCurrentUser(@AuthenticationPrincipal CurrentUser user) {
        return user;
    }

    @PostMapping("/api/check/email")
    public MessageResponse checkEmail(String email) {

        LOGGER.info(String.format("Checking is email '%s' free.", email));

        return userService.checkEmail(email)
                ? new MessageResponse("Email is occupied", true)
                : new MessageResponse("Email is free", false);
    }

    @PostMapping("/api/check/nickname")
    public MessageResponse checkNickname(String nickname) {
        LOGGER.info(String.format("Checking is nickname '%s' free.", nickname));
        return userService.checkNickname(nickname)
                ? new MessageResponse("Nickname is occupied", true)
                : new MessageResponse("Nickname is free", false);
    }

    @PostMapping("change/password")
    public MessageResponse changePassword(String oldPassword, String newPassword, @AuthenticationPrincipal CurrentUser currentUser) {
        LOGGER.info(String.format("Changing user %s password.", currentUser.getNickname()));
        return userService.changePassword(oldPassword, newPassword, currentUser.getNickname())
                ? new MessageResponse("Password changed", false)
                : new MessageResponse("Password do not match", true);
    }

    @PostMapping("change/avatar")
    public String changeAvatarUrl(String url, @AuthenticationPrincipal CurrentUser currentUser) {
        LOGGER.info(String.format("Changing user %s avatar URl.", currentUser.getNickname()));
        return userService.changeAvatarUrl(url, currentUser.getId());

    }
}
