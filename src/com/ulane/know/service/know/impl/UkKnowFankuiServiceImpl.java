package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkKnowFankuiDao;
import com.ulane.know.model.know.UkKnowFankui;
import com.ulane.know.service.know.UkKnowFankuiService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkKnowFankuiServiceImpl extends BaseServiceImpl<UkKnowFankui> implements UkKnowFankuiService{
	@SuppressWarnings("unused")
	private UkKnowFankuiDao dao;
	
	public UkKnowFankuiServiceImpl(UkKnowFankuiDao dao) {
		super(dao);
		this.dao=dao;
	}

}