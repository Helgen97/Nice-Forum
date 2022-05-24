package com.diploma.forum.controllers;

import com.diploma.forum.dto.CommentDTO;
import com.diploma.forum.entities.Comment;
import com.diploma.forum.exceptions.NotFoundException;
import com.diploma.forum.services.CommentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/comments")
@CrossOrigin(value = "http://localhost:3000", maxAge = 3600)
@Tag(name = "Comments Controller", description = "Controller for working with comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<CommentDTO> getAll() {
        return commentService.getAll().stream().map(CommentDTO::of).collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public List<CommentDTO> getTopicComments(@PathVariable Long id) {
        return commentService.getTopicComments(id).stream().map(CommentDTO::of).collect(Collectors.toList());
    }

    @PostMapping
    public CommentDTO create(@RequestBody Comment comment, @AuthenticationPrincipal User user) {
        return CommentDTO.of(commentService.create(comment, "Helgen"));
        //TODO HARDCODED USER
    }

    @PutMapping("{id}")
    public CommentDTO update(@RequestBody Comment comment, @PathVariable Long id) {
        return CommentDTO.of(commentService.update(comment, id).orElseThrow(NotFoundException::new));
    }

    @PutMapping("{id}/like")
    public void likeComment(@PathVariable Long id) {
        commentService.likeComment(id);
    }

    @PutMapping("{id}/dislike")
    public void dislikeComment(@PathVariable Long id) {
        commentService.dislikeComment(id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        commentService.delete(id);
    }
}
