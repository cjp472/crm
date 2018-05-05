package com.ulane.monitor.dao.unim;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimMonitorAgent;

public interface UnimMonitorAgentDao extends BaseDao<UnimMonitorAgent>{
	public List<UnimMonitorAgent> listMonitorAgents(Long id) throws Exception;
}
