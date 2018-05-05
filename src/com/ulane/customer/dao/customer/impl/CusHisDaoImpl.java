package com.ulane.customer.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.customer.dao.customer.CusHisDao;
import com.ulane.customer.model.customer.CusHis;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class CusHisDaoImpl extends BaseDaoImpl<CusHis> implements CusHisDao{

	public CusHisDaoImpl() {
		super(CusHis.class);
	}

}