package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.ConLanjieDao;
import com.ulane.customer.model.customer.ConLanjie;
import com.ulane.customer.service.customer.ConLanjieService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ConLanjieServiceImpl extends BaseServiceImpl<ConLanjie> implements ConLanjieService{
	@SuppressWarnings("unused")
	private ConLanjieDao dao;
	
	public ConLanjieServiceImpl(ConLanjieDao dao) {
		super(dao);
		this.dao=dao;
	}

}