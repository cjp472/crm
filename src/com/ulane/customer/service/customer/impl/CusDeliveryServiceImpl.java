package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.CusDeliveryDao;
import com.ulane.customer.model.customer.CusDelivery;
import com.ulane.customer.service.customer.CusDeliveryService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CusDeliveryServiceImpl extends BaseServiceImpl<CusDelivery> implements CusDeliveryService{
	@SuppressWarnings("unused")
	private CusDeliveryDao dao;
	
	public CusDeliveryServiceImpl(CusDeliveryDao dao) {
		super(dao);
		this.dao=dao;
	}

}