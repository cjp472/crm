package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.BeanObjectColumnsDao;
import com.ulane.base.model.xitong.BeanObjectColumns;
import com.ulane.base.service.xitong.BeanObjectColumnsService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class BeanObjectColumnsServiceImpl extends BaseServiceImpl<BeanObjectColumns> implements BeanObjectColumnsService{
	@SuppressWarnings("unused")
	private BeanObjectColumnsDao dao;
	
	public BeanObjectColumnsServiceImpl(BeanObjectColumnsDao dao) {
		super(dao);
		this.dao=dao;
	}

}