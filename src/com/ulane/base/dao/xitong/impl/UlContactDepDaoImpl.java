package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.UlContactDepDao;
import com.ulane.base.model.xitong.UlContactDep;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UlContactDepDaoImpl extends BaseDaoImpl<UlContactDep> implements UlContactDepDao{

	public UlContactDepDaoImpl() {
		super(UlContactDep.class);
	}

	/**
	 * 根据部门名称查询
	 * @param DepId
	 * @return
	 */
	@Override
	public List<UlContactDep> getAllByDepId(Long depId) {
		String hql = "from UlContactDep u where u.ulDepartment.depid = "+depId;
		return findByHql(hql);
	}

	
}