package com.htsoft.core.util;

import java.util.List;
import java.util.Set;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;

public final class DozerHelper<T>
{
  Mapper mapper = new DozerBeanMapper();

  public T convert(T o)
  {
    if (o == null) {
      return null;
    }
    return (T) this.mapper.map(o, o.getClass());
  }

  public List<T> convert(List<T> o)
  {
    if (o == null) {
      return null;
    }
    return ((List)this.mapper.map(o, o.getClass()));
  }

  public Set<T> convert(Set<T> o)
  {
    if (o == null) {
      return null;
    }
    return ((Set)this.mapper.map(o, o.getClass()));
  }

  public static void main(String[] args)
    throws Exception
  {
  }
}