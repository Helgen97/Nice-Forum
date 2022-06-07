package com.diploma.forum.dto;

import com.diploma.forum.entities.Section;
import lombok.Data;

@Data
public class SectionDTO {

    private Long id;
    private String title;
    private String description;

    private SectionDTO(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public static SectionDTO of(Section section) {
        return new SectionDTO(section.getId(), section.getTitle(), section.getDescription());
    }
}
