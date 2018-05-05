package com.ulane.shsh.service.shhq.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.shsh.dao.shhq.ShBuilderMethodDao;
import com.ulane.shsh.model.shhq.ShBuilderMethod;
import com.ulane.shsh.service.shhq.ShBuilderMethodService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ShBuilderMethodServiceImpl extends BaseServiceImpl<ShBuilderMethod> implements ShBuilderMethodService{
	@SuppressWarnings("unused")
	private ShBuilderMethodDao dao;
	
	public ShBuilderMethodServiceImpl(ShBuilderMethodDao dao) {
		super(dao);
		this.dao=dao;
	}

}