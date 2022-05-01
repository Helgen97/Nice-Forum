package com.diploma.forum.searchModule.searchSpecification;

import com.diploma.forum.entities.Tag;
import com.diploma.forum.entities.Topic;
import com.diploma.forum.searchModule.searchCriteria.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class SearchSpecification implements Specification<Topic> {

    private final List<SearchCriteria> criteriaList;

    public SearchSpecification() {
        this.criteriaList = new ArrayList<>();
    }

    public void add(SearchCriteria searchCriteria) {
        criteriaList.add(searchCriteria);
    }

    @Override
    public Predicate toPredicate(Root<Topic> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicateList = new ArrayList<>();

        for (SearchCriteria criteria : criteriaList) {
            switch (criteria.getSearchOperation()) {
                case GREATER_THAN -> predicateList.add(criteriaBuilder.greaterThan(
                        root.get(criteria.getKey()), criteria.getValue().toString()));
                case GREATER_THAN_DATE -> {
                    predicateList.add(criteriaBuilder.greaterThan(
                            root.get(criteria.getKey()), (LocalDateTime) criteria.getValue()));
                }
                case LESS_THAN -> {
                    predicateList.add(criteriaBuilder.lessThan(
                            root.get(criteria.getKey()), criteria.getValue().toString()));
                }
                case GREATER_THAN_EQUAL -> {
                    predicateList.add(criteriaBuilder.greaterThanOrEqualTo(
                            root.get(criteria.getKey()), criteria.getValue().toString()));
                }
                case LESS_THAN_EQUAL -> {
                    predicateList.add(criteriaBuilder.lessThanOrEqualTo(
                            root.get(criteria.getKey()), criteria.getValue().toString()));
                }
                case LESS_THAN_EQUAL_DATE -> {
                    predicateList.add(criteriaBuilder.lessThanOrEqualTo(
                            root.get(criteria.getKey()), (LocalDateTime) criteria.getValue()));
                }
                case NOT_EQUAL -> {
                    predicateList.add(criteriaBuilder.notEqual(
                            root.get(criteria.getKey()), criteria.getValue().toString()));
                }
                case EQUAL -> {
                    predicateList.add(criteriaBuilder.equal(
                            root.get(criteria.getKey()), criteria.getValue().toString()));
                }
                case EQUAL_WITH_TWO_KEYS -> {
                    predicateList.add(criteriaBuilder.equal(
                            root.get(criteria.getKey()).get(criteria.getSecondKey()), criteria.getValue().toString()));
                }
                case MATCH -> {
                    predicateList.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get(criteria.getKey())),
                            "%" + criteria.getValue().toString().toLowerCase() + "%"));
                }
                case MATCH_END -> {
                    predicateList.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get(criteria.getKey())),
                            criteria.getValue().toString().toLowerCase() + "%"));
                }
                case MATCH_START -> {
                    predicateList.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get(criteria.getKey())),
                            "%" + criteria.getValue().toString().toLowerCase()));
                }
                case IN -> {
                    predicateList.add(criteriaBuilder.in(root.get(criteria.getKey())).value(criteria.getValue()));
                }
                case IN_TAGS -> {
                    Subquery<Tag> subquery = query.subquery(Tag.class);
                    Root<Tag> subqueryRoot = subquery.from(Tag.class);
                    subquery.select(subqueryRoot);

                    subquery.where(criteriaBuilder.and(criteriaBuilder.equal(root.get("id"), subqueryRoot.join("tagTopics").get("id")),
                            criteriaBuilder.like(criteriaBuilder.lower(criteriaBuilder.lower(subqueryRoot.get(criteria.getKey()))), "%" + criteria.getValue().toString().toLowerCase() + "%")));

                    return criteriaBuilder.exists(subquery);
                }
                case NOT_IN -> {
                    predicateList.add(criteriaBuilder.not(root.get(criteria.getKey())).in(criteria.getValue()));
                }
            }
        }

        return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
    }
}
