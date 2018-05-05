package com.htsoft.oa.dao.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.AppFunctionDao;
import com.htsoft.oa.model.system.AppFunction;

public class AppFunctionDaoImpl extends BaseDaoImpl<AppFunction> implements AppFunctionDao{

	public AppFunctionDaoImpl() {
		super(AppFunction.class);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.system.AppFunctionDao#getByKey(java.lang.String)
	 */
	public AppFunction getByKey(String key){
		String hql="from AppFunction af where af.funKey=?";
		return (AppFunction)findUnique(hql, new String[]{key});
	}

}