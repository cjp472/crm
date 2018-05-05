package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimCategoryDao;
import com.ulane.monitor.model.unim.UnimCategory;
import com.ulane.monitor.service.unim.UnimCategoryService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimCategoryServiceImpl extends BaseServiceImpl<UnimCategory> implements UnimCategoryService{
	@SuppressWarnings("unused")
	private UnimCategoryDao dao;
	
	public UnimCategoryServiceImpl(UnimCategoryDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public List<UnimCategory> listGetCategory(Short typeId) {
		return dao.listGetCategory(typeId);
	}
	
	public List<UnimCategory> listGetCategory(Short typeId, Short statusId){
		return dao.listGetCategory(typeId, statusId);
	}

}