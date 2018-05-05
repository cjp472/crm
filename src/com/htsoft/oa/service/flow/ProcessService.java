package com.htsoft.oa.service.flow;

import javax.servlet.http.HttpServletRequest;

import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.model.flow.ProcessRun;


public interface ProcessService {
	/**
	 * 启动工作流  传入defId
	 * @param request
	 * @return
	 */
	public ProcessRun doStartFlow(HttpServletRequest request) throws Exception;
	/**
	 * 执行流程跳转下一步
	 * @param request
	 * @return
	 */
	public ProcessRun doNextFlow(HttpServletRequest request) throws Exception;
	/**
	 * 启动工作流  传入defId  没有request请求
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	public ProcessRun doStartFlowNoRequest(FlowRunInfo startInfo) throws Exception;
}
