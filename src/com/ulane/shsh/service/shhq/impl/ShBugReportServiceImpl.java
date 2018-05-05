package com.ulane.shsh.service.shhq.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.shsh.dao.shhq.ShBugReportDao;
import com.ulane.shsh.model.shhq.ShBugReport;
import com.ulane.shsh.service.shhq.ShBugReportService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ShBugReportServiceImpl extends BaseServiceImpl<ShBugReport> implements ShBugReportService{
	@SuppressWarnings("unused")
	private ShBugReportDao dao;
	
	public ShBugReportServiceImpl(ShBugReportDao dao) {
		super(dao);
		this.dao=dao;
	}

}