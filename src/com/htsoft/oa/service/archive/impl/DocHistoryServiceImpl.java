package com.htsoft.oa.service.archive.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.archive.DocHistoryDao;
import com.htsoft.oa.model.archive.DocHistory;
import com.htsoft.oa.service.archive.DocHistoryService;

public class DocHistoryServiceImpl extends BaseServiceImpl<DocHistory> implements DocHistoryService{
	private DocHistoryDao dao;
	
	public DocHistoryServiceImpl(DocHistoryDao dao) {
		super(dao);
		this.dao=dao;
	}

}