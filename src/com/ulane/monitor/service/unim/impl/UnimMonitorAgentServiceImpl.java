package com.ulane.monitor.service.unim.impl;

import java.util.List;

import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimMonitorAgentDao;
import com.ulane.monitor.model.unim.UnimMonitorAgent;
import com.ulane.monitor.service.unim.UnimMonitorAgentService;

public class UnimMonitorAgentServiceImpl  extends BaseServiceImpl<UnimMonitorAgent> implements UnimMonitorAgentService {

	@SuppressWarnings("unused")
	private UnimMonitorAgentDao dao;
	
 
	public UnimMonitorAgentServiceImpl(UnimMonitorAgentDao dao) {
		super(dao);
		this.dao=dao;
	}


	public List<UnimMonitorAgent> listMonitorAgents(Long id) throws Exception {
            return dao.listMonitorAgents(id);
	}

}
