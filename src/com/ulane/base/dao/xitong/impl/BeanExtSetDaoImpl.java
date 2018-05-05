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
import com.ulane.base.dao.xitong.BeanExtSetDao;
import com.ulane.base.model.xitong.BeanExtSet;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class BeanExtSetDaoImpl extends BaseDaoImpl<BeanExtSet> implements BeanExtSetDao{

	public BeanExtSetDaoImpl() {
		super(BeanExtSet.class);
	}

	@Override
	public Object getByColumnsId(Long columnsId) {
		// TODO Auto-generated method stub
		final String sql = "select be.ext_set_id from bean_ext_set be where be.bean_object_columns_id="+columnsId;
		return (Object) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql);
				Object extSetId = query.uniqueResult();
				return extSetId;
			}
		});
	}

}