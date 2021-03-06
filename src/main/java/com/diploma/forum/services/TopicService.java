package com.diploma.forum.services;

import com.diploma.forum.dto.TopicDTO;
import com.diploma.forum.entities.Section;
import com.diploma.forum.entities.Topic;
import com.diploma.forum.entities.User;
import com.diploma.forum.repositories.SectionRepository;
import com.diploma.forum.repositories.TagRepository;
import com.diploma.forum.repositories.TopicRepository;
import com.diploma.forum.repositories.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class TopicService {

    private static final Logger LOGGER = LogManager.getLogger(TopicService.class.getName());

    private final TopicRepository topicRepository;
    private final SectionRepository sectionRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    public TopicService(TopicRepository topicRepository, SectionRepository sectionRepository, UserRepository userRepository, TagRepository tagRepository) {
        this.topicRepository = topicRepository;
        this.sectionRepository = sectionRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }

    @Transactional(readOnly = true)
    public List<Topic> getAll() {
        LOGGER.info("Getting list of all topics.");
        return topicRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Transactional(readOnly = true)
    public Page<TopicDTO> getAllBySectionId(Long id, int page, int limit) {
        LOGGER.info("Getting list of all topics where section id: " + id + ".");
        Page<Topic> topicsPage = topicRepository.findAllBySectionId(id, PageRequest.of(page, limit, Sort.Direction.DESC, "id"));
        return topicsPage.map(new Function<Topic, TopicDTO>() {
            @Override
            public TopicDTO apply(Topic topic) {
                return TopicDTO.of(topic);
            }
        });
    }

    public Page<TopicDTO> getAllByUserId(Long id, int page, int limit) {
        LOGGER.info("Getting list of all topics where user id: " + id + ".");
        Page<Topic> topicsPage = topicRepository.findAllByCreatorId(id, PageRequest.of(page, limit, Sort.Direction.DESC, "id"));
        return topicsPage.map(new Function<Topic, TopicDTO>() {
            @Override
            public TopicDTO apply(Topic topic) {
                return TopicDTO.of(topic);
            }
        });
    }

    @Transactional(readOnly = true)
    public Optional<Topic> getOne(Long id) {
        LOGGER.info("Get topic with id: " + id + ".");
        return topicRepository.findById(id);
    }

    @Transactional
    public Topic create(Topic topic, String creatorNickName) {
        LOGGER.info("Creating new topic");
        User user = userRepository.findUserByNickname(creatorNickName);
        Section topicSection = sectionRepository.getById(topic.getSection().getId());
        topic.setCreator(user);
        topic.setSection(topicSection);
        topic.setDate(LocalDateTime.now());
        tagRepository.saveAll(topic.getTopicTags());
        return topicRepository.save(topic);
    }

    @Transactional
    public Topic update(Topic newTopic, Long id) {
        LOGGER.info("Update topic with id: " + id + ".");
        Topic oldTopic = topicRepository.getById(id);
        oldTopic.setTitle(newTopic.getTitle());
        oldTopic.setDescription(newTopic.getDescription());
        oldTopic.setText(newTopic.getText());
        return topicRepository.save(oldTopic);
    }

    @Transactional
    public void delete(Long id) {
        LOGGER.info("Deleting topic with id: " + id + ".");
        topicRepository.deleteById(id);
    }

    @Transactional
    public void likeTopic(Long id) {
        LOGGER.info("Like topic with id: " + id + ".");
        Topic topic = topicRepository.getById(id);
        topic.setLikes(topic.getLikes() + 1);
        if(topic.getCreator() != null) {
            userRepository.findById(topic.getCreator().getId()).ifPresent((e) -> {
                e.setUserLikes(e.getUserLikes() + 1);
                userRepository.save(e);
            });
        }
        topicRepository.save(topic);
    }

    @Transactional
    public void dislikeTopic(Long id) {
        LOGGER.info("Dislike topic with id: " + id + ".");
        Topic topic = topicRepository.getById(id);
        if (topic.getLikes() == 0) return;
        if(topic.getCreator() != null) {
            userRepository.findById(topic.getCreator().getId()).ifPresent((e) -> {
                e.setUserLikes(e.getUserLikes() - 1);
                userRepository.save(e);
            });
        }
        topic.setLikes(topic.getLikes() - 1);
        topicRepository.save(topic);
    }
}
