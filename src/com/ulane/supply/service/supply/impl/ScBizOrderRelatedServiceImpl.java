package com.ulane.supply.service.supply.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.supply.ScBizOrderRelatedDao;
import com.ulane.supply.model.supply.ScBizOrderRelated;
import com.ulane.supply.service.supply.ScBizOrderRelatedService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScBizOrderRelatedServiceImpl extends BaseServiceImpl<ScBizOrderRelated> implements ScBizOrderRelatedService{
	@SuppressWarnings("unused")
	private ScBizOrderRelatedDao dao;
	
	public ScBizOrderRelatedServiceImpl(ScBizOrderRelatedDao dao) {
		super(dao);
		this.dao=dao;
	}

}