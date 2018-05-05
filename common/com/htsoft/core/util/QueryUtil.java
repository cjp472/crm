package com.htsoft.core.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.htsoft.core.util.json.JSONArray;
import com.htsoft.core.util.json.JSONException;

import orm.complex.query.framework.commtable.CommTable;
import orm.complex.query.framework.commtable.CommTableRecord;
import orm.complex.query.framework.commtable.CommTableField;

/**
 * 用于CommTable与JSON数据之间的互转
 * @author huchao185@gmail.com
 *
 */
public class QueryUtil {
	
	/**
	 * CommTable转JSON
	 * @param ct
	 * @return
	 */
	public static String toJSON(CommTable ct) {
		List listHsmpList = new ArrayList();
		List listFieldList = new ArrayList();
		for(int i=0;i<ct.getField().getCount();i++) {
			listFieldList.add(ct.getField().getField(i));
		}
		listHsmpList.add(listFieldList);
		int iCount = ct.getRecordCount();
		if(iCount>0) {
			for(int i=0; i<iCount; i++) {
				CommTableRecord ctRecord = ct.getRecord(i);
				List listData = new ArrayList();
				String[] fieldValues = ctRecord.get();
				for(int j=0; j<fieldValues.length;j++) {
					listData.add(fieldValues[j]);
				}
				listHsmpList.add(listData);
			}
		}
		return (new JSONArray(listHsmpList).toString());
	}
	
	public static String toJSON2(CommTable ct) {
		int iCount = ct.getRecordCount();
		if(iCount>0) {
			List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
			for(int i=0; i<iCount; i++) {
				HashMap<String,String> row = new HashMap<String,String>();
				CommTableRecord ctRecord = ct.getRecord(i);
				String[] fieldValues = ctRecord.get();
				int iCountFileds = fieldValues.length;
				for(int j=0; j<iCountFileds; j++) {
					row.put(ctRecord.getField().getField(j), fieldValues[j]);
				}
				result.add(row);
			}
			JSONArray json = new JSONArray(result);
			return json.toString();
		}
		return null;
	}
	
	/**
	 * JSON转CommTable
	 * @param json
	 * @return
	 */
	public static CommTable toCommTable(String json) {
		try {
			JSONArray jsonArray = new JSONArray(json);
			if(jsonArray.length() == 0)
				return null;
			CommTableField ctf = new CommTableField();
			CommTable cTable = new CommTable(ctf);
			for(int i=0;i<jsonArray.length();i++) {
				 JSONArray subJsonArray = jsonArray.getJSONArray(i);
				 CommTableRecord ctr = null;
				 for(int c=0;c<subJsonArray.length();c++) {
					if(i == 0) {
						ctf.addField(subJsonArray.getString(c));
					} else {
						if(ctr == null) {
							ctr = new CommTableRecord(ctf);
						}
						if(subJsonArray.isNull(c))
							ctr.set(c, null);
						else
							ctr.set(c, subJsonArray.getString(c));
					}
				 }
				 if(ctr != null)
					 cTable.addRecord(ctr);
			}
			return cTable;
		} catch (JSONException e) {
			return null;
		}
	}
}
