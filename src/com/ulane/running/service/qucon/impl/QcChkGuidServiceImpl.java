package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcChkGuidDao;
import com.ulane.running.model.qucon.QcChkGuid;
import com.ulane.running.service.qucon.QcChkGuidService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcChkGuidServiceImpl extends BaseServiceImpl<QcChkGuid> implements QcChkGuidService{
	@SuppressWarnings("unused")
	private QcChkGuidDao dao;
	
	public QcChkGuidServiceImpl(QcChkGuidDao dao) {
		super(dao);
		this.dao=dao;
	}

}