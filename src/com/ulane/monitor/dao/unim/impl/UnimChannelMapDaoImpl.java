package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.ResultSet;
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.util.FillData;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.monitor.dao.unim.UnimChannelMapDao;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimChannel;
import com.ulane.monitor.model.unim.UnimChannelMap;
import com.ulane.monitor.model.unim.UnimChannelNavigation;
import com.ulane.monitor.model.unim.UnimMapAgent;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimChannelMapDaoImpl extends BaseDaoImpl<UnimChannelMap> implements UnimChannelMapDao{

	public UnimChannelMapDaoImpl() {
		super(UnimChannelMap.class);
	}

	@Override	
	public UnimChannelMap getChannelMapByNavigationId2(Long navigationId,
			Long monitorId) throws Exception {
		
		String HQL = "from UnimChannelNavigation where mapNavId="+navigationId;
		List list = this.findByHql(HQL);
		
		if(list.size()==0) {
			return null;
		}
		
		UnimChannelNavigation nav = (UnimChannelNavigation)list.get(0);
		
		String SQL = "select * from UNIM_CHANNEL_MAP um where um.map_id="+nav.getMapId()+" and exists(select 'X' from UNIM_CHANNEL_MAP_MONITOR ucm where um.map_id=ucm.map_id and ucm.agent_id="+monitorId+")";
		JdbcHelper callBack = new JdbcHelper();
		callBack.setSql(SQL);
		logger.debug("sql : " + SQL);

		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				return FillData.fillDataJDBC(rs, UnimChannelMap.class);
			}
		};
		callBack.setJdbcWork(sqlWork);
		List<UnimChannelMap> list2 = (List<UnimChannelMap>) getHibernateTemplate().execute(callBack);
		return (list2==null||list2.isEmpty())?null:list2.get(0);
	}

	@Override
	public UnimChannelMap getAgentMapByNavigationId(Long navigationId,
			Long monitorId) {
		String hql = "select t from UnimChannelMap t,UnimChannelNavigation t2 where t2.mapNavId = " + navigationId
			+" and t2.mapId=t.mapId";
		List list = this.findByHql(hql);
		if (list.size() == 0) {
			return null;
		}
		UnimChannelMap agentMap = (UnimChannelMap) list.get(0);
//		agentMap.setUnimAgents(null);
//		agentMap.setUnimChannelNavigation(null);
		return agentMap;
		
		
//		String SQL = "select * from UNIM_CHANNEL_MAP um where um.map_id=(select ucn.map_id from UNIM_CHANNEL_NAVIGATION ucn where ucn.map_nav_id="+navigationId+")";
//		JdbcHelper callBack = new JdbcHelper();
//		callBack.setSql(SQL);
//		logger.debug("sql : " + SQL);
//
//		JdbcWork sqlWork = new JdbcWork() {
//			@Override
//			public Object fillData(ResultSet rs) {
//				return FillData.fillDataJDBC(rs, UnimChannelMap.class);
//			}
//		};
//		callBack.setJdbcWork(sqlWork);
//		List<UnimChannelMap> list2 = (List<UnimChannelMap>) getHibernateTemplate().execute(callBack);
//		
//		if(list2.size()==0) {
//			return null;
//		}
//		return list2.get(0);
	}

	@Override
	public List<UnimChannelMap> listChannelMap() {
		String hql = "from UnimChannelMap";
		return (List<UnimChannelMap>)findByHql(hql);
	}
}