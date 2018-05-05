package com.ulane.supply.service.goods.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.goods.ScGoodsDao;
import com.ulane.supply.model.goods.ScGoods;
import com.ulane.supply.service.goods.ScGoodsService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class ScGoodsServiceImpl extends BaseServiceImpl<ScGoods> implements
		ScGoodsService {
	private ScGoodsDao dao;

	public ScGoodsServiceImpl(ScGoodsDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public List<ScGoods> getGoodsByNumber(String no) {
		// TODO Auto-generated method stub
		return dao.getGoodsByNumber(no);
	}

	@Override
	public List<ScGoods> getGoodsByOrderId(String orderId) {
		return dao.getGoodsByOrderId(orderId);
	}
}