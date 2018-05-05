package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimSkillgroupDao;
import com.ulane.monitor.model.unim.UnimAgent;
import com.ulane.monitor.model.unim.UnimSkillgroup;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimSkillgroupDaoImpl extends BaseDaoImpl<UnimSkillgroup> implements UnimSkillgroupDao{

	public UnimSkillgroupDaoImpl() {
		super(UnimSkillgroup.class);
	}
	
	@Override
	public List<UnimSkillgroup> listByMonitorForUnimAgent(Long agentId) {
		final String hql = "from UnimSkillgroup d where d.status=? and d.skgId in (select d2.comp_id.skillgroupId from UnimAgentSkillgroup d2 where d2.comp_id.agentId=?)";
		Object[] params ={UnimSkillgroup.STA_ENABLE, agentId};
		return findByHql(hql, params);
	}

}