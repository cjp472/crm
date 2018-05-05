package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAssTarParDao;
import com.ulane.monitor.model.unim.UnimAssTarPar;
import com.ulane.monitor.service.unim.UnimAssTarParService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimAssTarParServiceImpl extends BaseServiceImpl<UnimAssTarPar> implements UnimAssTarParService{
	@SuppressWarnings("unused")
	private UnimAssTarParDao dao;
	
	public UnimAssTarParServiceImpl(UnimAssTarParDao dao) {
		super(dao);
		this.dao=dao;
	}

}