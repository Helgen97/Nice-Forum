package com.diploma.forum.repositories;

import com.diploma.forum.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);

    User findUserByNickname(String nickname);

    @Query("select u from User u where u.isNotified = ?1")
    List<User> findUsersByNotified(boolean isNotified);
}
