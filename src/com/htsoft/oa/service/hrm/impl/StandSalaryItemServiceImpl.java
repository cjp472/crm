package com.htsoft.oa.service.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.StandSalaryItemDao;
import com.htsoft.oa.model.hrm.StandSalaryItem;
import com.htsoft.oa.service.hrm.StandSalaryItemService;

public class StandSalaryItemServiceImpl extends BaseServiceImpl<StandSalaryItem> implements StandSalaryItemService{
	private StandSalaryItemDao dao;
	
	public StandSalaryItemServiceImpl(StandSalaryItemDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<StandSalaryItem> getAllByStandardId(Long standardId) {
		return dao.getAllByStandardId(standardId);
	}

}