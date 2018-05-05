package com.htsoft.oa.service.archive.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.archive.ArchivesDocDao;
import com.htsoft.oa.model.archive.ArchivesDoc;
import com.htsoft.oa.service.archive.ArchivesDocService;
public class ArchivesDocServiceImpl extends BaseServiceImpl<ArchivesDoc> implements ArchivesDocService{
	private ArchivesDocDao dao;
	
	public ArchivesDocServiceImpl(ArchivesDocDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<ArchivesDoc> findByAid(Long archivesId) {
		return dao.findByAid(archivesId);
	}

}