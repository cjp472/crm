package com.ulane.core.plugin.util;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Types;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * <p>
 * Title: OrclFunctionUtil.java
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009-2011
 * </p>
 * <p>
 * Company: http://www.lasun.com.cn
 * </p>
 * 
 * @author yongan.liu
 * @date 2011-8-19
 * @version 1.0
 */
public class OrclFunctionUtil {
	private static final Log logger = LogFactory.getLog(OrclFunctionUtil.class); 
	private static Connection connection = null;
	private static CallableStatement callableStatement = null;

	static {
		try {
			Class.forName(ProertiesConfigUtil.getJdbcProValue("jdbc.driverClassName"));
			connection = DriverManager.getConnection(ProertiesConfigUtil.getJdbcProValue("jdbc.url"), ProertiesConfigUtil.getJdbcProValue("jdbc.username"), ProertiesConfigUtil.getJdbcProValue("jdbc.password"));
		} catch (ClassNotFoundException e) {
			logger.error("数据库连接类找不到！");
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	/**
	 * 
	 * @param functionName
	 * @param dblinkName
	 */
	public static boolean syncNcBaseDataImpl(String functionName, String dblinkName) {
		StringBuffer sb = new StringBuffer("{? =call ");
		sb.append(functionName).append("}");
		boolean reBoolean = true;
		try {
			callableStatement = connection.prepareCall(sb.toString());
			callableStatement.registerOutParameter(1, Types.VARCHAR);
			callableStatement.setString(2, "");
			callableStatement.setString(3, dblinkName);
			callableStatement.execute();
			String returnStr = callableStatement.getString(1);
			if(returnStr!=null&&"100".equals(returnStr)){
				logger.error("同步NC基础数据成功！");
				reBoolean=true;
			}else{
				logger.error("同步NC基础数据失败！");
				reBoolean=false;
			}
		} catch (SQLException e) {
			logger.error(e);
			reBoolean=false;
		}
		return reBoolean;
	}
}
