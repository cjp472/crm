package com.ulane.core.dao.impl;

import com.ulane.core.dao.MtBaseDao;

@SuppressWarnings("unchecked")
public class MtBaseDaoImpl<T> extends MtGenericDaoImpl<T, Long> implements MtBaseDao<T> {

    public MtBaseDaoImpl(Class persistType) {
        super(persistType);
        // TODO Auto-generated constructor stub
    }

}
