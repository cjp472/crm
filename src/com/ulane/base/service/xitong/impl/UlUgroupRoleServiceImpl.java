package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlUgroupRoleDao;
import com.ulane.base.model.xitong.UlUgroupRole;
import com.ulane.base.service.xitong.UlUgroupRoleService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UlUgroupRoleServiceImpl extends BaseServiceImpl<UlUgroupRole> implements UlUgroupRoleService{
	private UlUgroupRoleDao dao;
	
	public UlUgroupRoleServiceImpl(UlUgroupRoleDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public UlUgroupRole findByGroupAndRole(Long ugroupId, Long roleId) {
		return (UlUgroupRole) dao.findByGroupAndRole(ugroupId, roleId);
	}

}