package com.diploma.forum.dto;

import com.diploma.forum.entities.Tag;
import lombok.Data;

@Data
public class TagDTO {

    private Long id;
    private String tagName;

    private TagDTO(Long id, String tagName) {
        this.id = id;
        this.tagName = tagName;
    }

    public static TagDTO of(Tag tag) {
        return new TagDTO(tag.getId(), tag.getTagName());
    }
}
