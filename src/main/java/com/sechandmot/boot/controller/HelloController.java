package com.sechandmot.boot.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController // controller + responsebody
public class HelloController {
  @RequestMapping("/hello")
  public String hello() {
    return "hello";
  }
}
