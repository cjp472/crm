package com.ulane.supply.service.stock.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.stock.ScWarehouseDao;
import com.ulane.supply.model.stock.ScWarehouse;
import com.ulane.supply.service.stock.ScWarehouseService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScWarehouseServiceImpl extends BaseServiceImpl<ScWarehouse> implements ScWarehouseService{
	@SuppressWarnings("unused")
	private ScWarehouseDao dao;
	
	public ScWarehouseServiceImpl(ScWarehouseDao dao) {
		super(dao);
		this.dao=dao;
	}

}