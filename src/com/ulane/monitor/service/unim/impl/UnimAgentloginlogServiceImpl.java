package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAgentloginlogDao;
import com.ulane.monitor.model.unim.UnimAgentloginlog;
import com.ulane.monitor.service.unim.UnimAgentloginlogService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimAgentloginlogServiceImpl extends BaseServiceImpl<UnimAgentloginlog> implements UnimAgentloginlogService{
	@SuppressWarnings("unused")
	private UnimAgentloginlogDao dao;
	
	public UnimAgentloginlogServiceImpl(UnimAgentloginlogDao dao) {
		super(dao);
		this.dao=dao;
	}

}