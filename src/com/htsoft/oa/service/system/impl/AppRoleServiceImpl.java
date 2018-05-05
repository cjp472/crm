package com.htsoft.oa.service.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Map;
import java.util.Set;
import java.util.HashMap;

//import javax.jws.WebService;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.AppRoleDao;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.service.system.AppRoleService;
//@WebService
public class AppRoleServiceImpl extends BaseServiceImpl<AppRole> implements AppRoleService{
	private AppRoleDao dao;
	
	public AppRoleServiceImpl(AppRoleDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public AppRole getByRoleName(String roleName){
		return dao.getByRoleName(roleName);
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.service.system.AppRoleService#getSecurityDataSource()
	 */
	public HashMap<String,Set<String>>getSecurityDataSource(){
		return dao.getSecurityDataSource();
	}
	
	
	public AppRole getById(Long roleId){
		return get(roleId);
	}

}
