package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcTempChapcterDao;
import com.ulane.running.model.qucon.QcTempChapcter;
import com.ulane.running.service.qucon.QcTempChapcterService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcTempChapcterServiceImpl extends BaseServiceImpl<QcTempChapcter> implements QcTempChapcterService{
	@SuppressWarnings("unused")
	private QcTempChapcterDao dao;
	
	public QcTempChapcterServiceImpl(QcTempChapcterDao dao) {
		super(dao);
		this.dao=dao;
	}

}