package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlDepEmployeeDao;
import com.ulane.base.model.xitong.UlDepEmployee;
import com.ulane.base.service.xitong.UlDepEmployeeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UlDepEmployeeServiceImpl extends BaseServiceImpl<UlDepEmployee> implements UlDepEmployeeService{
	@SuppressWarnings("unused")
	private UlDepEmployeeDao dao;
	
	public UlDepEmployeeServiceImpl(UlDepEmployeeDao dao) {
		super(dao);
		this.dao=dao;
	}

}