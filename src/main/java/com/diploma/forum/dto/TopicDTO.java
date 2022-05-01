package com.diploma.forum.dto;

import com.diploma.forum.entities.Tag;
import com.diploma.forum.entities.Topic;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class TopicDTO {

    private Long id;
    private String title;
    private String description;
    private String text;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
    private LocalDateTime date;
    private int likes;
    private Long sectionId;
    private Long creatorId;
    private String creatorNickName;
    private List<TagDTO> topicTags;

    private TopicDTO(Long id,
                     String title,
                     String description,
                     String text,
                     LocalDateTime date,
                     int likes,
                     Long sectionId,
                     Long creatorId,
                     String creatorNickName,
                     List<TagDTO> topicTags
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.text = text;
        this.date = date;
        this.likes = likes;
        this.sectionId = sectionId;
        this.creatorId = creatorId;
        this.creatorNickName = creatorNickName;
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
                topic.getSection().getId(),
                topic.getCreator().getId(),
                topic.getCreator().getNickname(),
                tagListOf(topic.getTopicTags()));
    }

    private static List<TagDTO> tagListOf(List<Tag> topicTags) {
        return topicTags.stream().map(TagDTO::of).collect(Collectors.toList());
    }
}
