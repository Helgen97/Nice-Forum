package com.diploma.forum.entities;

public enum Role {
    ADMIN,
    MODERATOR,
    USER;


    @Override
    public String toString() {
        return "ROLE_" + name();
    }
}
