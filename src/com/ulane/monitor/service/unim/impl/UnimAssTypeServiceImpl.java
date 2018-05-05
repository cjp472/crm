package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAssTypeDao;
import com.ulane.monitor.model.unim.UnimAssType;
import com.ulane.monitor.service.unim.UnimAssTypeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimAssTypeServiceImpl extends BaseServiceImpl<UnimAssType> implements UnimAssTypeService{
	@SuppressWarnings("unused")
	private UnimAssTypeDao dao;
	
	public UnimAssTypeServiceImpl(UnimAssTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}