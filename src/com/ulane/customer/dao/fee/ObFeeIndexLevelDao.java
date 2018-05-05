package com.ulane.customer.dao.fee;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.ulane.customer.model.fee.ObFeeIndexLevel;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface ObFeeIndexLevelDao extends BaseDao<ObFeeIndexLevel>{
	//查询个人订单销售额指标
	public String getSelfOrderIndex(String employeeid);
	
	//查询小组销售额指标和平均指标
	public String getGroupAndAvgIndex(String IDS);
	
}