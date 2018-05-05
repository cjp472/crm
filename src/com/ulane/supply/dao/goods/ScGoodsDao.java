package com.ulane.supply.dao.goods;

/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.supply.model.goods.ScGoods;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public interface ScGoodsDao extends BaseDao<ScGoods> {
	List<ScGoods> getGoodsByNumber(String no);

	List<ScGoods> getGoodsByOrderId(String orderId);
}