package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.ProHandleCompDao;
import com.htsoft.oa.model.flow.ProHandleComp;
import com.htsoft.oa.service.flow.ProHandleCompService;

public class ProHandleCompServiceImpl extends BaseServiceImpl<ProHandleComp> implements ProHandleCompService{
	@SuppressWarnings("unused")
	private ProHandleCompDao dao;
	
	public ProHandleCompServiceImpl(ProHandleCompDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	@Override
	public List<ProHandleComp> getByDeployIdActivityName(String deployId,
			String activityName) {
		return dao.getByDeployIdActivityName(deployId, activityName);
	}
	
	@Override
	public List<ProHandleComp> getByDeployIdActivityNameHandleType(
			String deployId, String activityName, Short handleType) {
		return dao.getByDeployIdActivityNameHandleType(deployId, activityName, handleType);
	}
	
	/**
	 * 
	 * @param deployId
	 * @param activityName
	 * @param eventName
	 * @return
	 */
	public ProHandleComp getProHandleComp(String deployId,String activityName,String eventName){
		return dao.getProHandleComp(deployId, activityName, eventName);
	}

}