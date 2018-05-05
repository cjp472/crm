package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimMapAgentDao;
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
public class UnimMapAgentDaoImpl extends BaseDaoImpl<UnimMapAgent> implements UnimMapAgentDao{

	public UnimMapAgentDaoImpl() {
		super(UnimMapAgent.class);
	}
	
	@Override
	public List<UnimMapAgent> findByMapId(Long mapId) {
		final String hql = "from UnimMapAgent d where d.comp_id.mapId=?";
		Object[] params ={mapId};
		return findByHql(hql, params);
	}
	
	@Override
	public void removeWhenRemoveMap(Long mapId) {
		final String hql = "from UnimMapAgent d where d.comp_id.mapId=?";
		Object[] params ={mapId};
		List<UnimMapAgent> list = findByHql(hql, params);
		for (UnimMapAgent d :list) {
			super.remove(d);
		}
	}

}