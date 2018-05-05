package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObComPapDao;
import com.ulane.callout.model.outb.ObComPap;
import com.ulane.callout.service.outb.ObComPapService;
/**
 * 
 * @author lzm
 *
 */

public class ObComPapServiceImpl extends BaseServiceImpl<ObComPap> implements ObComPapService{
	@SuppressWarnings("unused")
	private ObComPapDao dao;
	
	public ObComPapServiceImpl(ObComPapDao dao) {
		super(dao);
		this.dao=dao;
	}



}