package com.diploma.forum.controllers;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactAppController implements ErrorController {

    @RequestMapping("*")
    public String getIndex() {

        return "index";
    }

//    Static files endpoints

    @RequestMapping("robots.txt")
    public String getRobots() {

        return "robots.txt";
    }

    @RequestMapping("sitemap.txt")
    public String getSiteMap() {

        return "sitemap.txt";
    }

    @RequestMapping("favicon.ico")
    public String getFaviconIco() {

        return "favicon.ico";
    }

    @RequestMapping("favicon.png")
    public String getFaviconPng() {

        return "favicon.png";
    }

    @RequestMapping("apple-touch-icon-precomposed.png")
    public String getAppleTouchIconPrecomposed() {

        return "apple-touch-icon-precomposed.png";
    }

    @RequestMapping("apple-touch-icon-180x180-precomposed.png")
    public String getAppleTouchIcon180x180Precomposed() {

        return "apple-touch-icon-180x180-precomposed.png";
    }

    @RequestMapping("apple-touch-icon-152x152-precomposed.png")
    public String getAppleTouchIcon152x152Precomposed() {

        return "apple-touch-icon-152x152-precomposed.png";
    }

    @RequestMapping("apple-touch-icon-144x144-precomposed.png")
    public String getAppleTouchIcon144x144Precomposed() {

        return "apple-touch-icon-144x144-precomposed.png";
    }

    @RequestMapping("apple-touch-icon-114x114-precomposed.png")
    public String getAppleTouchIcon114x114Precomposed() {

        return "apple-touch-icon-114x114-precomposed.png";
    }

    @RequestMapping("apple-touch-icon-72x72-precomposed.png")
    public String getAppleTouchIcon72x72Precomposed() {

        return "apple-touch-icon-72x72-precomposed.png";
    }

}