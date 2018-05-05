package com.htsoft.oa.service.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.TaskSignData;

public interface TaskSignDataService extends BaseService<TaskSignData>{
	/**
	 * 为JBPM任务加上一投票
	 * @param taskId  任务ID 
	 * @param isAgree 是否同意票
	 */
	public void addVote(String taskId,Short isAgree);
	
	/**
	 * 返回某个（父）任务的投票情况
	 * @param taskId 任务ID
	 * @param isAgree 是否同意
	 * @return
	 */
	public Long getVoteCounts(String taskId,Short isAgree);
	
	/**
	 * 取得某任务对应的会签投票情况
	 * @param taskId
	 * @return
	 */
	public List<TaskSignData> getByTaskId(String taskId);
}


