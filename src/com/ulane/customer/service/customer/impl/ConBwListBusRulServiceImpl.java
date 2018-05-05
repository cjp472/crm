package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.ConBwListBusRulDao;
import com.ulane.customer.model.customer.ConBwListBusRul;
import com.ulane.customer.service.customer.ConBwListBusRulService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ConBwListBusRulServiceImpl extends BaseServiceImpl<ConBwListBusRul> implements ConBwListBusRulService{
	@SuppressWarnings("unused")
	private ConBwListBusRulDao dao;
	
	public ConBwListBusRulServiceImpl(ConBwListBusRulDao dao) {
		super(dao);
		this.dao=dao;
	}

}