package com.ulane.core.util;

import java.sql.ResultSet;

public abstract class JdbcWork {

	/**
	 * 使用jdbc查询得到的ResultSet,处理完成后返回一个结果
	 * 
	 * @return
	 */
	public abstract Object fillData(ResultSet rs);
}
