package com.htsoft.oa.dao.communicate.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.communicate.SmsMobileDao;
import com.htsoft.oa.model.communicate.SmsMobile;

public class SmsMobileDaoImpl extends BaseDaoImpl<SmsMobile> implements SmsMobileDao{

	public SmsMobileDaoImpl() {
		super(SmsMobile.class);
	}

	@Override
	public List<SmsMobile> getNeedToSend() {
		String hql = "from SmsMobile sm where sm.status = ? order by sm.sendTime desc";
		Object[] params = {SmsMobile.STATUS_NOT_SENDED};
		return findByHql(hql, params);
	}

}