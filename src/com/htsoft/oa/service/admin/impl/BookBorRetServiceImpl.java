package com.htsoft.oa.service.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.admin.BookBorRetDao;
import com.htsoft.oa.model.admin.BookBorRet;
import com.htsoft.oa.service.admin.BookBorRetService;

public class BookBorRetServiceImpl extends BaseServiceImpl<BookBorRet> implements BookBorRetService{
	private BookBorRetDao dao;
	
	public BookBorRetServiceImpl(BookBorRetDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public BookBorRet getByBookSnId(Long bookSnId) {
		// TODO Auto-generated method stub
		return dao.getByBookSnId(bookSnId);
	}

	@Override
	public List getBorrowInfo(PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.getBorrowInfo(pb);
	}

	@Override
	public List getReturnInfo(PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.getReturnInfo(pb);
	}

	@Override
	public Long getBookBorRetId(Long snId) {
		return dao.getBookBorRetId(snId);
	}

}