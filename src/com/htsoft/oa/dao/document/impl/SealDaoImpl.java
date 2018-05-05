package com.htsoft.oa.dao.document.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.document.SealDao;
import com.htsoft.oa.model.document.Seal;

@SuppressWarnings("unchecked")
public class SealDaoImpl extends BaseDaoImpl<Seal> implements SealDao{

	public SealDaoImpl() {
		super(Seal.class);
	}

}