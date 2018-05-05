package com.ulane.core.plugin.util;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;

public class StoredProcedure {

	/**
	 * 存储过程示例
	 * CREATE OR REPLACE PROCEDURE TESTA(PARA1 IN VARCHAR2,PARA2 IN* VARCHAR2) AS 
	 * BEGIN 
	 * INSERT INTO T_TEST (I_ID,I_NAME) VALUES (PARA1,* PARA2);
	 * END TESTA;
	 * 
	 *  CREATE OR REPLACE PROCEDURE TESTA(LINEID IN INTEGET,HEADERID IN INTEGET,GOODID IN INTEGET) AS 
	 *  BEGIN
	 *  INSERT INTO SO_INSURE_LINE(INSURE_LINE_ID,INSURE_HEADER_ID,GOODS_ID )VALUES(LINEID,HEADERID,GOODID);
	 *  END TESTA;
	 */

	private static String driver = "oracle.jdbc.driver.OracleDriver";
	private static String url = "jdbc:oracle:thin:@10.3.78.94:1521:infoxdb";
	private static Connection connection = null;
	private static CallableStatement callableStatement = null;
	private static ResultSet resultSet = null;
	
	public static void getJDBCProcedure(){
		try {
			Class.forName(driver);
			connection = DriverManager.getConnection(url, "CTCERP", "loveme");
//			executeProcedureJDBC();
			executeProcedure();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/***
	 * JDBC连接数据库
	 */
	public static void executeProcedureJDBC(){
		String sql="select * from ar_income_invoice_header";
		try {
			Statement statement=connection.createStatement();
			resultSet=statement.executeQuery(sql);
			while(resultSet.next()){
				String resultStr=resultSet.getString("CREATE_BY");
				System.out.println("resultStr===="+resultStr);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * JDBC调用存储过程 :调用带输入参数的存储过程 
	 * callableStatementjava.sql.CallableStatement
	 * connectionjava.sql.Connection 
	 * jdbc调用存储过程原型 {call存储过程名(参数列表1,参数列表2,参数列表3)}可用?代替
	 */
	public static void executeProcedure() {
		try {
			callableStatement = connection
					.prepareCall("{ call ctc39.GOODSJOB}");
//			callableStatement.setInt(1, 1); // 设置输入参数
//			callableStatement.setInt(2, 66);
//			callableStatement.setInt(3, 1);
			resultSet = callableStatement.executeQuery();// 执行存储过程
			if (resultSet.next()) {
				System.out.println(resultSet.getInt(1) + resultSet.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * JDBC调用存储过程 :调用带输出参数的存储过程 
	 * callableStatementjava.sql.CallableStatement
	 * connectionjava.sql.Connection 
	 * jdbc调用存储过程原型 {call存储过程名(参数列表1,参数列表2,参数列表3)}可用?代替
	 */
	public static void executeProcedureOut() {
		try {
			callableStatement = connection
					.prepareCall("{call proc_employee_getCount(?)}");
			// 设置输出参数
			callableStatement.registerOutParameter(1, Types.INTEGER);
			// 执行存储过程
			resultSet = callableStatement.executeQuery();
			if (resultSet.next()) {
				System.out.println(resultSet.getInt(1));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}
	
	public static void main(String[] args) {
		System.out.println("+++++++++++++++++");
		String driverStr = "oracle.jdbc.driver.OracleDriver";
		String urlStr = "jdbc:oracle:thin:@10.3.78.94:1521:infoxdb";
		Statement stm = null;
		ResultSet rs = null;
		Connection conn = null;
		CallableStatement cstmt = null;
		try {
			Class.forName(driverStr);
			conn = DriverManager.getConnection(urlStr, "CTC_ERP", "loveme");
			conn.prepareCall("{ call dbname.TESTA(?,?)}");
			// String sql = "select count(*) from ar_income_invoice_header";
			// cstmt = conn.prepareCall(sql);
			cstmt.setString(1, "100");
			cstmt.setString(2, "200");
			cstmt.execute();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (rs != null) {
					rs.close();
					if (stm != null) {
						stm.close();
					}
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

	}

}
