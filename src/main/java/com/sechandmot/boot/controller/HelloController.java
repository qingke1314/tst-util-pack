package com.sechandmot.boot.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import com.sechandmot.boot.bean.Car;

@RestController // controller + responsebody
public class HelloController {
  @Autowired
  private Car car;

  @RequestMapping("/car")
  public Car getCar() {
    return car;
  }

  @RequestMapping("/hello")
  public String hello() {
    return "hello";
  }
}
