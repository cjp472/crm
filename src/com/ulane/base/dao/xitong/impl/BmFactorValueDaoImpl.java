package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Iterator;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.base.dao.xitong.BmFactorValueDao;
import com.ulane.base.model.xitong.BmFactorValue;

@SuppressWarnings("unchecked")
public class BmFactorValueDaoImpl extends BaseDaoImpl<BmFactorValue> implements BmFactorValueDao{

	public BmFactorValueDaoImpl() {
		super(BmFactorValue.class);
	}
	
	/**
	 * 根据条件查找最新NUM
	 * @param num
	 * @param object
	 * @param condition
	 * @return 
	 *    Iterator iter = getHql();
	 *    while(iter.hasNext())
     *    { Object[] result=(Object[])iter.next();
     *    String x = result[0];}
	 */
	public Iterator getHql(String num,String object,String condition){
		List rlist = null;
		StringBuffer hql=new StringBuffer("");
		hql.append(" select ").append(num);
		hql.append(" from ").append(object);
		hql.append(" where ").append(condition);
		hql.append(" order by ").append(num).append(" desc ");
		try{
			rlist=findByHql(hql.toString());
		}
		catch(Exception e){}
        
		return rlist.iterator();
	}
	
	/**
	 * 判断条件是否成立
	 * @param object
	 * @param condition
	 * @return
	 */
	public boolean isHql(String object,String condition){
		boolean rb = false;
		StringBuffer hql=new StringBuffer("");
		hql.append(" from ").append(object);
		hql.append(" where ").append(condition);
		try{
			List rlist=findByHql(hql.toString());
			if(!rlist.isEmpty())
				rb = true;
		}
		catch(Exception e){}
		return rb;
	}

	@Override
	public List<BmFactorValue> getByFactor(Long factor1Id) {
		// TODO Auto-generated method stub
		List<BmFactorValue> rlist = null;
		StringBuffer hql=new StringBuffer(" from BmFactorValue gg where gg.bmFactor.factorId = ? ");
		try{
			rlist=findByHql(hql.toString(),new Object[]{factor1Id});
		}
		catch(Exception e){}
        
		return rlist;
	}
}