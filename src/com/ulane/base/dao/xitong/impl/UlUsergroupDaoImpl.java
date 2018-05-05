package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcPool;
import com.ulane.base.dao.xitong.UlUsergroupDao;
import com.ulane.base.model.xitong.UlUsergroup;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UlUsergroupDaoImpl extends BaseDaoImpl<UlUsergroup> implements UlUsergroupDao{
	@SuppressWarnings("unused")
	@Resource
	private JdbcPool jdbcPool;
	public UlUsergroupDaoImpl() {
		super(UlUsergroup.class);
	}
	/**
	 * 根据parentId查询对应的数据加载tree
	 */
	@Override
	public List<UlUsergroup> findByCondition(Long parentId) {
		StringBuffer sb = new StringBuffer(
//				"select j from UL_USERGROUP j where j.delFlag = 0 and j.parentId = ? ");
				"select j from UlUsergroup j where j.usergroupLevel = 1 and j.parentId = ? "); 
		ArrayList<Object> paramList = new ArrayList<Object>();
		paramList.add(parentId);
		return findByHql(sb.toString(), paramList.toArray());
	}
	@Override
	public List<UlUsergroup> findByParentId(Long parentId) {
		final String hql = "from UlUsergroup ul where ul.parentId=?";
		Object[] params ={parentId};
		return findByHql(hql, params);
	}

	@Override
	public List<UlUsergroup> findByPath(String path) {
		String hql="from UlUsergroup vo where vo.path like ?";
		String[] param={path+"%"};
		return findByHql(hql,param);
	}

	@Override
	public List<UlUsergroup> findByUsergroupName(String usergroupName) {
		String hql="from UlUsergroup ul where ul.usergroupName=?";		
		String[] param={usergroupName};
		return findByHql(hql,param);
	}
	
	@SuppressWarnings("static-access")
	@Override
	public String getCurrentGroupUserIDS(Long deptId) {
		String IDS = null;
		Connection conn = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			String SQL = "select USEID from UL_EMPLOYEE where DEPID="+deptId;
			CommTable cTableIDS = dbQuery.getCommTableBySQL(SQL);
			int iCounts = cTableIDS.getRecordCount();
			StringBuffer sb = new StringBuffer();
			for(int i=0; i<iCounts; i++) {
				sb.append(cTableIDS.getRecord(i).get("USEID"));
				if(i<iCounts-1) {
					sb.append(",");
				}
			}
			IDS = sb.toString();
		} catch(Exception e) {
			e.printStackTrace();
		} finally{
			jdbcPool.close(conn);
		}
		return IDS;
	}
	
	@SuppressWarnings("static-access")
	@Override
	public String getCurrentGroupUserNOS(Long deptId) {
		String IDS = null;
		Connection conn = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			String SQL = "select userno from UL_EMPLOYEE where DEPID="+deptId;
			CommTable cTableIDS = dbQuery.getCommTableBySQL(SQL);
			int iCounts = cTableIDS.getRecordCount();
			StringBuffer sb = new StringBuffer();
			for(int i=0; i<iCounts; i++) {
				sb.append(cTableIDS.getRecord(i).get("userno"));
				if(i<iCounts-1) {
					sb.append(",");
				}
			}
			IDS = sb.toString();
		} catch(Exception e) {
			e.printStackTrace();
		} finally{
			jdbcPool.close(conn);
		}
		return IDS;
	}
}