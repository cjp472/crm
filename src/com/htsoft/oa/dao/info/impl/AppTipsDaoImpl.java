package com.htsoft.oa.dao.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.info.AppTipsDao;
import com.htsoft.oa.model.info.AppTips;

public class AppTipsDaoImpl extends BaseDaoImpl<AppTips> implements AppTipsDao{

	public AppTipsDaoImpl() {
		super(AppTips.class);
	}

	@Override
	public List<AppTips> findByName(String name) {
		String hql="from AppTips vo where vo.tipsName=?";
		return findByHql(hql,new Object[]{name});
	}

}