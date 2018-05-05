package com.ulane.customer.service.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import javax.annotation.Resource;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlUsergroupDao;
import com.ulane.customer.dao.fee.ObFeeIndexLevelDao;
import com.ulane.customer.model.fee.ObFeeIndexLevel;
import com.ulane.customer.service.fee.ObFeeIndexLevelService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObFeeIndexLevelServiceImpl extends BaseServiceImpl<ObFeeIndexLevel> implements ObFeeIndexLevelService{
	@SuppressWarnings("unused")
	private ObFeeIndexLevelDao dao;
	@Resource
	private UlUsergroupDao ulUsergroupDao;
	
	public ObFeeIndexLevelServiceImpl(ObFeeIndexLevelDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Override
	public String getSelfOrderIndex(String employeeid) {
		return dao.getSelfOrderIndex(employeeid);
	}

	@Override
	public String getGroupAndAvgIndex(Long deptId) {
		String IDS = ulUsergroupDao.getCurrentGroupUserIDS(deptId);
		return dao.getGroupAndAvgIndex(IDS);
	}
}