package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.ProUserAssignDao;
import com.htsoft.oa.model.flow.ProUserAssign;
import com.htsoft.oa.service.flow.ProUserAssignService;

public class ProUserAssignServiceImpl extends BaseServiceImpl<ProUserAssign> implements ProUserAssignService{
	private ProUserAssignDao dao;
	
	public ProUserAssignServiceImpl(ProUserAssignDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public List<ProUserAssign> getByDeployId(String deployId){
		return dao.getByDeployId(deployId);
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.service.flow.ProUserAssignService#getByDeployIdActivityName(java.lang.String, java.lang.String)
	 */
	public ProUserAssign getByDeployIdActivityName(String deployId,String activityName){
		return dao.getByDeployIdActivityName(deployId, activityName);
	}

}