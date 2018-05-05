package com.htsoft.oa.dao.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.ResumeDao;
import com.htsoft.oa.model.hrm.Resume;

public class ResumeDaoImpl extends BaseDaoImpl<Resume> implements ResumeDao{

	public ResumeDaoImpl() {
		super(Resume.class);
	}

}