package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcChkListDao;
import com.ulane.running.model.qucon.QcChkList;
import com.ulane.running.service.qucon.QcChkListService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcChkListServiceImpl extends BaseServiceImpl<QcChkList> implements QcChkListService{
	@SuppressWarnings("unused")
	private QcChkListDao dao;
	
	public QcChkListServiceImpl(QcChkListDao dao) {
		super(dao);
		this.dao=dao;
	}

}