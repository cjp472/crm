package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.ConBwListTimeRulDao;
import com.ulane.customer.model.customer.ConBwListTimeRul;
import com.ulane.customer.service.customer.ConBwListTimeRulService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ConBwListTimeRulServiceImpl extends BaseServiceImpl<ConBwListTimeRul> implements ConBwListTimeRulService{
	@SuppressWarnings("unused")
	private ConBwListTimeRulDao dao;
	
	public ConBwListTimeRulServiceImpl(ConBwListTimeRulDao dao) {
		super(dao);
		this.dao=dao;
	}

}