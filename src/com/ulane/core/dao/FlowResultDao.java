package com.ulane.core.dao;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.core.model.FlowResult;

/**
 * 
 * @author 
 *
 */
public interface FlowResultDao extends BaseDao<FlowResult>{
	
	public void updateFlowResultStatus(Long runid,String status);
	
	public Integer getFlowResultCount(String node, Long runid);
	
	public List<FlowResult> getFlowResultPK(Long runid);
	
	public List<FlowResult> getFlowResultMap(String flowType, String node,String approveStatus);
	
	public void deleteFlowResultInfo(Long runid);
}