package com.htsoft.oa.dao.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.JobChangeDao;
import com.htsoft.oa.model.hrm.JobChange;

public class JobChangeDaoImpl extends BaseDaoImpl<JobChange> implements JobChangeDao{

	public JobChangeDaoImpl() {
		super(JobChange.class);
	}

}