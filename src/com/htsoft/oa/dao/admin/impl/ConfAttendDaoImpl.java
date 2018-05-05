package com.htsoft.oa.dao.admin.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.admin.ConfAttendDao;
import com.htsoft.oa.model.admin.ConfAttend;

/**
 * @description ConfAttendDaoImpl
 * @author YHZ
 * @date 2010-10-8 PM
 * 
 */
@SuppressWarnings("unchecked")
public class ConfAttendDaoImpl extends BaseDaoImpl<ConfAttend> implements
		ConfAttendDao {

	public ConfAttendDaoImpl() {
		super(ConfAttend.class);
	}

}