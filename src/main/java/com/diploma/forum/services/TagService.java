package com.diploma.forum.services;

import com.diploma.forum.entities.Tag;
import com.diploma.forum.repositories.TagRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TagService {

    private static final Logger LOGGER = LogManager.getLogger(TagService.class.getName());

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Transactional(readOnly = true)
    public List<Tag> getAll() {
        LOGGER.info("Getting list of all tags.");
        return tagRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Tag> tagSearch(String tagName) {
        LOGGER.info(String.format("Searching by tag name starts with %s", tagName));
        return tagRepository.findTagsByTagNameStartingWith(tagName);
    }
}
