package com.htsoft.oa.service.task;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.task.WorkPlan;

public interface WorkPlanService extends BaseService<WorkPlan>{
	
	/**
	 * 查找部门分配的计划
	 */
	public List<WorkPlan> findByDepartment(WorkPlan workPlan,AppUser user,PagingBean pb);
	
	public void sendWorkPlanTime();
}


