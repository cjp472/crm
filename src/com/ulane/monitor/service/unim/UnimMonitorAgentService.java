package com.ulane.monitor.service.unim;

import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.monitor.model.unim.UnimMonitorAgent;

public interface UnimMonitorAgentService extends BaseService<UnimMonitorAgent>{
	public abstract List<UnimMonitorAgent> listMonitorAgents(Long paramInteger)
			throws Exception;
}
