package com.diploma.forum.searchModule.service;

import com.diploma.forum.entities.Topic;
import com.diploma.forum.repositories.TopicRepository;
import com.diploma.forum.searchModule.searchCriteria.SearchCriteria;
import com.diploma.forum.searchModule.searchOperation.SearchOperation;
import com.diploma.forum.searchModule.searchSpecification.SearchSpecification;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Service
public class SearchService {

    private static final Logger LOGGER = LogManager.getLogger(SearchService.class.getName());

    private final TopicRepository topicRepository;

    @Autowired
    public SearchService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> searchTopic(String title,
                                   String author,
                                   String section,
                                   String tags,
                                   String from,
                                   String to) {

        DateTimeFormatter datePattern = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime dateFrom = null;
        LocalDateTime dateTo = null;

        if (from != null) {
            dateFrom = LocalDate.parse(from, datePattern).atStartOfDay();
        }
        if (to != null) {
            dateTo = LocalDate.parse(to, datePattern).atStartOfDay();
        }
        return topicRepository.findAll(createSpecification(title, author, section, tags, dateFrom, dateTo), Sort.by(Sort.Direction.DESC, "id"));
    }

    private SearchSpecification createSpecification(String title,
                                                    String author,
                                                    String section,
                                                    String tags,
                                                    LocalDateTime from,
                                                    LocalDateTime to) {
        SearchSpecification searchSpecification = new SearchSpecification();

        searchSpecification.add(new SearchCriteria("title", title, SearchOperation.MATCH_END));
        if (author != null) {
            searchSpecification.add(new SearchCriteria("creator", "nickname", author, SearchOperation.EQUAL_WITH_TWO_KEYS));
        }
        if (section != null) {
            searchSpecification.add(new SearchCriteria("section", "name", section, SearchOperation.EQUAL_WITH_TWO_KEYS));
        }
        if (tags != null) {
            for (String tag : fromStringToTagList(tags)) {
                searchSpecification.add(new SearchCriteria("tagName", tag, SearchOperation.IN_TAGS));
            }
        }
        if (from != null) {
            searchSpecification.add(new SearchCriteria("date", from, SearchOperation.GREATER_THAN_DATE));
        }
        if (to != null) {
            searchSpecification.add(new SearchCriteria("date", to, SearchOperation.LESS_THAN_EQUAL_DATE));
        }
        LOGGER.info("Searching service find by parameters.");
        return searchSpecification;
    }

    private List<String> fromStringToTagList(String tag) {
        return Arrays.stream(tag.split(",")).toList();
    }


}
