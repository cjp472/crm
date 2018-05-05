package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimChannelMapDao;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimChannelMap;
import com.ulane.monitor.service.unim.UnimChannelMapService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimChannelMapServiceImpl extends BaseServiceImpl<UnimChannelMap> implements UnimChannelMapService{
	@SuppressWarnings("unused")
	private UnimChannelMapDao dao;
	
	public UnimChannelMapServiceImpl(UnimChannelMapDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public UnimChannelMap getChannelMapByNavigationId2(Long navigationId,Long monitorId) throws Exception {
		return dao.getChannelMapByNavigationId2(navigationId, monitorId);
	}

	@Override
	public UnimChannelMap getAgentMapByNavigationId(Long navigationId,Long monitorId) {
		return dao.getAgentMapByNavigationId(navigationId, monitorId);
	}

	@Override
	public List<UnimChannelMap> listChannelMap() {
		return dao.listChannelMap();
	}

}