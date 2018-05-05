package com.htsoft.oa.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.CusLinkmanDao;
import com.htsoft.oa.model.customer.CusLinkman;
import com.htsoft.oa.service.customer.CusLinkmanService;

public class CusLinkmanServiceImpl extends BaseServiceImpl<CusLinkman> implements CusLinkmanService{
	private CusLinkmanDao dao;
	
	public CusLinkmanServiceImpl(CusLinkmanDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean checkMainCusLinkman(Long customerId, Long linkmanId) {
		return dao.checkMainCusLinkman(customerId, linkmanId);
	}

}