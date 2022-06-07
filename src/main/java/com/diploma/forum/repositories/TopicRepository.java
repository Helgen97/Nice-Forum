package com.diploma.forum.repositories;

import com.diploma.forum.entities.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long>, JpaSpecificationExecutor<Topic> {
    Page<Topic> findAllBySectionId(Long id, Pageable pageable);

    Page<Topic> findAllByCreatorId(Long id, Pageable pageable);
}
