package com.ulane.customer.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.Constants;
import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcUtil;
import com.htsoft.core.util.json.JSONArray;
import com.ulane.customer.dao.customer.CusContactDao;
import com.ulane.customer.model.customer.CusContact;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CusContactDaoImpl extends BaseDaoImpl<CusContact> implements CusContactDao{

	public CusContactDaoImpl() {
		super(CusContact.class);
	}

	@Override
	public List<CusContact> queryByCusId(Long cusId) {
		// TODO Auto-generated method stub
		String hql = "from CusContact cct where cct.customer.customerId=?";
		Object[] params = {cusId};
		return findByHql(hql, params);
	}

	@Override
	public String listCus(String cusId) {
		if(StringUtils.isNotBlank(cusId)) {
			String SQL = "select CONTACT_ID,STATUS_ID,CONTACT_TYPE_ID,MAIN_CONTACT_NUM from cus_contact where customerid="+cusId;
			Connection conn = null;
			try{
				conn = JdbcUtil.getInstance().getConnection();
				DBQuery dbQuery = DBQuery.getDBQuery(conn);
				CommTable cTable = dbQuery.getCommTableBySQL(SQL);
				
				int iCount = cTable.getRecordCount();
				if(null!=cTable && iCount>0) {
					List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
					for(int i=0;i<iCount;i++) {
						HashMap<String,String> row = new HashMap<String,String>();
						row.put("contactId", cTable.getRecord(i).get("CONTACT_ID"));
						row.put("statusId", cTable.getRecord(i).get("STATUS_ID"));
						row.put("contactTypeId", cTable.getRecord(i).get("CONTACT_TYPE_ID"));
						row.put("mainContactNum", cTable.getRecord(i).get("MAIN_CONTACT_NUM"));
						result.add(row);
					}
					
					JSONArray json = new JSONArray(result);
					String data = json.toString();
					
					StringBuilder buff = new StringBuilder("{success:true,'totalCounts':").append("0").append(",result:");
					buff.append(data);
					buff.append("}");
					return buff.toString();
				}
			} catch(Exception e) {
				e.printStackTrace();
			} finally {
				JdbcUtil.getInstance().close(conn);
			}
		}
		return "{success:true,'totalCounts':0,result:[]}";
	}

}