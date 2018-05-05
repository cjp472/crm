package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimMapNavigationDao;
import com.ulane.monitor.model.unim.UnimMapNavigation;
import com.ulane.monitor.service.unim.UnimMapNavigationService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimMapNavigationServiceImpl extends BaseServiceImpl<UnimMapNavigation> implements UnimMapNavigationService{
	@SuppressWarnings("unused")
	private UnimMapNavigationDao dao;
	
	public UnimMapNavigationServiceImpl(UnimMapNavigationDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimMapNavigation> findByParentId(Long parentId) {
		return dao.findByParentId(parentId);
	}

	@Override
	public void updateWhenRemoveMap(Long mapId) {
		dao.updateWhenRemoveMap(mapId);
	}

	
}