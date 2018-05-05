package com.htsoft.core.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.model.TaskLink;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.customer.model.customer.EveryDayReport;
import com.ulane.customer.model.customer.ReportView;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface GenericDao<T,PK extends Serializable> {
	public T save(T entity);
	public T merge(T entity);
	public T get(PK id);
	public void remove(PK id);
	public void remove(T entity);
	public void evict(T entity);
	
	public List<T> getAll();
	public List<T> getAll(PagingBean pb);
	public List<T> getAll(QueryFilter filter);
	
	//----------------------------
	//public List getReportAll(QueryFilter filter);
	
	public List<Object> findByHqlOb( String hql, Object[]objs);
	public List<T> findByHql( String hql, Object[]objs);
	public List<T> findByHql( String hql, Object[]objs,PagingBean pb );
	public List<T> findByHql( String hql, Object[]objs, int firstResult, int pageSize );
	
    public List<T> getAllNoRequest(final QueryFilter queryFilter);
    public List<T> getAllNoRequest(PagingBean pb);
    public Object getSummaryByFilter(final QueryFilter filter,final String field);

    public void flush();
	
	/**
	 * 执行删除或更新语句
	 * @param hql
	 * @param params
	 * @return 返回影响行数
	 */
	public Long update(final String hql,final Object... params);
	/**
	 * 
	 * @param start
	 * @param limit
	 * @param userId
	 * @param type
	 * @param firstId
	 * @return Map(业务表单的Id,是否已完结)
	 */
	
	public Map<Long, Boolean> getSelectId(final int start, final int limit,
			final String userId, final String type, String firstId);
	/**
	 * 
	 * @param start
	 * @param limit
	 * @param userId
	 * @param type
	 * @param firstId
	 * @return 所有记录的行数
	 */
	public int getSelectIdCount(final int start, final int limit,
			final String userId, final String type, String firstId);
	
	/**
	 * 根据条件获取工单
	 * @param start				开始页
	 * @param limit				结束页
	 * @param createrId			创建人(or 受理人)
	 * @param taskUserId		处理人
	 * @param busType			工单类型
	 * @param runStatus			运行状态
	 * @param isOverdue			是否过期
	 * @return List<TaskLink>
	 */
	public List<TaskLink> taskLinkList(final int start,final int limit,final String createrId,final String taskUserId, final String busType,final String runStatus,final String isOverdue,String proDefinitionName,final String orderBy);
	/**
	 * 获得工单的条数
	 * @param start				开始页
	 * @param limit				结束页
	 * @param createrId			创建人(or 受理人)
	 * @param taskUserId		处理人
	 * @param busType			工单类型 
	 * @param runStatus			运行状态
	 * @param isOverdue			是否过期
	 * @return List<TaskLink>
	 */
	public int getTaskLinkListCount(final int start,final int limit,final String createrId,final String taskUserId, final String busType,final String runStatus,final String isOverdue,String proDefinitionName);

	/**
	 * HY 
	 * 2013/12/25
	 * 查询所有报表数据
	 */
	public List<ReportView> getReportAll(String hLong);
	
	/**
	 * HY 
	 * 2013/12/30
	 * 按条件查询报表数据
	 */
	public List<ReportView> getSomeOneReport(String info);

	/**
	 * HY 
	 * 2013/1/20
	 * 查询所有系统日报表数据
	 */
	public List<EveryDayReport> getEveryDayReport(String hLong);
	/**
	 * HY 
	 * 2013/1/20
	 * 按日期条件查询系统日报表数据
	 */
	public List<EveryDayReport> getEveryDayReportByDay(String info);
}

