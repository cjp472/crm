package com.ulane.supply.dao.stock.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.supply.dao.stock.ScBizOrderStockDao;
import com.ulane.supply.model.stock.ScBizOrderStock;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ScBizOrderStockDaoImpl extends BaseDaoImpl<ScBizOrderStock> implements ScBizOrderStockDao{

	public ScBizOrderStockDaoImpl() {
		super(ScBizOrderStock.class);
	}

}