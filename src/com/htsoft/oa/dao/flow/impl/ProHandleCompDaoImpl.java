package com.htsoft.oa.dao.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.ProHandleCompDao;
import com.htsoft.oa.model.flow.ProHandleComp;

@SuppressWarnings("unchecked")
public class ProHandleCompDaoImpl extends BaseDaoImpl<ProHandleComp> implements ProHandleCompDao{

	public ProHandleCompDaoImpl() {
		super(ProHandleComp.class);
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.flow.ProHandleCompDao#getByDeployIdActivityName(java.lang.String, java.lang.String)
	 */
	public List<ProHandleComp> getByDeployIdActivityName(String deployId,String activityName){
		String hql="from ProHandleComp phc where phc.deployId=? and phc.activityName=?";
		return(List<ProHandleComp>)findByHql(hql, new Object[]{deployId,activityName});
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.flow.ProHandleCompDao#getByDeployIdActivityNameHandleType(java.lang.String, java.lang.String, java.lang.Short)
	 */
	public List<ProHandleComp> getByDeployIdActivityNameHandleType(String deployId,String activityName,Short handleType){
		String hql="from ProHandleComp phc where phc.deployId=? and phc.activityName=? and phc.handleType=?";
		return(List<ProHandleComp>)findByHql(hql, new Object[]{deployId,activityName,handleType});
	}
	
	public ProHandleComp getProHandleComp(String deployId,String activityName,String eventName){
		String hql="from ProHandleComp phc where phc.deployId=? and phc.activityName=? and eventName=? ";
		return (ProHandleComp)findUnique(hql, new Object[]{deployId,activityName,eventName});
	}

}