package com.htsoft.oa.service.arch.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.arch.BorrowRecordDao;
import com.htsoft.oa.model.arch.BorrowRecord;
import com.htsoft.oa.service.arch.BorrowRecordService;

public class BorrowRecordServiceImpl extends BaseServiceImpl<BorrowRecord> implements BorrowRecordService{
	private BorrowRecordDao dao;
	
	public BorrowRecordServiceImpl(BorrowRecordDao dao) {
		super(dao);
		this.dao=dao;
	}

}