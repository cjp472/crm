package com.ulane.monitor.service.unim.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAgentMapDao;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimSkillgroup;
import com.ulane.monitor.service.unim.UnimAgentMapService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class UnimAgentMapServiceImpl extends BaseServiceImpl<UnimAgentMap>
		implements UnimAgentMapService {
	@SuppressWarnings("unused")
	private UnimAgentMapDao dao;

	public UnimAgentMapServiceImpl(UnimAgentMapDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public List<UnimAgentMap> listByMonitorForUnimAgent(Long agentId) {
		return dao.listByMonitorForUnimAgent(agentId);
	}

	public UnimAgentMap getAgentMapByNavigationId(Long navigationId,
			Long monitorId) {
		return dao.getAgentMapByNavigationId(navigationId, monitorId);
	}
	
	public UnimAgentMap getAgentMapByNavigationId2(Long navigationId,
			Long monitorId) throws Exception {
		return dao.getAgentMapByNavigationId2(navigationId, monitorId);
	}

}