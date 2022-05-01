package com.diploma.forum.dto;

import com.diploma.forum.entities.Comment;
import com.diploma.forum.entities.Role;
import com.diploma.forum.entities.Topic;
import com.diploma.forum.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserDTO {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String nickname;
    private Role role;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private Date birthday;

    private List<TopicDTO> userTopics;
    private List<CommentDTO> userComments;

    private UserDTO(Long id,
                    String email,
                    String firstName,
                    String lastName,
                    String nickname,
                    Role role,
                    Date birthday,
                    List<TopicDTO> userTopics,
                    List<CommentDTO> userComments) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.role = role;
        this.birthday = birthday;
        this.userTopics = userTopics;
        this.userComments = userComments;
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
                topicListOf(user.getUserTopics()),
                commentListOf(user.getUserComments())
        );
    }

    private static List<CommentDTO> commentListOf(List<Comment> userComments) {
        return userComments.stream().map(CommentDTO::of).collect(Collectors.toList());
    }

    private static List<TopicDTO> topicListOf(List<Topic> userTopics) {
        return userTopics.stream().map(TopicDTO::of).collect(Collectors.toList());
    }

}
