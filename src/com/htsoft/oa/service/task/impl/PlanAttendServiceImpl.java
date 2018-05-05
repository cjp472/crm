package com.htsoft.oa.service.task.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.task.PlanAttendDao;
import com.htsoft.oa.model.task.PlanAttend;
import com.htsoft.oa.service.task.PlanAttendService;

public class PlanAttendServiceImpl extends BaseServiceImpl<PlanAttend> implements PlanAttendService{
	private PlanAttendDao dao;
	
	public PlanAttendServiceImpl(PlanAttendDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean deletePlanAttend(Long planId,Short isDep,Short isPrimary) {
		List<PlanAttend> list=dao.FindPlanAttend(planId,isDep,isPrimary);
		for(PlanAttend pa:list){
			dao.remove(pa.getAttendId());
		}
		return true;
	}

}