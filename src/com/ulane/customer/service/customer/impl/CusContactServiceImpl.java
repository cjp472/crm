package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.CusContactDao;
import com.ulane.customer.model.customer.CusContact;
import com.ulane.customer.service.customer.CusContactService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CusContactServiceImpl extends BaseServiceImpl<CusContact> implements CusContactService{
	private CusContactDao dao;
	
	public CusContactServiceImpl(CusContactDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<CusContact> queryByCusId(Long cusId) {
		// TODO Auto-generated method stub
		return dao.queryByCusId(cusId);
	}

	@Override
	public String listCus(String cusId) {
		return dao.listCus(cusId);
	}

}