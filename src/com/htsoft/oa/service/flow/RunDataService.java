package com.htsoft.oa.service.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/


import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.RunData;

public interface RunDataService extends BaseService<RunData>{
	
	/**
	 * 取得某个运行实例中某个字段的详细信息
	 * @param runId
	 * @param fieldName
	 * @return
	 */
	public RunData getByRunIdFieldName(Long runId,String fieldName);
	
	/**
	 * 保存流程实例对应的变量
	 * @param runId
	 * @param vars
	 */
	public void saveFlowVars(Long runId,Map<String,Object> vars);
	/**
	 * 取得某个流程对应的所有参数Map
	 * @param runId
	 * @return
	 */
	public Map<String,Object> getMapByRunId(Long runId);
}


