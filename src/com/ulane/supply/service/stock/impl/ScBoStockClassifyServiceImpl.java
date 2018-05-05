package com.ulane.supply.service.stock.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.stock.ScBoStockClassifyDao;
import com.ulane.supply.model.stock.ScBoStockClassify;
import com.ulane.supply.service.stock.ScBoStockClassifyService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScBoStockClassifyServiceImpl extends BaseServiceImpl<ScBoStockClassify> implements ScBoStockClassifyService{
	@SuppressWarnings("unused")
	private ScBoStockClassifyDao dao;
	
	public ScBoStockClassifyServiceImpl(ScBoStockClassifyDao dao) {
		super(dao);
		this.dao=dao;
	}

}