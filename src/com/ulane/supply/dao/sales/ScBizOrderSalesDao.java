package com.ulane.supply.dao.sales;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Map;

import com.htsoft.core.dao.BaseDao;
import com.ulane.supply.model.sales.ScBizOrderSales;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface ScBizOrderSalesDao extends BaseDao<ScBizOrderSales>{
//	/**
//	 * 获取历史订单
//	 */
//	public String getHistoryOrders(String cusId);
	
	void saveRunidAndNodeName(Long runId, String nodeName, Long headerId);

	void updateStatusByNodeName(String status, Long headerId, boolean isEnd);

	public Map<Long, Boolean> getSelectId(int start, int limit, Long userId,
			String type, String firstId);

}