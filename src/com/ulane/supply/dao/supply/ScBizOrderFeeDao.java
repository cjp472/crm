package com.ulane.supply.dao.supply;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.ulane.supply.model.supply.ScBizOrderFee;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface ScBizOrderFeeDao extends BaseDao<ScBizOrderFee>{
	/**
	 * 获取坐席销售额
	 */
	public String getPersonalSaleFee(Long userId);
	
	/**
	 * 获取坐席所在小组的所有销售额综合及平均值
	 */
	public String getGroupAndAvgSaleFee(String IDS);
}