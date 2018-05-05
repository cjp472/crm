package com.htsoft.oa.dao.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.StandSalaryItemDao;
import com.htsoft.oa.model.hrm.StandSalaryItem;

public class StandSalaryItemDaoImpl extends BaseDaoImpl<StandSalaryItem> implements StandSalaryItemDao{

	public StandSalaryItemDaoImpl() {
		super(StandSalaryItem.class);
	}

	@Override
	public List<StandSalaryItem> getAllByStandardId(Long standardId) {
		String hql = "from StandSalaryItem ssi where ssi.standSalary.standardId=?";
		return findByHql(hql, new Object[]{standardId});
	}

}