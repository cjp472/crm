package com.htsoft.oa.dao.task.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.task.CalendarPlanHandleDao;
import com.htsoft.oa.model.task.CalendarPlanHandle;

public class CalendarPlanHandleDaoImpl extends BaseDaoImpl<CalendarPlanHandle> implements CalendarPlanHandleDao{

	public CalendarPlanHandleDaoImpl() {
		super(CalendarPlanHandle.class);
	}

	@Override
	public CalendarPlanHandle getHandleByPlan(Long planId) {
		String hql = "from CalendarPlanHandle au where au.planId=?";
		Object[] params = {planId};
		List<CalendarPlanHandle> list = findByHql(hql, params);
		CalendarPlanHandle handle = null;
		if (list.size() != 0) {
			handle = list.get(0);
			
		}

		return handle;
	}
	
}