package com.ulane.supply.service.goods.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.goods.ScGoodsPriceHisDao;
import com.ulane.supply.model.goods.ScGoodsPriceHis;
import com.ulane.supply.service.goods.ScGoodsPriceHisService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScGoodsPriceHisServiceImpl extends BaseServiceImpl<ScGoodsPriceHis> implements ScGoodsPriceHisService{
	@SuppressWarnings("unused")
	private ScGoodsPriceHisDao dao;
	
	public ScGoodsPriceHisServiceImpl(ScGoodsPriceHisDao dao) {
		super(dao);
		this.dao=dao;
	}

}