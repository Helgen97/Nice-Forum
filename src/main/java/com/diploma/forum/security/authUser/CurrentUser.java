package com.diploma.forum.security.authUser;

import com.diploma.forum.entities.Role;
import com.diploma.forum.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class CurrentUser {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String nickname;
    private String avatarUrl;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;
    private Role role;

    private CurrentUser(
            Long id,
            String email,
            String nickname,
            String firstName,
            String lastName,
            String avatarUrl,
            Date birthday,
            Role role
    ) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
        this.birthday = birthday;
        this.role = role;
    }

    public static CurrentUser of(User user) {
        return new CurrentUser(
                user.getId(),
                user.getEmail(),
                user.getNickname(),
                user.getFirstName(),
                user.getLastName(),
                user.getAvatarUrl(),
                user.getBirthday(),
                user.getRole());
    }
}
