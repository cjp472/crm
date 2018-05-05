package com.htsoft.oa.service.archive.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.archive.ArchivesDepDao;
import com.htsoft.oa.model.archive.ArchivesDep;
import com.htsoft.oa.service.archive.ArchivesDepService;

public class ArchivesDepServiceImpl extends BaseServiceImpl<ArchivesDep> implements ArchivesDepService{
	private ArchivesDepDao dao;
	
	public ArchivesDepServiceImpl(ArchivesDepDao dao) {
		super(dao);
		this.dao=dao;
	}

}