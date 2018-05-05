package com.htsoft.oa.service.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.InStockDao;
import com.htsoft.oa.model.admin.InStock;
import com.htsoft.oa.service.admin.InStockService;

public class InStockServiceImpl extends BaseServiceImpl<InStock> implements InStockService{
	private InStockDao dao;
	
	public InStockServiceImpl(InStockDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Integer findInCountByBuyId(Long buyId) {
		return dao.findInCountByBuyId(buyId);
	}

}