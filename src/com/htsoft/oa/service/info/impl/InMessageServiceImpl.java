package com.htsoft.oa.service.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import java.util.Date;
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.InMessageDao;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.service.info.InMessageService;

public class InMessageServiceImpl extends BaseServiceImpl<InMessage> implements
		InMessageService {

	private InMessageDao dao;
	public InMessageServiceImpl(InMessageDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Override
	public InMessage findByRead(Long userId) {
		return dao.findByRead(userId);
	}
	@Override
	public Integer findByReadFlag(Long userId) {
		return dao.findByReadFlag(userId);
	}
	@Override
	public List<InMessage> findAll(Long userId, PagingBean pb) {
		return dao.findAll(userId, pb);
	}
	@Override
	public List findByUser(Long userId, PagingBean pb) {
		return dao.findByUser(userId, pb);
	}
	@Override
	public List searchInMessage(Long userId, InMessage inMessage,
			ShortMessage shortMessage, Date from, Date to, PagingBean pb) {
		return dao.searchInMessage(userId, inMessage, shortMessage, from, to, pb);
	}
	@Override
	public InMessage findLatest(Long userId) {
		return dao.findLatest(userId);
	}
	
	public List searchInMessageMonitor(Long userId) {
		return dao.searchInMessageMonitor(userId);
	}
	
	public List searchReceivedMsgInMessageMonitor(Long userId) {
		return dao.searchReceivedMsgInMessageMonitor(userId);
	}

}
