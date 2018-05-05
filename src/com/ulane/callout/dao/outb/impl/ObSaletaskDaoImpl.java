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
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.json.JSONArray;
import com.ulane.callout.dao.outb.ObSaletaskDao;
import com.ulane.callout.model.outb.ObComSalerul;
import com.ulane.callout.model.outb.ObSaletask;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObSaletaskDaoImpl extends BaseDaoImpl<ObSaletask> implements ObSaletaskDao{
	public ObSaletaskDaoImpl() {
		super(ObSaletask.class);
	}

	/**
	 * 营销任务饼图统计
	 * @param comId
	 * @return
	 */
	@Override
	public String getTaskCount(String comId) {
		//业务逻辑：统计各种不同营销任务，统计的依据是：1.营销状态；2.活动内码
		//性能：该统计涉及到任务表的统计，数据量会非常大，因此写成分组查询统计，并且以ID为统计字段
		//author：huchao(2012-08-03)
		/**
		 * ---预约、未执行、搁置、带追踪、成功的、失败的、已取消  统计方法
		 * 优化后的SQL：
		 * select BUSI_STA_ID,case when BUSI_STA_ID=0 then count(SALETASK_ID)  
	 		when BUSI_STA_ID=1 then nvl(count(SALETASK_ID),0)  
			when BUSI_STA_ID=2 then nvl(count(SALETASK_ID),0)
			when BUSI_STA_ID=3 then nvl(count(SALETASK_ID),0)  
			when BUSI_STA_ID=4 then nvl(count(SALETASK_ID),0)  
			when BUSI_STA_ID=5 then nvl(count(SALETASK_ID),0)  
			when BUSI_STA_ID=6 then nvl(count(SALETASK_ID),0)  end MARKET
		   from OB_SALETASK  where COM_ID=241 group by BUSI_STA_ID order by BUSI_STA_ID
		 */

		StringBuffer sb = new StringBuffer();
		sb.append("select BUSI_STA_ID,case when BUSI_STA_ID="+ObSaletask.MARKET_PLAN+" then count(SALETASK_ID) ");
		sb.append("when BUSI_STA_ID="+ObSaletask.MARKET_NO_EXEC+" then nvl(count(SALETASK_ID),0)  ");
		sb.append("when BUSI_STA_ID="+ObSaletask.MARKET_LAY_UP+" then nvl(count(SALETASK_ID),0) ");
		sb.append("when BUSI_STA_ID="+ObSaletask.MARKET_FLOWING+" then nvl(count(SALETASK_ID),0)  ");
		sb.append("when BUSI_STA_ID="+ObSaletask.MARKET_SUCC_CASE+" then nvl(count(SALETASK_ID),0)  ");
		sb.append("when BUSI_STA_ID="+ObSaletask.MARKET_FAIL_CASE+" then nvl(count(SALETASK_ID),0)  ");
		sb.append("when BUSI_STA_ID="+ObSaletask.MARKET_CANCELED+" then nvl(count(SALETASK_ID),0)  end MARKET ");
		sb.append("from OB_SALETASK  where COM_ID="+comId+" group by BUSI_STA_ID order by BUSI_STA_ID");
		String SQL = sb.toString();
		Connection conn = null;
		try{
			conn = JdbcUtil.getInstance().getConnection();
			System.out.println("getQueryResult conn: " + conn);
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			CommTable cTable = dbQuery.getCommTableBySQL(SQL);
			HashMap<String,String> row = new HashMap<String,String>();
			if(null!=cTable) {
				int iCounts = cTable.getRecordCount();
				String plan = "0";String noExec = "0";String layUp = "0";
				String flowing = "0";String succCase = "0";String failCase = "0";
				String canceled = "0";
				for(int i=0; i<iCounts; i++) {
					String type = cTable.getRecord(i).get("BUSI_STA_ID");
					if(type.equals(ObSaletask.MARKET_PLAN.toString())) {
						plan = cTable.getRecord(i).get("MARKET");
					} else if(type.equals(ObSaletask.MARKET_NO_EXEC.toString())) {
						noExec = cTable.getRecord(i).get("MARKET");
					} else if(type.equals(ObSaletask.MARKET_LAY_UP.toString())) {
						layUp = cTable.getRecord(i).get("MARKET");
					} else if(type.equals(ObSaletask.MARKET_FLOWING.toString())) {
						flowing = cTable.getRecord(i).get("MARKET");
					} else if(type.equals(ObSaletask.MARKET_SUCC_CASE.toString())) {
						succCase = cTable.getRecord(i).get("MARKET");
					} else if(type.equals(ObSaletask.MARKET_FAIL_CASE.toString())) {
						failCase = cTable.getRecord(i).get("MARKET");
					} else if(type.equals(ObSaletask.MARKET_CANCELED.toString())) {
						canceled = cTable.getRecord(i).get("MARKET");
					}
				}
				row.put("PLAN", plan);
				row.put("NO_EXEC", noExec);
				row.put("LAY_UP", layUp);
				row.put("FLOWING", flowing);
				row.put("SUCC_CASE", succCase);
				row.put("FAIL_CASE", failCase);
				row.put("CANCELED", canceled);
			}
			return JsonUtil.hsmp2JSON(row);
		} catch(Exception e) {
			e.printStackTrace();
		} finally{
			JdbcUtil.getInstance().close(conn);
		}
		return null;
	}
	 
	public List<ObSaletask> getTaskByCusId(Long cusId) {
		String hql="select a from ObSaletask a where a.cusId=?";
		return this.findByHql(hql, new Object[]{cusId});
	}
	
	public List<ObSaletask> getPhoneCount(String useId) {
		String hql="select a from ObSaletask a where a.useId="+useId;
		return findByHql(hql);
	}
	
	/**
	 * 无搜索查询参数的主查询
	 */
	@Override
	public String queryTaskByComId(String comId, String busiStaId,int start,int limit) {
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct task.*,calllist.customerid,calllist.CUS_CODE,calllist.NAME_CN,calllist.GENDER,calllist.CRED_TYP_ID,calllist.CRED_NUM,calllist.CUS_TYP_ID ");
		sb.append(",(select RUL.RUL_VAL_MAX from OB_COM_SALERUL RUL where RUL.COM_ID=task.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_ASSIGN+") ASS_TYP_ID ");
		if(null!=busiStaId) {
			sb.append("from OB_SALETASK task,ob_con_calllist calllist where calllist.customerid=task.cus_id and task.com_id=calllist.com_id and task.COM_ID="+comId+" and (USE_ID="+ContextUtil.getCurrentUserId()+" or USERNO='"+ContextUtil.getCurrentUser().getEmployeeid()+"') and BUSI_STA_ID="+busiStaId);
		} else {
			sb.append("from OB_SALETASK task,ob_con_calllist calllist where calllist.customerid=task.cus_id and task.com_id=calllist.com_id and task.COM_ID="+comId+" and (USE_ID="+ContextUtil.getCurrentUserId()+" or USERNO='"+ContextUtil.getCurrentUser().getEmployeeid()+"') ");
		}
		String SQL = sb.toString();
		return getQueryResult(SQL,start,limit);
	}
	
	/**
	 * 有搜索查询参数的主查询
	 */
	@Override
	public String queryTaskByComId(String comId, String busiStaId, int start,
			int limit, Map<String, String> queryParam) {
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct task.*,calllist.customerid,calllist.CUS_CODE,calllist.NAME_CN,calllist.GENDER,calllist.CRED_TYP_ID,calllist.CRED_NUM,calllist.CUS_TYP_ID ");
		sb.append(",(select RUL.RUL_VAL_MAX from OB_COM_SALERUL RUL where RUL.COM_ID=task.COM_ID and RUL_TYPE_ID="+ObComSalerul.TYPE_ASSIGN+") ASS_TYP_ID ");
		if(null!=busiStaId) {
			sb.append("from OB_SALETASK task,ob_con_calllist calllist  where calllist.customerid=task.cus_id and task.COM_ID="+comId+"  and task.com_id=calllist.com_id and (USE_ID="+ContextUtil.getCurrentUserId()+" or USERNO='"+ContextUtil.getCurrentUser().getEmployeeid()+"') and BUSI_STA_ID="+busiStaId+" ");
		} else {
			sb.append("from  OB_SALETASK task,ob_con_calllist calllist where calllist.customerid=task.cus_id and task.COM_ID="+comId+" and task.com_id=calllist.com_id and (USE_ID="+ContextUtil.getCurrentUserId()+" or USERNO='"+ContextUtil.getCurrentUser().getEmployeeid()+"') ");
		}
		
		String SQL = sb.toString();
		String searchSQL = getQueryParamString(queryParam);
		if(StringUtils.isNotBlank(searchSQL)) {
			String finalSQL = SQL + searchSQL;
			return getQueryResult(finalSQL,start,limit);
		}
		return getQueryResult(SQL,start,limit);
	}
	
	/**
	 * 搜索参数SQL语句拼装
	 * @param queryParam
	 * @return
	 */
	public String getQueryParamString(Map<String,String> queryParam) {
		String timeSQL = getTimeQuerySQL(queryParam);
		String EQsql = getEQquerySQL(queryParam);
		return (timeSQL + EQsql);
	}
	
	public String getTimeQuerySQL(Map<String,String> queryParam) {
		String startTime = queryParam.get("startTime");								//开始时间
		String endTime = queryParam.get("endTime");									//结束时间
		String field = queryParam.get("field");										//组装字段
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
	
	public String getEQquerySQL(Map<String,String> queryParam) {
		String MARKET_TYPE = queryParam.get("MARKET_TYPE");				//类型
		String conStaId = queryParam.get("conStaId");			//联络结果
		String busiStagId = queryParam.get("busiStagId");		//营销阶段
		String busiRelId = queryParam.get("busiRelId");			//搁置原因
		String servStaId = queryParam.get("servStaId");			//销售状态
		String taskExecType = queryParam.get("taskExecType"); 	//处理类型——失败原因/回收来源
		String typeId = queryParam.get("typeId");			//分配来源
		String SQL = "";
		
		if("NO_EXEC".equals(MARKET_TYPE)) {
			SQL = getSearchFieldQuery("TYP_ID",typeId,null,null);
		} else if("LAY_UP".equals(MARKET_TYPE)) {//搁置原因//营销阶段
			SQL = getSearchFieldQuery("BUSI_REL_ID",busiRelId,"BUSI_STAG_ID",busiStagId);
		} else if("FLOWING".equals(MARKET_TYPE)) {//联络结果//营销阶段
			SQL = getSearchFieldQuery("CON_STA_ID",conStaId,"BUSI_STAG_ID",busiStagId);
		} else if("SUCC_CASE".equals(MARKET_TYPE)) {//销售状态
			SQL = getSearchFieldQuery("SERV_STA_ID",servStaId,null,null);
		} else if("FAIL_CASE".equals(MARKET_TYPE)) {//失败原因
			SQL = getSearchFieldQuery("TASK_EXEC_TYPE",taskExecType,null,null);
		} else if("CANCELED".equals(MARKET_TYPE)) {//回收来源
			SQL = getSearchFieldQuery("TASK_EXEC_TYPE",taskExecType,null,null);
		} else if("ALL".equals(MARKET_TYPE)) {//联络结果//营销阶段
			SQL = getSearchFieldQuery("CON_STA_ID",conStaId,"BUSI_STAG_ID",busiStagId);
		}
		return SQL;
	}
	private String getSearchFieldQuery(String field1,String param1,String field2,String param2) {
		StringBuffer sb = new StringBuffer();
		if("TASK_EXEC_TYPE".equals(field1)) {	//如果是失败原因/回收来源，使用全模糊查询
			sb.append(" and " + field1 + " like '%" + StringUtils.trim(param1) + "%' ");
			return sb.toString();
		}
		
		if(StringUtils.isNotBlank(param1)) {
			sb.append(" and "+field1 + "=" + param1 );
		}
		if(StringUtils.isNotBlank(param2)) {
			sb.append(" and "+field2 + "=" + param2 );
		}
		return sb.toString();
	}
	
	/**
	 * 分页查询，获得结果集
	 * @param SQL
	 * @param start
	 * @param limit
	 * @return
	 */
	private String getQueryResult(String SQL,int start,int limit) {
		RowSet rowSet = new RowSet(start,limit);
		Connection conn = null;
		try {
			conn = JdbcUtil.getInstance().getConnection();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			String selectSQL =  dbQuery.getQuerySQL(SQL, rowSet);					//获取Oracle的分页查询
			
			Long totalCounts = dbQuery.getRecordCount(SQL);							//获取总记录数
			CommTable cTable = dbQuery.getCommTableBySQL(selectSQL);
			
			//转换为客户端对应的JSON串
			List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
			int iCount = cTable.getRecordCount();
			for(int i=0; i<iCount; i++) {
				HashMap<String,String> row = new HashMap<String,String>();
				String busiStaId = cTable.getRecord(i).get("BUSI_STA_ID");
				String booTime = cTable.getRecord(i).get("BOO_TIM");
				row.put("cusId", cTable.getRecord(i).get("CUSTOMERID"));					//客户内码
				row.put("cusNo", cTable.getRecord(i).get("CUS_CODE"));						//客户业务编号(用于两个系统之间数据同步)
				row.put("nameCn", cTable.getRecord(i).get("NAME_CN"));						//客户名称
				row.put("gender", cTable.getRecord(i).get("GENDER"));						//客户性别
				row.put("credTypId", cTable.getRecord(i).get("CRED_TYP_ID"));				//证件类型
				row.put("credNum", cTable.getRecord(i).get("CRED_NUM"));					//证件号码
				row.put("cusGraId", cTable.getRecord(i).get("CUS_TYP_ID"));					//客户级别
				row.put("assTypId", cTable.getRecord(i).get("ASS_TYP_ID"));					//分配方式
				row.put("asgDat", cTable.getRecord(i).get("ASG_DAT"));						//分配日期
				row.put("diaCou", cTable.getRecord(i).get("DIA_COU"));						//拨打次数
				row.put("lastDiaDat", cTable.getRecord(i).get("LAST_DIA_DAT"));				//最后拨打时间
				row.put("conStaId", cTable.getRecord(i).get("CON_STA_ID"));					//拨打结果
				row.put("booTim", booTime);													//预约时间
				row.put("conStaId", cTable.getRecord(i).get("CON_STA_ID"));					//
				row.put("busiStaId", busiStaId);											//营销状态
				row.put("servStaId", cTable.getRecord(i).get("SERV_STA_ID"));				//服务状态
				row.put("busiStagId", cTable.getRecord(i).get("BUSI_STAG_ID"));				//营销阶段
				row.put("busiRelId", cTable.getRecord(i).get("BUSI_REL_ID"));	
				row.put("typId", cTable.getRecord(i).get("TYP_ID"));						//名单获取方式
				row.put("lastOpeDate", cTable.getRecord(i).get("LAST_OPE_DAT"));			//最后处理时间
				row.put("taskExecType", cTable.getRecord(i).get("TASK_EXEC_TYPE"));			//处理类型
				row.put("taskId", cTable.getRecord(i).get("SALETASK_ID"));
				
				if(ObSaletask.MARKET_PLAN.toString().equals(busiStaId)) {
					String currTime = DateUtil.getCurrentTime();
					//取得两个日期的日期差，返回分钟数
					String remainMinute = DateUtil.getDHMSFromTwoDate(currTime, booTime, ObSaletask.DATE_PATTEN, ObSaletask.DEFAULT_DISP);
					row.put("remainTime", remainMinute);										//剩余时间
				}
				
//				row.put("", cTable.getRecord(i).get(""));
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
			JdbcUtil.getInstance().close(conn);
		}
		return null;
	}

}