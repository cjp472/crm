package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.ProcessModuleDao;
import com.htsoft.oa.model.flow.ProcessModule;
import com.htsoft.oa.service.flow.ProcessModuleService;

public class ProcessModuleServiceImpl extends BaseServiceImpl<ProcessModule> implements ProcessModuleService{
	@SuppressWarnings("unused")
	private ProcessModuleDao dao;
	
	public ProcessModuleServiceImpl(ProcessModuleDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public ProcessModule getByKey(String string) {
		return dao.getByKey(string);
	}

}