package com.htsoft.oa.service.arch.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.arch.ArchFondDao;
import com.htsoft.oa.model.arch.ArchFond;
import com.htsoft.oa.service.arch.ArchFondService;

public class ArchFondServiceImpl extends BaseServiceImpl<ArchFond> implements ArchFondService{
	@SuppressWarnings("unused")
	private ArchFondDao dao;
	
	public ArchFondServiceImpl(ArchFondDao dao) {
		super(dao);
		this.dao=dao;
	}

}