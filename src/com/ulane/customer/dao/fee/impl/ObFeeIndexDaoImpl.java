package com.ulane.customer.dao.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.customer.dao.fee.ObFeeIndexDao;
import com.ulane.customer.model.fee.ObFeeIndex;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObFeeIndexDaoImpl extends BaseDaoImpl<ObFeeIndex> implements ObFeeIndexDao{
	
	public ObFeeIndexDaoImpl() {
		super(ObFeeIndex.class);
	}

	@Override
	public Object findDepId(Long useid) {
		Object[] dep={useid};
		String hql="from ObFeeIndex vo where vo.ulEmployees.useid =?";
		return findUnique(hql,dep);
	}
}