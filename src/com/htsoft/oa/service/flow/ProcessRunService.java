package com.htsoft.oa.service.flow;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;
import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.action.flow.FlowRunInfo;

import com.htsoft.oa.model.flow.ProDefinition;

import com.htsoft.oa.model.flow.ProcessRun;

public interface ProcessRunService extends BaseService<ProcessRun> {

	public ProcessRun getInitNewProcessRun(ProDefinition proDefinition);

	/**
	 * 从流程运行提交的信息中初始化ProcessRun
	 * 
	 * @param runInfo
	 * @return
	 */
	public ProcessRun getInitFromFlowRunInfo(FlowRunInfo runInfo);

	/**
	 * 按流程的executionId取得流程的运行实例
	 * 
	 * @param exeId
	 * @return
	 */
	public ProcessRun getByExeId(String exeId);

	/**
	 * 按任务TaskId取得流程的运行实例
	 * 
	 * @param taskId
	 * @return
	 */
	public ProcessRun getByTaskId(String taskId);

	/**
	 * 
	 * @param piId
	 * @return
	 */
	public ProcessRun getByPiId(String piId);

//	/**
//	 * 完成任务，同时把数据保存至form_data表，记录该任务填写的表单数据
//	 * 
//	 * @param piId
//	 * @param transitionName
//	 * @param variables
//	 */
//	public ProcessRun saveAndNextStep(FlowRunInfo runInfo);

	/**
	 * 删除某一流程的所有实例
	 * 
	 * @param defId
	 *            流程定义的Id，则表pro_defintion的defId
	 */
	public void removeByDefId(Long defId);

	/**
	 * 按标题模糊查询某个用户所参与的流程列表
	 * 
	 * @param userId
	 * @param processName
	 * @param pb
	 * @return
	 */
	public List<ProcessRun> getByUserIdSubject(Long userId, String subject,
			PagingBean pb);

	/**
	 * 根据流程定义id查询对应的数据，如果存在：true,否则：false
	 * 
	 * @param defId
	 *            流程定义id
	 * @return 存在:true
	 */
	Boolean checkRun(Long defId);
	/**
	 * 统计流程的正在运行的实例数目
	 * @param defId
	 * @return
	 */
	public Integer countRunningProcess(Long defId);
	/**
	 * 结束实例及流程
	 * @param runId
	 * @return Integer
	 * @createtime  2012年9月7日17:12:47
	 * @author zhangyl
	 */
	public Integer end(String runId);
}
