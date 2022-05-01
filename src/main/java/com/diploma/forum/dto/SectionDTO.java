package com.diploma.forum.dto;

import com.diploma.forum.entities.Section;
import com.diploma.forum.entities.Topic;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SectionDTO {

    private Long id;
    private String name;
    private String description;
    private List<TopicDTO> topicList;

    private SectionDTO(Long id, String name, String description, List<TopicDTO> topicList) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.topicList = topicList;
    }

    public static SectionDTO of(Section section) {
        return new SectionDTO(section.getId(), section.getName(), section.getDescription(), listOf(section.getTopicList()));
    }

    private static List<TopicDTO> listOf(List<Topic> topicList) {
        List<TopicDTO> topicDTOList = new ArrayList<>();
        topicList.forEach((e) -> topicDTOList.add(TopicDTO.of(e)));
        return topicDTOList;
    }
}
