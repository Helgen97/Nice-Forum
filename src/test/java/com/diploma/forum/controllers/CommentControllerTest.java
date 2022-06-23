package com.diploma.forum.controllers;

import com.diploma.forum.DataBaseSetUpForTests;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.TestExecutionEvent;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CommentControllerTest {

    private final CommentController commentController;
    private final MockMvc mockMvc;
    private final DataBaseSetUpForTests dataBaseSetUpForTests;

    @Autowired
    public CommentControllerTest(CommentController commentController, MockMvc mockMvc, DataBaseSetUpForTests dataBaseSetUpForTests) {
        this.commentController = commentController;
        this.mockMvc = mockMvc;
        this.dataBaseSetUpForTests = dataBaseSetUpForTests;
    }

    @Test
    void contextLoad() {
        assertThat(commentController).isNotNull();
    }

    @Test
    @Transactional
    void getAll() throws Exception {
        dataBaseSetUpForTests.setUp();
        this.mockMvc.perform(get("/api/comments"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].text", is("Comment One")))
                .andExpect(jsonPath("$[1].text", is("Comment Two")));
    }

    @Test
    @Transactional
    void getTopicComments() throws Exception {
        dataBaseSetUpForTests.setUp();
        this.mockMvc.perform(get("/api/comments/{id}/{page}?limit=2", 5, 0))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].text", is("Comment One")));
    }

    @Test
    @Transactional
    void getCommentsByUserId() throws Exception {
        dataBaseSetUpForTests.setUp();
        this.mockMvc.perform(get("/api/comments/user/{id}/{page}?limit=2", 7, 0))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].text", is("Comment One")));
    }

    @Test
    @WithUserDetails(value = "ADMIN")
    void create() throws Exception {
        String newComment = "{ text: newComment, commentTopic: { id: 5 }}";

        this.mockMvc.perform(post("/api/comments").contentType(MediaType.APPLICATION_JSON).content(newComment))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(authenticated())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].text", is("newComment")));
    }

    @Test
    void update() {
    }

    @Test
    void likeComment() {
    }

    @Test
    void dislikeComment() {
    }

    @Test
    void delete() {
    }
}