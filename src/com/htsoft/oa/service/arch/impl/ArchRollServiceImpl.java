package com.htsoft.oa.service.arch.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.arch.ArchRollDao;
import com.htsoft.oa.model.arch.ArchRoll;
import com.htsoft.oa.service.arch.ArchRollService;

public class ArchRollServiceImpl extends BaseServiceImpl<ArchRoll> implements ArchRollService{
	@SuppressWarnings("unused")
	private ArchRollDao dao;
	
	public ArchRollServiceImpl(ArchRollDao dao) {
		super(dao);
		this.dao=dao;
	}

}