package com.ulane.customer.dao.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.customer.model.customer.CusPersonal;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface CusPersonalDao extends BaseDao<CusPersonal>{
	//根据手机号查询是否存在客户
	public List<CusPersonal> checkNo(String phoneNo);
	//根据身份证号码查询是否存在客户
	public List<CusPersonal> checkCredNum(String credNum);
	//根据身份证号和手机号查询是否存在客户
	public List<CusPersonal> checkCredAndNo(String credNum,String phoneNo);
	//根据客户号查询客户信息
	public CusPersonal findByCustomerNo(String customerNo);
}