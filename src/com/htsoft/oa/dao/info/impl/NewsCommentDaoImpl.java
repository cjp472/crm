package com.htsoft.oa.dao.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.info.NewsCommentDao;
import com.htsoft.oa.model.info.NewsComment;

public class NewsCommentDaoImpl extends BaseDaoImpl<NewsComment> implements NewsCommentDao{

	public NewsCommentDaoImpl() {
		super(NewsComment.class);
	}

}