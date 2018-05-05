package com.htsoft.oa.dao.archive.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.archive.ArchivesDocDao;
import com.htsoft.oa.model.archive.ArchivesDoc;

public class ArchivesDocDaoImpl extends BaseDaoImpl<ArchivesDoc> implements ArchivesDocDao{

	public ArchivesDocDaoImpl() {
		super(ArchivesDoc.class);
	}

	@Override
	public List<ArchivesDoc> findByAid(Long archivesId) {
		String hql="from ArchivesDoc vo where vo.archives.archivesId=?";
		Object [] objs={archivesId};
		return findByHql(hql, objs);
	}

}