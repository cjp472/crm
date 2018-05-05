package com.ulane.supply.dao.sales.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.raq.dataserver.jdbc.ResultSet;
import com.ulane.supply.dao.sales.ScBizOrderSalesDao;
import com.ulane.supply.model.sales.ScBizOrderSales;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ScBizOrderSalesDaoImpl extends BaseDaoImpl<ScBizOrderSales> implements ScBizOrderSalesDao{

	public ScBizOrderSalesDaoImpl() {
		super(ScBizOrderSales.class);
	}
//
//	@Override
//	public String getHistoryOrders(String cusId) {
//		String SQL = "select * from SC_BIZ_ORDER_SALES where CREATE_USER_ID=1 and CUST_ID=1;";
//		return null;
//	}

	@Override
	public Map<Long, Boolean> getSelectId(final int start,final int limit,final Long userId,
			final String type,final String firstId) {

		final String sql = "select distinct(FLOW_PK),PIID from ALL_NOW_TASK "
				+ "where FLOW_TYPE = ? and (TASK_USER = ? or CREATER = ?) and FLOW_PK in ("
				+ firstId.substring(0, firstId.length() - 1) + ")";
		final Map<Long, Boolean> rs_map = new HashMap<Long, Boolean>();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(sql,
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						ps.setString(1, type);
						ps.setLong(2, userId);
						ps.setLong(3, userId);
						java.sql.ResultSet rs = ps.executeQuery();
						System.out.println(start + "-" + limit);
						if (rs.next()) {// 至少有一条记录，才可以定位
							rs.absolute(start + 1);

							if (rs.getString(2) == null
									|| rs.getString(2).equals("")) {
								rs_map.put(rs.getLong(1), true);
							} else {
								rs_map.put(rs.getLong(1), false);
							}
						}
						for (int i = 0; i < limit - 1; i++) {
							if (rs.next()) {
								if (rs.getString(2) == null) {
									rs_map.put(rs.getLong(1), true);
								} else {
									rs_map.put(rs.getLong(1), false);
								}
							}
						}
					}
				});
				return rs_map;
			}
		});
		return rs_map;
	}

	@Override
	public void saveRunidAndNodeName(Long runId, String nodeName, Long headerId) {
		final String sql = "update sc_biz_order_sales set runid=" + runId
		+ " ,node_Name='" + nodeName + "' where BIZ_ORDER_ID=" + headerId;
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection connection)
							throws SQLException {
						PreparedStatement ps = connection.prepareStatement(sql);
						int i = ps.executeUpdate();
					}
				});
				return null;
			}
		});
}

	@Override
	public void updateStatusByNodeName(String status, Long headerId,
			boolean isEnd) {
		String tmp = "";
//		if (isEnd) {
//			tmp = ", STATUS = 1";
//		}
		final String sql = "update sc_biz_order_sales set APPROVAL_STATUS='"
				+ status + "'" + tmp + "  where BIZ_ORDER_ID=" + headerId;

		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection connection)
							throws SQLException {
						PreparedStatement ps = connection.prepareStatement(sql);
						int i = ps.executeUpdate();
					}
				});
				return null;
			}
		});

	}
}