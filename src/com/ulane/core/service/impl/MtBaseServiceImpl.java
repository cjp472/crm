package com.ulane.core.service.impl;

import com.ulane.core.dao.MtGenericDao;
import com.ulane.core.service.MtBaseService;

public class MtBaseServiceImpl<T> extends MtGenericServiceImpl<T, Long> implements MtBaseService<T> {

    @SuppressWarnings("unchecked")
    public MtBaseServiceImpl(MtGenericDao dao) {
        super(dao);
        // TODO Auto-generated constructor stub
    }

}
