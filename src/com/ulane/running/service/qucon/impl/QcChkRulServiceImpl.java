package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcChkRulDao;
import com.ulane.running.model.qucon.QcChkRul;
import com.ulane.running.service.qucon.QcChkRulService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcChkRulServiceImpl extends BaseServiceImpl<QcChkRul> implements QcChkRulService{
	@SuppressWarnings("unused")
	private QcChkRulDao dao;
	
	public QcChkRulServiceImpl(QcChkRulDao dao) {
		super(dao);
		this.dao=dao;
	}

}