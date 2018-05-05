package com.htsoft.oa.dao.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.Constants;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.StandSalaryDao;
import com.htsoft.oa.model.hrm.StandSalary;

public class StandSalaryDaoImpl extends BaseDaoImpl<StandSalary> implements StandSalaryDao{

	public StandSalaryDaoImpl() {
		super(StandSalary.class);
	}

	@Override
	public boolean checkStandNo(final String standardNo) {
		final String hql = "select count(*) from StandSalary ss where ss.standardNo = ?";
		Long count = (Long)getHibernateTemplate().execute(new HibernateCallback(){
			@Override
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setString(0, standardNo);
				return query.uniqueResult();
			}});
		if(count!=0){
			return false;
		}else{
			return true;
		}
	}

	@Override
	public List<StandSalary> findByPassCheck() {
	    String hql="from StandSalary vo where vo.status=?";
	    Object[] objs={Constants.FLAG_PASS};
		return findByHql(hql, objs);
	}

}