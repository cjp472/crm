package com.htsoft.oa.dao.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.FormDef;

/**
 * 
 * @author 
 *
 */
public interface FormDefDao extends BaseDao<FormDef>{
	/**
	 * 取某流程对应的所有任务表单定义
	 * @param deployId
	 * @return
	 */
	public List<FormDef> getByDeployId(String deployId);
	
	/**
	 * 按流程定义ID及任务名称查找对应的表单定义
	 * @param deployId
	 * @param activityName
	 * @return
	 */
	public FormDef getByDeployIdActivityName(String deployId,String activityName);
}