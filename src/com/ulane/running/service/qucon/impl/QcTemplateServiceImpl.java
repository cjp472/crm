package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcTemplateDao;
import com.ulane.running.model.qucon.QcTemplate;
import com.ulane.running.service.qucon.QcTemplateService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcTemplateServiceImpl extends BaseServiceImpl<QcTemplate> implements QcTemplateService{
	@SuppressWarnings("unused")
	private QcTemplateDao dao;
	
	public QcTemplateServiceImpl(QcTemplateDao dao) {
		super(dao);
		this.dao=dao;
	}

}