package com.htsoft.oa.service.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.SalaryPayoffDao;
import com.htsoft.oa.model.hrm.SalaryPayoff;
import com.htsoft.oa.service.hrm.SalaryPayoffService;

public class SalaryPayoffServiceImpl extends BaseServiceImpl<SalaryPayoff> implements SalaryPayoffService{
	private SalaryPayoffDao dao;
	
	public SalaryPayoffServiceImpl(SalaryPayoffDao dao) {
		super(dao);
		this.dao=dao;
	}

}