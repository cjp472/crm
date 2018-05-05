package com.htsoft.oa.dao.task;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.task.PlanAttend;

/**
 * 
 * @author 
 *
 */
public interface PlanAttendDao extends BaseDao<PlanAttend>{
	/**
	 * 根据ID来查找参与人
	 * @param planId
	 * @return
	 */
	public List<PlanAttend> FindPlanAttend(Long planId,Short isDep,Short isPrimary);
}