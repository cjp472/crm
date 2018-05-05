package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimChannelNavigationDao;
import com.ulane.monitor.model.unim.UnimChannelNavigation;
import com.ulane.monitor.service.unim.UnimChannelNavigationService;
/**
 * 
 * @author cf0666@gmail.com
 *
 *
 */

public class UnimChannelNavigationServiceImpl extends BaseServiceImpl<UnimChannelNavigation> implements UnimChannelNavigationService{
	@SuppressWarnings("unused")
	private UnimChannelNavigationDao dao;
	
	public UnimChannelNavigationServiceImpl(UnimChannelNavigationDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimChannelNavigation> findByParentId(Long parentId) {
		return dao.findByParentId(parentId);
	}

	@Override
	public void updateWhenRemoveMap(Long mapId) {
		dao.updateWhenRemoveMap(mapId);
	}

	@Override
	public void removeWhenRemoveMap(Long mapId) {
		dao.removeWhenRemoveMap(mapId);
	}

}