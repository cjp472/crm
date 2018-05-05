package com.ulane.monitor.dao.unim.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimAgentMapDao;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimMapAgent;
import com.ulane.monitor.model.unim.UnimMapNavigation;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

@SuppressWarnings("unchecked")
public class UnimAgentMapDaoImpl extends BaseDaoImpl<UnimAgentMap> implements
		UnimAgentMapDao {

	public UnimAgentMapDaoImpl() {
		super(UnimAgentMap.class);
	}

	@Override
	public List<UnimAgentMap> listByMonitorForUnimAgent(Long agentId) {
		final String hql = "from UnimAgentMap d where d.mapId in (select d2.comp_id.mapId from UnimMapAgent d2 where d2.comp_id.agentId=?)";
		Object[] params = { agentId };
		return findByHql(hql, params);
	}
	  

	public UnimAgentMap getAgentMapByNavigationId(Long navigationId,
			Long monitorId)

	{
//		String hql = "from UnimAgentMap t where t.unimMapNavigation.mapNavId = "
//		+ navigationId;		
		String hql = "select t from UnimAgentMap t,UnimMapNavigation t2 where t2.mapNavId = " + navigationId
			+" and t2.mapId=t.mapId";
		List list = this.findByHql(hql);
		if (list.size() == 0) {
			return null;
		}
		UnimAgentMap agentMap = (UnimAgentMap) list.get(0);
		return agentMap;
	}

	public UnimAgentMap getAgentMapByNavigationId2(Long navigationId,
			Long monitorId) throws Exception {
//		String hql = "from UnimAgentMap t where t.unimMapNavigation.mapNavId = "
//				+ navigationId;
		String hql = "select t from UnimAgentMap t,UnimMapNavigation t2 where t2.mapNavId = " + navigationId
		+" and t2.mapId=t.mapId";
		List list = this.findByHql(hql);
		if (list.size() == 0) {
			return null;
		}
		UnimAgentMap agentMap = (UnimAgentMap) list.get(0);

		Set<UnimMapAgent> set = agentMap.getUnimMapAgents();
		boolean mapRight = false;
		for (UnimMapAgent agent : set) {
			if (agent.getComp_id().getAgentId().intValue() == monitorId.intValue()) {
				mapRight = true;
				break;
			}
		}
		if (mapRight) {
			return agentMap;
		}
		throw new Exception("没有权限访问该地图");
	}

}