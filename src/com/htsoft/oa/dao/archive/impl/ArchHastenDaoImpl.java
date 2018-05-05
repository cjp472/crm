package com.htsoft.oa.dao.archive.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.archive.ArchHastenDao;
import com.htsoft.oa.model.archive.ArchHasten;

public class ArchHastenDaoImpl extends BaseDaoImpl<ArchHasten> implements ArchHastenDao{

	public ArchHastenDaoImpl() {
		super(ArchHasten.class);
	}

	@Override
	public Date getLeastRecordByUser(Long archivesId) {
		String hql="from ArchHasten vo where vo.archives.archivesId=? order by vo.createtime desc";
		List<ArchHasten> list=findByHql(hql,new Object[]{archivesId});
		if(list.size()>0){
			return list.get(0).getCreatetime();
		}else{
			return null;
		}
	}

}