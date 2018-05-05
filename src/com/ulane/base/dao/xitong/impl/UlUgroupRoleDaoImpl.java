package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.UlUgroupRoleDao;
import com.ulane.base.model.xitong.UlUgroupRole;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UlUgroupRoleDaoImpl extends BaseDaoImpl<UlUgroupRole> implements UlUgroupRoleDao{

	public UlUgroupRoleDaoImpl() {
		super(UlUgroupRole.class);
	}

	@Override
	public Object findByGroupAndRole(Long ugroupId, Long roleId) {
		final String sql = "from UlUgroupRole ugur where ugur.ulUsergroup=" + ugroupId + " and ugur.appRole=" + roleId;
		
		return (Object) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(sql);
				return query.uniqueResult();
			}
		});
	}

}