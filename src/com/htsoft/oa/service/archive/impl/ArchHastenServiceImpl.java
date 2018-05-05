package com.htsoft.oa.service.archive.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.archive.ArchHastenDao;
import com.htsoft.oa.model.archive.ArchHasten;
import com.htsoft.oa.service.archive.ArchHastenService;

public class ArchHastenServiceImpl extends BaseServiceImpl<ArchHasten> implements ArchHastenService{
	private ArchHastenDao dao;
	
	public ArchHastenServiceImpl(ArchHastenDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Date getLeastRecordByUser(Long archivesId) {
		return dao.getLeastRecordByUser(archivesId);
	}

}