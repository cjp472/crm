package com.ulane.supply.service.supply.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import javax.annotation.Resource;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlUsergroupDao;
import com.ulane.supply.dao.supply.ScBizOrderFeeDao;
import com.ulane.supply.model.supply.ScBizOrderFee;
import com.ulane.supply.service.supply.ScBizOrderFeeService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class ScBizOrderFeeServiceImpl extends BaseServiceImpl<ScBizOrderFee>
		implements ScBizOrderFeeService {
	@SuppressWarnings("unused")
	private ScBizOrderFeeDao dao;
	@Resource
	private UlUsergroupDao ulUsergroupDao;

	public ScBizOrderFeeServiceImpl(ScBizOrderFeeDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public String getPersonalSaleFee(Long userId) {
		return dao.getPersonalSaleFee(userId);
	}

	@Override
	public String getGroupAndAvgSaleFee(Long deptId) {
		String IDS = ulUsergroupDao.getCurrentGroupUserIDS(deptId);
		return dao.getGroupAndAvgSaleFee(IDS);
	}

}