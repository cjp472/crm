package com.ulane.customer.dao.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcPool;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.JsonUtil;
import com.ulane.customer.dao.fee.ObFeeIndexLevelDao;
import com.ulane.customer.model.fee.ObFeeIndexLevel;
import com.ulane.customer.model.fee.ObFeeIndexProject;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObFeeIndexLevelDaoImpl extends BaseDaoImpl<ObFeeIndexLevel> implements ObFeeIndexLevelDao{
	public static final Logger logger = Logger.getLogger(ObFeeIndexLevelDaoImpl.class);
	
	@Resource
	private JdbcPool jdbcPool;
	public ObFeeIndexLevelDaoImpl() {
		super(ObFeeIndexLevel.class);
	}
	@SuppressWarnings("static-access")
	@Override
	public String getSelfOrderIndex(String employeeid) {
		StringBuffer sb = new StringBuffer();
		sb.append("select FEE_INDEX_VALUE from OB_FEE_INDEX_LEVEL where FEE_INDEX_PROJECT_ID = " + ObFeeIndexProject.INDEX_ORDER_SALES+" and MONTH='"+DateUtil.getCurrentMonth()+"'");
		sb.append(" and FEE_INDEX_ID in(select FEE_INDEX_ID from OB_FEE_INDEX_USER where USEID = '" + employeeid +"')");
		String sql = sb.toString();
		logger.debug("个人指标查询SQL："+sql);
		Connection conn = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			CommTable cTable = dbQuery.getCommTableBySQL(sql);
			if(null!=cTable && cTable.getRecordCount()>0) {
				if(null!=cTable.getRecord(0)) {
					return cTable.getRecord(0).get("FEE_INDEX_VALUE");
				}
			}
		} catch (Exception e) {
			logger.error("个人指标查询SQL："+sql);
			e.printStackTrace();
		} finally{
			jdbcPool.close(conn);
		}
		return null;
	}

	@SuppressWarnings("static-access")
	@Override
	public String getGroupAndAvgIndex(String IDS) {
		//业务逻辑：查询当前坐席所在用户组的所有用户的当前月份的小组指标和平均指标
		/*select sum(FEE_INDEX_VALUE) SUM_INDEX,avg(FEE_INDEX_VALUE) AVG_INDEX from OB_FEE_INDEX_USER INDEX_USER,OB_FEE_INDEX_LEVEL INDEX_VAL 
		 where  INDEX_USER.FEE_INDEX_ID=INDEX_VAL.FEE_INDEX_ID and INDEX_USER.USERID in(1,321,301,225,281)
		 and FEE_INDEX_PROJECT_ID=4 and MONTH=7*/
		//性能：该SQL需要对WHERE子句部分进行优化	huchao(2010-08-03)
		HashMap<String,String> result = new HashMap<String,String>();
		Connection conn = null;
		String selectSQL = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			//统计用户组下所有用户的“订单销售额”指标总额和平均值
			if(StringUtils.isNotBlank(IDS)) {
				StringBuffer sbSQL = new StringBuffer();
				sbSQL.append("select sum(FEE_INDEX_VALUE) SUM_INDEX,Round(avg(FEE_INDEX_VALUE),2) AVG_INDEX from OB_FEE_INDEX_USER INDEX_USER,OB_FEE_INDEX_LEVEL INDEX_VAL ");
				sbSQL.append("where INDEX_USER.FEE_INDEX_ID=INDEX_VAL.FEE_INDEX_ID and INDEX_USER.USEID in("+IDS+") ");
				sbSQL.append("and FEE_INDEX_PROJECT_ID=" + ObFeeIndexProject.INDEX_ORDER_SALES + " and MONTH='"+DateUtil.getCurrentMonth()+"' ");
				selectSQL = sbSQL.toString();
				logger.debug("销售额统计SQL："+selectSQL);
				CommTable cTable = dbQuery.getCommTableBySQL(selectSQL);
				result.put("goupFeeIndex", cTable.getRecord(0).get("SUM_INDEX"));
				result.put("avgFeeIndex", cTable.getRecord(0).get("AVG_INDEX"));
			}
		} catch (Exception e) {
			logger.error("销售额统计SQL："+selectSQL);
			e.printStackTrace();
		} finally{
			jdbcPool.close(conn);
		}
		return JsonUtil.hsmp2JSON(result);
	}
}