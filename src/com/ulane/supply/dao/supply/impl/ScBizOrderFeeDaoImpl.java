package com.ulane.supply.dao.supply.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;

import javax.annotation.Resource;

import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcPool;
import com.htsoft.core.util.QueryUtil;
import com.ulane.supply.dao.supply.ScBizOrderFeeDao;
import com.ulane.supply.model.supply.ScBizOrderFee;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ScBizOrderFeeDaoImpl extends BaseDaoImpl<ScBizOrderFee> implements ScBizOrderFeeDao{
	@Resource
	private JdbcPool jdbcPool;
	public ScBizOrderFeeDaoImpl() {
		super(ScBizOrderFee.class);
	}

	@SuppressWarnings("static-access")
	@Override
	public String getPersonalSaleFee(Long userId) {
		//业务逻辑：统计当前登录坐席的销售额。
		//条件：1.当前登录坐席的。2.状态为已完成的。3.业务单费用类型为零售业务单的。
		//SQL：select sum(CHANGED_AMOUNT) PERSONAL_SALES from SC_BIZ_ORDER_FEE where STATUS=1 and BIZ_ORDER_FEE_TYPE=0 and CREATE_USER_ID=1;
		
		String SQL = "select sum(CHANGED_AMOUNT) PERSONAL_SALES from SC_BIZ_ORDER_FEE where STATUS="+ScBizOrderFee.STATUS_FINISH+" and BIZ_ORDER_FEE_TYPE="+ScBizOrderFee.FEE_TYPE_RETAIL+" and CREATE_USER_ID="+userId;
		Connection conn = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			CommTable cTable = dbQuery.getCommTableBySQL(SQL);
			if(null!=cTable) {
				return cTable.getRecord(0).get("PERSONAL_SALES");
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			jdbcPool.close(conn);
		}
		return null;
	}

	@SuppressWarnings("static-access")
	@Override
	public String getGroupAndAvgSaleFee(String IDS) {
		//业务逻辑：统计当前坐席所在用户组的销售额与平均值
		//条件：
//SQL：select SUM(CHANGED_AMOUNT) SUM_FEE,Round(AVG(CHANGED_AMOUNT),2) AVG_FEE from SC_BIZ_ORDER_FEE 
//			where STATUS=1 and BIZ_ORDER_FEE_TYPE=0 and CREATE_USER_ID in(1,321,301,225,281);
		String SQL = "select SUM(CHANGED_AMOUNT) SUM_FEE,Round(AVG(CHANGED_AMOUNT),2) AVG_FEE from SC_BIZ_ORDER_FEE "+
				"where STATUS="+ScBizOrderFee.STATUS_FINISH+" and BIZ_ORDER_FEE_TYPE="+ScBizOrderFee.FEE_TYPE_RETAIL+" and CREATE_USER_ID in("+IDS+")";
		Connection conn = null;
		try{
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			CommTable cTable = dbQuery.getCommTableBySQL(SQL);
			return QueryUtil.toJSON(cTable);
		} catch(Exception e) {
			e.printStackTrace();
		} finally{
			jdbcPool.close(conn);
		}
		return null;
	}

}