package com.htsoft.oa.service.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.admin.BookDao;
import com.htsoft.oa.model.admin.Book;
import com.htsoft.oa.service.admin.BookService;

public class BookServiceImpl extends BaseServiceImpl<Book> implements BookService{
	private BookDao dao;
	
	public BookServiceImpl(BookDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<Book> findByTypeId(Long typeId, PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.findByTypeId(typeId, pb);
	}

}