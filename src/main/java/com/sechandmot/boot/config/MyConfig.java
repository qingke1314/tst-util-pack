package com.sechandmot.boot.config;

import com.sechandmot.boot.bean.User;
import com.sechandmot.boot.bean.Pet;
import com.sechandmot.boot.bean.Car;

import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 配置类里边使用@Bean标注在方法上给容器注册组件，默认是单实例的
 * proxyBeanMethods: 代理bean的方法，true为full全模式，false为light轻量模式
 */
@Configuration(proxyBeanMethods = false) // 告诉spring boot这是一个配置类
@EnableConfigurationProperties(Car.class) // 开启Car类的配置绑定功能
public class MyConfig {
  /**
   * 外部无论对配置类中的这个组件注册方法调用多少次获取的都是之前注册容器中的单实例对象
   * @return
   */
  @ConditionalOnBean(name = "petWangcai")
  @Bean
  public User userZhangsan() {
    User zhangsan = new User("张三");
    zhangsan.setPet(petWangcai());
    return zhangsan;
  }

  @Bean
  public Pet petWangcai() {
    return new Pet("旺财");
  }
}
