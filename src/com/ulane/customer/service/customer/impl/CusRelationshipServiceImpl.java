package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.customer.dao.customer.CusRelationshipDao;
import com.ulane.customer.model.customer.CusRelationship;
import com.ulane.customer.service.customer.CusRelationshipService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CusRelationshipServiceImpl extends BaseServiceImpl<CusRelationship> implements CusRelationshipService{
	@SuppressWarnings("unused")
	private CusRelationshipDao dao;
	
	public CusRelationshipServiceImpl(CusRelationshipDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	@Override
	public String getCusRelation(String cusId,PagingBean pagBean) {
		return dao.getCusRelation(cusId,pagBean);
	}
}