package com.htsoft.oa.service.admin.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.ConfAttendDao;
import com.htsoft.oa.model.admin.ConfAttend;
import com.htsoft.oa.service.admin.ConfAttendService;

/**
 * @description ConfAttendServiceImpl
 * @author YHZ
 * @date 2010-10-8 PM
 * 
 */
public class ConfAttendServiceImpl extends BaseServiceImpl<ConfAttend>
		implements ConfAttendService {
	@SuppressWarnings("unused")
	private ConfAttendDao dao;

	public ConfAttendServiceImpl(ConfAttendDao dao) {
		super(dao);
		this.dao = dao;
	}

}