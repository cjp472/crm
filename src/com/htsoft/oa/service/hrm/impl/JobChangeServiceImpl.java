package com.htsoft.oa.service.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.JobChangeDao;
import com.htsoft.oa.model.hrm.JobChange;
import com.htsoft.oa.service.hrm.JobChangeService;

public class JobChangeServiceImpl extends BaseServiceImpl<JobChange> implements JobChangeService{
	private JobChangeDao dao;
	
	public JobChangeServiceImpl(JobChangeDao dao) {
		super(dao);
		this.dao=dao;
	}

}