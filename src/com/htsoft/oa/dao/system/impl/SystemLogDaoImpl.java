package com.htsoft.oa.dao.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.SystemLogDao;
import com.htsoft.oa.model.system.SystemLog;

public class SystemLogDaoImpl extends BaseDaoImpl<SystemLog> implements SystemLogDao{

	public SystemLogDaoImpl() {
		super(SystemLog.class);
	}

}