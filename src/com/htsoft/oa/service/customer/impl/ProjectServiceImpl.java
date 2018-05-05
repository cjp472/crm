package com.htsoft.oa.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.ProjectDao;
import com.htsoft.oa.model.customer.Project;
import com.htsoft.oa.service.customer.ProjectService;

public class ProjectServiceImpl extends BaseServiceImpl<Project> implements ProjectService{
	private ProjectDao dao;
	
	public ProjectServiceImpl(ProjectDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean checkProjectNo(String projectNo) {
		return dao.checkProjectNo(projectNo);
	}

}