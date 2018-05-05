package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimMapAgentDao;
import com.ulane.monitor.dao.unim.UnimMapNavigationDao;
import com.ulane.monitor.model.unim.UnimMapAgent;
import com.ulane.monitor.model.unim.UnimMapNavigation;
import com.ulane.monitor.service.unim.UnimMapAgentService;
import com.ulane.monitor.service.unim.UnimMapNavigationService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimMapAgentServiceImpl extends BaseServiceImpl<UnimMapAgent> implements UnimMapAgentService{
	@SuppressWarnings("unused")
	private UnimMapAgentDao dao;
	
	public UnimMapAgentServiceImpl(UnimMapAgentDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimMapAgent> findByMapId(Long mapId){
		return dao.findByMapId(mapId);
	}

	@Override
	public void removeWhenRemoveMap(Long mapId) {
		dao.removeWhenRemoveMap(mapId);
	}

	
}