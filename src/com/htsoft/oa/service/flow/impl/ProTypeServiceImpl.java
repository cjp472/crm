package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.ProTypeDao;
import com.htsoft.oa.model.flow.ProType;
import com.htsoft.oa.service.flow.ProTypeService;

public class ProTypeServiceImpl extends BaseServiceImpl<ProType> implements ProTypeService{
	private ProTypeDao dao;
	
	public ProTypeServiceImpl(ProTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}