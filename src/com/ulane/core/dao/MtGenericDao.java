package com.ulane.core.dao;

import java.io.Serializable;
import java.util.List;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.web.paging.PagingBean;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface MtGenericDao<T,PK extends Serializable> extends GenericDao{
	public List<T> getMultiAll(QueryFilter filter,String hql);
}
