package com.htsoft.oa.service.flow.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.TaskSignDao;
import com.htsoft.oa.model.flow.TaskSign;
import com.htsoft.oa.service.flow.TaskSignService;

/**
 * @description 任务会签
 * @class TaskSignServiceImpl
 * @author YHZ
 * @company www.ulane.cn
 * @data 2011-1-5PM
 * 
 */
public class TaskSignServiceImpl extends BaseServiceImpl<TaskSign> implements TaskSignService {
	private TaskSignDao dao;

	public TaskSignServiceImpl(TaskSignDao dao) {
		super(dao);
		this.dao = dao;
	}
	
	/**
	 * @description 根据assignId查询TaskSign对象数据
	 */
	@Override
	public TaskSign findByAssignId(Long assignId) {
		return dao.findByAssignId(assignId);
	}

}