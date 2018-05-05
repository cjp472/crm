package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.CusCompanyDao;
import com.ulane.customer.model.customer.CusCompany;
import com.ulane.customer.service.customer.CusCompanyService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CusCompanyServiceImpl extends BaseServiceImpl<CusCompany> implements CusCompanyService{
	@SuppressWarnings("unused")
	private CusCompanyDao dao;
	
	public CusCompanyServiceImpl(CusCompanyDao dao) {
		super(dao);
		this.dao=dao;
	}

}