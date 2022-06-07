package com.diploma.forum.dto;


import com.diploma.forum.entities.Comment;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDTO {
    private Long id;
    private Long creatorId;
    private String creatorNickName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalDateTime dateCreation;

    private String text;
    private Long topicId;
    private int likes;

    private CommentDTO(Long id,
                       Long creatorId,
                       String creatorNickName,
                       LocalDateTime dateCreation,
                       String text,
                       Long topicId,
                       int likes) {
        this.id = id;
        this.creatorId = creatorId;
        this.creatorNickName = creatorNickName;
        this.dateCreation = dateCreation;
        this.text = text;
        this.topicId = topicId;
        this.likes = likes;
    }

    public static CommentDTO of(Comment comment) {
        return new CommentDTO(
                comment.getId(),
                comment.getCommentCreator() != null ? comment.getCommentCreator().getId() : 0,
                comment.getCommentCreator() != null ? comment.getCommentCreator().getNickname() : "Deleted",
                comment.getDateCreation(),
                comment.getText(),
                comment.getCommentTopic().getId(),
                comment.getLikes());
    }

}
