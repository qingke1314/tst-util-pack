package com.sechandmot.boot.bean;

import org.springframework.boot.context.properties.ConfigurationProperties;

// @Component // 只有容器中的组件才能拥有@ConfigurationProperties的功能
@ConfigurationProperties(prefix = "mycar") // 从application.properties文件中读取属性
public class Car {
  private String brand;
  private Integer price;

  public String getBrand() { return this.brand; }
  public Integer getPrice() { return this.price; }
  public void setBrand(String brand) { this.brand = brand; }
  public void setPrice(Integer price) { this.price = price; }
  public Car() {
  }
  public Car(String brand, Integer price) {
    this.brand = brand;
    this.price = price;
  }
  @Override
  public String toString() {
    return "Car [brand=" + brand + ", price=" + price + "]";
  }

}
