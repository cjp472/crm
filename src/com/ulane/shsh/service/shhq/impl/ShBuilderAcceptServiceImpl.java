package com.ulane.shsh.service.shhq.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.shsh.dao.shhq.ShBuilderAcceptDao;
import com.ulane.shsh.model.shhq.ShBuilderAccept;
import com.ulane.shsh.service.shhq.ShBuilderAcceptService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ShBuilderAcceptServiceImpl extends BaseServiceImpl<ShBuilderAccept> implements ShBuilderAcceptService{
	@SuppressWarnings("unused")
	private ShBuilderAcceptDao dao;
	
	public ShBuilderAcceptServiceImpl(ShBuilderAcceptDao dao) {
		super(dao);
		this.dao=dao;
	}

}