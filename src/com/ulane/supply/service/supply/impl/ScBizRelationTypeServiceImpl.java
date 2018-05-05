package com.ulane.supply.service.supply.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.supply.ScBizRelationTypeDao;
import com.ulane.supply.model.supply.ScBizRelationType;
import com.ulane.supply.service.supply.ScBizRelationTypeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScBizRelationTypeServiceImpl extends BaseServiceImpl<ScBizRelationType> implements ScBizRelationTypeService{
	@SuppressWarnings("unused")
	private ScBizRelationTypeDao dao;
	
	public ScBizRelationTypeServiceImpl(ScBizRelationTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}