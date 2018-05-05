package com.htsoft.oa.dao.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.RunData;

/**
 * 
 * @author 
 *
 */
public interface RunDataDao extends BaseDao<RunData>{

	/**
	 * 取得某个运行实例中某个字段的详细信息
	 * @param runId
	 * @param fieldName
	 * @return
	 */
	public RunData getByRunIdFieldName(Long runId,String fieldName);
	
	/**
	 * 取得某个流程对应的参数数据列表
	 * @param runId
	 * @return
	 */
	public List<RunData> getByRunId(Long runId);
}