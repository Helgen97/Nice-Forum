package com.diploma.forum.dto;

import com.diploma.forum.entities.Role;
import com.diploma.forum.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String nickname;
    private Role role;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date registrationDate;

    private long createdTopics;
    private long createdComments;
    private long userLikes;

    private UserDTO(Long id,
                    String email,
                    String firstName,
                    String lastName,
                    String nickname,
                    Role role,
                    Date birthday,
                    Date registrationDate,
                    long createdTopics,
                    long createdComments,
                    long userLikes
    ) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.role = role;
        this.birthday = birthday;
        this.registrationDate = registrationDate;
        this.createdTopics = createdTopics;
        this.createdComments = createdComments;
        this.userLikes = userLikes;
    }

    public static UserDTO of(User user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getNickname(),
                user.getRole(),
                user.getBirthday(),
                user.getRegistrationDate(),
                user.getUserTopics().size(),
                user.getUserComments().size(),
                user.getUserLikes()
        );
    }
}
