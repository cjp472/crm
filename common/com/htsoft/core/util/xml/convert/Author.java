package com.htsoft.core.util.xml.convert;

public class Author
{
  private String name;
  private String code;

  public Author()
  {
  }

  public Author(String name, String code)
  {
    this.name = name;
    this.code = code;
  }

  public String getName() {
    return this.name; }

  public void setName(String name) {
    this.name = name; }

  public String getCode() {
    return this.code; }

  public void setCode(String code) {
    this.code = code;
  }
}
