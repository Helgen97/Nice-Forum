package com.diploma.forum;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ForumApplication {

    private static final Logger LOGGER = LogManager.getLogger(ForumApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ForumApplication.class, args);
        LOGGER.info("Forum application initialisation success.");
    }

}
