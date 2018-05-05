package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimChannelNavigationDao;
import com.ulane.monitor.model.unim.UnimChannelNavigation;
import com.ulane.monitor.model.unim.UnimMapAgent;
import com.ulane.monitor.model.unim.UnimMapNavigation;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimChannelNavigationDaoImpl extends BaseDaoImpl<UnimChannelNavigation> implements UnimChannelNavigationDao{

	public UnimChannelNavigationDaoImpl() {
		super(UnimChannelNavigation.class);
	}
	@Override
	public List<UnimChannelNavigation> findByParentId(Long parentId) {
		if(null!=parentId) {
			final String hql = "from UnimChannelNavigation d where d.parentid=?";
			Object[] params ={parentId};
			return findByHql(hql, params);
		} else {
			final String hql = "from UnimChannelNavigation d ";
			return findByHql(hql);
		}
	}
	@Override
	public void updateWhenRemoveMap(Long mapId) {
		final String hql = "from UnimChannelNavigation d where d.mapId=?";
		Object[] params ={mapId};
		List<UnimChannelNavigation> list = findByHql(hql, params);
		for (UnimChannelNavigation d :list) {
			d.setMapId(null);
			super.merge(d);
		}		
	}
	@Override
	public void removeWhenRemoveMap(Long mapId) {
		final String SQL = "delete from UNIM_CHANNEL_MAP_MONITOR where map_id="+mapId;
		jdbcTemplate.execute(SQL);
	}

}