package com.ulane.base.service.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.info.SysParaOptDao;
import com.ulane.base.model.info.SysParaOpt;
import com.ulane.base.service.info.SysParaOptService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class SysParaOptServiceImpl extends BaseServiceImpl<SysParaOpt> implements SysParaOptService{
	@SuppressWarnings("unused")
	private SysParaOptDao dao;
	
	public SysParaOptServiceImpl(SysParaOptDao dao) {
		super(dao);
		this.dao=dao;
	}

}