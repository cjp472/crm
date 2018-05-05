package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.callout.dao.outb.ObComScrDao;
import com.ulane.callout.model.outb.ObComScr;
/**
 * 
 * @author lzm
 *
 */

@SuppressWarnings("unchecked")
public class ObComScrDaoImpl extends BaseDaoImpl<ObComScr> implements ObComScrDao{

	public ObComScrDaoImpl() {
		super(ObComScrDao.class);
	}

	@Override
	public Long getScrIdByComId(String comId) {
		String HQL = "from ObComScr where status="+ObComScr.STATUS_STAR+" and comId="+comId;
		List<ObComScr> list = findByHql(HQL);
		if(null!=list && list.size()>0) {
			return list.get(0).getTmpId();
		}
		return null;
	}
	
}