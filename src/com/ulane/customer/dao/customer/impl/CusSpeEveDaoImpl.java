package com.ulane.customer.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import orm.complex.query.framework.RowSet;
import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcPool;
import com.htsoft.core.util.QueryUtil;
import com.htsoft.core.util.json.JSONArray;
import com.ulane.customer.dao.customer.CusSpeEveDao;
import com.ulane.customer.model.customer.CusSpeEve;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class CusSpeEveDaoImpl extends BaseDaoImpl<CusSpeEve> implements CusSpeEveDao{
	@Resource
	private JdbcPool jdbcPool;
	public CusSpeEveDaoImpl() {
		super(CusSpeEve.class);
	}

	@SuppressWarnings("static-access")
	@Override
	public String getEveByCusId(String cusId,String pagStart,String pageSize) {
		String SQL = "select EVE_ID,EVE_CONTENT,CRE_USE_ID,CRE_DAT from CUS_SPE_EVE cus_eve where CUSTOMERID="+cusId;
		int start = 0;
		int size = 25;
		if(StringUtils.isNotBlank(pagStart)) {
			start = Integer.parseInt(pagStart);
		}
		if(StringUtils.isNotBlank(pageSize)) {
			size = Integer.parseInt(pageSize);
		}
		
		RowSet rowSet = new RowSet(start, size);
		
		Connection conn = null;
		try{
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			String selectSQL = dbQuery.getQuerySQL(SQL, rowSet);
			long totalCounts = dbQuery.getRecordCount(selectSQL);
			CommTable cTable = dbQuery.getCommTableBySQL(SQL);
			
			int iCount = cTable.getRecordCount();
			if(null!=cTable && iCount>0) {
				List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
				for(int i=0;i<iCount;i++) {
					HashMap<String,String> row = new HashMap<String,String>();
					row.put("eveId", cTable.getRecord(i).get("EVE_ID"));
					row.put("eveContent", cTable.getRecord(i).get("EVE_CONTENT"));
					row.put("creUseId", cTable.getRecord(i).get("CRE_USE_ID"));
					row.put("creDat", cTable.getRecord(i).get("CRE_DAT"));
//					row.put("fullname", cTable.getRecord(i).get("fullname"));
					result.add(row);
				}
				
				JSONArray json = new JSONArray(result);
				String data = json.toString();
				
				StringBuilder buff = new StringBuilder("{success:true,'totalCounts':").append(totalCounts).append(",result:");
				buff.append(data);
				buff.append("}");
				return buff.toString();
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			jdbcPool.close(conn);
		}
		return "{success:true,'totalCounts':0,result:[]}";
	}

}