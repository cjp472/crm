package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Iterator;
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.BmFactorValueDao;
import com.ulane.base.model.xitong.BmFactorValue;
import com.ulane.base.service.xitong.BmFactorValueService;

public class BmFactorValueServiceImpl extends BaseServiceImpl<BmFactorValue> implements BmFactorValueService{
	@SuppressWarnings("unused")
	private BmFactorValueDao dao;
	
	public BmFactorValueServiceImpl(BmFactorValueDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Iterator getHql(String string, String string2, String string3) {
		// TODO Auto-generated method stub
		return dao.getHql(string,string2,string3);
	}

	@Override
	public List<BmFactorValue> getByFactor(Long factor1Id) {
		// TODO Auto-generated method stub
		return dao.getByFactor(factor1Id);
	}

	@Override
	public boolean isHql(String s1, String factorValue) {
		// TODO Auto-generated method stub
		return dao.isHql(s1,factorValue);
	}

}