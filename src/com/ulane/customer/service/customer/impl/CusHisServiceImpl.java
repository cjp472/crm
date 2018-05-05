package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.CusHisDao;
import com.ulane.customer.model.customer.CusHis;
import com.ulane.customer.service.customer.CusHisService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CusHisServiceImpl extends BaseServiceImpl<CusHis> implements CusHisService{
	@SuppressWarnings("unused")
	private CusHisDao dao;
	
	public CusHisServiceImpl(CusHisDao dao) {
		super(dao);
		this.dao=dao;
	}

}