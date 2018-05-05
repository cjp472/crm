package com.htsoft.oa.dao.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.IndexDisplayDao;
import com.htsoft.oa.model.system.IndexDisplay;

public class IndexDisplayDaoImpl extends BaseDaoImpl<IndexDisplay> implements IndexDisplayDao{

	public IndexDisplayDaoImpl() {
		super(IndexDisplay.class);
	}

	@Override
	public List<IndexDisplay> findByUser(Long userId) {
		String hql="from IndexDisplay vo where vo.appUser.userId=?";
		return findByHql(hql,new Object[]{userId});
	}

}