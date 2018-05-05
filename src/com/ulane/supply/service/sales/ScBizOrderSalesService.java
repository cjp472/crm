package com.ulane.supply.service.sales;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.ulane.supply.model.sales.ScBizOrderSales;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public interface ScBizOrderSalesService extends BaseService<ScBizOrderSales> {
	// /**
	// * 获取历史订单
	// */
	// public String getHistoryOrders(String cusId);

	public void jieSuan(ScBizOrderSales scBizOrderSales, String JiFen,
			String ZanCunKuan, String ChuZhiJin, String s1, String s2,
			String left);

	public Integer saveHeadId(FlowRunInfo flowRunInfo);

	public ScBizOrderSales save(FlowRunInfo flowRunInfo);
	
	public Integer saveRunId(FlowRunInfo flowRunInfo);

	public Map<Long, Boolean> getSelectId(int start, int limit, Long userId,
			String type, String firstId);
}
