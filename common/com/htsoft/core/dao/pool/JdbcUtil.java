package com.htsoft.core.dao.pool;

import java.sql.Connection;

/**
 * JdbcUtil：用于获取jdbc连接工具类
 * 该类作为jdbc连接获取的统一入口
 * @author huchao
 *
 */
public class JdbcUtil {
	
	private static JdbcUtil instance = new JdbcUtil();
	
	private JdbcUtil(){}
	
	/**
	 * 获取单例
	 * @return
	 */
	public static JdbcUtil getInstance() {
		return instance;
	}
	
	/**
	 * 取得连接
	 * 注意：使用Conn连接后，必须调用close方法关闭连接
	 * @return
	 */
	public Connection getConnection() {
		return JdbcPool.getConn();
	}
	
	/**
	 * 关闭连接
	 * @param conn
	 */
	public void close(Connection conn) {
		JdbcPool.close(conn);
	}
}
