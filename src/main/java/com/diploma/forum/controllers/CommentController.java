package com.diploma.forum.controllers;

import com.diploma.forum.dto.CommentDTO;
import com.diploma.forum.entities.Comment;
import com.diploma.forum.exceptions.NotFoundException;
import com.diploma.forum.security.authUser.CurrentUser;
import com.diploma.forum.services.CommentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/comments")
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

    @GetMapping("{id}/{page}")
    public Page<CommentDTO> getTopicComments(@PathVariable Long id, @PathVariable int page, @RequestParam int limit) {
        return commentService.getTopicComments(id, page, limit);
    }

    @GetMapping("/user/{id}/{page}")
    public Page<CommentDTO> getCommentsByUserId(@PathVariable Long id, @PathVariable int page, @RequestParam int limit) {
        return commentService.getCommentsByUserId(id, page, limit);
    }

    @PostMapping
    public CommentDTO create(@RequestBody Comment comment, @AuthenticationPrincipal CurrentUser user) {
        return CommentDTO.of(commentService.create(comment, user.getNickname()));
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
