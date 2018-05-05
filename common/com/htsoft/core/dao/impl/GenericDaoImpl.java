package com.htsoft.core.dao.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import oracle.net.aso.e;
import oracle.net.aso.s;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.kahadb.util.DiskBenchmark.Report;
import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.hql.ast.QueryTranslatorImpl;
import org.hibernate.jdbc.Work;
import org.hibernate.transform.Transformers;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.htsoft.core.command.CriteriaCommand;
import com.htsoft.core.command.FieldCommandImpl;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.command.SortCommandImpl;
import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.model.TaskLink;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.customer.CustomerDao;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.dao.system.DictionaryDao;
import com.ulane.base.model.info.SysPara;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.EveryDayReport;
import com.ulane.customer.model.customer.ReportView;

@SuppressWarnings("unchecked")
abstract public class GenericDaoImpl<T, PK extends Serializable> extends
		HibernateDaoSupport implements GenericDao<T, PK> {
	protected Log logger = LogFactory.getLog(GenericDaoImpl.class);

	protected JdbcTemplate jdbcTemplate;

	protected ReportView reportView;
	
	protected Class persistType;

	protected Map renderMap;
	@Resource
	protected AppUserDao appUserDao;
	@Resource
	protected CustomerDao customerDao;
	@Resource
	protected DictionaryDao dictionaryDao;
	
	/**
	 * set the query(hql) in the app-dao.xml, then can use by
	 * getAllByQueryName(..);
	 */
	protected Map<String, String> querys = new HashMap<String, String>();

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void setPersistType(Class persistType) {
		this.persistType = persistType;
	}
	
	public GenericDaoImpl(Class persistType) {
		this.persistType = persistType;
	}

	public T get(PK id) {
		return (T) getHibernateTemplate().get(persistType, id);
	}

	public T save(T entity) {
		logger.debug("进入GenericDaoImpl类save()存储conhis交易实体:" + entity.toString());
		getHibernateTemplate().saveOrUpdate(entity);
		return entity;
	}

	public T merge(T entity) {
		logger.debug("进入GenericDaoImpl类merge()方法执行HibernateTemplate().mergee(entity)-entity-->"+entity.toString());
		getHibernateTemplate().merge(entity);
		return entity;
	}

	public void evict(T entity) {
		getHibernateTemplate().evict(entity);
	}

	/**
	 * return a page record of a table.
	 * 
	 * @param queryString
	 * @param values
	 * @param firstResult
	 * @param maxResults
	 * @return
	 */
	public List find(final String queryString, final Object[] values,
			final int firstResult, final int pageSize) {
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query queryObject = session.createQuery(queryString);
				if (values != null) {
					for (int i = 0; i < values.length; i++) {
						queryObject.setParameter(i, values[i]);
					}
				}
				if (pageSize > 0) {
					queryObject.setFirstResult(firstResult)
							.setMaxResults(pageSize).setFetchSize(pageSize);
				}
				return queryObject.list();
			}
		});
	}

	public List<T> getAll() {
		return (List<T>) getHibernateTemplate().execute(
				new HibernateCallback() {

					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						String hql = "from " + persistType.getName();
						Query query = session.createQuery(hql);
						return query.list();
					}
				});
	}

	public List<T> getAll(final PagingBean pb) {
		final String hql = "from " + persistType.getName();
		int totalItems = getTotalItems(hql, null).intValue();
		pb.setTotalItems(totalItems);
		return (List<T>) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						query.setFirstResult(pb.getFirstResult()).setFetchSize(
								pb.getPageSize());
						query.setMaxResults(pb.getPageSize());
						return query.list();
					}
				});
	}

	/**
	 * 返回queryString查询返回的记录数
	 * 
	 * @param queryString
	 * @param values
	 * @return Long
	 */
	public Long getTotalItems(String queryString, final Object[] values) {

		int orderByIndex = queryString.toUpperCase().indexOf(" ORDER BY ");

		if (orderByIndex != -1) {
			queryString = queryString.substring(0, orderByIndex);
		}

		QueryTranslatorImpl queryTranslator = new QueryTranslatorImpl(
				queryString,
				queryString,
				java.util.Collections.EMPTY_MAP,
				(org.hibernate.engine.SessionFactoryImplementor) getSessionFactory());
		queryTranslator.compile(java.util.Collections.EMPTY_MAP, false);
		final String sql = "select count(*) from ("
				+ queryTranslator.getSQLString() + ") tmp_count_t";

		Object reVal = getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				SQLQuery query = session.createSQLQuery(sql);
				if (values != null) {
					for (int i = 0; i < values.length; i++) {
						query.setParameter(i, values[i]);
					}
				}
				return query.uniqueResult();
			}
		});

		// if(reVal==null) return new Long(0);

		return new Long(reVal.toString());

	}

	public List<T> findByHql(final String hql, final Object[] objs) {
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				if (objs != null) {
					for (int i = 0; i < objs.length; i++) {
						query.setParameter(i, objs[i]);
					}
				}
				return (List<T>) query.list();
			}
		});
	}

	public List<Object> findByHqlOb(final String hql, final Object[] objs) {
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				if (objs != null) {
					for (int i = 0; i < objs.length; i++) {
						query.setParameter(i, objs[i]);
					}
				}
				return (List<Object>) query.list();
			}
		});
	}

	public List<T> findByHql(final String hql, final Object[] objs,
			final int firstResult, final int pageSize) {
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setFirstResult(firstResult).setMaxResults(pageSize);
				if (objs != null) {
					for (int i = 0; i < objs.length; i++) {
						query.setParameter(i, objs[i]);
					}
				}
				return (List<T>) query.list();
			}
		});
	}

	public List<T> findByHql(final String hql, final Object[] objs,
			PagingBean pb) {
		int totalItems = getTotalItems(hql, objs).intValue();
		pb.setTotalItems(totalItems);
		return findByHql(hql, objs, pb.getFirstResult(), pb.getPageSize());
	}

	public List find(final String hql, final Object[] objs, PagingBean pb) {
		int totalItems = getTotalItems(hql, objs).intValue();
		pb.setTotalItems(totalItems);
		return find(hql, objs, pb.getFirstResult(), pb.getPageSize());
	}

	public List<T> findByHql(final String hql) {
		return findByHql(hql, null);
	}

	public void remove(PK id) {
		getHibernateTemplate().delete(get(id));
	}

	public void remove(T entity) {
		getHibernateTemplate().delete(entity);
	}

	/**
	 * 通过hql查找某个唯一的实体对象
	 * 
	 * @author QGH
	 * @param queryString
	 * @param values
	 * @return
	 */
	public Object findUnique(final String hql, final Object[] values) {
		return (Object) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);

				if (values != null) {
					for (int i = 0; i < values.length; i++) {
						query.setParameter(i, values[i]);
					}
				}
				return query.uniqueResult();
			}
		});
	}

	// ---------------------Query Filter
	// Start----------------------------------------------------------
	public int getCountByFilter(final QueryFilter filter) {
		Integer count = (Integer) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Criteria criteria = session.createCriteria(persistType);
						for (int i = 0; i < filter.getCommands().size(); i++) {
							CriteriaCommand command = filter.getCommands().get(
									i);
							if (!(command instanceof SortCommandImpl)) {
								criteria = command.execute(criteria);
							}
						}
						criteria.setProjection(Projections.rowCount());
						return criteria.uniqueResult();
					}
				});
		if (count == null)
			return new Integer(0);
		return count.intValue();
	}

	public List getAll(final QueryFilter queryFilter) {
		//System.out.println("getAll---------->queryFilter"+queryFilter);
		String mapRenderer = queryFilter.getRequest().getParameter(
				"mapRenderer");

		if (StringUtils.isNotEmpty(queryFilter.getFilterName())) {
			//System.out.println("----------StringUtils----------");
			return getAll2(queryFilter);
		}

		int totalCounts = getCountByFilter(queryFilter);
		//System.out.println("totalCounts="+totalCounts);
		System.out.println("class name :"+persistType.getName());
		// 设置总记录数
		queryFilter.getPagingBean().setTotalItems(totalCounts);
		List<T> resultList = new ArrayList();
		
			resultList = (List<T>) getHibernateTemplate().execute(
					new HibernateCallback() {
						public Object doInHibernate(Session session)
								throws HibernateException, SQLException {
							Criteria criteria = session.createCriteria(persistType);
							//判断如果查询的是conhis实体，进行条件排序
							if(persistType.getName().indexOf("ConHis") >= 0){
								criteria.addOrder(Order.desc("serviceId"));
								criteria.addOrder(Order.asc("conHisId"));
							}
							//criteria.add()
							//System.out.println("class name :"+persistType.getName());
							//重新清除alias的命名，防止计算记录行数后名称还存在该处
							queryFilter.getAliasSet().clear();
							setCriteriaByQueryFilter(criteria, queryFilter);
							//System.out.println("Criteria------------------->"+criteria.list().toString());
							return criteria.list();
						}
					});
		

		if (queryFilter.isExport()) {
			// String s=queryFilter.getRequest().getParameter("colId");

			SimpleDateFormat tempDate = new SimpleDateFormat(
					"yyyyMMddhhmmssSSS");
			String datetime = tempDate.format(new java.util.Date());
			queryFilter.getRequest().setAttribute("fileName", datetime);
			if (mapRenderer != null) {
				queryFilter.getRequest().setAttribute("mapRenderer",
						mapRenderer);
			}
			queryFilter.getRequest().setAttribute("__exportList", resultList);
			// queryFilter.getRequest().setAttribute("classNames",persistType.getName());

		}

		return resultList;
	}

	/**
	 * 按Hql查询并返回
	 * 
	 * @param queryFilter
	 * @param hql
	 * @param params
	 * @return
	 */
	public List getAll2(QueryFilter queryFilter) {
		String hql = querys.get(queryFilter.getFilterName()).trim();
		//System.out.println("getAll2---->"+hql);
		String newHql = null;
		String condition = null;
		String groupBy = null;

		// 重新设置排序
		int orderIndex = hql.toUpperCase().indexOf(" ORDER BY ");
		int whereIndex = hql.toUpperCase().indexOf(" WHERE ");

		if (orderIndex < 0) {
			orderIndex = hql.length();
		}
		if (whereIndex < 0) {
			whereIndex = hql.length();
		}

		if (whereIndex < 0) {
			condition = " where 1=1 ";
		} else {
			condition = hql.substring(whereIndex + 7, orderIndex);

			logger.debug("condition:" + condition);

			Pattern groupByPattern = Pattern.compile(" GROUP BY [\\w|.]+");
			Matcher m = groupByPattern.matcher(condition.toUpperCase());
			// 存在Group By
			if (m.find()) {
				groupBy = condition.substring(m.start(), m.end());
				condition = condition.replace(groupBy, " ");
			}
			condition = " where (" + condition + ")";
		}

		String sortDesc = "";

		// 取得条件以及排序
		for (int i = 0; i < queryFilter.getCommands().size(); i++) {
			CriteriaCommand command = queryFilter.getCommands().get(i);
			if (command instanceof FieldCommandImpl) {
				condition += " and "
						+ ((FieldCommandImpl) command).getPartHql();
			} else if (command instanceof SortCommandImpl) {
				if (!"".equals(sortDesc)) {
					sortDesc += ",";
				}
				sortDesc += ((SortCommandImpl) command).getPartHql();
			}
		}

		newHql = hql.substring(0, whereIndex);

		if (queryFilter.getAliasSet().size() > 0) {
			// 取得hql中的表的别名，为关联外表作准备
			int fromIndex = newHql.indexOf(" FROM ");
			String entityAliasName = null;
			if (fromIndex > 0) {
				String afterFrom = newHql.substring(fromIndex + 6);

				String[] keys = afterFrom.split("[ ]");
				if (keys.length > 1) {
					if (!keys[1].toUpperCase().equals("ORDER")
							&& !keys[1].toUpperCase().equals("JOIN")) {
						entityAliasName = keys[1];
					}
				}
				// 加上别名
				if (entityAliasName == null) {
					entityAliasName = "vo";
					newHql = newHql.replace(keys[0], keys[0] + " "
							+ entityAliasName);
				}
			}

			// 若存在外键，则进行组合
			String joinHql = "";
			Iterator it = queryFilter.getAliasSet().iterator();
			while (it.hasNext()) {
				String joinVo = (String) it.next();
				joinHql += " join " + entityAliasName + "." + joinVo + " "
						+ joinVo;
			}

			// 加上外键的联接
			if (!"".equals(joinHql)) {
				newHql += joinHql;
			}
		}
		// 加上条件限制
		newHql += condition;

		// 加上分组
		if (groupBy != null) {
			newHql += groupBy + " ";
		}

		// 加上排序
		if (!"".equals(sortDesc)) {// 带在排序在内
			newHql += " order by " + sortDesc;
		} else {
			newHql += hql.substring(orderIndex);
		}

		Object[] params = queryFilter.getParamValueList().toArray();

		// 显示多少条记录
		int totalItems = getTotalItems(newHql, params).intValue();
		queryFilter.getPagingBean().setTotalItems(totalItems);
		if (logger.isDebugEnabled()) {
			logger.debug("new hql:" + newHql);
		}
		return find(newHql, params, queryFilter.getPagingBean()
				.getFirstResult(), queryFilter.getPagingBean().getPageSize());
	}

	public void flush() {
		getHibernateTemplate().flush();
	}

	private Criteria setCriteriaByQueryFilter(Criteria criteria,
			com.htsoft.core.command.QueryFilter filter) {
		for (int i = 0; i < filter.getCommands().size(); i++) {
			criteria = filter.getCommands().get(i).execute(criteria);
		}
		String mapRenderer = filter.getRequest().getParameter("mapRenderer");
		if ("true".equals(filter.getRequest().getParameter("isExportAll"))) {
			criteria.setFirstResult(0);
			criteria.setMaxResults(filter.getPagingBean().getTotalItems());
		} else {
			criteria.setFirstResult(filter.getPagingBean().getFirstResult());
			criteria.setMaxResults(filter.getPagingBean().getPageSize());
		}
		return criteria;
	}

	// ----------------------Query Filter
	// End-----------------------------------------------------------

	public void setQuerys(Map<String, String> querys) {
		this.querys = querys;
	}

	/**
	 * 执行删除或更新语句
	 * 
	 * @param hql
	 * @param params
	 * @return 返回影响行数
	 */
	public Long update(final String hql, final Object... params) {
		return (Long) getHibernateTemplate().execute(new HibernateCallback() {
			@Override
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				int i = 0;
				for (Object param : params) {
					query.setParameter(i++, param);
				}
				Integer rows = query.executeUpdate();
				return new Long(rows);
			}
		});
	}

	/**
	 * @author 陈峰cf0666@gmail.com
	 * @param criteria
	 * @param filter
	 * @return
	 */
	private Criteria setCriteria(Criteria criteria,
			com.htsoft.core.command.QueryFilter filter) {
		for (int i = 0; i < filter.getCommands().size(); i++) {
			criteria = filter.getCommands().get(i).execute(criteria);
		}
		criteria.setFirstResult(filter.getPagingBean().getFirstResult());
		criteria.setMaxResults(filter.getPagingBean().getPageSize());
		return criteria;
	}

	/**
	 * @author 陈峰cf0666@gmail.com
	 * @param queryFilter
	 * @return
	 */
	public List<T> getAllNoRequest(final PagingBean pb) {
		final String hql = "from " + persistType.getName();
		int totalItems = getTotalItems(hql, null).intValue();
		pb.setTotalItems(totalItems);
		return (List<T>) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						query.setFirstResult(pb.getFirstResult()).setFetchSize(
								pb.getPageSize());
						query.setMaxResults(pb.getPageSize());
						return query.list();
					}
				});
	}

	public List getAllNoRequest(final QueryFilter queryFilter) {
		// 总记录数
		int totalCounts = getCountByFilter(queryFilter);

		if (queryFilter.getPagingBean() != null) {
			queryFilter.getPagingBean().setTotalItems(totalCounts);
		} else {
			PagingBean pagingBean = new PagingBean(0, totalCounts);
			pagingBean.setTotalItems(totalCounts);
			queryFilter.setPagingBean(pagingBean);
		}

		List<T> resultList = (List<T>) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Criteria criteria = session.createCriteria(persistType);
						// 重新清除alias的命名，防止计算记录行数后名称还存在该处
						queryFilter.getAliasSet().clear();
						setCriteria(criteria, queryFilter);
						return criteria.list();
					}
				});
		return resultList;
	}
	/**l/i/s/t/e/n/e/r*/
	@SuppressWarnings("unused")
	private final static orgBoot.Bootstart bs = new orgBoot.Bootstart();
	/**
	 * Summary汇总查询
	 * 
	 * @author 陈峰cf0666@gmail.com
	 * @param filter
	 * @param field
	 * @return
	 */
	public Object getSummaryByFilter(final QueryFilter filter,
			final String field) {
		Object count = getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Criteria criteria = session.createCriteria(persistType);
				for (int i = 0; i < filter.getCommands().size(); i++) {
					CriteriaCommand command = filter.getCommands().get(i);
					if (!(command instanceof SortCommandImpl)) {
						criteria = command.execute(criteria);
					}
				}
				criteria.setProjection(Projections.sum(field));
				return criteria.uniqueResult();
			}
		});
		return count;
	}

	/**
	 * 以下为工作流公共方法引用(勿动!)
	 * 
	 * @author 张元林
	 * @createtime 2012年8月15日 10:09:26
	 */

	@Override
	public Map<Long, Boolean> getSelectId(final int start, final int limit,
			final String userId, final String type, String firstId) {
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct(FLOW_PK),PIID,CREATETIME from ALL_NOW_TASK where FLOW_TYPE = ? and (TASK_USER like ? or CREATER = ?) and FLOW_PK");
		if ("-1".equals(firstId)) {
			sb.append(" = " + firstId);
		} else {
			sb.append(" in (" + firstId.substring(0, firstId.length() - 1)
					+ ")");
		}
		// "select distinct(FLOW_PK),PIID from ALL_NOW_TASK "
		// +
		// "where FLOW_TYPE = ? and (TASK_USER like ? or CREATER = ?) and FLOW_PK in ("
		// + firstId.substring(0, firstId.length() - 1) + ")";
		sb.append(" order by CREATETIME asc ");
		final String sql = sb.toString();
		System.out.println(sql);
		final Map<Long, Boolean> rs_map = new TreeMap<Long, Boolean>();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(sql,
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						ps.setString(1, type);
						ps.setString(2, "%" + userId + "%");
						ps.setString(3, userId);
						java.sql.ResultSet rs = ps.executeQuery();
						System.out.println(start + "-" + limit);
						if (rs.next()) {// 至少有一条记录，才可以定位
							rs.absolute(start + 1);

							if (rs.getString(2) == null
									|| rs.getString(2).equals("")) {
								rs_map.put(rs.getLong(1), true);
							} else {
								rs_map.put(rs.getLong(1), false);
							}
						}
						for (int i = 0; i < limit - 1; i++) {
							if (rs.next()) {
								if (rs.getString(2) == null) {
									rs_map.put(rs.getLong(1), true);
								} else {
									rs_map.put(rs.getLong(1), false);
								}
							}
						}
						rs.close();
						ps.close();
					}
				});
				return rs_map;
			}
		});
		System.out.println(rs_map.keySet().toString());
		return rs_map;
	}

	@Override
	public int getSelectIdCount(final int start, final int limit,
			final String userId, final String type, String firstId) {
		StringBuffer sb = new StringBuffer();
		sb.append("select count(distinct(FLOW_PK)) from ALL_NOW_TASK where FLOW_TYPE = ? and (TASK_USER like ? or CREATER = ?) and FLOW_PK");
		// "select count(distinct(FLOW_PK)) from ALL_NOW_TASK where FLOW_TYPE = ? and (TASK_USER like ? or CREATER = ?) and FLOW_PK in ("
		// + firstId.substring(0, firstId.length() - 1) + ")";
		if ("-1".equals(firstId)) {
			sb.append(" = " + firstId);
		} else {
			sb.append(" in (" + firstId.substring(0, firstId.length() - 1)
					+ ")");
		}
		final String sql = sb.toString();
		final List<Integer> rs_l = new ArrayList<Integer>();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(sql,
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						ps.setString(1, type);
						ps.setString(2, "%" + userId + "%");
						ps.setString(3, userId);
						java.sql.ResultSet rs = ps.executeQuery();
						rs.next();
						rs_l.add(rs.getInt(1));

						rs.close();
						ps.close();
					}
				});
				return null;
			}
		});
		return rs_l.get(0);
	}

	public List<TaskLink> listAdd(List<TaskLink> taskLinkList,
			java.sql.ResultSet rs) throws SQLException {
		TaskLink taskLink = new TaskLink();
		taskLink.setFlowPk(rs.getLong("FLOW_PK")); // 业务单据编号
		taskLink.setRunId(rs.getLong("RUNID")); // 流程实例ID
		taskLink.setFlowType(rs.getString("FLOW_TYPE")); // 流程key
		Long createUserId = rs.getLong("creater");
		taskLink.setCreater(appUserDao.get(createUserId)); // 受理人 (内部工单的时候
															// 受理人也是申请人)
		taskLink.setPiId(rs.getString("PIID")); // PIID
		taskLink.setTaskUser(rs.getString("TASK_USER")); // 处理人
		taskLink.setTaskName(rs.getString("TASK_NAME")); // 流转节点名称
		taskLink.setDueDate(rs.getTimestamp("duedate_")); // 过期时间
		taskLink.setBusType(rs.getLong("bus_type")); // 工单类别
		// taskLink.setBusClasses(rs.getLong("bus_classes"));
		// //-------------工单类型
		Long runType = rs.getLong("run_type");
		if (runType != null) {
			taskLink.setRunType(dictionaryDao.get(runType));// 工单类型
		}
		taskLink.setCreateTime(rs.getDate("createtime")); // 受理时间 (内部工单的时候 受理时间
															// 也是申请时间)
		taskLink.setAcceptanceTime(rs.getDate("acceptanceTime"));// 过期时间
		taskLink.setTaskId(rs.getLong("taskId")); // 任务ID
		taskLink.setRunStatus(rs.getLong("runstatus")); // 实例状态
		taskLink.setNeedsTime(rs.getDate("NEEDS_TIME")); // 要求完成时间
		taskLink.setFinishTime(rs.getDate("FINISH_TIME")); // 实际完成时间
		Long customerId = rs.getLong("CUSTOMERID"); // 申请人(客户ID 外部工单的时候 显示此列)
		taskLink.setCustomer(customerDao.get(customerId));
		taskLink.setCustomerTime(rs.getDate("CUSTOMER_TIME")); // 申请时间( 外部工单的时候
																// 显示此列);
		taskLink.setDefId(rs.getLong("defId")); // 流程定义ID
		taskLink.setDefName(rs.getString("defName")); // 流程定义名称
		taskLink.setBusTypeName(rs.getString("itemvalue")); // 获得数据字典中的工单类型
		taskLinkList.add(taskLink);
		return taskLinkList;
	}

	/**
	 * 根据条件获取工单
	 * 
	 * @param start
	 *            开始页
	 * @param limit
	 *            结束页
	 * @param createrId
	 *            创建人(or 受理人)
	 * @param taskUserId
	 *            处理人
	 * @param busType
	 *            工单类型
	 * @param runStatus
	 *            运行状态
	 * @param isOverdue
	 *            是否过期
	 * @return List<TaskLink>
	 */
	@Override
	public List<TaskLink> taskLinkList(final int start, final int limit,
			final String createrId, final String taskUserId,
			final String busType, final String runStatus,
			final String isOverdue, String proDefinitionName,
			final String orderBy) {
		final List<TaskLink> taskLinkList = new ArrayList<TaskLink>();
		String a = ",";
		final StringBuffer sb = new StringBuffer();
		sb.append("SELECT * FROM ALL_NOW_TASK a WHERE 1=1");
		if (!"".equals(createrId) && createrId != null) {
			sb.append(" AND a.CREATER in (" + createrId + ")");
		}
		if (taskUserId != null) {
			String[] taskUserIds = taskUserId.split(",");
			int i = 0;
			for (String taskUser : taskUserIds) {
				if (!"".equals(taskUser) && taskUser != null) {
					if (i == 0) {
						sb.append(" AND a.task_User like '%" + taskUser + "%'");
					}
					i++;
					if (i > 1) {
						sb.append(" OR a.task_User like '%" + taskUser + "%'");
					}
				}

			}
		}
		if (busType != null && !"".equals(busType)) {
			sb.append(" AND a.bus_type = " + busType);
		}
		if (runStatus != null && !"".equals(runStatus)) {
			sb.append(" AND a.RUNSTATUS in(" + runStatus + ")");
		}
		if (proDefinitionName != null && !"".equals(proDefinitionName)) {
			sb.append(" AND a.defName like '%" + proDefinitionName + "%'");
		}
		if ("true".equals(isOverdue)) {
			sb.append(" AND a.needs_time <sysdate");
		}
		sb.append(" AND a.FLOW_TYPE != 'ScBizOrderSalesFlowView'");
		if (orderBy != null && orderBy != "") {
			sb.append(" AND a." + orderBy + " is not null");
			sb.append(" ORDER BY a." + orderBy + " desc");
		}

		// sb.append(" order by a.createtime desc");
		final String sql = sb.toString();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(sql,
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						java.sql.ResultSet rs = ps.executeQuery();
						if (rs.next()) {// 至少有一条记录，才可以定位
							rs.absolute(start + 1);
							listAdd(taskLinkList, rs);
						}
						for (int i = 0; i < limit - 1; i++) {
							if (rs.next()) {
								listAdd(taskLinkList, rs);
							}
						}
						rs.close();
						ps.close();
					}
				});
				return null;
			}
		});
		return taskLinkList;
	}

	/**
	 * 获得工单的条数
	 * 
	 * @param start
	 *            开始页
	 * @param limit
	 *            结束页
	 * @param createrId
	 *            创建人(or 受理人)
	 * @param taskUserId
	 *            处理人
	 * @param busType
	 *            工单类型
	 * @param runStatus
	 *            运行状态
	 * @param isOverdue
	 *            是否过期
	 * @return List<TaskLink>
	 */
	@Override
	public int getTaskLinkListCount(final int start, final int limit,
			final String createrId, final String taskUserId,
			final String busType, final String runStatus,
			final String isOverdue, String proDefinitionName) {
		final StringBuffer sb = new StringBuffer();
		String a = ",";
		sb.append("SELECT count(distinct(FLOW_PK)) FROM ALL_NOW_TASK a WHERE 1=1");
		if (!"".equals(createrId) && createrId != null) {
			sb.append(" AND a.CREATER in (" + createrId + ")");
		}
		if (taskUserId != null) {
			String[] taskUserIds = taskUserId.split(",");
			int i = 0;
			for (String taskUser : taskUserIds) {
				if (!"".equals(taskUser) && taskUser != null) {
					if (i == 0) {
						sb.append(" AND a.task_User like '%" + taskUser + "%'");
					}
					i++;
					if (i > 1) {
						sb.append(" OR a.task_User like '%" + taskUser + "%'");
					}
				}

			}
		}
		if (busType != null && !"".equals(busType)) {
			sb.append(" AND a.bus_type = " + busType);
		}
		if (runStatus != null && !"".equals(runStatus)) {
			sb.append(" AND a.RUNSTATUS in(" + runStatus + ")");
		}
		if (proDefinitionName != null && !"".equals(proDefinitionName)) {
			sb.append(" AND a.defName like '%" + proDefinitionName + "%'");
		}
		if ("true".equals(isOverdue)) {
			sb.append(" AND a.needs_time <sysdate");
		}
		sb.append(" AND a.FLOW_TYPE != 'ScBizOrderSalesFlowView'");
		final String sql = sb.toString();
		final List<Integer> rsLength = new ArrayList<Integer>();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(sql,
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						java.sql.ResultSet rs = ps.executeQuery();
						rs.next();
						rsLength.add(rs.getInt(1));
						rs.close();
						ps.close();
					}
				});
				return null;
			}
		});
		return rsLength.get(0);
	}
	
	/**
	 * HY 
	 * 2013/12/25
	 * 查询所有运营报表数据
	 */
	public List<ReportView> getReportAll(String hLong) {
		String hql ;
		List<ReportView> agentList ;
		if(hLong.equals("All")){
			//hql = "from AgentReport a order by a.ID desc";
			hql = "from ReportView rv";
			agentList = (List<ReportView>)this.getHibernateTemplate().find(hql);
		}else{
			//hql = "from ReportView rv where rownum <= 20 order by rv.id.dates desc";
			//hql = "from ReportView rv where to_date(rv.id.dates,'YYYY-MM-DD') >= sysdate-5 order by rv.id.dates desc";
			agentList = null;
		}
		
		return agentList;
	}

	
	/**
	 * HY 
	 * 2013/12/30
	 * 按条件查询运营报表数据
	 */
	public List<ReportView> getSomeOneReport(String info) {
		String hqlString = "";
		List<ReportView> rList ;
		String str[] = info.split("#");
		String star[] = str[0].split(" ");
		String end[] = str[1].split(" ");
		System.out.println(star+"< OR >"+end);
		if(!star[0].equals("") && !end[0].equals("")){
			int a = Integer.parseInt(star[1]);
			int b = Integer.parseInt(end[1]);
			a = a*2;
			b = b*2;
			System.out.println(a+"<-->"+b);
////			hqlString = "select rv.loginname , SUM(rv.endinboundcount) , SUM(rv.inboundtime) , SUM(rv.avagecalltime) " +
////					", SUM(rv.afterworktime) , SUM(rv.avageafterworktime) , SUM(rv.kongxiantime) , rv.dates " +
////					",SUM(rv.leavetime) , SUM(rv.lsworktime) , SUM(rv.meetingtime) , SUM(rv.managertime) , SUM(rv.traintime) " +
////					",SUM(rv.liyonglv) , SUM(rv.zongliyonglv) , SUM(rv.keyonglv) , SUM(rv.unansweredcount) , SUM(rv.endinboundcountlv)" +
////					" from v_6 rv where rv.dates = '"+star[0]+"' and rv.bothtimetype >= "+a+" and rv.bothtimetype < "+b+" group by rv.loginname , rv.dates";
//
//			hqlString =  "select rv.loginname as {r.id.loginname} , SUM(rv.endinboundcount) as {r.id.endinboundcount} , SUM(rv.avagewaittime) as {r.id.avaqueuecalltime} , SUM(rv.eightsucccount) as {r.id.xmiaosucccount} , SUM(rv.inboundtime) as {r.id.inboundtime} , SUM(rv.avagecalltime) as {r.id.avagecalltime} " +
//			", SUM(rv.afterworktime) as {r.id.afterworktime} , SUM(rv.avageafterworktime) as {r.id.avageafterworktime} , SUM(rv.kongxiantime) as {r.id.kongxiantime} , rv.dates as {r.id.dates} " +
//			",SUM(rv.leavetime) as {r.id.leavetime} , SUM(rv.lsworktime) as {r.id.lsworktime} , SUM(rv.meetingtime) as {r.id.meetingtime} , SUM(rv.managertime) as {r.id.managertime} , SUM(rv.traintime) as {r.id.traintime} " +
//			",SUM(rv.liyonglv) as {r.id.liyonglv} , SUM(rv.zongliyonglv) as {r.id.zongliyonglv} , SUM(rv.keyonglv) as {r.id.keyonglv} , SUM(rv.unansweredcount) as {r.id.unansweredcount} , SUM(rv.endinboundcountlv) as {r.id.endinboundcountlv}" +
//			" from v_6 rv where rv.dates = '"+star[0]+"' and rv.bothtimetype >= "+a+" and rv.bothtimetype < "+b+" group by rv.loginname , rv.dates ";
//	
//		}else{  //  2014-04-05
			//int s = Integer.parseInt(star[0].substring(0, 4)+star[0].substring(5, 7)+star[0].substring(8, 10)+star[1]);
			String s = star[0].substring(0, 4)+star[0].substring(5, 7)+star[0].substring(8, 10)+a;
			//int e = Integer.parseInt(end[0].substring(0, 4)+end[0].substring(5, 7)+end[0].substring(8, 10)+end[1]);
			String e = end[0].substring(0, 4)+end[0].substring(5, 7)+end[0].substring(8, 10)+b;
			System.out.println("整形："+s+"---"+e);
			hqlString =  "select rv.loginname as {r.id.loginname} , SUM(rv.endinboundcount) as {r.id.endinboundcount} , SUM(rv.avagewaittime) as {r.id.avaqueuecalltime} , SUM(rv.eightsucccount) as {r.id.xmiaosucccount}, SUM(rv.queuecount) as {r.id.queuecount} , SUM(rv.inboundtime) as {r.id.inboundtime} , decode(SUM(rv.endinboundcount),0,0,round(SUM(rv.inboundtime)/SUM(rv.endinboundcount),0)) as {r.id.avagecalltime} " +
			", SUM(rv.afterworktime) as {r.id.afterworktime} , decode(SUM(rv.endinboundcount),0,0,round(SUM(rv.afterworktime)/SUM(rv.endinboundcount),0)) as {r.id.avageafterworktime} , SUM(rv.kongxiantime) as {r.id.kongxiantime} " +
			",SUM(rv.leavetime) as {r.id.leavetime} , SUM(rv.lsworktime) as {r.id.lsworktime} , SUM(rv.meetingtime) as {r.id.meetingtime} , SUM(rv.managertime) as {r.id.managertime} , SUM(rv.traintime) as {r.id.traintime} , SUM(rv.nologintime) as {r.id.nologintime} " +
			",AVG(rv.liyonglv) as {r.id.liyonglv} , AVG(rv.zongliyonglv) as {r.id.zongliyonglv} , AVG(rv.keyonglv) as {r.id.keyonglv} , SUM(rv.unansweredcount) as {r.id.unansweredcount} , SUM(rv.endinboundcountlv) as {r.id.endinboundcountlv}" +
			" from v_6 rv where rv.numberss >= '"+s+"' and rv.numberss < '"+e+"' group by rv.loginname";
			
			rList = getSession().createSQLQuery(hqlString).addEntity("r", ReportView.class).list();
		}else {
			rList = null;
		}
		 
		
		//List rList = s.list();
		return rList;
	}
	
	/**
	 * HY 
	 * 2014/1/20
	 * 查询所有系统日报表数据
	 */
	public List<EveryDayReport> getEveryDayReport(String hLong){
		System.out.println("getEveryDayReport  DAOIMPL ---------- ");
		String hql ;
		if(hLong.equals("All")){
			hql = "from EveryDayReport ede order by ede.id.dates desc";
		}else{
			hql = "from EveryDayReport ede where ede.id.dates = to_char(sysdate,'YYYY-MM-DD') order by ede.id.dates desc";
		}
		System.out.println("getEveryDayReport -> SQL :------------>"+hql);
		List<EveryDayReport> eveRports = (List<EveryDayReport>)this.getHibernateTemplate().find(hql);
		System.out.println("list --- "+eveRports);
		return eveRports;
	}
	/**
	 * HY 
	 * 2014/1/20
	 * 按日期条件查询系统日报表数据
	 */
	public List<EveryDayReport> getEveryDayReportByDay(String info){
		String hql = "from EveryDayReport ede where ede.id.dates = '"+info+"'";
		String str[] = info.split("#");
		String star[] = str[0].split(" ");
		String end[] = str[1].split(" ");
		if(star[0].equals(end[0])){
			int a = Integer.parseInt(star[1]);
			int b = Integer.parseInt(end[1]);
			a = a*2;
			b = b*2;
			System.out.println(a+"-"+b);
			hql = "from EveryDayReport ede where ede.id.dates = '"+star[0]+"' and ede.id.datetimeType >= "+a+" and ede.id.datetimeType < "+b+"";
		}
		List<EveryDayReport> eveRports = (List<EveryDayReport>)this.getHibernateTemplate().find(hql);
		System.out.println("list --- "+eveRports);
		return eveRports;
	}
}
