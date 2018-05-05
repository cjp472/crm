package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObCallbatchHisDao;
import com.ulane.callout.model.outb.ObCallbatchHis;
import com.ulane.callout.service.outb.ObCallbatchHisService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObCallbatchHisServiceImpl extends BaseServiceImpl<ObCallbatchHis> implements ObCallbatchHisService{
	@SuppressWarnings("unused")
	private ObCallbatchHisDao dao;
	
	public ObCallbatchHisServiceImpl(ObCallbatchHisDao dao) {
		super(dao);
		this.dao=dao;
	}

}