package com.ulane.customer.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.customer.dao.customer.CusBusiInvokeDao;
import com.ulane.customer.model.customer.CusBusiInvoke;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class CusBusiInvokeDaoImpl extends BaseDaoImpl<CusBusiInvoke> implements CusBusiInvokeDao{

	public CusBusiInvokeDaoImpl() {
		super(CusBusiInvoke.class);
	}

}