package com.diploma.forum.sitemap;

import com.diploma.forum.repositories.SectionRepository;
import com.diploma.forum.repositories.TopicRepository;
import com.diploma.forum.repositories.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

@Service
public class SiteMapGenerator {

    private static final Logger LOGGER = LogManager.getLogger(SiteMapGenerator.class.getName());

    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;
    private final TopicRepository topicRepository;

    @Autowired
    public SiteMapGenerator(UserRepository userRepository, SectionRepository sectionRepository, TopicRepository topicRepository) {
        this.userRepository = userRepository;
        this.sectionRepository = sectionRepository;
        this.topicRepository = topicRepository;
    }

    public void createSiteMap() {
        try (FileWriter fw = new FileWriter("target/classes/static/sitemap.txt"); BufferedWriter bw = new BufferedWriter(fw)) {
            bw.write(sitemapText());
            bw.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String sitemapText() {
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("https://nice-forum.herokuapp.com/\n");
        stringBuffer.append("https://nice-forum.herokuapp.com/search\n");
        stringBuffer.append("https://nice-forum.herokuapp.com/create\n");
        stringBuffer.append("https://nice-forum.herokuapp.com/signin\n");
        stringBuffer.append("https://nice-forum.herokuapp.com/register\n");
        stringBuffer.append("https://nice-forum.herokuapp.com/about\n");
        userRepository.findAll().forEach(user -> stringBuffer.append("https://nice-forum.herokuapp.com/user/").append(user.getId()).append("\n"));
        topicRepository.findAll().forEach(topic -> stringBuffer.append("https://nice-forum.herokuapp.com/topic/").append(topic.getId()).append("\n"));
        sectionRepository.findAll().forEach(section -> stringBuffer.append("https://nice-forum.herokuapp.com/section/").append(section.getId()).append("\n"));
        return stringBuffer.toString();
    }

}