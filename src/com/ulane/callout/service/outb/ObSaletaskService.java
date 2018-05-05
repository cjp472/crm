package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.model.outb.ObSaletask;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObSaletaskService extends BaseService<ObSaletask>{
	/**
	 * 营销任务饼图统计
	 * @param comId
	 * @return
	 */
	public String getTaskCount(String comId);	
	
	/**
	 * 通过客户ID查找营销任务
	 * @param cusId
	 * @return
	 */
	public  List<ObSaletask> getTaskByCusId(Long cusId);
	//计算拨打电话的次数
	public List<ObSaletask> getPhoneCount(String useId);
	
	/**
	 * 创建营销任务
	 * @param obConCalllist
	 * @param com
	 * @param calendarPlan
	 */
	public ObSaletask createTaskByConCalllist(ObConCalllist obConCalllist,ObCom com);
		
	/**
	 * 营销任务查询
	 * @param queryParam
	 * @return
	 */
	public String queryTaskByComId(Map<String,String> queryParam);
	
}


