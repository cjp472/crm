package com.ulane.customer.dao.customer.impl;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AgentReport;
import com.ulane.customer.dao.customer.CusReportDao;
import com.ulane.customer.model.customer.CusSpeEve;

public class CusReportDaoImpl extends BaseDaoImpl<AgentReport>  implements CusReportDao {

	public CusReportDaoImpl(Class persistType) {
		super(persistType);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List getAllReport() {
		System.out.println("111dao --- > list");
		String hql = "from AgentReport" ;
		List list = getHibernateTemplate().find(hql);
		System.out.println("222dao --- > list"+list.size());
		return list;
	}
	
}
