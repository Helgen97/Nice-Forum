package com.diploma.forum.repositories;

import com.diploma.forum.entities.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Page<Comment> findAllByCommentTopicId(Long id, Pageable pageRequest);

    Page<Comment> findAllByCommentCreatorId(Long id, Pageable pageRequest);
}
