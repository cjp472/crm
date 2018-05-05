package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.monitor.dao.unim.UnimAssStatusDao;
import com.ulane.monitor.model.unim.UnimAssStatus;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimAssStatusDaoImpl extends BaseDaoImpl<UnimAssStatus> implements UnimAssStatusDao{

	public UnimAssStatusDaoImpl() {
		super(UnimAssStatus.class);
	}

}