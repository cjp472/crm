package com.htsoft.oa.service.task.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.task.CalendarPlanHandleDao;
import com.htsoft.oa.model.task.CalendarPlanHandle;
import com.htsoft.oa.service.task.CalendarPlanHandleService;

public class CalendarPlanHandleServiceImpl extends BaseServiceImpl<CalendarPlanHandle> implements CalendarPlanHandleService{
	private CalendarPlanHandleDao dao;
	
	public CalendarPlanHandleServiceImpl(CalendarPlanHandleDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public CalendarPlanHandle getHandleByPlan(Long planId) {
		// TODO Auto-generated method stub
		return dao.getHandleByPlan(planId);
	}

}