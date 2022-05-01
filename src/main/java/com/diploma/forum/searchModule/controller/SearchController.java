package com.diploma.forum.searchModule.controller;

import com.diploma.forum.dto.TopicDTO;
import com.diploma.forum.searchModule.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("search")
@Tag(name = "Search Module", description = "Searching module for working with search request")
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @Operation(
            summary = "Search request for topics",
            description = "Searching topics by entry parameters of GET request. Like: /search?title=news&author=helgen&section=main&tags=tagNew,Tag&from=2022-03-10&to=2022-03-14"
    )
    @GetMapping
    public List<TopicDTO> searchTopics(
            @RequestParam @Parameter(description = "Topic title that topic starts with") String title,
            @RequestParam(required = false) @Parameter(description = "Nickname of topics creator") String author,
            @RequestParam(required = false) @Parameter(description = "Section, that topics belong") String section,
            @RequestParam(required = false) @Parameter(description = "Tag names used in topics.") String tags,
            @RequestParam(required = false) @Parameter(description = "Date from which topics were created") String from,
            @RequestParam(required = false) @Parameter(description = "Date to which topics were created") String to) {


        return searchService.searchTopic(title, author, section, tags, from, to)
                .stream().map(TopicDTO::of).collect(Collectors.toList());
    }
}
