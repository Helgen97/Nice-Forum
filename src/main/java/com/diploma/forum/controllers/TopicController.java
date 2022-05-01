package com.diploma.forum.controllers;

import com.diploma.forum.dto.TopicDTO;
import com.diploma.forum.entities.Topic;
import com.diploma.forum.exceptions.NotFoundException;
import com.diploma.forum.services.TopicService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("topics")
@Tag(name = "Topic Controller", description = "Controller for working with topics")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public List<TopicDTO> getAll() {
        return topicService.getAll().stream().map(TopicDTO::of).collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public TopicDTO getOne(@PathVariable Long id) {
        return TopicDTO.of(topicService.getOne(id).orElseThrow(NotFoundException::new));
    }

    @PostMapping
    public TopicDTO create(@RequestBody Topic topic, @AuthenticationPrincipal User user) {

        return TopicDTO.of(topicService.create(topic, user.getUsername()));
    }

    @PutMapping("{id}")
    public TopicDTO update(@RequestBody Topic topic, @PathVariable Long id) {
        return TopicDTO.of(topicService.update(topic, id));
    }

    @PutMapping("{id}/like")
    public void like(@PathVariable Long id) {
        topicService.likeTopic(id);
    }

    @PutMapping("{id}/dislike")
    public void dislike(@PathVariable Long id) {
        topicService.dislikeTopic(id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        topicService.delete(id);
    }
}
