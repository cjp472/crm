package com.ulane.supply.service.goods.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.goods.ScPurchasePriceDao;
import com.ulane.supply.model.goods.ScPurchasePrice;
import com.ulane.supply.service.goods.ScPurchasePriceService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScPurchasePriceServiceImpl extends BaseServiceImpl<ScPurchasePrice> implements ScPurchasePriceService{
	@SuppressWarnings("unused")
	private ScPurchasePriceDao dao;
	
	public ScPurchasePriceServiceImpl(ScPurchasePriceDao dao) {
		super(dao);
		this.dao=dao;
	}

}