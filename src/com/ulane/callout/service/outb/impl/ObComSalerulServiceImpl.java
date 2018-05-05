package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObComSalerulDao;
import com.ulane.callout.model.outb.ObComSalerul;
import com.ulane.callout.service.outb.ObComSalerulService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObComSalerulServiceImpl extends BaseServiceImpl<ObComSalerul> implements ObComSalerulService{
	@SuppressWarnings("unused")
	private ObComSalerulDao dao;
	
	public ObComSalerulServiceImpl(ObComSalerulDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public String getTimeBetween(String rulTypeId, String comId) {
		return dao.getTimeBetween(rulTypeId, comId);
	}

}