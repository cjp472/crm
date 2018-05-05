package com.htsoft.oa.service.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.DepreTypeDao;
import com.htsoft.oa.model.admin.DepreType;
import com.htsoft.oa.service.admin.DepreTypeService;

public class DepreTypeServiceImpl extends BaseServiceImpl<DepreType> implements DepreTypeService{
	private DepreTypeDao dao;
	
	public DepreTypeServiceImpl(DepreTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}