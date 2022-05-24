package com.diploma.forum.services;

import com.diploma.forum.entities.Comment;
import com.diploma.forum.entities.Topic;
import com.diploma.forum.entities.User;
import com.diploma.forum.repositories.CommentRepository;
import com.diploma.forum.repositories.TopicRepository;
import com.diploma.forum.repositories.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private static final Logger LOGGER = LogManager.getLogger(CommentService.class.getName());

    private final CommentRepository commentRepository;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, TopicRepository topicRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<Comment> getAll() {
        LOGGER.info("Getting list of all sections.");
        return commentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Comment> getTopicComments(Long id) {
        LOGGER.info("Get topic comments with topic id: " + id + ".");
        return commentRepository.findAllByCommentTopic_Id(id);
    }

    @Transactional
    public Comment create(Comment comment, String creatorNickname) {
        LOGGER.info("Creating new comment.");
        User user = userRepository.findUserByNickname(creatorNickname);
        Topic topic = topicRepository.getById(comment.getCommentTopic().getId());
        comment.setCommentTopic(topic);
        comment.setCommentCreator(user);
        comment.setDateCreation(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    @Transactional
    public Optional<Comment> update(Comment comment, Long id) {
        LOGGER.info("Updating comment with id: " + id + ".");
        Optional<Comment> oldComment = commentRepository.findById(id);
        oldComment.ifPresent(value -> value.setText(comment.getText()));
        return oldComment;
    }

    @Transactional
    public void delete(Long id) {
        LOGGER.info("Deleting comment with id: " + id + ".");
        commentRepository.deleteById(id);
    }

    @Transactional
    public void likeComment(Long id) {
        LOGGER.info("Like comment with id: " + id + ".");
        Comment comment = commentRepository.getById(id);
        comment.setLikes(comment.getLikes() + 1);
        userRepository.findById(comment.getCommentCreator().getId()).ifPresent((e) -> {
            e.setUserLikes(e.getUserLikes() + 1);
            userRepository.save(e);
        });
        commentRepository.save(comment);
    }

    @Transactional
    public void dislikeComment(Long id) {
        LOGGER.info("Dislike comment with id: " + id + ".");
        Comment comment = commentRepository.getById(id);
        if (comment.getLikes() == 0) return;
        userRepository.findById(comment.getCommentCreator().getId()).ifPresent((e) -> {
            e.setUserLikes(e.getUserLikes() + 1);
            userRepository.save(e);
        });
        comment.setLikes(comment.getLikes() - 1);
        commentRepository.save(comment);
    }

}
