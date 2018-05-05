package com.htsoft.oa.service.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import java.util.HashMap;
import java.util.Set;

import javax.jws.WebService;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.AppRole;
@WebService
public interface AppRoleService extends BaseService<AppRole>{
	public AppRole getByRoleName(String roleName);
	
	/**
	 * 获取安全认证的数据源
	 * @return
	 */
	public HashMap<String,Set<String>>getSecurityDataSource();
	
	public AppRole getById(Long roleId);
}
