package com.ulane.running.service.comtech.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.comtech.CtScrTemQueDao;
import com.ulane.running.model.comtech.CtScrTemQue;
import com.ulane.running.service.comtech.CtScrTemQueService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CtScrTemQueServiceImpl extends BaseServiceImpl<CtScrTemQue> implements CtScrTemQueService{
	@SuppressWarnings("unused")
	private CtScrTemQueDao dao;
	
	public CtScrTemQueServiceImpl(CtScrTemQueDao dao) {
		super(dao);
		this.dao=dao;
	}

}