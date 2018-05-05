package com.ulane.shsh.service.shhq.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.shsh.dao.shhq.ShBuilderTimeDao;
import com.ulane.shsh.model.shhq.ShBuilderTime;
import com.ulane.shsh.service.shhq.ShBuilderTimeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ShBuilderTimeServiceImpl extends BaseServiceImpl<ShBuilderTime> implements ShBuilderTimeService{
	@SuppressWarnings("unused")
	private ShBuilderTimeDao dao;
	
	public ShBuilderTimeServiceImpl(ShBuilderTimeDao dao) {
		super(dao);
		this.dao=dao;
	}

}