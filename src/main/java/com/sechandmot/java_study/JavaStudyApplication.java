package com.sechandmot.java_study;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class JavaStudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavaStudyApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(defaultValue = "World") String name, @RequestParam(defaultValue = "18") String age) {
		return String.format("Hello %s, you are %s years old!", name, age);
	}
}
