package com.htsoft.oa.service.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.RegionDetailDao;
import com.htsoft.oa.model.system.RegionDetail;
import com.htsoft.oa.service.system.RegionDetailService;

public class RegionDetailServiceImpl extends BaseServiceImpl<RegionDetail>
		implements RegionDetailService {
	private RegionDetailDao dao;

	public RegionDetailServiceImpl(RegionDetailDao dao) {
		super(dao);
		this.dao = dao;
	}

}