package com.htsoft.oa.service.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.FixedAssetsDao;
import com.htsoft.oa.model.admin.FixedAssets;
import com.htsoft.oa.service.admin.FixedAssetsService;

public class FixedAssetsServiceImpl extends BaseServiceImpl<FixedAssets> implements FixedAssetsService{
	private FixedAssetsDao dao;
	
	public FixedAssetsServiceImpl(FixedAssetsDao dao) {
		super(dao);
		this.dao=dao;
	}

}