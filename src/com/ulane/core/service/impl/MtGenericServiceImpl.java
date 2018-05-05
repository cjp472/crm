package com.ulane.core.service.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.Serializable;
import java.util.List;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.service.impl.GenericServiceImpl;
import com.ulane.core.dao.MtGenericDao;
import com.ulane.core.service.MtGenericService;
//@WebService
@SuppressWarnings("unchecked")
public class MtGenericServiceImpl<T,PK extends Serializable> extends GenericServiceImpl implements MtGenericService<T, PK> {
    public MtGenericServiceImpl(MtGenericDao dao) {
        super(dao);
        // TODO Auto-generated constructor stub
    }

    protected MtGenericDao<T, Serializable> dao=null;

    /**
	 * 
	 */
	public List<T> getMultiAll(QueryFilter filter,String hql){
	    return dao.getMultiAll(filter, hql);
	}
	
}
