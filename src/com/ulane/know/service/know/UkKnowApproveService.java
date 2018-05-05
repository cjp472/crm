package com.ulane.know.service.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.ulane.know.model.know.UkKnowApprove;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UkKnowApproveService extends BaseService<UkKnowApprove>{
	public Integer saveHeadId(FlowRunInfo flowRunInfo);
	public Integer saveRunId(FlowRunInfo flowRunInfo);
	public UkKnowApprove save(FlowRunInfo flowRunInfo);
}


