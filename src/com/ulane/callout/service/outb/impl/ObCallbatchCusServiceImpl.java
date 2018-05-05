package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObCallbatchCusDao;
import com.ulane.callout.model.outb.ObCallbatchAss;
import com.ulane.callout.model.outb.ObCallbatchCus;
import com.ulane.callout.service.outb.ObCallbatchCusService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObCallbatchCusServiceImpl extends BaseServiceImpl<ObCallbatchCus> implements ObCallbatchCusService{
	@SuppressWarnings("unused")
	private ObCallbatchCusDao dao;
	
	public ObCallbatchCusServiceImpl(ObCallbatchCusDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public List<ObCallbatchCus> listCallbatchCusByAssids(String allAssIds,String whereSql) {
		return dao.listCallbatchCusByAssids(allAssIds, whereSql);
	}
	
	public List<ObCallbatchCus> listCusByCallbatch(Long fromCallbatchId,String whereSql) {
		return dao.listCusByCallbatch(fromCallbatchId, whereSql);
	}

}