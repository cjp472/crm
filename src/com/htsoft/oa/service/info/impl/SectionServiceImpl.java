package com.htsoft.oa.service.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.info.SectionDao;
import com.htsoft.oa.model.info.Section;
import com.htsoft.oa.service.info.SectionService;

public class SectionServiceImpl extends BaseServiceImpl<Section> implements SectionService{
	@SuppressWarnings("unused")
	private SectionDao dao;
	
	public SectionServiceImpl(SectionDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Integer getLastColumn() {
		return dao.getLastColumn();
	}

}