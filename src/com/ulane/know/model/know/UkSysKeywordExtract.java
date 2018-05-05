package com.ulane.know.model.know;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.mahout.common.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 确定使用频率最高的客户作为抽取样本 <br>
 * 注：只使用与oracle,sql语法：where rownum <= 10
 * 
 * @author zhanghao
 * 
 */
public class UkSysKeywordExtract {
	Logger log = LoggerFactory.getLogger(UkSysKeywordExtract.class);
	private DataSource dataSource;
	private String tableName;
	private String falgColumn = "IS_SAMPLES";

	// private String customerColumn = "CUSTOMERID";
	// private String countColumn = "VIEW_COUNT";

	public UkSysKeywordExtract(DataSource ds, String tableName) {
		this.dataSource = ds;
	}

	public void prepare() {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql_empty = "update ? set ? = 0";
		try {
			conn = dataSource.getConnection();
			stmt = conn.prepareStatement(sql_empty);
			stmt.setString(1, tableName);
			stmt.setString(2, falgColumn);
			stmt.executeUpdate();
			log.info("初始化样本成功！");
		} catch (SQLException sqle) {
			log.warn("初始化样本失败。", sqle);
		} finally {
			try {
				stmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			IOUtils.quietClose(conn);
		}
	}

	public void extract(int num) {
		Connection conn = null;
		PreparedStatement stmt = null;
		String sql_extract = "update UK_KEYWORD_CUSTOMER set IS_SAMPLES = 1 where CUSTOMERID in("
				+ " select CUSTOMERID from ("// 找到综合点击次数最高的十个人，作为样本。注：只使用与oracle
				+ "SELECT CUSTOMERID FROM UK_KEYWORD_CUSTOMER "
				+ "group by CUSTOMERID order by sum(VIEW_COUNT) desc"
				+ ") where rownum <= ?)";
		try {
			conn = dataSource.getConnection();
			stmt = conn.prepareStatement(sql_extract);
			stmt.setInt(1, num);
			log.info(stmt.executeUpdate() + "条记录作为样本被抽取");
		} catch (SQLException sqle) {
			log.warn("设定抽取样本失败。" + sql_extract, sqle);
		} finally {
			try {
				stmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			IOUtils.quietClose(conn);
		}
	}
}
