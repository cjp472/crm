package com.htsoft.oa.service.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.AppFunctionDao;
import com.htsoft.oa.model.system.AppFunction;
import com.htsoft.oa.service.system.AppFunctionService;

public class AppFunctionServiceImpl extends BaseServiceImpl<AppFunction> implements AppFunctionService{
	private AppFunctionDao dao;
	
	public AppFunctionServiceImpl(AppFunctionDao dao) {
		super(dao);
		this.dao=dao;
	}

	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.service.system.AppFunctionService#getByKey(java.lang.String)
	 */
	public AppFunction getByKey(String key) {
		return dao.getByKey(key);
	}
}