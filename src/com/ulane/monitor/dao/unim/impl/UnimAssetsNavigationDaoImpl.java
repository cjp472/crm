package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimAssetsNavigationDao;
import com.ulane.monitor.model.unim.UnimAssetsNavigation;
import com.ulane.monitor.model.unim.UnimMapNavigation;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimAssetsNavigationDaoImpl extends BaseDaoImpl<UnimAssetsNavigation> implements UnimAssetsNavigationDao{

	public UnimAssetsNavigationDaoImpl() {
		super(UnimAssetsNavigation.class);
	}
	@Override
	public List<UnimAssetsNavigation> findByParentId(Long parentId) {
		final String hql = "from UnimAssetsNavigation d where d.parentid=?";
		Object[] params ={parentId};
		return findByHql(hql, params);
	}
	
	@Override
	public void updateWhenRemoveMap(Long mapId) {
		final String hql = "from UnimAssetsNavigation d where d.mapId=?";
		Object[] params ={mapId};
		List<UnimAssetsNavigation> list = findByHql(hql, params);
		for (UnimAssetsNavigation d :list) {
			d.setMapId(null);
			super.merge(d);
		}
	}

}