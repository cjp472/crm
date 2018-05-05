package com.htsoft.oa.service.document.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.document.SealDao;
import com.htsoft.oa.model.document.Seal;
import com.htsoft.oa.service.document.SealService;

public class SealServiceImpl extends BaseServiceImpl<Seal> implements SealService{
	@SuppressWarnings("unused")
	private SealDao dao;
	
	public SealServiceImpl(SealDao dao) {
		super(dao);
		this.dao=dao;
	}

}