package com.diploma.forum.mailCenter;

import com.diploma.forum.entities.User;
import com.diploma.forum.services.UserService;
import freemarker.template.Configuration;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@EnableScheduling
@PropertySource("classpath:application-prod.properties")
public class MailCenter {

    private static final Logger LOGGER = LogManager.getLogger(MailCenter.class.getName());

    private final JavaMailSender mailSender;
    private final Configuration fmConfiguration;
    private final UserService userService;

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    public MailCenter(JavaMailSender mailSender, Configuration configuration, UserService userService) {
        this.mailSender = mailSender;
        this.fmConfiguration = configuration;
        this.userService = userService;
    }

    @Scheduled(fixedRate = 300000L)
    public void sendWelcomeMessage() {
        List<User> newUsers = userService.findNewUsers();
        if (newUsers.size() == 0) return;
        newUsers.forEach(this::sendMessage);
    }


    public void sendMessage(User newUser) {
        MimeMessage mail = mailSender.createMimeMessage();
        MimeMessageHelper mailSettings = new MimeMessageHelper(mail, "utf-8");
        try {
            mailSettings.setFrom(from);
            mailSettings.setSubject(String.format("Welcome %s %s at Nice-Forum!", newUser.getFirstName(), newUser.getLastName()));
            mailSettings.setTo(newUser.getEmail());
            mailSettings.setText(getTextFromTemplate(createModel(newUser)), true);
            mailSender.send(mail);
        } catch (MessagingException ex) {
            LOGGER.error("Sending message error.", ex);
        }
    }

    private String getTextFromTemplate(Map<String, Object> model) {

        StringBuilder text = new StringBuilder();
        try {
            text.append(FreeMarkerTemplateUtils.processTemplateIntoString(fmConfiguration.getTemplate("mail/mailTemplate.flth"), model));
        } catch (Exception ex) {
            LOGGER.error("Error in mail template creation", ex);
        }
        return text.toString();
    }

    private Map<String, Object> createModel(User newUser) {
        Map<String, Object> model = new HashMap<>();
        model.put("nickname", newUser.getNickname());
        model.put("firstName", newUser.getFirstName());
        model.put("email", newUser.getEmail());
        return model;
    }
}
