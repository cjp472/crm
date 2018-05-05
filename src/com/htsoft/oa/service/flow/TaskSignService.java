package com.htsoft.oa.service.flow;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.TaskSign;

/**
 * @description 任务会签
 * @class TaskSignService
 * @author YHZ
 * @company www.ulane.cn
 * @data 2011-1-5PM
 * 
 */
public interface TaskSignService extends BaseService<TaskSign> {

	/**
	 * @description 根据assignId查询TaskSign对象
	 * @param assignId
	 *            assignId
	 * @return TaskSign
	 */
	public TaskSign findByAssignId(Long assignId);
}
