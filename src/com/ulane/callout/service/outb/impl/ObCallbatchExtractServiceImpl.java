package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObCallbatchExtractDao;
import com.ulane.callout.model.outb.ObCallbatchExtract;
import com.ulane.callout.service.outb.ObCallbatchExtractService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObCallbatchExtractServiceImpl extends BaseServiceImpl<ObCallbatchExtract> implements ObCallbatchExtractService{
	@SuppressWarnings("unused")
	private ObCallbatchExtractDao dao;
	
	public ObCallbatchExtractServiceImpl(ObCallbatchExtractDao dao) {
		super(dao);
		this.dao=dao;
	}

}