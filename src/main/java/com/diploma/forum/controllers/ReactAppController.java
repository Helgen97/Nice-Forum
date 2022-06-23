package com.diploma.forum.controllers;

import com.diploma.forum.sitemap.SiteMapGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactAppController implements ErrorController {

    private final SiteMapGenerator siteMapGenerator;

    @Autowired
    public ReactAppController(SiteMapGenerator siteMapGenerator) {
        this.siteMapGenerator = siteMapGenerator;
    }

    @RequestMapping(value = "*")
    public String getIndex() {
        return "index";
    }

    @RequestMapping({"/robots.txt"})
    public String getRobots() {

        return "robots.txt";
    }

    @RequestMapping({"/sitemap.txt"})
    public String getSitemap() {
        siteMapGenerator.createSiteMap();
        return "sitemap.txt";
    }


}