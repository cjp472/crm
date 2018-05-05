package com.htsoft.oa.service.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.FormDef;
import com.htsoft.oa.model.flow.FormTable;

public interface FormDefService extends BaseService<FormDef>{
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
	
	public FormDef saveFormDef(FormDef formDef,Map<FormTable,String> datas);
}


