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

import orm.complex.query.framework.RowSet;
import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcPool;
import com.htsoft.core.util.json.JSONArray;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.customer.dao.customer.CusRelationshipDao;
import com.ulane.customer.model.customer.CusRelationship;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class CusRelationshipDaoImpl extends BaseDaoImpl<CusRelationship> implements CusRelationshipDao{
	@SuppressWarnings("unused")
	@Resource
	private JdbcPool jdbcPool;
	
	public CusRelationshipDaoImpl() {
		super(CusRelationship.class);
	}
	
	@SuppressWarnings("static-access")
	@Override
	public String getCusRelation(String cusId,PagingBean pagBean) {
		//业务逻辑：1.根据推荐人查被推荐人。2.根据被推荐人查推荐人
		//author：胡超（2012-08-01）
		//性能：该合并查询，关键在于两个查询，而查询的列为：CUSTOMERID和CUS_CUSTOMERID，建议在这两列上建立索引，以提高效率。（2012-08-01：该索引尚未建立）
/*SQL:	select CUS_CUSTOMERID CUS_ID,RELATIONSHIP_ID,RELATIONSHIP_TYPE,(select CUSTOMERNAME from customer where CUSTOMERID=CUS_REL.CUS_CUSTOMERID) CUS_NAME from CUS_RELATIONSHIP CUS_REL where CUSTOMERID=10020 
 			union all 
		select CUSTOMERID CUS_ID,RELATIONSHIP_ID,RELATIONSHIP_TYPE,(select CUSTOMERNAME from customer where CUSTOMERID=CUS_REL.CUSTOMERID) CUS_NAME from CUS_RELATIONSHIP CUS_REL where CUS_CUSTOMERID=10020
*/
		StringBuffer sb = new StringBuffer();
		sb.append("select CUS_CUSTOMERID CUS_ID,RELATIONSHIP_ID,RELATIONSHIP_TYPE,(select NAME_CN from cus_personal where CUSTOMERID=CUS_REL.CUS_CUSTOMERID) CUS_NAME from CUS_RELATIONSHIP CUS_REL where CUSTOMERID="+cusId);
//		sb.append(" union all ");	//查找全部，可能存在重复的
		sb.append(" union ");
		sb.append("select CUSTOMERID CUS_ID,RELATIONSHIP_ID,RELATIONSHIP_TYPE,(select NAME_CN from cus_personal where CUSTOMERID=CUS_REL.CUSTOMERID) CUS_NAME from CUS_RELATIONSHIP CUS_REL where CUS_CUSTOMERID="+cusId);
		String SQL = sb.toString();
		Connection conn = null;
		try{
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			RowSet rowSet = new RowSet(pagBean.getStart(),pagBean.getPageSize());
			String selectSQL = null;
			if(null!=pagBean) {
				selectSQL = dbQuery.getQuerySQL(SQL, rowSet);					//获取Oracle的分页查询
			} else {
				selectSQL = SQL;
			}
			 
			Long totalCounts = dbQuery.getRecordCount(SQL);							//获取总记录数
			CommTable cTable = dbQuery.getCommTableBySQL(selectSQL);
			
			//转换为客户端对应的JSON串
			List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
			int iCount = cTable.getRecordCount();
			for(int i=0; i<iCount; i++) {
				HashMap<String,String> row = new HashMap<String,String>();
				row.put("relId", cTable.getRecord(i).get("RELATIONSHIP_ID"));
				row.put("cusId", cTable.getRecord(i).get("CUS_ID"));
				row.put("cusName", cTable.getRecord(i).get("CUS_NAME"));
				row.put("relTypId", cTable.getRecord(i).get("RELATIONSHIP_TYPE"));
				result.add(row);
			}
			JSONArray json = new JSONArray(result);
			String data = json.toString();
			
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(totalCounts).append(",result:");
			buff.append(data);
			buff.append("}");
			return buff.toString();
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			jdbcPool.close(conn);
		}
		return null;
	}
}