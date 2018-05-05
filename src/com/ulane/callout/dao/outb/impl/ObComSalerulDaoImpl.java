package com.ulane.callout.dao.outb.impl;
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

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcUtil;
import com.htsoft.core.util.json.JSONArray;
import com.ulane.callout.dao.outb.ObComSalerulDao;
import com.ulane.callout.model.outb.ObComSalerul;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObComSalerulDaoImpl extends BaseDaoImpl<ObComSalerul> implements ObComSalerulDao{

	public ObComSalerulDaoImpl() {
		super(ObComSalerul.class);
	}

	@Override
	public String getTimeBetween(String rulTypeId, String comId) {
		if(StringUtils.isNotBlank(comId)) {
			String SQL = "select rul_val_max from ob_com_salerul where com_id="+comId+" and rul_type_id="+rulTypeId;
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
						String rulVal = cTable.getRecord(i).get("rul_val_max");
						if(StringUtils.isNotBlank(rulVal)) {
							String[] timeArr = StringUtils.split(rulVal, "-");
							if(null!=timeArr && timeArr.length>1) {
								row.put("start", timeArr[0]);
								row.put("end", timeArr[1]);
								result.add(row);
							}
						}
					}
					JSONArray json = new JSONArray(result);
					return json.toString();
				}
			} catch(Exception e) {
				e.printStackTrace();
			} finally {
				JdbcUtil.getInstance().close(conn);
			}
		}
		return null;
	}

}