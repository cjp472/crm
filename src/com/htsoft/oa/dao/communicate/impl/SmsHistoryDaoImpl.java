package com.htsoft.oa.dao.communicate.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.communicate.SmsHistoryDao;
import com.htsoft.oa.model.communicate.SmsHistory;

public class SmsHistoryDaoImpl extends BaseDaoImpl<SmsHistory> implements SmsHistoryDao{

	public SmsHistoryDaoImpl() {
		super(SmsHistory.class);
	}

}