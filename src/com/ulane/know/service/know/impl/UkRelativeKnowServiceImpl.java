package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkRelativeKnowDao;
import com.ulane.know.model.know.UkRelativeKnow;
import com.ulane.know.service.know.UkRelativeKnowService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkRelativeKnowServiceImpl extends BaseServiceImpl<UkRelativeKnow> implements UkRelativeKnowService{
	@SuppressWarnings("unused")
	private UkRelativeKnowDao dao;
	
	public UkRelativeKnowServiceImpl(UkRelativeKnowDao dao) {
		super(dao);
		this.dao=dao;
	}

}