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

import org.apache.commons.lang.StringUtils;

import orm.complex.query.framework.RowSet;
import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.json.JSONArray;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.callout.dao.outb.ObComDao;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObComSalerul;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObComDaoImpl extends BaseDaoImpl<ObCom> implements ObComDao{
	public ObComDaoImpl() {
		super(ObCom.class);
	}

	@Override
	public List<ObCom> queryObComs(Long projId) {
		String hql = "from ObCom where obProject.projId="+projId;
		return findByHql(hql);
	}

	@Override
	public String queryFilterObComs(PagingBean pagBean,Map<String,String> param) {
	//业务描述：查询活动：1.当前登录坐席所在的用户组下的活动ids。2.除了“未启用”的活动
		RowSet rowSet = new RowSet(pagBean.getStart(),pagBean.getPageSize());
		String SQL = getQuerySQL(param);
		Connection conn = null;
		try{
			conn = JdbcUtil.getInstance().getConnection();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			String selectSQL = dbQuery.getQuerySQL(SQL, rowSet);
			Long totalCounts = dbQuery.getRecordCount(SQL);				//获取总记录数
			CommTable cTable = dbQuery.getCommTableBySQL(selectSQL);	//获取分页查询数据集
			
			List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
			StringBuffer sb = new StringBuffer("{success:true,'totalCounts':").append(totalCounts).append(",result:");
			int iCount = cTable.getRecordCount();
			for(int i=0; i<iCount; i++) {
				HashMap<String,String> row = new HashMap<String,String>();
				row.put("comId", cTable.getRecord(i).get("COM_ID"));				//活动内码
				row.put("projNam", cTable.getRecord(i).get("PROJ_NAME"));			//营销项目
				//String assCount = cTable.getRecord(i).get("ASS_COUNT");
				Long	 assCount=dbQuery.getRecordCount(getSaleTaskCountSql(cTable.getRecord(i).get("COM_ID")));
//				if(StringUtils.isBlank(assCount)) {
//					assCount = "0";
//				}
				//row.put("obComNam", cTable.getRecord(i).get("OB_COM_NAM")+"("+assCount+")");			//活动名称
				row.put("obComNam", cTable.getRecord(i).get("OB_COM_NAM"));			//活动名称
				row.put("comCod", cTable.getRecord(i).get("COM_COD"));				//活动编号
				row.put("staDat", cTable.getRecord(i).get("STA_DAT"));				//开始时间
				row.put("endDat", cTable.getRecord(i).get("END_DAT"));				//结束时间
				row.put("busiTypeId", cTable.getRecord(i).get("BUSI_TYP_ID"));		//活动类型
				row.put("execTypId", cTable.getRecord(i).get("EXEC_TYP_ID"));		//执行方式
				row.put("obComStaId", cTable.getRecord(i).get("OB_COM_STA_ID"));	//状态
				row.put("assignTypeId", cTable.getRecord(i).get("RUL_TYPE_ID"));	//分配方式
				row.put("maxDiaNum", cTable.getRecord(i).get("RUL_MAX_NUM"));		//最大拨打次数
				row.put("maxDiaSpace", cTable.getRecord(i).get("RUL_MAX_SPACE"));	//最大拨打间隔
				row.put("assCount", assCount.toString());	//最大拨打间隔
				
				
				String isDiaTime = cTable.getRecord(i).get("RUL_DIA_TIME");
				if(StringUtils.isNotBlank(isDiaTime) && "0".equals(isDiaTime)) {
					row.put("isDiaTime", "false");	//是否有拨打时间间隔限制
				} else {
					row.put("isDiaTime", "true");	//是否有拨打时间间隔限制
				}
				
				result.add(row);
			}
			JSONArray json = new JSONArray(result);
			sb.append(json.toString());
			sb.append("}");
			return sb.toString();
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.getInstance().close(conn);
		}
		return null;
	}
	
	private String getQuerySQL(Map<String,String> param) {
		StringBuffer sb = new StringBuffer();
		sb.append("select OB_COM.*,(select PROJ_NAM from ob_project where ob_project.PROJ_ID=OB_COM.PROJ_ID) PROJ_NAME,");
//		sb.append("(select itemvalue from dictionary where mapname='CONTPJYLX' and rel_dic=10841 and itemindex=OB_COM.BUSI_TYP_ID) BIZ_TYPE_NAME ");
		sb.append("(select RUL_VAL_MAX from OB_COM_SALERUL where OB_COM_SALERUL.COM_ID=OB_COM.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_ASSIGN+") RUL_TYPE_ID, ");//分配方式
		sb.append("(select RUL_VAL_MAX from OB_COM_SALERUL where OB_COM_SALERUL.COM_ID=OB_COM.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_MAX_NUM+") RUL_MAX_NUM, ");//最大拨打次数
		sb.append("(select RUL_VAL_MAX from OB_COM_SALERUL where OB_COM_SALERUL.COM_ID=OB_COM.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_MAX_SPACE+") RUL_MAX_SPACE ");//最大拨打间隔
		sb.append(",(select count(RUL_ID) from OB_COM_SALERUL where OB_COM_SALERUL.COM_ID=OB_COM.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_TIME+") RUL_DIA_TIME ");
		sb.append(" from OB_COM where OB_COM_STA_ID<>"+ObCom.STATUS_DISABLED+" ");
		sb.append(" and exists(select com_group.com_id from OB_COM_USERGROUP com_group where ob_com.com_id=com_group.com_id and exists(").
			append("select PK_USERGROUP_ID from UL_UGROUP_USER group_user where userid="+ContextUtil.getCurrentUserId()+" and group_user.PK_USERGROUP_ID=com_group.USERGRP_ID))");
		if(StringUtils.isNotBlank(param.get("busiTypNode"))) {//活动类型
			sb.append(" and BUSI_TYP_ID="+param.get("busiTypNode")+" ");
		}
		if(StringUtils.isNotBlank(param.get("comStaId"))) {//活动状态
			sb.append(" and OB_COM_STA_ID="+param.get("comStaId"));
		}
		sb.append("  order by sta_dat desc ");
		return sb.toString();
	}

	@Override
	public String queryMaxEndTimeCom(Long projId) {
		String SQL = "select Max(END_DAT) MAX_DAT from OB_COM where PROJ_ID="+projId;
		Connection conn = null;
		try{
			conn = JdbcUtil.getInstance().getConnection();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			CommTable cTable = dbQuery.getCommTableBySQL(SQL);	//获取分页查询数据集
			return cTable.getRecord(0).get("MAX_DAT");
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.getInstance().close(conn);
		}
		return null;
	}
	
	@Override
	public CommTable homeDisplayTask(Map<String, String> param) {
		int start = 0,limit=8;
		if(StringUtils.isNotBlank(param.get("start"))) {
			start = Integer.parseInt(param.get("start"));
		}
		if(StringUtils.isNotBlank(param.get("limit"))) {
			limit = Integer.parseInt(param.get("limit"));
		}

		StringBuffer sb = new StringBuffer();
		sb.append("select OB_COM.*,");
		sb.append("(select RUL_VAL_MAX from OB_COM_SALERUL where OB_COM_SALERUL.COM_ID=OB_COM.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_ASSIGN+") RUL_TYPE_ID ");
		sb.append(",(select RUL_VAL_MAX from OB_COM_SALERUL where OB_COM_SALERUL.COM_ID=OB_COM.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_MAX_NUM+") RUL_MAX_NUM ");//最大拨打次数
		sb.append(",(select RUL_VAL_MAX from OB_COM_SALERUL where OB_COM_SALERUL.COM_ID=OB_COM.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_MAX_SPACE+") RUL_MAX_SPACE ");//最大拨打间隔
		sb.append(",(select count(RUL_ID) from OB_COM_SALERUL where OB_COM_SALERUL.COM_ID=OB_COM.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_TIME+") RUL_DIA_TIME ");
		sb.append(",(select itemvalue from dictionary where mapname='CONTPJYLX' and rel_dic=10841 and itemindex=OB_COM.BUSI_TYP_ID) BIZ_TYPE_NAME ");
		sb.append(" from OB_COM where OB_COM_STA_ID="+ObCom.STATUS_ENABLED+" ");
		sb.append(" and exists(select com_group.com_id from OB_COM_USERGROUP com_group where ob_com.com_id=com_group.com_id and exists(").
			append("select PK_USERGROUP_ID from UL_UGROUP_USER group_user where userid="+ContextUtil.getCurrentUserId()+" and group_user.PK_USERGROUP_ID=com_group.USERGRP_ID))");
		sb.append("  order by sta_dat desc ");
		String SQL = sb.toString();
		
		RowSet rowSet = new RowSet(start,limit);
		Connection conn = null;
		try {
			conn = JdbcUtil.getInstance().getConnection();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			String selectSQL = dbQuery.getQuerySQL(SQL, rowSet);
			CommTable cTable = dbQuery.getCommTableBySQL(selectSQL);	//获取分页查询数据集
			return cTable;
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.getInstance().close(conn);
		}
		return null;
	}
	
	public String getSaleTaskCountSql(String comId) {
		StringBuffer taskCountSql=new StringBuffer("select * from ob_saletask where com_id=")
		    .append(Long.valueOf(comId))
		    .append(" and use_id=")
		    .append(ContextUtil.getCurrentUserId());
		return taskCountSql.toString();
	}

}