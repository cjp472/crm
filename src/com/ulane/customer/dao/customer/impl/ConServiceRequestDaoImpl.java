package com.ulane.customer.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.customer.dao.customer.ConServiceRequestDao;
import com.ulane.customer.model.customer.ConServiceRequest;
import com.ulane.customer.model.customer.CusContact;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ConServiceRequestDaoImpl extends BaseDaoImpl<ConServiceRequest> implements ConServiceRequestDao{

	public ConServiceRequestDaoImpl() {
		super(ConServiceRequest.class);
	}

	@Override
	public List<ConServiceRequest> listConServiceRequestByCusId(Long customerId) {
		String hql = "from ConServiceRequest con where con.customer.customerId=? order by con.serviceRequestId desc";
		Object[] params = {customerId.longValue()};
		return findByHql(hql, params);
	}

}