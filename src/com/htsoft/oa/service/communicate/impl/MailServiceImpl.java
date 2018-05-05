package com.htsoft.oa.service.communicate.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.MailDao;
import com.htsoft.oa.model.communicate.Mail;
import com.htsoft.oa.service.communicate.MailService;

public class MailServiceImpl extends BaseServiceImpl<Mail> implements MailService{
	private MailDao dao;
	
	public MailServiceImpl(MailDao dao) {
		super(dao);
		this.dao=dao;
	}

}