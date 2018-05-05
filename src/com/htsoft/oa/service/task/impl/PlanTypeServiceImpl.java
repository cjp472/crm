package com.htsoft.oa.service.task.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.task.PlanTypeDao;
import com.htsoft.oa.model.task.PlanType;
import com.htsoft.oa.service.task.PlanTypeService;

public class PlanTypeServiceImpl extends BaseServiceImpl<PlanType> implements PlanTypeService{
	private PlanTypeDao dao;
	
	public PlanTypeServiceImpl(PlanTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}