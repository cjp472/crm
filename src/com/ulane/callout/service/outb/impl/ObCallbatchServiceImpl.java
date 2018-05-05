package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.callout.dao.outb.ObCallbatchDao;
import com.ulane.callout.model.outb.ObCallbatch;
import com.ulane.callout.service.outb.ObCallbatchService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObCallbatchServiceImpl extends BaseServiceImpl<ObCallbatch> implements ObCallbatchService{
	@SuppressWarnings("unused")
	private ObCallbatchDao dao;
	
	public ObCallbatchServiceImpl(ObCallbatchDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public String listClearnBatch(Map<String, String> param,PagingBean pagBean) {
		int start = pagBean.getStart();
		int size = pagBean.getPageSize();
		return dao.listClearnBatch(param,start,size);
	}

}