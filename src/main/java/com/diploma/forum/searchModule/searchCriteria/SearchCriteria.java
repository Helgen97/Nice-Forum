package com.diploma.forum.searchModule.searchCriteria;

import com.diploma.forum.searchModule.searchOperation.SearchOperation;
import lombok.Data;

@Data
public class SearchCriteria {

    private String key;
    private String secondKey;
    private Object value;
    private SearchOperation searchOperation;

    public SearchCriteria(String key, Object value, SearchOperation operation) {
        this.key = key;
        this.value = value;
        this.searchOperation = operation;
    }

    public SearchCriteria(String key, String secondKey, Object value, SearchOperation operation) {
        this.key = key;
        this.secondKey = secondKey;
        this.value = value;
        this.searchOperation = operation;
    }

}
