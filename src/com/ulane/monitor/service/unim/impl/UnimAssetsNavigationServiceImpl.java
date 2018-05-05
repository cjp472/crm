package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAssetsNavigationDao;
import com.ulane.monitor.model.unim.UnimAssetsNavigation;
import com.ulane.monitor.service.unim.UnimAssetsNavigationService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimAssetsNavigationServiceImpl extends BaseServiceImpl<UnimAssetsNavigation> implements UnimAssetsNavigationService{
	@SuppressWarnings("unused")
	private UnimAssetsNavigationDao dao;
	
	public UnimAssetsNavigationServiceImpl(UnimAssetsNavigationDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimAssetsNavigation> findByParentId(Long parentId) {
		// TODO Auto-generated method stub
		return dao.findByParentId(parentId);
	}
	
	public void updateWhenRemoveMap(Long mapId) {
		dao.updateWhenRemoveMap(mapId);
	}

	

}