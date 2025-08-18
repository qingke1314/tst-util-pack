package com.sechandmot.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 主程序类
 * @SpringBootApplication 是一个组合注解，包含了 @Configuration、@EnableAutoConfiguration、@ComponentScan 三个注解
 * @Configuration 表示这是一个配置类，会被 Spring 扫描到
 * @EnableAutoConfiguration 表示开启自动配置，会根据项目的依赖自动配置 Spring 容器
 * @ComponentScan 表示开启组件扫描，会扫描当前包及其子包下的所有组件
 */
@SpringBootApplication
public class MainApplication {
  public static void main(String[] args) {
    SpringApplication.run(MainApplication.class, args);
  }
}
