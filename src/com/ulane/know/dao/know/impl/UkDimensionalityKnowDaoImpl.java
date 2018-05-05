package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.know.dao.know.UkDimensionalityKnowDao;
import com.ulane.know.model.know.UkDimensionalityKnow;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkDimensionalityKnowDaoImpl extends BaseDaoImpl<UkDimensionalityKnow> implements UkDimensionalityKnowDao{

	public UkDimensionalityKnowDaoImpl() {
		super(UkDimensionalityKnow.class);
	}

	@Override
	public List findKnowDimenKnowid(String knowDimenIds,String type) {
		String sql = " select distinct u.know_id from uk_dimensionality_know u where u.dimensionality_type = " + type;
		if(knowDimenIds!=null && !knowDimenIds.equals("")){
			sql += " and u.dimensionality_id = " + knowDimenIds;
		}
		final String sqls = sql;
		return  (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sqls);
				return query.list();
			}
		});
	}
}