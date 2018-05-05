package com.htsoft.oa.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.CustomerDao;
import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.service.customer.CustomerService;

public class CustomerServiceImpl extends BaseServiceImpl<Customer> implements CustomerService{
	private CustomerDao dao;
	
	public CustomerServiceImpl(CustomerDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean checkCustomerNo(String customerNo) {
		return dao.checkCustomerNo(customerNo);
	}
	
	public Customer getCusByCusNo(String cusNo) {
		return dao.getCusByCusNo(cusNo);
	}
	
	
}