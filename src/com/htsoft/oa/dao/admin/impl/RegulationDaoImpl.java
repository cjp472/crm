package com.htsoft.oa.dao.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.admin.RegulationDao;
import com.htsoft.oa.model.admin.Regulation;

@SuppressWarnings("unchecked")
public class RegulationDaoImpl extends BaseDaoImpl<Regulation> implements RegulationDao{

	public RegulationDaoImpl() {
		super(Regulation.class);
	}

}