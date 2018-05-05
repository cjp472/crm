package com.ulane.customer.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.customer.dao.customer.CusPersonalDao;
import com.ulane.customer.model.customer.CusPersonal;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class CusPersonalDaoImpl extends BaseDaoImpl<CusPersonal> implements CusPersonalDao{

	public CusPersonalDaoImpl() {
		super(CusPersonal.class);
	}
	
	//根据手机号查询是否存在此客户
	@Override
	public List<CusPersonal> checkNo(String phoneNo) {
		// TODO Auto-generated method stub
		String hql = "from CusPersonal cp where cp.customerId in (select cus.customer.customerId from CusContact cus where cus.mainContactNum=?)";
		Object[] params = {phoneNo};
		List<CusPersonal> list = findByHql(hql, params);
		return list;
	}

	//根据证件号码查询是否存在此客户wangzj
	@Override
	public List<CusPersonal> checkCredNum(String credNum) {
		// TODO Auto-generated method stub
		String hql = "from CusPersonal cp where cp.credNum=?";
		Object[] params = {credNum};
		List<CusPersonal> list = findByHql(hql, params);
		return list;
	}

	@Override
	public List<CusPersonal> checkCredAndNo(String credNum, String phoneNo) {
		// TODO Auto-generated method stub
		String hql = "from CusPersonal cp where cp.credNum=? and cp.customerId in (select cus.customerId from Customer cus where cus.phone = ?)";
		Object[] params = {credNum,phoneNo};
		List<CusPersonal> list = findByHql(hql, params);
		return list;
	}

	@Override
	public CusPersonal findByCustomerNo(String customerNo) {
		// TODO Auto-generated method stub
		String hql = "from CusPersonal cp where cp.customerId in (select ct.customerId from Customer ct where ct.customerNo=?)";
		Object[] params = {customerNo};
		List<CusPersonal> list = findByHql(hql, params);
		return list.get(0);
	}
}