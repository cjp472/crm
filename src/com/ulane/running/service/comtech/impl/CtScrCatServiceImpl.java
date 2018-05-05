package com.ulane.running.service.comtech.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.comtech.CtScrCatDao;
import com.ulane.running.model.comtech.CtScrCat;
import com.ulane.running.service.comtech.CtScrCatService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CtScrCatServiceImpl extends BaseServiceImpl<CtScrCat> implements CtScrCatService{
	@SuppressWarnings("unused")
	private CtScrCatDao dao;
	
	public CtScrCatServiceImpl(CtScrCatDao dao) {
		super(dao);
		this.dao=dao;
	}

}