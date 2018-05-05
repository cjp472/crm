package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.CusBusiInvokeDao;
import com.ulane.customer.model.customer.CusBusiInvoke;
import com.ulane.customer.service.customer.CusBusiInvokeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CusBusiInvokeServiceImpl extends BaseServiceImpl<CusBusiInvoke> implements CusBusiInvokeService{
	@SuppressWarnings("unused")
	private CusBusiInvokeDao dao;
	
	public CusBusiInvokeServiceImpl(CusBusiInvokeDao dao) {
		super(dao);
		this.dao=dao;
	}

}