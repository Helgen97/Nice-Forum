package com.diploma.forum.controllers;

import com.diploma.forum.sitemap.SiteMapGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @RequestMapping({"robots.txt"})
    public String getRobots() {

        return "robots.txt";
    }

    @RequestMapping({"sitemap.txt"})
    @ResponseBody
    public String getSitemap() {
        return siteMapGenerator.sitemapText();
    }


}