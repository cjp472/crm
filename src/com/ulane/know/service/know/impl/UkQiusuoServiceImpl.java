package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkQiusuoDao;
import com.ulane.know.model.know.UkQiusuo;
import com.ulane.know.service.know.UkQiusuoService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkQiusuoServiceImpl extends BaseServiceImpl<UkQiusuo> implements UkQiusuoService{
	@SuppressWarnings("unused")
	private UkQiusuoDao dao;
	
	public UkQiusuoServiceImpl(UkQiusuoDao dao) {
		super(dao);
		this.dao=dao;
	}

}