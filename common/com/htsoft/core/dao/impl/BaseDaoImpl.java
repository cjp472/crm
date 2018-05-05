package com.htsoft.core.dao.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;

/**
 * 
 * @author cf0666@gmail.com
 *
 * @param <T> 基础表类，对于主键为long类型　，则直接继承该类，若主键为其他类型，
 * 需要直接继承GenericDaoImpl
 */
public class BaseDaoImpl<T> extends GenericDaoImpl<T, Long> implements BaseDao<T>{

	public BaseDaoImpl(Class persistType) {
		super(persistType);
	}

}
