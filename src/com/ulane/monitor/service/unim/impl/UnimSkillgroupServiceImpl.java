package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimSkillgroupDao;
import com.ulane.monitor.model.unim.UnimSkillgroup;
import com.ulane.monitor.service.unim.UnimSkillgroupService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimSkillgroupServiceImpl extends BaseServiceImpl<UnimSkillgroup> implements UnimSkillgroupService{
	@SuppressWarnings("unused")
	private UnimSkillgroupDao dao;
	
	public UnimSkillgroupServiceImpl(UnimSkillgroupDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimSkillgroup> listByMonitorForUnimAgent(Long agentId) {
		return dao.listByMonitorForUnimAgent(agentId);
	}

}