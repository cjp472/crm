package com.htsoft.oa.dao.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.ProcessModuleDao;
import com.htsoft.oa.model.flow.ProcessModule;

@SuppressWarnings("unchecked")
public class ProcessModuleDaoImpl extends BaseDaoImpl<ProcessModule> implements ProcessModuleDao{

	public ProcessModuleDaoImpl() {
		super(ProcessModule.class);
	}

	@Override
	public ProcessModule getByKey(String string) {
		String hql = "from ProcessModule pm where pm.modulekey=?";
		List<ProcessModule> list = findByHql(hql, new Object[]{string});
		if(list.size()>0){
			return list.get(0);
		}
		return null;
	}

}