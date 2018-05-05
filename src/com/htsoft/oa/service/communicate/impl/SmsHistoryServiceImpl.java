package com.htsoft.oa.service.communicate.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.SmsHistoryDao;
import com.htsoft.oa.model.communicate.SmsHistory;
import com.htsoft.oa.service.communicate.SmsHistoryService;

public class SmsHistoryServiceImpl extends BaseServiceImpl<SmsHistory> implements SmsHistoryService{
	private SmsHistoryDao dao;
	
	public SmsHistoryServiceImpl(SmsHistoryDao dao) {
		super(dao);
		this.dao=dao;
	}

}