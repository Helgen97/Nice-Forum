package com.diploma.forum.entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "Comments")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Comment_Creator")
    private User commentCreator;

    @Column(name = "Date_Of_Creation")
    private LocalDateTime dateCreation;

    @Column(name = "Comment_Text", length = 300)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Comment_Topic")
    @ToString.Exclude
    private Topic commentTopic;

    @Column(name = "Comment_Likes")
    private int likes;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Comment comment = (Comment) o;
        return id != null && Objects.equals(id, comment.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
