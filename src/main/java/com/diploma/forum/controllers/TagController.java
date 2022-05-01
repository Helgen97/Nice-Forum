package com.diploma.forum.controllers;

import com.diploma.forum.dto.TagDTO;
import com.diploma.forum.services.TagService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("tags")
@Tag(name = "Tag Controller", description = "Controller for working with tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping()
    public List<TagDTO> getAll() {
        return tagService.getAll().stream().map(TagDTO::of).collect(Collectors.toList());
    }

    @GetMapping("{tagName}")
    public List<TagDTO> search(@PathVariable String tagName) {
        return tagService.tagSearch(tagName).stream().map(TagDTO::of).collect(Collectors.toList());
    }
}
