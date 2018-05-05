package com.ulane.core.dao.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.Serializable;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import com.htsoft.core.command.CriteriaCommand;
import com.htsoft.core.command.FieldCommandImpl;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.command.SortCommandImpl;
import com.htsoft.core.dao.impl.GenericDaoImpl;
import com.ulane.core.dao.MtGenericDao;

@SuppressWarnings("unchecked")
abstract public class MtGenericDaoImpl<T, PK extends Serializable> extends GenericDaoImpl implements MtGenericDao<T, PK> {
	    
	    public MtGenericDaoImpl(Class persistType) {
            super(persistType);
            // TODO Auto-generated constructor stub
        }

        /**
	     * 按queryFilter,Hql多条件查询并返回
	     * @param queryFilter
	     * @param hql(WHERE)
	     * @param params
	     * @return
	     */
	    public List getMultiAll(QueryFilter queryFilter,String hql){   
	        String newHql=null;
	        String condition=null;
	        String groupBy=null;

	        //重新设置排序 
	        int orderIndex = hql.toUpperCase().indexOf(" ORDER BY ");
	        int whereIndex = hql.toUpperCase().indexOf(" WHERE ");
	        
	        
	        if (orderIndex < 0) {
	            orderIndex = hql.length();
	        }
	        if(whereIndex<0){
	            whereIndex=hql.length();
	        }
	        
	        if(whereIndex<0){
	            condition=" where 1=1 ";
	        }else{
	            condition=hql.substring(whereIndex+7,orderIndex);
	            
	            logger.debug("condition:" + condition);
	            
	            Pattern groupByPattern = Pattern.compile(" GROUP BY [\\w|.]+");
	            Matcher m = groupByPattern.matcher(condition.toUpperCase());
	            //存在Group By
	            if(m.find()){
	                groupBy=condition.substring(m.start(),m.end());
	                condition=condition.replace(groupBy, " ");
	            }
	            condition=" where ("+condition+")";
	        }
	        
	        String sortDesc="";
	        
	        //取得条件以及排序
	        for(int i=0;i<queryFilter.getCommands().size();i++){
	            CriteriaCommand command=queryFilter.getCommands().get(i);
	            if(command instanceof FieldCommandImpl){
	                condition+=" and " + ((FieldCommandImpl)command).getPartHql();
	            }else if(command instanceof SortCommandImpl){
	                if(!"".equals(sortDesc)){
	                    sortDesc+=",";
	                }
	                sortDesc+=((SortCommandImpl)command).getPartHql();
	            }
	        }
	        
	        newHql = hql.substring(0, whereIndex);

	        if(queryFilter.getAliasSet().size()>0){
	            //取得hql中的表的别名，为关联外表作准备
	            int fromIndex=newHql.indexOf(" FROM ");
	            String entityAliasName=null;
	            if(fromIndex>0){
	                String afterFrom=newHql.substring(fromIndex+6);
	                
	                String []keys=afterFrom.split("[ ]");
	                if(keys.length>1){
	                    if(!keys[1].toUpperCase().equals("ORDER") &&!keys[1].toUpperCase().equals("JOIN")){
	                        entityAliasName=keys[1];
	                    }
	                }
	                //加上别名
	                if(entityAliasName==null){
	                    entityAliasName="vo";
	                    newHql=newHql.replace(keys[0], keys[0]+" " + entityAliasName);
	                }
	            }
	            
	            //若存在外键，则进行组合
	            String joinHql="";
	            Iterator it=queryFilter.getAliasSet().iterator();
	            while(it.hasNext()){
	                String joinVo=(String)it.next();
	                joinHql+=" join " + entityAliasName+"."+joinVo +" " + joinVo;
	            }
	    
	            //加上外键的联接
	            if(!"".equals(joinHql)){
	                newHql+=joinHql;
	            }
	        }
	        //加上条件限制
	        newHql+= condition;
	        
	        //加上分组
	        if(groupBy!=null){
	            newHql+=groupBy + " ";
	        }
	        
	        //加上排序
	        if(!"".equals(sortDesc)){//带在排序在内
	            newHql+=" order by " + sortDesc;
	        }else{
	            newHql+=hql.substring(orderIndex);
	        }
	        
	        Object[] params=queryFilter.getParamValueList().toArray();
	        
	        //显示多少条记录
	        int totalItems=getTotalItems(newHql,params).intValue();
	        queryFilter.getPagingBean().setTotalItems(totalItems);
	        if(logger.isDebugEnabled()){
	            logger.debug("new hql:" + newHql);
	        }
	        return find(newHql, params,queryFilter.getPagingBean().getFirstResult(),queryFilter.getPagingBean().getPageSize());
	    }
	
}
