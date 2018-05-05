package com.htsoft.oa.dao.flow.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.TaskSignDao;
import com.htsoft.oa.model.flow.TaskSign;

/**
 * @description 任务会签
 * @class TaskSignDaoImpl
 * @author YHZ
 * @company www.ulane.cn
 * @data 2011-1-5PM
 * 
 */
@SuppressWarnings("unchecked")
public class TaskSignDaoImpl extends BaseDaoImpl<TaskSign> implements
		TaskSignDao {

	public TaskSignDaoImpl() {
		super(TaskSign.class);
	}

	/**
	 * @description 根据assignId查询TaskSign对象数据
	 */
	@Override
	public TaskSign findByAssignId(Long assignId) {
		String hql = "from TaskSign ts where ts.proUserAssign.assignId=? ";
		return (TaskSign) findUnique(hql, new Object[] { assignId });
	}

}