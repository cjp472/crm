package com.htsoft.oa.dao.flow;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.TaskSign;

/**
 * @description 任务会签
 * @class TaskSignDao
 * @author YHZ
 * @company www.ulane.cn
 * @data 2011-1-5PM
 * 
 */
public interface TaskSignDao extends BaseDao<TaskSign> {
	
	/**
	 * @description 根据assignId查询TaskSign数据
	 * @param assignId
	 *            assignId
	 * @return TaskSign
	 */
	public TaskSign findByAssignId(Long assignId);
}