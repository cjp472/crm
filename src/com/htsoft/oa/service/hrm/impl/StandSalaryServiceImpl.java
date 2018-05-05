package com.htsoft.oa.service.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.StandSalaryDao;
import com.htsoft.oa.model.hrm.StandSalary;
import com.htsoft.oa.service.hrm.StandSalaryService;

public class StandSalaryServiceImpl extends BaseServiceImpl<StandSalary> implements StandSalaryService{
	private StandSalaryDao dao;
	
	public StandSalaryServiceImpl(StandSalaryDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean checkStandNo(String standardNo) {
		return dao.checkStandNo(standardNo);
	}

	@Override
	public List<StandSalary> findByPassCheck() {
		return dao.findByPassCheck();
	}

}