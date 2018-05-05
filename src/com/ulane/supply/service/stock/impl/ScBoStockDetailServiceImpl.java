package com.ulane.supply.service.stock.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.stock.ScBoStockDetailDao;
import com.ulane.supply.model.stock.ScBoStockDetail;
import com.ulane.supply.service.stock.ScBoStockDetailService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScBoStockDetailServiceImpl extends BaseServiceImpl<ScBoStockDetail> implements ScBoStockDetailService{
	@SuppressWarnings("unused")
	private ScBoStockDetailDao dao;
	
	public ScBoStockDetailServiceImpl(ScBoStockDetailDao dao) {
		super(dao);
		this.dao=dao;
	}

}