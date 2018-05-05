package com.ulane.core.service;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.ulane.core.model.FlowResult;

public interface FlowResultService extends BaseService<FlowResult> {
	/**
	 * 更新为不通过的状态
	 */
	public void updateFlowResultStatus(Long runid, String status);

	// 工作流使用
	public Integer getFlowResultCount(String node, Long runid);

	/**
	 * 
	 * @param flowType
	 *            流程类型
	 * @param node
	 *            流程节点
	 * @param approveStatus
	 *            节点审批状态
	 * @return
	 */
	public Map<Long, FlowResult> getFlowResultMap(String flowType, String node,
			String approveStatus);

	// 工作流使用
	public List<FlowResult> getFlowResultPK(Long runid);

	public void flowResultHandle(FlowRunInfo flowInfo, Long PK, String flowType);

	public void deleteFlowResultInfo(Long runid);

	/**
	 * 获取指定人员的当前知识申请和关于知识申请的任务.
	 * 
	 * 
	 * @author zhanghao
	 * @param flowType
	 *            知识申请的工作流
	 * @param userId
	 *            查找的用户
	 * @return key表示知识申请的id，string存储该知识申请的流程信息，方便转化为json给extjs使用
	 */
	public Map<Long, String> getMyApplyAndMyTask(String flowType, Long userId);
}
