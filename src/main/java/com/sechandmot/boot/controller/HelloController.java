package com.sechandmot.boot.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController // controller + responsebody
public class HelloController {
  @RequestMapping("/hello")
  public String hello(@RequestParam(value = "name", defaultValue = "张三") String name ) {
    // name 默认为张三
    return "hello " + name;
  }
}
