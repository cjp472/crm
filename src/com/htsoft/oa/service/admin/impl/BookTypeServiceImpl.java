package com.htsoft.oa.service.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;

import com.htsoft.oa.dao.admin.BookTypeDao;
import com.htsoft.oa.model.admin.BookType;
import com.htsoft.oa.service.admin.BookTypeService;

public class BookTypeServiceImpl extends BaseServiceImpl<BookType> implements BookTypeService{
	private BookTypeDao dao;
	
	public BookTypeServiceImpl(BookTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}