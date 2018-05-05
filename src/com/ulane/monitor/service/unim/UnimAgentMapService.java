package com.ulane.monitor.service.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.monitor.model.unim.UnimAgentMap;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UnimAgentMapService extends BaseService<UnimAgentMap>{

	List<UnimAgentMap> listByMonitorForUnimAgent(Long agentId);
	
	public UnimAgentMap getAgentMapByNavigationId(Long navigationId, Long monitorId);
	
	public UnimAgentMap getAgentMapByNavigationId2(Long navigationId,
			Long monitorId) throws Exception;
	
}


