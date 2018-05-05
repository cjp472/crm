package com.htsoft.oa.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.customer.CustomerDao;
import com.htsoft.oa.model.customer.Customer;

public class CustomerDaoImpl extends BaseDaoImpl<Customer> implements CustomerDao{

	public CustomerDaoImpl() {
		super(Customer.class);
	}

	@Override
	public boolean checkCustomerNo(final String customerNo) {
		final String hql = "select count(*) from Customer c where c.customerNo = ?";
		Long count = (Long)getHibernateTemplate().execute(new HibernateCallback(){

			@Override
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setString(0, customerNo);
				return query.uniqueResult();
			}});
		if(count!=0){
			return false;
		}else{
			return true;
		}
	}
	
	public Customer getCusByCusNo(String cusNo) {
		 Customer cus=null;
		 String hql="select cus from Customer cus where cus.customerNo=?";
		 List<Customer> cusList=findByHql(hql, new Object[]{cusNo});
		 if(cusList!=null&&cusList.size()>0) {
			 cus=cusList.get(0);
		 }
 		 return cus;
	}
	

}