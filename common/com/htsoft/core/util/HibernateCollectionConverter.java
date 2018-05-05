package com.htsoft.core.util;

import com.thoughtworks.xstream.converters.collections.CollectionConverter;
import com.thoughtworks.xstream.mapper.Mapper;
import org.hibernate.mapping.List;
import org.hibernate.mapping.Set;

public class HibernateCollectionConverter extends CollectionConverter
{
  HibernateCollectionConverter(Mapper mapper)
  {
    super(mapper);
  }

  public boolean canConvert(Class type)
  {
    return ((super.canConvert(type)) || (type == List.class) || (type == Set.class));
  }
}
