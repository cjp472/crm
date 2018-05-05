package com.htsoft.core.service;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.Serializable;
import java.util.List;

//import javax.jws.WebMethod;
//import javax.jws.WebService;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.customer.model.customer.EveryDayReport;
import com.ulane.customer.model.customer.ReportView;
/**
 * 
 * @author cf0666@gmail.com
 *
 * @param <T>
 * @param <PK>
 */
//@WebService
public interface GenericService<T,PK extends Serializable> {
	/**
	 * 
	 * @param entity
	 * @return
	 */
	public T save(T entity);
	/**
	 * merge the object
	 * @param entity
	 * @return
	 */
	public T merge(T entity);
	
	/**
	 * evict the object
	 * @param entity
	 */
	public void evict(T entity);
	/**
	 * 
	 * @param id
	 * @return
	 */
	public T get(PK id);
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	//@WebMethod(operationName="getAll")
	public List<T> getAll();
	
	/**
	 * 
	 * @param pb
	 * @return
	 */
	//@WebMethod(operationName="getAllByPb")
	public List<T> getAll(PagingBean pb);
	
	/**
	 * 
	 * @param filter
	 * @return
	 */
	//@WebMethod(operationName="getAllByFilter")
	public List<T> getAll(QueryFilter filter);
	
	/**
	 * HY
	 * 2013/12/25  -- 查询所有报表数据
	 * @return List
	 */
	public List<ReportView> getReportAll(String hLong);
	
	/**
	 * HY
	 * 2013/12/30  -- 按条件查询报表数据
	 * @return List
	 */
	public List<ReportView> getSomeOneReport(String info);
	
	/**
	 * HY
	 * 2013/1/20  -- 查询所有系统日报表数据
	 * @return List
	 */
	public List<EveryDayReport> getEveryDayReport(String hLong);
	
	/**
	 * HY
	 * 2013/1/20  -- 查询所有系统日报表数据
	 * @return List
	 */
	public List<EveryDayReport> getEveryDayReportByDay(String info);
	
	//@WebMethod(operationName="remove")
	public void remove(PK id);
	
	//@WebMethod(operationName="removeByEntity")
	public void remove(T entity);
	
	/**
	 * flush the session
	 */
	public void flush();

	public List<T> getAllNoRequest(final QueryFilter queryFilter);
	
	
}
