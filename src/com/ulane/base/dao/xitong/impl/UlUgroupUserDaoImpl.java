package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.UlUgroupUserDao;
import com.ulane.base.model.xitong.UlUgroupUser;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UlUgroupUserDaoImpl extends BaseDaoImpl<UlUgroupUser> implements UlUgroupUserDao{

	public UlUgroupUserDaoImpl() {
		super(UlUgroupUser.class);
	}

	@Override
	public Object findByGroupAndUser(Long ugroupId, Long userId) {
		final String sql = "from UlUgroupUser ugus where ugus.ulUsergroup=" + ugroupId + " and ugus.appUser=" + userId;
		
		return (Object) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(sql);
				return query.uniqueResult();
			}
		});
	}

	@Override
	public List<UlUgroupUser> findByUserId(Long id) {
		StringBuffer sb = new StringBuffer(
				"from UlUgroupUser j where 1 = 1 and j.appUser.userId = ? "); 
		ArrayList<Object> paramList = new ArrayList<Object>();
		paramList.add(id);
		return findByHql(sb.toString(), paramList.toArray());
	}
}