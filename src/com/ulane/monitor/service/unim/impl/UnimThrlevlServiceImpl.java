package com.ulane.monitor.service.unim.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import javax.annotation.Resource;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimThrlevlDao;
import com.ulane.monitor.model.unim.UnimAgent;
import com.ulane.monitor.model.unim.UnimCategory;
import com.ulane.monitor.model.unim.UnimThrlevl;
import com.ulane.monitor.service.unim.UnimAgentService;
import com.ulane.monitor.service.unim.UnimThrlevlService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class UnimThrlevlServiceImpl extends BaseServiceImpl<UnimThrlevl>
		implements UnimThrlevlService {
	@SuppressWarnings("unused")
	private UnimThrlevlDao dao;
	@Resource
	private UnimAgentService unimAgentService;	

	public UnimThrlevlServiceImpl(UnimThrlevlDao dao) {
		super(dao);
		this.dao = dao;
	}

	public List<UnimThrlevl> getByMonitorId(Long monitorId) {
		return dao.getByMonitorId(monitorId);
	}

	public void initThrlevl(Long monitorId, List<UnimCategory> categoryList)
			 {
		UnimAgent agent = (UnimAgent) unimAgentService.get(monitorId);
//		if (agent == null) {
//			throw new Exception("班长不存在：id=" + monitorId);
//		}
		if(agent!=null) {
			UnimThrlevl entity = null;
			for (UnimCategory category : categoryList) {
				entity = new UnimThrlevl(null, category, agent,null,null);
				dao.save(entity);
			}
			
		}
	}

	@Override
	public List<UnimThrlevl> getByCatId(Long catid) {
		// TODO Auto-generated method stub
		return dao.getByCatId(catid);
	}

}