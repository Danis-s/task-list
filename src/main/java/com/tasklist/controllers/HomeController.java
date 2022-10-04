package com.tasklist.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/api")
public class HomeController {

    @GetMapping(value = "/home")
    public ResponseEntity<String> info() {
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }
}
