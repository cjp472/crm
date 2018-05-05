package com.htsoft.oa.service.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.info.NewsCommentDao;
import com.htsoft.oa.model.info.NewsComment;
import com.htsoft.oa.service.info.NewsCommentService;

public class NewsCommentServiceImpl extends BaseServiceImpl<NewsComment> implements NewsCommentService{
	private NewsCommentDao dao;
	
	public NewsCommentServiceImpl(NewsCommentDao dao) {
		super(dao);
		this.dao=dao;
	}

}