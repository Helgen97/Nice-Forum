package com.diploma.forum.dto;

import com.diploma.forum.entities.Tag;
import com.diploma.forum.entities.Topic;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class TopicDTO {

    private Long id;
    private String title;
    private String description;
    private String text;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalDateTime date;
    private int likes;
    private int commentsAmount;
    private Long sectionId;
    private String sectionTitle;
    private Long creatorId;
    private String creatorNickName;
    private String creatorAvatarUrl;
    private Set<TagDTO> topicTags;

    private TopicDTO(Long id,
                     String title,
                     String description,
                     String text,
                     LocalDateTime date,
                     int likes,
                     int commentsAmount,
                     Long sectionId,
                     String sectionTitle,
                     Long creatorId,
                     String creatorNickName,
                     String creatorAvatarUrl,
                     Set<TagDTO> topicTags
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.text = text;
        this.date = date;
        this.likes = likes;
        this.commentsAmount = commentsAmount;
        this.sectionId = sectionId;
        this.sectionTitle = sectionTitle;
        this.creatorId = creatorId;
        this.creatorNickName = creatorNickName;
        this.creatorAvatarUrl = creatorAvatarUrl;
        this.topicTags = topicTags;
    }

    public static TopicDTO of(Topic topic) {
        return new TopicDTO(
                topic.getId(),
                topic.getTitle(),
                topic.getDescription(),
                topic.getText(),
                topic.getDate(),
                topic.getLikes(),
                topic.getTopicComments().size(),
                topic.getSection().getId(),
                topic.getSection().getTitle(),
                topic.getCreator() != null ? topic.getCreator().getId() : 0,
                topic.getCreator() != null ? topic.getCreator().getNickname() : "Deleted",
                topic.getCreator() != null ? topic.getCreator().getAvatarUrl() : "Default",
                tagListOf(topic.getTopicTags()));
    }

    private static Set<TagDTO> tagListOf(Set<Tag> topicTags) {
        return topicTags.stream().map(TagDTO::of).collect(Collectors.toSet());
    }
}
