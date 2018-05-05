package com.htsoft.core.util.xml.convert;

import com.thoughtworks.xstream.converters.SingleValueConverter;

public class AuthorConverter
  implements SingleValueConverter
{
  public boolean canConvert(Class type)
  {
    return type.equals(Author.class);
  }

  public Object fromString(String str)
  {
    String[] temp = str.split(",");
    Author author = new Author();
    author.setName(temp[0]);
    author.setCode(temp[1]);
    return author;
  }

  public String toString(Object obj)
  {
    return ((Author)obj).getName() + "," + ((Author)obj).getCode();
  }
}