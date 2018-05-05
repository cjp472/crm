package com.ulane.callout.dao.outb;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import java.util.Map;

import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.BaseDao;
import com.ulane.callout.model.outb.ObSaletask;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface ObSaletaskDao extends BaseDao<ObSaletask>{
	/**
	 * 营销任务饼图统计
	 * @param comId
	 * @return
	 */
	public String getTaskCount(String comId);
	
	public List<ObSaletask> getTaskByCusId(Long cusId);
	//计算拨打电话的次数
	public List<ObSaletask> getPhoneCount(String useId);
	
	/**
	 * 无查询条件下的查询
	 * @param comId
	 * @param busiStaId
	 * @param start
	 * @param limit
	 * @return
	 */
	public String queryTaskByComId(String comId,String busiStaId,int start,int limit);
	
	/**
	 * 有查询条件的查询
	 * @param comId
	 * @param busiStaId
	 * @param start
	 * @param limit
	 * @param queryParam
	 * @return
	 */
	public String queryTaskByComId(String comId,String busiStaId,int start,int limit,Map<String,String> queryParam);
	
}