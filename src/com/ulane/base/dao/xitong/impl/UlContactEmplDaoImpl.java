package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.UlContactEmplDao;
import com.ulane.base.model.xitong.UlContactEmpl;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UlContactEmplDaoImpl extends BaseDaoImpl<UlContactEmpl> implements UlContactEmplDao{

	public UlContactEmplDaoImpl() {
		super(UlContactEmpl.class);
	}
	
	public List<UlContactEmpl> getAllByUseid(Long useid){
		String hql = "from UlContactEmpl u where u.ulEmployee.useid = "+useid;
		return findByHql(hql);
	}
}