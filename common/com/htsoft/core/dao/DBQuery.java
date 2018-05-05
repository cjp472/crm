package com.htsoft.core.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import orm.complex.query.framework.RowSet;
import orm.complex.query.framework.commtable.CommTable;
import orm.complex.query.framework.commtable.CommTableField;
import orm.complex.query.framework.commtable.CommTableRecord;
import orm.complex.query.fun.FuncDate;
import orm.complex.query.fun.FuncString;
import orm.complex.query.common.DBUtils;
import orm.complex.query.common.DBQueryCallback;

/**
 * 关于复杂查询的通用接口类
 * 注意：依赖于spring注入的DataSource取连接
 * @author huchao185@gmail.com
 *
 */
public class DBQuery
{
	private Connection	m_Conn = null;

	public static DBQuery getDBQuery(Connection conn)
	{
		try
		{
			DBQuery tDBQuery = new DBQuery();
			tDBQuery.setConnection(conn);
			return tDBQuery;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}

	private void setConnection(Connection conn)
	{
		m_Conn = conn;
	}

	protected Connection getConnection()
	{
		return m_Conn;
	}
	
	/**
	 * 获取分页查询的SQL
	 * @param selectSql
	 * @param rowSet
	 * @return
	 */
	public String getQuerySQL( String selectSql ,RowSet rowSet) {
		if(rowSet == null)
			return selectSql;
		long beginPage = rowSet.getOffset();
		long pageSize = rowSet.getRows();
		
		if (pageSize<0) {
			return selectSql;
		}
		
		if (beginPage<0) {
			pageSize += beginPage;
			beginPage = 0;
			if (pageSize<0) {
				pageSize = 0;
			}
		}
		
		if (beginPage == 0) {
			long beginRow = 1;
			long endRow = beginRow + pageSize;
			return getOraclePagingSql(selectSql,beginRow,endRow);
		} else {
			long beginRow = beginPage + 1;
			long endRow = beginRow + pageSize;
			return getOraclePagingSql(selectSql,beginRow,endRow);
		}
	}
	
	private String getOraclePagingSql(String sql,long beginRow,long endRow) {
		StringBuffer pagingSelect = new StringBuffer();
		pagingSelect.append("SELECT * FROM ( SELECT rs_row_.*, rownum rownum_ FROM ( ");

		if (sql.toUpperCase().indexOf("ASC") > 0&&sql.toUpperCase().indexOf("DESC") <= 0) {
			sql = sql.substring(0, sql.toUpperCase().indexOf("ASC") + 4) + ",1 asc "
					+ sql.substring(sql.toUpperCase().indexOf("ASC") + 3, sql.length());
		} else if (sql.toUpperCase().indexOf("DESC") > 0&&sql.toUpperCase().indexOf("ASC") <= 0) {
			sql = sql.substring(0, sql.toUpperCase().indexOf("DESC") + 4)
					+ " ,1 asc " + sql.substring(sql.toUpperCase().indexOf("DESC") + 4, sql.length());
		} else if(sql.toUpperCase().indexOf("ASC") > 0&&sql.toUpperCase().indexOf("DESC")>0) {
			sql = sql.substring(0, sql.toUpperCase().indexOf("DESC") + 4)
					+ " ,1 asc " + sql.substring(sql.toUpperCase().indexOf("DESC") + 4, sql.length());
		}
		pagingSelect.append(sql);
		pagingSelect.append(" ) rs_row_ where rownum < " + endRow + ") WHERE rownum_ >= " + beginRow);
		return pagingSelect.toString();
	}
	
	/**
	 * 获取总记录数
	 * @param selectSql
	 * @return
	 * @throws SQLException
	 */
	public long getRecordCount( String selectSql ) throws SQLException
	{
		long recordCount = 0;

		ResultSet rs = null;
		PreparedStatement ps = null;
//		String countSql = getCountSql(selectSql);
		try {
			Statement stmt = m_Conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			rs = stmt.executeQuery(selectSql);
			
			rs.last();
			recordCount = rs.getRow() ;
			
		} catch(SQLException e) {
			throw e;
		} finally {
			rs = DBUtils.close(rs);
			ps = DBUtils.close(ps);
		}
		return recordCount;
	}

	private CommTableField getCommTableBySQL(String SQL, DBQueryCallback dbQueryCallback) throws Exception {
		Statement stmt = null;
		ResultSet rs = null;
		try
		{
			stmt = m_Conn.createStatement();
			rs = stmt.executeQuery(SQL);
			ResultSetMetaData rsmd = rs.getMetaData();
			int iFieldCount = rsmd.getColumnCount();
			CommTableField ctf = (new CommTableField());
			for(int i=0;i<iFieldCount;i++)
			{
				ctf.addField(rsmd.getColumnLabel(i + 1));
			}
			while(rs.next())
			{
				CommTableRecord ctr = new CommTableRecord(ctf);
				for(int i=0;i<iFieldCount;i++)
				{
					int iSQLType = java.sql.Types.VARCHAR;
					if(rsmd != null)
					{
						iSQLType = rsmd.getColumnType(i + 1);
					}
					switch(iSQLType)
					{
					case java.sql.Types.DATE:
						ctr.set(i, FuncDate.toDate(rs.getTimestamp(i + 1)));
						break;
					case java.sql.Types.TIME:
					case java.sql.Types.TIMESTAMP:
						ctr.set(i, FuncDate.toDateTime(rs.getTimestamp(i + 1)));
						break;
					case java.sql.Types.CLOB:
						ctr.set(i, FuncString.getStringFromClob(rs.getClob(i + 1)));
						break;
					default:
						ctr.set(i, rs.getString(i + 1));
						break;
					}
				}
				dbQueryCallback.apply(ctr);
			}
			return ctf;
		}
		finally
		{
			rs = DBUtils.close(rs);
			stmt = DBUtils.close(stmt);
		}
	}
	
	/**
	 * 执行SQL语句，返回CommTable数据
	 * @param SQL
	 * @return
	 * @throws Exception
	 */
	public CommTable getCommTableBySQL(String SQL) throws Exception {
		DefaultDBQueryCallback dbQueryCallback = new DefaultDBQueryCallback();
		CommTableField ctf = getCommTableBySQL(SQL,dbQueryCallback);

		CommTable ct = dbQueryCallback.getCommTable();
		if(ct == null) {
			ct = new CommTable(ctf);
		}
		return ct;
	}
	
	private static class DefaultDBQueryCallback implements DBQueryCallback {
		private CommTable ct = null;
		public void apply(CommTableRecord ctr) {
			if(ctr == null)
				return;
			if(ct == null) {
				ct = new CommTable(ctr.getField());
			}
			ct.addRecord(ctr);
		}
		public CommTable getCommTable() {
			return ct;
		}
	}
	
	private String getCountSql(String sql) {
		StringBuffer countSql = new StringBuffer("SELECT COUNT(*) TOTAL_COUNT FROM (").append(sql).append(")");
		return countSql.toString();
	}
	
	/**
	 * 获得组装时间段查询串
	 * @param queryParam
	 * @return
	 */
	public String getOracleTimeSQL(Map<String,String> queryParam) {
		String field = queryParam.get("field");										//组装字段
		String startTime = queryParam.get("startTime");								//开始时间
		String endTime = queryParam.get("endTime");									//结束时间
		String SQL = "";
		
		if(StringUtils.isBlank(startTime) && StringUtils.isBlank(endTime)) {
			return SQL;
		}
		else if(StringUtils.isNotBlank(startTime) && StringUtils.isNotBlank(endTime)) {
			SQL = " and " + field + ">=to_date('" + startTime +" 00:00:00','yyyy-mm-dd hh24:mi:ss') and " + field + "<=to_date('" + endTime +" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
		} else if(StringUtils.isNotBlank(startTime) && StringUtils.isBlank(endTime)) {
			SQL = " and " + field + ">=to_date('" + startTime +" 00:00:00','yyyy-mm-dd hh24:mi:ss')";
		} else if(StringUtils.isBlank(startTime) && StringUtils.isNotBlank(endTime)) {
			SQL = " and " + field + "<=to_date('" + endTime +" 23:59:59','yyyy-mm-dd hh24:mi:ss')";
		}
		return SQL;
	}
}
