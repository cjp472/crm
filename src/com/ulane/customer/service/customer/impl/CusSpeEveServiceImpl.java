package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.CusSpeEveDao;
import com.ulane.customer.model.customer.CusSpeEve;
import com.ulane.customer.service.customer.CusSpeEveService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CusSpeEveServiceImpl extends BaseServiceImpl<CusSpeEve> implements CusSpeEveService{
	@SuppressWarnings("unused")
	private CusSpeEveDao dao;
	
	public CusSpeEveServiceImpl(CusSpeEveDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public String getEveByCusId(String cusId,String pagStart,String pageSize) {
		return dao.getEveByCusId(cusId,pagStart,pageSize);
	}

}