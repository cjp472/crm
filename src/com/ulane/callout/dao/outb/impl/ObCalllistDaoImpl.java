package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.model.xitong.UlBbsHuati;
import com.ulane.callout.dao.outb.ObCalllistDao;
import com.ulane.callout.model.outb.ObCalllist;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObCalllistDaoImpl extends BaseDaoImpl<ObCalllist> implements ObCalllistDao{

	public ObCalllistDaoImpl() {
		super(ObCalllist.class);
	}
	
	@Override
	public List<ObCalllist> getComList() {
		String hql = "select distinct vo from ObCalllist vo,inner join fetch vo.obComs obcom  where  obcom.comId = 41 order by vo.calllistId desc ";
		//String hql="select ObCom vo inner join vo.obCalllists";
		return findByHql(hql); 
	}

	public List queryObCallbatchAsssByParentNullId(Long callbatchId) {
		StringBuffer hql  = new StringBuffer("select t from ObCallbatchAss t where t.obCallbatch.callbatchId=? and t.parentCallbatchAssId is null order by t.callbatchAssId");
		return findByHql(hql.toString(), new Object[]{callbatchId});
	}
	public int getAssignCount(Long callbatchAssId) {
		
		StringBuffer countSql = 
			new StringBuffer("select count(*) from OB_CALLBATCH_CUS")
			.append(" where CALLBATCH_ASS_ID=").append(callbatchAssId)
			;
		return jdbcTemplate.queryForInt(countSql.toString());
	}
    public List queryObCallbatchCussByCallbatchAssId(Long callbatchAssId){
		StringBuffer hql  = new StringBuffer("select t from ObCallbatchCus t where t.obCallbatchAss.callbatchAssId=? order by t.cusId");
		return findByHql(hql.toString(), new Object[]{callbatchAssId});
    }	
} 