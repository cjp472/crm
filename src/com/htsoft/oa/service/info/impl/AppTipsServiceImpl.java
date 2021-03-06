package com.htsoft.oa.service.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.info.AppTipsDao;
import com.htsoft.oa.model.info.AppTips;
import com.htsoft.oa.service.info.AppTipsService;

public class AppTipsServiceImpl extends BaseServiceImpl<AppTips> implements AppTipsService{
	private AppTipsDao dao;
	
	public AppTipsServiceImpl(AppTipsDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public AppTips findByName(String name) {
		List<AppTips> list=dao.findByName(name);
		if(list.size()>0){
			return list.get(0);
		}
		return null;
	}

}