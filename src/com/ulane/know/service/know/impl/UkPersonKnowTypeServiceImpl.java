package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkPersonKnowTypeDao;
import com.ulane.know.model.know.UkPersonKnowType;
import com.ulane.know.service.know.UkPersonKnowTypeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkPersonKnowTypeServiceImpl extends BaseServiceImpl<UkPersonKnowType> implements UkPersonKnowTypeService{
	@SuppressWarnings("unused")
	private UkPersonKnowTypeDao dao;
	
	public UkPersonKnowTypeServiceImpl(UkPersonKnowTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}