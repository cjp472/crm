package com.ulane.monitor.dao.unim.impl;

import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimMonitorAgentDao;
import com.ulane.monitor.model.unim.UnimAgent;
import com.ulane.monitor.model.unim.UnimMonitorAgent;

public class UnimMonitorAgentDaoImpl extends BaseDaoImpl<UnimMonitorAgent> implements UnimMonitorAgentDao {

	
	public UnimMonitorAgentDaoImpl() {
		super(UnimMonitorAgent.class);
	}	
	
	public List<UnimMonitorAgent> listMonitorAgents(Long id) throws Exception {
		String hql = "from UnimMonitorAgent t where t.comp_id.agentId = " + id;
		return this.findByHql(hql);
	}
}
