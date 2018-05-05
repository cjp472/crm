package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.commons.lang.StringUtils;

import orm.complex.query.common.DBUtils;
import orm.complex.query.framework.RowSet;
import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcPool;
import com.htsoft.core.util.json.JSONArray;
import com.ulane.callout.dao.outb.ObCallbatchDao;
import com.ulane.callout.model.outb.ObCallbatch;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObCallbatchDaoImpl extends BaseDaoImpl<ObCallbatch> implements ObCallbatchDao{
	@Resource
	private JdbcPool jdbcPool;
	public ObCallbatchDaoImpl() {
		super(ObCallbatch.class);
	}

	@SuppressWarnings("static-access")
	@Override
	public String listClearnBatch(Map<String, String> param,int start,int limit) {
		String jsonResult = "{}";
		long totalCounts = 0;
		Connection conn = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			
			String SQL = getClearnListSQL(param,dbQuery);				//组装查询条件
			totalCounts = dbQuery.getRecordCount(SQL);					//获取总记录数
			RowSet rowSet = new RowSet(start,limit);					//注入分页参数
			String OraclePagingSQL = dbQuery.getQuerySQL(SQL, rowSet);	//获取Oracle分页查询
			
			CommTable cTable = dbQuery.getCommTableBySQL(OraclePagingSQL);
			int iCount = cTable.getRecordCount();
			if(null!=cTable && iCount>0) {
				List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
				for(int i=0; i<iCount; i++) {
					HashMap<String,String> row = new HashMap<String,String>();
					row.put("callbatchId", cTable.getRecord(i).get("CALLBATCH_ID"));
					row.put("projName", cTable.getRecord(i).get("projName"));
					row.put("comName", cTable.getRecord(i).get("comName"));
					row.put("calllistName", cTable.getRecord(i).get("calllistName"));
					row.put("callBatchName", cTable.getRecord(i).get("CALLBATCH_NAM"));
					row.put("clearnDate", cTable.getRecord(i).get("CLEARN_DAT"));
					row.put("clearnTyp", cTable.getRecord(i).get("CLEARN_TYP"));
					row.put("clearnOpt", cTable.getRecord(i).get("CLEARN_OPT"));
					row.put("clearnCounts", cTable.getRecord(i).get("CLEARN_COUNTS"));
					result.add(row);
				}
				JSONArray json = new JSONArray(result);
				jsonResult = json.toString();
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally{
			jdbcPool.close(conn);
		}
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(totalCounts).append(",result:");
		buff.append(jsonResult);
		buff.append("}");
		return buff.toString();
	}
	
	private String getClearnListSQL(Map<String,String> param,DBQuery dbQuery) {
		/*	SQL：select distinct 
	    (select PROJ_NAM from OB_PROJECT PROJ where PROJ.PROJ_ID=(select PROJ_ID from OB_CALLLIST CALLIST where CALLIST.CALLLIST_ID=BATCH.CALLLIST_ID)) projName
	    ,(select OB_COM_NAM from OB_COM COM where COM.COM_ID=(select COMLIST.COM_ID from OB_COM_CALLLIST COMLIST where COMLIST.CALLLIST_ID=(select CALLIST.CALLLIST_ID from OB_CALLLIST CALLIST where CALLIST.CALLLIST_ID=BATCH.CALLLIST_ID))) comName
	    ,(select CALLLIST_NAM from OB_CALLLIST CALLIST where CALLIST.CALLLIST_ID=BATCH.CALLLIST_ID) calllistName
	    ,BATCH.CALLBATCH_NAM callBatchName 
	    ,BATCH.CLEARN_DAT clearnDate
	    ,BATCH.CLEARN_TYP clearnTyp
	    ,BATCH.CLEARN_OPT clearnOpt
	    ,BATCH.CLEARN_COUNTS clearnCounts
	    from OB_CALLBATCH BATCH;*/
			StringBuffer sb = new StringBuffer();
			sb.append("select distinct BATCH.* ");
			sb.append(",(select PROJ_NAM from OB_PROJECT PROJ where PROJ.PROJ_ID=(select PROJ_ID from OB_CALLLIST CALLIST where CALLIST.CALLLIST_ID=BATCH.CALLLIST_ID)) projName ");
			sb.append(",(select OB_COM_NAM from OB_COM COM where COM.COM_ID=(select COMLIST.COM_ID from OB_COM_CALLLIST COMLIST where COMLIST.CALLLIST_ID=(select CALLIST.CALLLIST_ID from OB_CALLLIST CALLIST where CALLIST.CALLLIST_ID=BATCH.CALLLIST_ID))) comName ");
			sb.append(",(select CALLLIST_NAM from OB_CALLLIST CALLIST where CALLIST.CALLLIST_ID=BATCH.CALLLIST_ID) calllistName ");
			sb.append("from OB_CALLBATCH BATCH where 1=1 ");
			
			if(StringUtils.isNotBlank(param.get("clearnTyp"))) {	//清洗方式
				sb.append(" and CLEARN_TYP="+param.get("clearnTyp"));
			}
			
			if(StringUtils.isNotBlank(param.get("startTime")) || StringUtils.isNotBlank(param.get("endTime"))) { //清洗时间
				param.put("field", "CLEARN_DAT");	//清洗时间
				sb.append(dbQuery.getOracleTimeSQL(param));
			}
			String SQL = sb.toString();
		return SQL;
	}
	
}