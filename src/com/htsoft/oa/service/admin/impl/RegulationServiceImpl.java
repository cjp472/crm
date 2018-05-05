package com.htsoft.oa.service.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.RegulationDao;
import com.htsoft.oa.model.admin.Regulation;
import com.htsoft.oa.service.admin.RegulationService;

public class RegulationServiceImpl extends BaseServiceImpl<Regulation> implements RegulationService{
	@SuppressWarnings("unused")
	private RegulationDao dao;
	
	public RegulationServiceImpl(RegulationDao dao) {
		super(dao);
		this.dao=dao;
	}

}