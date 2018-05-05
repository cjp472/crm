package com.htsoft.oa.service.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.SystemLogDao;
import com.htsoft.oa.model.system.SystemLog;
import com.htsoft.oa.service.system.SystemLogService;

public class SystemLogServiceImpl extends BaseServiceImpl<SystemLog> implements SystemLogService{
	private SystemLogDao dao;
	
	public SystemLogServiceImpl(SystemLogDao dao) {
		super(dao);
		this.dao=dao;
	}

}