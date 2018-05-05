package com.htsoft.oa.dao.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.admin.OfficeGoodsDao;
import com.htsoft.oa.model.admin.OfficeGoods;

public class OfficeGoodsDaoImpl extends BaseDaoImpl<OfficeGoods> implements OfficeGoodsDao{

	public OfficeGoodsDaoImpl() {
		super(OfficeGoods.class);
	}

	@Override
	public List<OfficeGoods> findByWarm() {
		String hql="from OfficeGoods vo where ((vo.stockCounts<=vo.warnCounts and vo.isWarning=1) or (vo.stockCounts<=0))";
		return findByHql(hql);
	}

}