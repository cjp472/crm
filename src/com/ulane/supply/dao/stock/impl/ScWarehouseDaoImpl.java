package com.ulane.supply.dao.stock.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.supply.dao.stock.ScWarehouseDao;
import com.ulane.supply.model.stock.ScWarehouse;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ScWarehouseDaoImpl extends BaseDaoImpl<ScWarehouse> implements ScWarehouseDao{

	public ScWarehouseDaoImpl() {
		super(ScWarehouse.class);
	}

}