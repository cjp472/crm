package com.ulane.core.service;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.Serializable;
import java.util.List;

//import javax.jws.WebMethod;
//import javax.jws.WebService;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.GenericService;
/**
 * 
 * @author cf0666@gmail.com
 *
 * @param <T>
 * @param <PK>
 */
//@WebService
@SuppressWarnings("unchecked")
public interface MtGenericService<T,PK extends Serializable> extends GenericService {

	public List<T> getMultiAll(QueryFilter filter,String hql);
		
}
