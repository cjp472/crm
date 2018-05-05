package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import orm.complex.query.framework.RowSet;
import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcPool;
import com.htsoft.core.dao.pool.JdbcUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.json.JSONArray;
import com.ulane.callout.dao.outb.ObWashHisDao;
import com.ulane.callout.model.outb.ObCallbatch;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObProject;
import com.ulane.callout.model.outb.ObWashHis;
import com.ulane.callout.service.outb.ObCallbatchImpWashService;
import com.ulane.callout.service.outb.ObCallbatchService;
import com.ulane.callout.service.outb.ObProjectService;
import com.ulane.callout.service.outb.ObWashHisService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObWashHisDaoImpl extends BaseDaoImpl<ObWashHis> implements ObWashHisDao{
	private static final Logger logger = Logger.getLogger(ObWashHisDaoImpl.class);
	@Resource
	private ObWashHisService obWashHisService;
	@Resource
	private ObCallbatchImpWashService obCallbatchImpWashService;
	@Resource
	private ObCallbatchService obCallbatchService;
	
	public ObWashHisDaoImpl() {
		super(ObWashHis.class);
	}
	
	@Resource
	private JdbcPool jdbcPool;
	
	@Override
	public String queryWashCus(Map<String, String> param, String splitJoinSQL) {
		if(StringUtils.isNotBlank(param.get("flag"))) {
			//对应Action中的confirmWashImpTmp
			return clearnData(splitJoinSQL,param); 
		} else {
			//对应Action中的queryWashCus查询
			return queryData(splitJoinSQL,param);
		}
	}
	
	/**
	 * 业务去重：获取需要去重的批次列表
	 */
	@SuppressWarnings("static-access")
	public String getCallbatchIdFromBusi(Map<String,String> param) {
		String clearSoundTyp = param.get("clearSoundTyp");
		StringBuffer sb = new StringBuffer();
		String SQL = null;
		if("ALL".equals(clearSoundTyp)) {
			SQL = "select CALLBATCH_ID from OB_CALLBATCH where CALLLIST_ID in(select CALLLIST_ID from OB_CALLLIST where PROJ_ID in(select PROJ_ID from OB_PROJECT where PROJ_STA_ID="+ObProject.FLAG_EXECUTING+"))";
		} else if("PROJECT".equals(clearSoundTyp)) {
			SQL = "select CALLBATCH_ID from OB_CALLBATCH where CALLLIST_ID in(select CALLLIST_ID from OB_CALLLIST where PROJ_ID="+param.get("projId")+")";
		} else if("COM".equals(clearSoundTyp)) {
			SQL = "select CALLBATCH_ID from OB_CALLBATCH where CALLLIST_ID in(select CALLLIST_ID from OB_COM_CALLLIST where COM_ID="+param.get("comId")+") "; 
		} else if("CALLLIST".equals(clearSoundTyp)) {
			SQL = "select CALLBATCH_ID from OB_CALLBATCH where CALLLIST_ID="+param.get("calllistId")+" ";
		} else if("CALLBATCH".equals(clearSoundTyp)) {
			sb.append(param.get("callbatchId"));
		}
		if(StringUtils.isBlank(SQL)) {
			return sb.toString();
		}
		
		Connection conn = null;
		try{
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			CommTable cTable = dbQuery.getCommTableBySQL(SQL);
			int iCounts = cTable.getRecordCount();
			if(null!=cTable && iCounts>0) {
				for(int i=0; i<iCounts; i++) {
					String callbatchId = cTable.getRecord(i).get("CALLBATCH_ID");
					sb.append(callbatchId);
					if(i<iCounts-2) {
						sb.append(",");
					}
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally{
			jdbcPool.close(conn);
		}
		return sb.toString();
	}
	
	//清洗
	@SuppressWarnings("static-access")
	private String clearnData(String SQL,Map<String,String> param) {
		String callbatchId = param.get("callbatchId");
		logger.debug("==>SQL：");
		logger.debug(SQL);
		//如果没有组合的查询条件，那么直接返回
		if(StringUtils.isBlank(SQL)) {
			return null;
		}
		
		Connection conn = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			
			String totalSQL = SQL;
			totalSQL = StringUtils.replace(totalSQL, "select TMP.TMP_CUS_ID", "select count(TMP.TMP_CUS_ID) TOTAL_COUNTS");
			totalSQL = StringUtils.remove(totalSQL, "and TMP.TMP_CUS_ID=IMP_TMP.TMP_CUS_ID");
			CommTable cTable = dbQuery.getCommTableBySQL(totalSQL);
			String totalCounts = null;
			//第一步：查询清洗数据的总记录数
			if(null!=cTable) {
				if(cTable.getRecordCount()>0) {
					totalCounts = cTable.getRecord(0).get("TOTAL_COUNTS");
				}
			}
			
			if(StringUtils.isNotBlank(totalCounts) && !"0".equals(totalCounts)) {
				//对于名单修复方式
				if(ObWashHis.CLEARN_TYP_LIST_REPAIR.toString().equals(param.get("clearnTyp"))) {
					jdbcTemplate.execute(param.get("repairSQL"));
					HashMap<String,String> hsmp = new HashMap<String,String>();
					hsmp.put("totalCounts", String.valueOf(totalCounts));
					hsmp.put("totalSQL", totalSQL);
					hsmp.put("clearnTyp", ObWashHis.CLEARN_TYP_LIST_REPAIR.toString());
					return JsonUtil.hsmp2JSON(hsmp);//返回总的记录条数
				} else {
					
					//第二步：创建清洗历史
					ObWashHis obWashHis = null;
					String washHisId = null;
					if(StringUtils.isNotBlank(totalCounts)) {
						param.put("clsCounts", totalCounts);
						obWashHis = obWashHisService.save(createWashHis(param));
						washHisId = obWashHis.getWashHisId().toString();
					}
					
					//第三步：批量转移数据：临时表——>清洗表，同时注入清洗历史内码
					if(StringUtils.isNotBlank(washHisId)) {
						StringBuilder sber = new StringBuilder();
						sber.append("insert into OB_CALLBATCH_IMP_WASH(WASH_CUS_ID,CALLBATCH_ID,CUS_ID,IN_CUST_BASE,NAME_CN,NAME_ALI,")
						.append("CUS_TYP_ID,GENDER,BIRTHDAY,CRED_TYP_ID,CRED_NUM,CRED_DUR_DAT,REMARK,CRE_USE_ID,CRE_DAT,UPD_USE_ID,UPD_DAT,")
						.append("EXT_1,EXT_2,EXT_3,EXT_4,EXT_5,EXT_6,EXT_7,EXT_8,EXT_9,EXT_10,STA_ID,INAVAILABLE_ID,TELE_OFFICE,TELE_MOBILE,")
						.append("TELE_OTHERS,FAX,EMAIL,ADDR_BOOK,POST_CODE,AGE,TELE_HOME,CUS_CODE,INCHARGE_PERSON,WASH_HIS_ID,PROJ_ID,COM_ID,CALLLIST_ID)");
						sber.append("select TMP_CUS_ID,CALLBATCH_ID, CUS_ID,IN_CUST_BASE,NAME_CN,NAME_ALI,CUS_TYP_ID,GENDER,BIRTHDAY,CRED_TYP_ID,CRED_NUM,")
						.append("CRED_DUR_DAT,REMARK,CRE_USE_ID,CRE_DAT,UPD_USE_ID,UPD_DAT,EXT_1,EXT_2,EXT_3,EXT_4,EXT_5,EXT_6,EXT_7,EXT_8,EXT_9,EXT_10,STA_ID,")
						.append("INAVAILABLE_ID,TELE_OFFICE,TELE_MOBILE,TELE_OTHERS,FAX,EMAIL,ADDR_BOOK,POST_CODE,AGE,TELE_HOME,CUS_CODE,INCHARGE_PERSON,")
						.append("to_number("+washHisId+"),PROJ_ID,COM_ID,CALLLIST_ID from OB_CALLBATCH_IMP_TMP IMP_TMP");
						sber.append(" where exists("+SQL+")");
						String turnDataToWashSQL = sber.toString();
						jdbcTemplate.execute(turnDataToWashSQL);
						
						String clearnDataFromTmpSQL = "delete from OB_CALLBATCH_IMP_TMP IMP_TMP where exists("+SQL+")";
						jdbcTemplate.execute(clearnDataFromTmpSQL);
					}
					
					//批次修改
					if(StringUtils.isNotBlank(callbatchId)) {
						String updateSQL = "update ob_callbatch set AVLID_COUNT=(to_number(AVLID_COUNT)-to_number("+totalCounts+")),HOLD_COUNT=(to_number(HOLD_COUNT)-to_number("+totalCounts+")),INAVLID_COUNT=(to_number(INAVLID_COUNT)+to_number("+totalCounts+")) where callbatch_id="+callbatchId;
						jdbcTemplate.execute(updateSQL);
					}
					
					HashMap<String,String> hsmp = new HashMap<String,String>();
					hsmp.put("totalCounts", String.valueOf(totalCounts));
					hsmp.put("totalSQL", totalSQL);
					return JsonUtil.hsmp2JSON(hsmp);//返回总的记录条数
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			jdbcPool.close(conn);
		}
		return null;
	}
	
	//创建清洗历史
	private ObWashHis createWashHis(Map<String,String> param) {
		ObWashHis obWashHis = new ObWashHis();
		String projIdS = param.get("projId");
		String comIdS = param.get("comId");
		String calllistIdS = param.get("calllistId");
		if(StringUtils.isBlank(projIdS) || StringUtils.isBlank(comIdS) || StringUtils.isBlank(calllistIdS)) {
			ObCallbatch batch = obCallbatchService.get(Long.parseLong(param.get("callbatchId")));
			calllistIdS = batch.getObCalllist().getCalllistId().toString();
			//取第一个即可
			Set<ObCom> obComSet = batch.getObCalllist().getObComs();
			for(ObCom obCom : obComSet) {
				comIdS = obCom.getComId().toString();
				projIdS = obCom.getObProject().getProjId().toString();
				break;
			}
		}
		obWashHis.setProjId(Long.parseLong(projIdS));			//项目内码
		obWashHis.setComId(Long.parseLong(comIdS));				//活动内码
		obWashHis.setCalllistId(Long.parseLong(calllistIdS));	//名单内码
		obWashHis.setCallbatchId(Long.parseLong(param.get("callbatchId")));	//批次内码
		obWashHis.setClearnTyp(Short.parseShort(param.get("clearnTyp")));	//清洗方式
		obWashHis.setClearnDat(new Date());									//清洗时间
		obWashHis.setClearnOpt(Long.parseLong(param.get("currentUserId")));	//清洗人
		obWashHis.setClearnCounts(Integer.parseInt(param.get("clsCounts")));//清洗数量
		obWashHis.setClearnRual(param.get("clearnRual")); 					//清洗规则
		return obWashHis;
	}
	
	//查询
	@SuppressWarnings("static-access")
	private String queryData(String SQL,Map<String,String> param) {
		logger.debug("==>SQL：");
		logger.debug(SQL);
		//如果没有组合的查询条件，那么直接返回
		if(StringUtils.isBlank(SQL)) {
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append("0").append(",result:{}}");
			return buff.toString();
		}
		
		int start = 0;
		int limit = 25;
		long totalCounts = 0L;
		if(StringUtils.isNotBlank(param.get("start"))) {
			start = Integer.parseInt(param.get("start"));
		}
		if(StringUtils.isNotBlank(param.get("limit"))) {
			Integer.parseInt(param.get("limit"));
		}
		
		RowSet rowSet = new RowSet(start,limit);
		Connection conn = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			
			if(param.containsKey("countSelSQL")) {
				String selSQL = param.get("countSelSQL");
				CommTable cTable = dbQuery.getCommTableBySQL(selSQL);
				if(null!=cTable) {
					String tmpCounts = cTable.getRecord(0).get("TOTAL_COUNTS");
					if(StringUtils.isNotBlank(tmpCounts)) {
						totalCounts = Long.parseLong(tmpCounts);
					}
				}
			} else {
				totalCounts = dbQuery.getRecordCount(SQL);
			}
			String pagSQL = dbQuery.getQuerySQL(SQL, rowSet);
			CommTable cTable = dbQuery.getCommTableBySQL(pagSQL);
			int iCounts = cTable.getRecordCount();
			String resultData = "";
			if(iCounts>0) {
				List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
				for(int i=0; i<iCounts; i++) {
					HashMap<String,String> row = new HashMap<String,String>();
					//字段：姓名、性别、证件类型、生日、证件号码、家庭电话、办公电话、移动电话、传真、Email
					row.put("tmpCusId",cTable.getRecord(i).get("TMP_CUS_ID"));
					row.put("nameCn", cTable.getRecord(i).get("NAME_CN"));
					row.put("gender", cTable.getRecord(i).get("GENDER"));
					row.put("credTypId", cTable.getRecord(i).get("CRED_TYP_ID"));
					row.put("birthday", cTable.getRecord(i).get("BIRTHDAY"));
					row.put("credNum", cTable.getRecord(i).get("CRED_NUM"));
					row.put("teleHome", cTable.getRecord(i).get("TELE_HOME"));
					row.put("teleOffice", cTable.getRecord(i).get("TELE_OFFICE"));
					row.put("teleMobile", cTable.getRecord(i).get("TELE_MOBILE"));
					row.put("fax", cTable.getRecord(i).get("FAX"));
					row.put("email", cTable.getRecord(i).get("EMAIL"));
					row.put("inchargePersonName", cTable.getRecord(i).get("incharge_Person_Name"));
					result.add(row);
				}
				JSONArray json = new JSONArray(result);
				resultData = json.toString();
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(totalCounts).append(",result:");
			if(StringUtils.isNotBlank(resultData)) {
				buff.append(resultData);
			} else {
				buff.append("{}");
			}
			buff.append("}");
			return buff.toString();
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			jdbcPool.close(conn);
		}
		return null;
	}

	@Override
	public String queryBaseInfo(Map<String, String> param) {
		StringBuilder sb = new StringBuilder();
		sb.append("select ")
		.append("CALLLIST_ID,CALLLIST_NAM")
		.append(",PROJ_ID,(select PROJ_NAM from ob_project where PROJ_ID=calllist.PROJ_ID) PROJ_NAME")
		.append(",(select com_id from ob_com_calllist com_cal where com_cal.calllist_id=calllist.calllist_id) COM_ID")
		.append(",(select ob_com_nam from ob_com where com_id=(select com_id from ob_com_calllist com_cal where com_cal.calllist_id=calllist.calllist_id)) COM_NAME ")
		.append(" from ob_calllist calllist ");
		
		if(param.containsKey("calllistId")) {
			String calllistId = param.get("calllistId");
			if(StringUtils.isBlank(calllistId)) return null;
			sb.append(" where calllist.CALLLIST_ID="+calllistId);
		}
		
		if(param.containsKey("callbatchId")) {
			String callbatchId = param.get("callbatchId");
			if(StringUtils.isBlank(callbatchId)) return null;
			sb.append(" where exists(select batch.callbatch_id from ob_callbatch batch where batch.calllist_id=calllist.calllist_id) ");
		}
		param.put("SQL", sb.toString());
		return getBaseInfo(param);		
	}
	
	private String getBaseInfo(Map<String,String> param) {
		HashMap<String,String> hsmp = new HashMap<String,String>();
		String SQL = param.get("SQL");
		
		Connection conn = null;
		try {
			conn = JdbcUtil.getInstance().getConnection();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			CommTable cTable = dbQuery.getCommTableBySQL(SQL);
			if(null!=cTable && cTable.getRecordCount()>0) {
				hsmp.put("projId", cTable.getRecord(0).get("PROJ_ID"));
				hsmp.put("projName", cTable.getRecord(0).get("PROJ_NAME"));
				hsmp.put("comId", cTable.getRecord(0).get("COM_ID"));
				hsmp.put("comName", cTable.getRecord(0).get("COM_NAME"));
				hsmp.put("calllistId", cTable.getRecord(0).get("CALLLIST_ID"));
				hsmp.put("calllistName", cTable.getRecord(0).get("CALLLIST_NAM"));
				return JsonUtil.hsmp2JSON(hsmp);
			}
		} catch(Exception e) {
			logger.error(e.getMessage());
		} finally {
			JdbcUtil.getInstance().close(conn);
		}
		return null;
	}

}