package com.diploma.forum.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "Topics")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Topic_Title")
    private String title;

    @Column(name = "Topic_Description")
    private String description;

    @Column(name = "Topic_Text", length = 600)
    private String text;

    @Column(name = "Date_of_Creation")
    @JsonFormat(pattern = "dd-MM-YYYY Hh:mm")
    private LocalDateTime date;

    @Column(name = "Likes")
    private int likes;

    @JoinColumn(name = "Topic_Section")
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Section section;

    @JoinColumn(name = "Topic_Creator")
    @ManyToOne(fetch = FetchType.EAGER)
    private User creator;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "commentTopic", cascade = CascadeType.ALL)
    private List<Comment> topicComments = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "Topic_tags",
            joinColumns = @JoinColumn(name = "Topic"),
            inverseJoinColumns = @JoinColumn(name = "Tag")
    )
    @ToString.Exclude
    private Set<Tag> topicTags = new HashSet<>();


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Topic topic = (Topic) o;
        return id != null && Objects.equals(id, topic.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
