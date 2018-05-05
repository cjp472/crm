package com.htsoft.oa.service.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.HireIssueDao;
import com.htsoft.oa.model.hrm.HireIssue;
import com.htsoft.oa.service.hrm.HireIssueService;

public class HireIssueServiceImpl extends BaseServiceImpl<HireIssue> implements HireIssueService{
	private HireIssueDao dao;
	
	public HireIssueServiceImpl(HireIssueDao dao) {
		super(dao);
		this.dao=dao;
	}

}