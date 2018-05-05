package com.htsoft.oa.service.personal.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.personal.DutySectionDao;
import com.htsoft.oa.model.personal.DutySection;
import com.htsoft.oa.service.personal.DutySectionService;

public class DutySectionServiceImpl extends BaseServiceImpl<DutySection> implements DutySectionService{
	private DutySectionDao dao;
	
	public DutySectionServiceImpl(DutySectionDao dao) {
		super(dao);
		this.dao=dao;
	}

}