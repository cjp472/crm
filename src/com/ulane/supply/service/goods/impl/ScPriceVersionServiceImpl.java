package com.ulane.supply.service.goods.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.goods.ScPriceVersionDao;
import com.ulane.supply.model.goods.ScPriceVersion;
import com.ulane.supply.service.goods.ScPriceVersionService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScPriceVersionServiceImpl extends BaseServiceImpl<ScPriceVersion> implements ScPriceVersionService{
	@SuppressWarnings("unused")
	private ScPriceVersionDao dao;
	
	public ScPriceVersionServiceImpl(ScPriceVersionDao dao) {
		super(dao);
		this.dao=dao;
	}

}