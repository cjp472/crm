package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.ServiceWsdlMethodDao;
import com.ulane.base.model.xitong.ServiceWsdlMethod;
import com.ulane.base.service.xitong.ServiceWsdlMethodService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ServiceWsdlMethodServiceImpl extends BaseServiceImpl<ServiceWsdlMethod> implements ServiceWsdlMethodService{
	@SuppressWarnings("unused")
	private ServiceWsdlMethodDao dao;
	
	public ServiceWsdlMethodServiceImpl(ServiceWsdlMethodDao dao) {
		super(dao);
		this.dao=dao;
	}

}