package com.ulane.customer.service.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.ulane.customer.model.customer.CsOrder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface CsOrderService extends BaseService<CsOrder>{
	
	public Integer saveHeadId(FlowRunInfo flowRunInfo);

	public Integer saveRunId(FlowRunInfo flowRunInfo);
	
	public CsOrder save(FlowRunInfo flowRunInfo);
	
	public Map<Long, Boolean> getSelectId(int start, int limit, Long userId,
			String type, String firstId);
	
	/**
	 * 通过DefId取得开始节点的分支
	 * @author wangzhongjin
	 * @return
	 */
	public String startTrans(Long defId);
	/**
	 * 取得某个任务的处理用户
	 * @author wangzhongjin
	 * @return
	 */
	public String users(Long defId,String destName,Long userId);
	
	public Integer saveSoapHeadId(FlowRunInfo flowRunInfo);

	public Integer saveSoapRunId(FlowRunInfo flowRunInfo);

	public String saveSoapStart(FlowRunInfo flowRunInfo,AppUser curUser);
	/**
	 * 启动工作流  传入defId  没有request请求
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	public ProcessRun doStartFlowNoRequest(FlowRunInfo startInfo,AppUser curUser) throws Exception;
}


