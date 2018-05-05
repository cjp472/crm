package com.htsoft.oa.dao.task;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.task.Appointment;

/**
 * 
 * @author 
 *
 */
public interface AppointmentDao extends BaseDao<Appointment>{
	//首页中根据当前登录用户显示约会列表
	public List showAppointmentByUserId(Long userId,PagingBean pb);
}