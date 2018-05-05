package com.ulane.base.service.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.info.SysParaDao;
import com.ulane.base.model.info.SysPara;
import com.ulane.base.service.info.SysParaService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class SysParaServiceImpl extends BaseServiceImpl<SysPara> implements SysParaService{
	@SuppressWarnings("unused")
	private SysParaDao dao;
	
	public SysParaServiceImpl(SysParaDao dao) {
		super(dao);
		this.dao=dao;
	}

}