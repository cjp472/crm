package com.ulane.core.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.SessionFactoryUtils;

/**
 * 使用jdbc的帮助类,需要指定 <br>
 * 1.sql语句<br>
 * 2.查询时需要: paras(使用预编译的sql语句时需要),jdbcWork(sql查询时使用，处理结果集的接口)<br>
 * 3.isQuery执行jdbc的类型(默认为查询)
 * 
 * @author zhanghao
 * 
 */
public class JdbcHelper implements HibernateCallback {
	protected transient final Log logger = LogFactory.getLog(getClass());

	private String sql = "";
	private List<Object> paras = new ArrayList<Object>();
	private JdbcWork jdbcWork;
	private boolean isQuery = true;

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public void addPara(Object o) {
		this.paras.add(o);
	}

	public void setJdbcWork(JdbcWork work) {
		this.jdbcWork = work;
	}

	public Object executeQuery(Connection con) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		Object result = null;
		if (sql.equals("")) {
			System.err.println("没有指定sql");
			return null;
		}
		logger.debug("执行sql:" + sql);
		try {
			ps = con.prepareStatement(sql);
			for (int i = 1; i <= this.paras.size(); i++) {
				ps.setObject(i, this.paras.get(i - 1));
			}
			rs = ps.executeQuery();
			result = jdbcWork.fillData(rs);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (ps != null) {
					ps.close();
				}
				if (rs != null) {
					rs.close();
				}
				if (con != null) {
					con.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	@Override
	public Object doInHibernate(Session session) throws HibernateException,
			SQLException {
		SessionFactory sf = session.getSessionFactory();
		Connection con = SessionFactoryUtils.getDataSource(sf).getConnection();
		Object result;
		if (isQuery) {
			result = executeQuery(con);
		} else {
			return 0;
		}
		session.flush();
		session.close();
		return result;
	}

	public static String getPagingSql(String sql, int start, int limit) {
		String result = "SELECT * FROM ( "
				+ "SELECT A.*, ROWNUM RN FROM (innerSQL) A "
				+ "WHERE ROWNUM <= " + (start + limit) + ")" + "WHERE RN >= "
				+ start;
		result = result.replace("innerSQL", sql);
		return result;
	}
}
