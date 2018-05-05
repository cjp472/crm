package com.ulane.supply.service.stock.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.stock.ScGoodsStockDao;
import com.ulane.supply.model.stock.ScGoodsStock;
import com.ulane.supply.service.stock.ScGoodsStockService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScGoodsStockServiceImpl extends BaseServiceImpl<ScGoodsStock> implements ScGoodsStockService{
	@SuppressWarnings("unused")
	private ScGoodsStockDao dao;
	
	public ScGoodsStockServiceImpl(ScGoodsStockDao dao) {
		super(dao);
		this.dao=dao;
	}

}