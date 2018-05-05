package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.callout.dao.outb.ObCallbatchCusDao;
import com.ulane.callout.model.outb.ObCallbatchCus;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObCallbatchCusDaoImpl extends BaseDaoImpl<ObCallbatchCus> implements ObCallbatchCusDao{

	public ObCallbatchCusDaoImpl() {
		super(ObCallbatchCus.class);
	}
	
	public List<ObCallbatchCus> listCallbatchCusByAssids(String allAssIds,String whereSql) {
		StringBuffer sql  = 
			new StringBuffer("select * from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
			
		}
		Query query = this.getSession().createSQLQuery(sql.toString()).addEntity(ObCallbatchCus.class);	
		return query.list();
	}
	
	public List<ObCallbatchCus> listCusByCallbatch(Long fromCallbatchId,String whereSql) {
		StringBuffer sql  = 
			new StringBuffer("select * from Ob_Callbatch_Cus vo where vo.callbatch_Id= ").append(fromCallbatchId);
			if(whereSql!=null&&!whereSql.equals("")){
				sql.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and  con.customerid=pcus.customerid ")
				.append(whereSql).append(")");
			}
			System.out.println("###################"+sql.toString());
			Query query = this.getSession().createSQLQuery(sql.toString()).addEntity(ObCallbatchCus.class);	
		return query.list();
	}

}