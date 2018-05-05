package com.ulane.monitor.dao.unim;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.dao.BaseDao;
import com.ulane.monitor.model.unim.UnimAgent;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UnimAgentDao extends BaseDao<UnimAgent>{

	List<UnimAgent> listByMonitorForUnimAgent(Long agentId);
	
	public List<UnimAgent> search(Integer searchMode, String searchKey, Boolean isIgnoreCase, Boolean isAllMatch);
	
	public UnimAgent getByAgentNum(String agentNum);
	
	public List<UnimAgent> login(String agentNum, String pass);
	
	public List<UnimAgent> listGeneralAgents();
	
	//==坐席技能组中间表
	public String saveAgtAndSkg(Map<String,String> param);
	
	//==坐席地图中间表
	public String saveAgtAndMap(Map<String,String> param);
	
	//==业务视图中间表
	public String saveBusAndMap(Map<String,String> param);
	
	//==资产视图
	public String saveAstAndMap(Map<String,String> param);
	
	//==坐席班长表
	public String saveAgtAndMonitor(Map<String,String> param); 
	
	//==监控渠道
	public String saveAgtAndChannel(Map<String,String> param);
	
	//==监控资产
	public String saveAgtAndAssets(Map<String,String> param);
}