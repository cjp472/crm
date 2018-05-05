package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.UlBbsJieshouDao;
import com.ulane.base.model.xitong.UlBbsJieshou;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UlBbsJieshouDaoImpl extends BaseDaoImpl<UlBbsJieshou> implements UlBbsJieshouDao{

	public UlBbsJieshouDaoImpl() {
		super(UlBbsJieshou.class);
	}

	@Override
	public List<UlBbsJieshou> findByUser(Long userId) {
		String hql = "from UlBbsJieshou ul where ul.appUser.userId = ?";
		Object[] objs = { userId };
		return findByHql(hql, objs);
	}

	
}