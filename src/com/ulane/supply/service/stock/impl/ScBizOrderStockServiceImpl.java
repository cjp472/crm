package com.ulane.supply.service.stock.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.stock.ScBizOrderStockDao;
import com.ulane.supply.model.stock.ScBizOrderStock;
import com.ulane.supply.service.stock.ScBizOrderStockService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScBizOrderStockServiceImpl extends BaseServiceImpl<ScBizOrderStock> implements ScBizOrderStockService{
	@SuppressWarnings("unused")
	private ScBizOrderStockDao dao;
	
	public ScBizOrderStockServiceImpl(ScBizOrderStockDao dao) {
		super(dao);
		this.dao=dao;
	}

}