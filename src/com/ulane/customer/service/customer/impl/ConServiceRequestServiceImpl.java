package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.ConServiceRequestDao;
import com.ulane.customer.model.customer.ConServiceRequest;
import com.ulane.customer.service.customer.ConServiceRequestService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ConServiceRequestServiceImpl extends BaseServiceImpl<ConServiceRequest> implements ConServiceRequestService{
	@SuppressWarnings("unused")
	private ConServiceRequestDao dao;
	
	public ConServiceRequestServiceImpl(ConServiceRequestDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<ConServiceRequest> listConServiceRequestByCusId(String customerId) {
		if(customerId == null || customerId.equals("")){
			return null;
		}else{
			return dao.listConServiceRequestByCusId(Long.parseLong(customerId));
		}
		
	}

}