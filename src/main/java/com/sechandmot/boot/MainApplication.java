package com.sechandmot.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import com.sechandmot.boot.bean.User;
import com.sechandmot.boot.bean.Pet;
import com.sechandmot.boot.config.MyConfig;

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
    ConfigurableApplicationContext context = SpringApplication.run(MainApplication.class, args);

    // 容器的bean默认是单实例的，所以会相等
    Pet tom = context.getBean("tom", Pet.class);
    Pet tom2 = context.getBean("tom", Pet.class);
    System.out.println("------" + (tom == tom2));

    // 因为加了代理配置，此处拿到的是spring boot的代理对象 beancom.sechandmot.boot.config.MyConfig$$EnhancerBySpringCGLIB$$4f4c6169@1071aeac
    // 不加，则是普通对象，beancom.sechandmot.boot.config.MyConfig@4861b15
    MyConfig myConfigBean = context.getBean(MyConfig.class); // 这个MyConfig对象也是容器中的、单例的
    System.out.println("----this is myconifg bean" + myConfigBean);

    // 如果@Configuration(proxyBeanMethods = true)代理对象调用方法，spring boot总会检查这个组件是否在容器中有，有则不创
    // 即保证单实例
    // 如果设为false，tom3 tom4 就是新对象
    Pet tom3 = myConfigBean.getPetBean();
    Pet tom4 = myConfigBean.getPetBean();
    System.out.println("---- is tom3 == tom4 " + (tom3 == tom4)); // 开为true 不开为false

    User getUserBean = context.getBean("getUserBean", User.class);
    Pet tom5 = context.getBean("tom", Pet.class);
    System.out.println("用户宠物是否容器宠物:" + (getUserBean.getPet() == tom5));
  }
  
}
