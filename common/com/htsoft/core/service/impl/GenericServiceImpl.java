package com.htsoft.core.service.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.Serializable;
import java.util.List;

//import javax.jws.WebMethod;
//import javax.jws.WebService;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.tools.ant.taskdefs.Truncate;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.service.GenericService;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.customer.model.customer.EveryDayReport;
import com.ulane.customer.model.customer.ReportView;
//@WebService
public class GenericServiceImpl<T,PK extends Serializable> implements GenericService<T, PK> {
	
	protected Log logger=LogFactory.getLog(GenericServiceImpl.class);
	
	protected GenericDao<T, Serializable> dao=null;

	public void setDao(GenericDao dao) {
		this.dao = dao;
	}
	
	public GenericServiceImpl(GenericDao dao) {
		this.dao=dao;
	}

	public T get(PK id) {
		return (T)dao.get(id);
	}

	public T save(T entity) {
		return (T)dao.save(entity);
	}
	
	public T merge(T entity){
		logger.debug("进入GenericServiceImpl类merge方法");
		return (T)dao.merge(entity);
	}
	
	public void evict(T entity){
		dao.evict(entity);
	}
	//@WebMethod(operationName="getAll")
	public List<T> getAll(){
		return dao.getAll();
	}
	//@WebMethod(operationName="getAllByPb")
	public List<T> getAll(PagingBean pb){
		return dao.getAll(pb);
	}
	//@WebMethod(operationName="getAllByFilter")
	public List<T> getAll(QueryFilter filter){
		return dao.getAll(filter);
	}
	//@WebMethod(operationName="remove")
	public void remove(PK id){
		dao.remove(id);
	}
	//@WebMethod(operationName="removeByEntity")
	public void remove(T entity){
		dao.remove(entity);
	}
	
	@Override
	public void flush() {
		dao.flush();
	}
	
	public List<T> getAllNoRequest(QueryFilter filter){
        return dao.getAllNoRequest(filter);
    }

	/**
	 * HY
	 * 2013/12/25
	 * 查询所有 报表数据
	 */
	@Override
	public List<ReportView> getReportAll(String hLong) {
		// TODO Auto-generated method stub
		List<ReportView> list = dao.getReportAll(hLong);
		return list;
	}

	/**
	 * HY 
	 * 2013/12/30
	 * 按条件查询报表数据
	 */
	@Override
	public List<ReportView> getSomeOneReport(String info) {
		List<ReportView> list = dao.getSomeOneReport(info);
		return list;
	}

	/**
	 * HY 
	 * 2013/1/20
	 * 查询所有系统日报表数据
	 */
	@Override
	public List<EveryDayReport> getEveryDayReport(String hLong) {
		// TODO Auto-generated method stub
		System.out.println("getEveryDayReport ServiceImpl");
		return dao.getEveryDayReport(hLong);
	}

	/**
	 * HY 
	 * 2013/1/20
	 * 按日期条件查询系统日报表数据
	 */
	@Override
	public List<EveryDayReport> getEveryDayReportByDay(String info) {
		// TODO Auto-generated method stub
		System.out.println("getEveryDayReportByDay ServiceImpl");
		return dao.getEveryDayReportByDay(info);
	} 
	
	
}
