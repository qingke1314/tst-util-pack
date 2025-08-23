package com.sechandmot.boot.bean;

public class User {
  private String name;
  private Pet pet;
  
  public String getName() { return this.name; }
  
  public void setName(String name) { this.name = name; }
  
  public Pet getPet() { return this.pet; }
  
  public void setPet(Pet pet) { this.pet = pet; }
  
  public User() {
  }

  public User(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "User{" +
        "name='" + name + '\'' +
        ", pet=" + pet +
        '}';
  }
}
