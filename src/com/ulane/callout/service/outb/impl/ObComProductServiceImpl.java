package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObComProductDao;
import com.ulane.callout.model.outb.ObComProduct;
import com.ulane.callout.service.outb.ObComProductService;
/**
 * 
 * @author lzm
 *
 */

public class ObComProductServiceImpl extends BaseServiceImpl<ObComProduct> implements ObComProductService{
	@SuppressWarnings("unused")
	private ObComProductDao dao;
	
	public ObComProductServiceImpl(ObComProductDao dao) {
		super(dao);
		this.dao=dao;
	}



}