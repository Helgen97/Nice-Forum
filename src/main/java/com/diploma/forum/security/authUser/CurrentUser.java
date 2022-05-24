package com.diploma.forum.security.authUser;

import com.diploma.forum.entities.Role;
import com.diploma.forum.entities.User;
import lombok.Data;

@Data
public class CurrentUser {

    private Long id;
    private String firstName;
    private String lastName;
    private String nickname;
    private Role role;

    private CurrentUser(
                        Long id,
                        String firstName,
                        String lastName,
                        String nickname,
                        Role role
    ){
        this.id = id;
        this.nickname = nickname;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    public static CurrentUser of(User user) {
        return new CurrentUser(
                user.getId(),
                user.getNickname(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole());
    }
}
