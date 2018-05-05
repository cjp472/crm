package com.ulane.customer.dao.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.ulane.customer.model.customer.CusSpeEve;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface CusSpeEveDao extends BaseDao<CusSpeEve>{
	/**
	 * 根据客户ID查询特殊事项列表
	 * @param cusId
	 * @return
	 */
	public String getEveByCusId(String cusId,String pagStart,String pageSize);
}