package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimMapNavigationDao;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimMapAgent;
import com.ulane.monitor.model.unim.UnimMapNavigation;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimMapNavigationDaoImpl extends BaseDaoImpl<UnimMapNavigation> implements UnimMapNavigationDao{

	public UnimMapNavigationDaoImpl() {
		super(UnimMapNavigation.class);
	}
	
	@Override
	public List<UnimMapNavigation> findByParentId(Long parentId) {
		final String hql = "from UnimMapNavigation d where d.parentid=? and d.status=? order by d.orderno";
		Object[] params ={(parentId==null || new Long(0).equals(parentId))?0L:parentId, UnimMapNavigation.STATUS_SHITU_QIYONG};
		return findByHql(hql, params);
	}
	
	@Override
	public void updateWhenRemoveMap(Long mapId) {
		final String hql = "from UnimMapNavigation d where d.mapId=?";
		Object[] params ={mapId};
		List<UnimMapNavigation> list = findByHql(hql, params);
		for (UnimMapNavigation d :list) {
			d.setMapId(null);
			super.merge(d);
		}
	}

}