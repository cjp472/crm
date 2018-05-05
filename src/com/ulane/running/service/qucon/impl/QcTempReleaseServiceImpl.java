package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcTempReleaseDao;
import com.ulane.running.model.qucon.QcTempRelease;
import com.ulane.running.service.qucon.QcTempReleaseService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcTempReleaseServiceImpl extends BaseServiceImpl<QcTempRelease> implements QcTempReleaseService{
	@SuppressWarnings("unused")
	private QcTempReleaseDao dao;
	
	public QcTempReleaseServiceImpl(QcTempReleaseDao dao) {
		super(dao);
		this.dao=dao;
	}

}