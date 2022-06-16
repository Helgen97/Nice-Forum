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

}