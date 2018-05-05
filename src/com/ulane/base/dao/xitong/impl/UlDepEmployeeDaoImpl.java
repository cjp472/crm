package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.UlDepEmployeeDao;
import com.ulane.base.model.xitong.UlDepEmployee;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UlDepEmployeeDaoImpl extends BaseDaoImpl<UlDepEmployee> implements UlDepEmployeeDao{

	public UlDepEmployeeDaoImpl() {
		super(UlDepEmployee.class);
	}

}