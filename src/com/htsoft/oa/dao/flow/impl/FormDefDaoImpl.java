package com.htsoft.oa.dao.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.FormDefDao;
import com.htsoft.oa.model.flow.FormDef;

public class FormDefDaoImpl extends BaseDaoImpl<FormDef> implements FormDefDao{

	public FormDefDaoImpl() {
		super(FormDef.class);
	}

	@Override
	public List<FormDef> getByDeployId(String deployId) {
		String hql="from FormDef fd where deployId=?";
		return findByHql(hql, new Object[]{deployId});
	}
	
	/**
	 * 
	 * @param deployId
	 * @param activityName
	 * @return
	 */
	public FormDef getByDeployIdActivityName(String deployId,String activityName){
		String hql="from FormDef fd where fd.deployId=? and fd.activityName=?";
		return (FormDef)findUnique(hql, new Object[]{deployId,activityName});
	}
}