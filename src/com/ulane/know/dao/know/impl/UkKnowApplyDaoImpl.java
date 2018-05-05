package com.ulane.know.dao.know.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.raq.dataserver.jdbc.ResultSet;
import com.ulane.know.dao.know.UkKnowApplyDao;
import com.ulane.know.model.know.UkKnowApply;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

@SuppressWarnings("unchecked")
public class UkKnowApplyDaoImpl extends BaseDaoImpl<UkKnowApply> implements
		UkKnowApplyDao {
	Logger log = LoggerFactory.getLogger(UkKnowApplyDaoImpl.class);

	public UkKnowApplyDaoImpl() {
		super(UkKnowApply.class);
	}

	@Override
	public void saveRunidAndNodeName(Long runId, final String nodeName,
			Long headerId) {
		final String sql = "update Uk_Know_Apply set runid=" + runId
				+ " ,node_Name='" + nodeName + "' where apply_Id=" + headerId;
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection connection)
							throws SQLException {
						PreparedStatement ps = connection.prepareStatement(sql);
						int i = ps.executeUpdate();
						log.debug("update status:" + nodeName + i);
						ps.close();
					}
				});
				return null;
			}
		});
	}

	@Override
	public void updateStatusByNodeName(final String status, Long headerId,
			boolean isEnd) {
		String tmp = "";
		if (isEnd) {
			tmp = ", apply_status = 0";
		}
		final String sql = "update Uk_Know_Apply set approval_Status='"
				+ status + "'" + tmp + "  where apply_Id=" + headerId;

		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection connection)
							throws SQLException {
						PreparedStatement ps = connection.prepareStatement(sql);
						int i = ps.executeUpdate();
						log.debug("update name:" + status + i);
						ps.close();
					}
				});
				return null;
			}
		});

	}

	@Override
	public Map<Long, Boolean> getSelectId(final int start, final int limit,
			final Long userId, final String type, String firstId) {

		StringBuffer sb = new StringBuffer();
		sb.append("select distinct(FLOW_PK),PIID from ALL_NOW_TASK where FLOW_TYPE = ? and (TASK_USER like ? or CREATER = ?) and FLOW_PK");
		if (firstId == "-1") {
			sb.append(" = " + firstId);
		} else {
			sb.append(" in (" + firstId.substring(0, firstId.length() - 1)
					+ ")");
		}
		sb.append(" order by createtime");
		// "select distinct(FLOW_PK),PIID from ALL_NOW_TASK "
		// +
		// "where FLOW_TYPE = ? and (TASK_USER like ? or CREATER = ?) and FLOW_PK in ("
		// + firstId.substring(0, firstId.length() - 1) + ")";

		final String sql = sb.toString();
		System.out.println("sql:" + sql);
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
						rs.close();
						ps.close();
					}
				});
				return rs_map;
			}
		});
		return rs_map;
	}

	@Override
	public int getSelectIdCount(final int start, final int limit,
			final Long userId, final String type, String firstId) {
		StringBuffer sb = new StringBuffer();
		sb.append("select count(distinct(FLOW_PK)) from ALL_NOW_TASK where FLOW_TYPE = ? and (TASK_USER like ? or CREATER = ?) and FLOW_PK");
		// "select count(distinct(FLOW_PK)) from ALL_NOW_TASK where FLOW_TYPE = ? and (TASK_USER like ? or CREATER = ?) and FLOW_PK in ("
		// + firstId.substring(0, firstId.length() - 1) + ")";
		if (firstId == "-1") {
			sb.append(" = " + firstId);
		} else {
			sb.append(" in (" + firstId.substring(0, firstId.length() - 1)
					+ ")");
		}
		final String sql = sb.toString();
		log.debug("sql_count" + sql);
		final List<Integer> rs_l = new ArrayList<Integer>();
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
						rs.next();
						rs_l.add(rs.getInt(1));

						rs.close();
						ps.close();
					}
				});
				return null;
			}
		});
		return rs_l.get(0);
	}
}