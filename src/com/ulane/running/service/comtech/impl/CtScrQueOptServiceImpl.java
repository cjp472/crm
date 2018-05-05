package com.ulane.running.service.comtech.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.comtech.CtScrQueOptDao;
import com.ulane.running.model.comtech.CtScrQueOpt;
import com.ulane.running.service.comtech.CtScrQueOptService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CtScrQueOptServiceImpl extends BaseServiceImpl<CtScrQueOpt> implements CtScrQueOptService{
	@SuppressWarnings("unused")
	private CtScrQueOptDao dao;
	
	public CtScrQueOptServiceImpl(CtScrQueOptDao dao) {
		super(dao);
		this.dao=dao;
	}

}