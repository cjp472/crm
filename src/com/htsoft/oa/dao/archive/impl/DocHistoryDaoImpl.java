package com.htsoft.oa.dao.archive.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.archive.DocHistoryDao;
import com.htsoft.oa.model.archive.DocHistory;

public class DocHistoryDaoImpl extends BaseDaoImpl<DocHistory> implements DocHistoryDao{

	public DocHistoryDaoImpl() {
		super(DocHistory.class);
	}

}