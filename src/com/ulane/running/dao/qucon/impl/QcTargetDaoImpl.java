package com.ulane.running.dao.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.raq.dataserver.jdbc.ResultSet;
import com.ulane.running.dao.qucon.QcTargetDao;
import com.ulane.running.model.qucon.QcTarget;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class QcTargetDaoImpl extends BaseDaoImpl<QcTarget> implements QcTargetDao{

	public QcTargetDaoImpl() {
		super(QcTarget.class);
	}
	
	public List<QcTarget> findByType(Long tarcatId){
		final String hql = "from QcTarget q where q.qcTarCat.tarCatId = ?";
        Object[] params = { tarcatId };
        return findByHql(hql, params);
	}
	
	public List<Long> random(final int [] indexs){
		final List <Long> array = new ArrayList<Long>();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement("select TAR_ID from QC_TARGET",
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						java.sql.ResultSet rs = ps.executeQuery();
						for(int index  : indexs){
							rs.absolute(index);
							array.add(rs.getLong(1));
						}
					}
				});
				return null;
			}
		});
		for(Long l : array){
			System.out.println(array);
		}
		return array;
	}
}