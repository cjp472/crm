package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.ResultSet;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.util.FillData;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.monitor.dao.unim.UnimAssetsMapDao;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimAssetsMap;
import com.ulane.monitor.model.unim.UnimChannelMap;
import com.ulane.monitor.model.unim.UnimChannelNavigation;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimAssetsMapDaoImpl extends BaseDaoImpl<UnimAssetsMap> implements UnimAssetsMapDao{

	public UnimAssetsMapDaoImpl() {
		super(UnimAssetsMap.class);
	}


	@Override
	public void removeWhenRemoveMap(Long mapId) {
		final String hql = "from UnimAssetsMap d where d.comp_id.mapId=?";
		Object[] params ={mapId};
		List<UnimAssetsMap> list = findByHql(hql, params);
		for (UnimAssetsMap d :list) {
			super.remove(d);
		}
	}
	

	//授权地图
	@Override	
	public UnimAssetsMap getUnimAssetsMapByNavigationId2(Long navigationId,
			Long monitorId) throws Exception {
		String SQL = "select a.* from UNIM_ASSETS_MAP a where a.map_id in (select b.map_id from  UNIM_ASSETS_MAP_MONITOR b "+
					 " where b.map_id in(select c.map_id from UNIM_ASSETS_NAVIGATION c where  c.map_nav_id="+navigationId+"))";
		JdbcHelper callBack = new JdbcHelper();
		callBack.setSql(SQL);
		logger.debug("sql : " + SQL);

		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				return FillData.fillDataJDBC(rs, UnimAssetsMap.class);
			}
		};
		callBack.setJdbcWork(sqlWork);
		List<UnimAssetsMap> list2 = (List<UnimAssetsMap>) getHibernateTemplate().execute(callBack);
		return 	list2.get(0);
	}
	//导航对应地图
	@Override	
	public UnimAssetsMap getUnimAssetsMapByNavigationId(Long navigationId,
			Long monitorId)
//	select a.* from UNIM_ASSETS_MAP a,UNIM_ASSETS_NAVIGATION b where a.map_id=b.map_id and b.map_nav_id=101
	{
		String hql = "select t from UnimAssetsMap  t,UnimAssetsNavigation t2 where t2.mapNavId = " + navigationId
			+" and t2.mapId=t.mapId";
		List list = this.findByHql(hql);
		if (list.size() == 0) {
			return null;
		}
		UnimAssetsMap agentMap = (UnimAssetsMap) list.get(0);
		return agentMap;
	}

}