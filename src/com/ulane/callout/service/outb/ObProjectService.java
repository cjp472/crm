package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.ulane.callout.model.outb.ObProject;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObProjectService extends BaseService<ObProject>{
	
	public Integer saveHeadId(FlowRunInfo flowRunInfo);
	public Integer saveRunId(FlowRunInfo flowRunInfo);
	public ObProject save(FlowRunInfo flowRunInfo);
	
	/**
	 * 判断该项目下的所有活动是否已经关闭
	 */
	public boolean isStatusComs(Long projId,Short status);
	
	/**
	 * 停止该项目
	 */
	public void pauseProj(Long projId);
		
}


