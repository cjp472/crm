package com.ulane.supply.service.goods.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.goods.ScGoodsPriceVersionDao;
import com.ulane.supply.model.goods.ScGoodsPriceVersion;
import com.ulane.supply.service.goods.ScGoodsPriceVersionService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScGoodsPriceVersionServiceImpl extends BaseServiceImpl<ScGoodsPriceVersion> implements ScGoodsPriceVersionService{
	@SuppressWarnings("unused")
	private ScGoodsPriceVersionDao dao;
	
	public ScGoodsPriceVersionServiceImpl(ScGoodsPriceVersionDao dao) {
		super(dao);
		this.dao=dao;
	}

}