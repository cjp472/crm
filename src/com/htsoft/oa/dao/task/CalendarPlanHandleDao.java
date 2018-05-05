package com.htsoft.oa.dao.task;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.task.CalendarPlan;
import com.htsoft.oa.model.task.CalendarPlanHandle;

/**
 * 
 * @author 
 *
 */
public interface CalendarPlanHandleDao extends BaseDao<CalendarPlanHandle>{
	public CalendarPlanHandle getHandleByPlan(Long planId);
}