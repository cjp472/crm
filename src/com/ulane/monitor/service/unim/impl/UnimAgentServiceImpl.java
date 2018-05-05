package com.ulane.monitor.service.unim.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAgentDao;
import com.ulane.monitor.model.unim.UnimAgent;
import com.ulane.monitor.service.unim.UnimAgentService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class UnimAgentServiceImpl extends BaseServiceImpl<UnimAgent> implements
		UnimAgentService {
	@SuppressWarnings("unused")
	private UnimAgentDao dao;

	public UnimAgentServiceImpl(UnimAgentDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public List<UnimAgent> listByMonitorForUnimAgent(Long agentId) {
		return dao.listByMonitorForUnimAgent(agentId);
	}

	public List<UnimAgent> search(Integer searchMode, String searchKey,
			Boolean isIgnoreCase, Boolean isAllMatch) {
		return dao.search(searchMode, searchKey, isIgnoreCase, isAllMatch);
	}
	
	public UnimAgent getByAgentNum(String agentNum) {
		return dao.getByAgentNum(agentNum);
	}
	
	public List<UnimAgent> login(String agentNum, String pass) {
		return dao.login(agentNum, pass);
	}
	
	public List<UnimAgent> listGeneralAgents() {
		return dao.listGeneralAgents();
	}

	@Override
	public String saveAgtAndSkg(Map<String, String> param) {
		return dao.saveAgtAndSkg(param);
	}

	@Override
	public String saveAgtAndMap(Map<String, String> param) {
		return dao.saveAgtAndMap(param);
	}

	@Override
	public String saveAgtAndMonitor(Map<String, String> param) {
		return dao.saveAgtAndMonitor(param);
		
	}

	@Override
	public String saveAgtAndChannel(Map<String, String> param) {
		return dao.saveAgtAndChannel(param);
	}

	@Override
	public String saveAgtAndAssets(Map<String, String> param) {
		return dao.saveAgtAndAssets(param);
	}

	@Override
	public String saveAstAndMap(Map<String, String> param) {
		return dao.saveAstAndMap(param);
	}

	@Override
	public String saveBusAndMap(Map<String, String> param) {
		return dao.saveBusAndMap(param);
	}

}