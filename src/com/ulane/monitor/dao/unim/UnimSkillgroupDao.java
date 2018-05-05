package com.ulane.monitor.dao.unim;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.monitor.model.unim.UnimSkillgroup;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UnimSkillgroupDao extends BaseDao<UnimSkillgroup>{

	List<UnimSkillgroup> listByMonitorForUnimAgent(Long agentId);
	
}