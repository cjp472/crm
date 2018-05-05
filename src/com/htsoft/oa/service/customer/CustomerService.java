package com.htsoft.oa.service.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.customer.Customer;

public interface CustomerService extends BaseService<Customer>{

	public boolean checkCustomerNo(String customerNo);
	
	public Customer getCusByCusNo(String cusNo);
	
}


