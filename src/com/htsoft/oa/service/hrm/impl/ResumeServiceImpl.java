package com.htsoft.oa.service.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.ResumeDao;
import com.htsoft.oa.model.hrm.Resume;
import com.htsoft.oa.service.hrm.ResumeService;

public class ResumeServiceImpl extends BaseServiceImpl<Resume> implements ResumeService{
	private ResumeDao dao;
	
	public ResumeServiceImpl(ResumeDao dao) {
		super(dao);
		this.dao=dao;
	}

}