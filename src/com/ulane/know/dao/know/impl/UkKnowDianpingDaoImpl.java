package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.service.system.DictionaryService;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.know.dao.know.UkKnowDianpingDao;
import com.ulane.know.model.know.UkKnowDianping;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkKnowDianpingDaoImpl extends BaseDaoImpl<UkKnowDianping> implements UkKnowDianpingDao{

	@Resource
	public DictionaryService dictionaryService;
	
	public UkKnowDianpingDaoImpl() {
		super(UkKnowDianping.class);
	}

	@Override
	public Double getAvgValue(Long knowId) {
		final String sql=" select avg(t.dianping_value) from uk_know_dianping t where t.know_id = " + knowId;
		JdbcHelper helper = new JdbcHelper();
		
		helper.setSql(sql);
		logger.debug("sql : " + sql);
		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				try {
					rs.next();
					return rs.getDouble(1);
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return null;
			}
		};
		helper.setJdbcWork(sqlWork);
		return (Double) getHibernateTemplate().execute(helper);
	}

	@Override
	public boolean hasKnowRead(String knowId,String busiType) {
//		final String sql = " select distinct (kr.know_id) from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid where ur.userid = "
//				+ ContextUtil.getCurrentUserId() + " and kr.know_id= " + knowId;
		String sql = "";
		Department dep = ContextUtil.getCurrentUser().getDepartment();
		UlEmployee emp = ContextUtil.getCurrentUser().getUlEmployee();
		Long dicId = null;
		if(emp!=null){
			String zhiWei = emp.getZhiwei();
			if(zhiWei!=null){
				QueryFilter filter = new QueryFilter();
				filter.addFilter("Q_itemIndex_S_EQ", zhiWei);
				filter.addFilter("Q_mapName_S_EQ", "ZW001");
				List<Dictionary> dicList = dictionaryService.getAllNoRequest(filter);
				dicId = dicList.get(0).getDicId();
			}
		}
		/***
		 * 模拟一个维度权限对象ud
		 */
//		UkKnowDimensionality ud = new UkKnowDimensionality();
		boolean manage = true;
		if(busiType.equals("1")){
			
			sql = "select b.visit_manage as vmg, b.visit_role as vrole from uk_know_dimensionality b  where b.dimensionality_id = (select a.dimensionality_id from uk_dimensionality_know a where know_id = "+knowId+") ";
			
			JdbcHelper helper = new JdbcHelper();
			
			helper.setSql(sql);
			logger.debug("sql : " + sql);
			
			JdbcWork sqlWork = new JdbcWork() {
				@Override
				public Object fillData(ResultSet rs) {
					String[] ret = new String[2];
					try {
						while(rs.next()){
							ret[0] = rs.getString("vmg");
							ret[1] = rs.getString("vrole");
						}
					} catch (SQLException e) {
						e.printStackTrace();
					}
					return ret;
				}
			};
			helper.setJdbcWork(sqlWork);
			String[] ukDimen = (String[])getHibernateTemplate().execute(helper);
			
			if(ukDimen != null && ukDimen[0]!= "1" ){
				if(ukDimen[1] == null) return false;
				String udvr = ukDimen[1];
				//String[] udvrArr = udvr.split(",");
				//String urstr = "";
				Set<AppRole> ur = ContextUtil.getCurrentUser().getRoles();
				//manage = ur.size() > udvrArr.length ? true : false;
				
				Object[] urs = ur.toArray();
				for ( Object o : urs){
					String or = ((AppRole)o).getRoleId().toString();
					if(udvr.indexOf(",") >=0){
						manage = udvr.indexOf(or + ",") == -1 ? (udvr.indexOf("," + or) == -1 ? false : true) : true;//[ or, | ,or ]
					} else {
						manage = udvr.equals(or) ;
					}
					
					if(manage) break ;
				}
			}
			
			return manage;
		}
		if(busiType.equals("2") && dep!=null){
			sql = " select distinct (kr.know_id) from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid where ur.userid = "
					+ ContextUtil.getCurrentUserId()
					+ " and kr.know_id= ( select t.know_id from uk_dimensionality_know t where t.know_id= "
					+ knowId + " and t.depid=" + dep.getDepId() + " )";

			//sql = "select t.know_id from uk_dimensionality_know t where t.know_id= "+ knowId +" and t.depid="+ dep.getDepId();
		}
		if(busiType.equals("3") && dicId!=null){
			sql = " select distinct (kr.know_id) from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid where ur.userid = "
					+ ContextUtil.getCurrentUserId()
					+ " and kr.know_id= ( select t.know_id from uk_dimensionality_know t where t.know_id= "
					+ knowId + " and t.dicid=" + dicId + " )";
			//sql = "select t.know_id from uk_dimensionality_know t where t.know_id= "+ knowId +" and t.dicid="+ dicId;
		}
		JdbcHelper helper = new JdbcHelper();
		
		helper.setSql(sql);
		logger.debug("sql : " + sql);
		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				try {
					boolean hasNext = rs.next();
					if(hasNext){
						return rs.getObject(1);
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return null;
			}
		};
		helper.setJdbcWork(sqlWork);
		Object obj = getHibernateTemplate().execute(helper);
		
		if(obj!=null){
				return true;
			}else{
				return false;
		}
		
		
	}

}