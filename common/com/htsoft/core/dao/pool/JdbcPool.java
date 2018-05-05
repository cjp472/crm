package com.htsoft.core.dao.pool;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * 自定义连接池JdbcPool
 * 说明：默认配置的连接数为5个，每隔15秒检查一次连接池的连接数
 * 		连接获取，只能通过JdbcUtil单例类获取
 * @author huchao
 *
 */
public class JdbcPool {
	public static final Logger logger = Logger.getLogger(JdbcPool.class);
	private static Connection[] DBconn = new Connection[5];
	
	private static int freenum = 4;// 0-4
	private static String driver, url, name, pwd;
	public static Long timeout;
	
	public JdbcPool(){
		Properties prop = new Properties();
		String cur_path = getClass().getClassLoader().getResource("").toString();
		cur_path = cur_path.substring(6, cur_path.length());
		FileInputStream inStream;
		try {
			inStream = new FileInputStream(new File("/"+cur_path + File.separator + "conf" + File.separator  + "jdbc.properties"));
			prop.load(inStream);
			driver = prop.getProperty("jdbc.driverClassName");
			url = prop.getProperty("jdbc.url");
			name = prop.getProperty("jdbc.username");
			pwd = prop.getProperty("jdbc.password");
			timeout = Long.parseLong(prop.getProperty("c3p0.maxIdleTime"));
			
			Class.forName(driver);
			
			for(int i=0; i<5; i++) DBconn[i] = DriverManager.getConnection(url, name, pwd);
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
	}
	//0：自己；1--；2++
	private synchronized static int getFreenum(int f){
		return f == 0 ? freenum : ( f== 1 ? (--freenum ): ++freenum );
	}
	
	/**
	 * 获取连接
	 * @return
	 */
	public synchronized static Connection getConn(){
		logger.debug("#Conn Num：" + getFreenum(0));
		if(getFreenum(0) <0){
			return null;
		} else {
			Connection conn = DBconn[freenum];
			freenum--;
			return conn;
		}
			
		
	}
	
	/**
	 * 关闭连接池
	 * @param conn
	 * @return
	 */
	public synchronized static boolean close(Connection conn){
		if(getFreenum(0) > 3){
			return false;
		} else {
			DBconn[getFreenum(2)] = conn;
		}
		return true;
	}
	
	/***
	 * 线程判断freenum <4，调用此方法更新连接池
	 * @return
	 * @throws SQLException 
	 */
	public synchronized static boolean updatepool() throws SQLException{
		logger.debug("##JdbcPool：update JdbcPool！");
		while(getFreenum(0) < 4){
			logger.debug("##JdbcPool：update JdbcPool free！");
			DBconn[getFreenum(2)].close();
			DBconn[getFreenum(0)] = DriverManager.getConnection(url, name, pwd);
		}
		return true;
	}
	
}
