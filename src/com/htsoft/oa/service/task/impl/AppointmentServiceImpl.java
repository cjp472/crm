package com.htsoft.oa.service.task.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.task.AppointmentDao;
import com.htsoft.oa.model.task.Appointment;
import com.htsoft.oa.service.task.AppointmentService;

public class AppointmentServiceImpl extends BaseServiceImpl<Appointment> implements AppointmentService{
	private AppointmentDao dao;
	
	public AppointmentServiceImpl(AppointmentDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List showAppointmentByUserId(Long userId, PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.showAppointmentByUserId(userId, pb);
	}

}