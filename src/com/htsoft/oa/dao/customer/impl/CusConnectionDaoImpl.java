package com.htsoft.oa.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.customer.CusConnectionDao;
import com.htsoft.oa.model.customer.CusConnection;

public class CusConnectionDaoImpl extends BaseDaoImpl<CusConnection> implements CusConnectionDao{

	public CusConnectionDaoImpl() {
		super(CusConnection.class);
	}

}