package com.htsoft.core.util;

import com.thoughtworks.xstream.converters.collections.MapConverter;
import com.thoughtworks.xstream.mapper.Mapper;
import org.hibernate.mapping.Map;

public class HibernateMapConverter extends MapConverter
{
  HibernateMapConverter(Mapper mapper)
  {
    super(mapper);
  }

  public boolean canConvert(Class type)
  {
    return ((super.canConvert(type)) || (type == Map.class));
  }
}