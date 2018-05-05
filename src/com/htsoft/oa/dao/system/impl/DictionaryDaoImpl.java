package com.htsoft.oa.dao.system.impl;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.DictionaryDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Dictionary;

public class DictionaryDaoImpl extends BaseDaoImpl<Dictionary> implements
		DictionaryDao {

	public DictionaryDaoImpl() {
		super(Dictionary.class);
	}

	@Override
	public List<String> getAllItems() {
		final String hql = "select itemName from Dictionary group by itemName";
		return (List<String>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						return query.list();
					}
				});
	}
	@Override
	public List<String> getAllMap() {
		final String hql = "select mapName from Dictionary group by mapName";
		return (List<String>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						return query.list();
					}
				});
	}
	@Override
	public List<String> getAllByItemName(final String itemName) {
		final String hql = "select itemValue from Dictionary where itemName=?";
		return (List<String>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						query.setString(0, itemName);
						return query.list();
					}
				});
	}

	@Override
	public List<Dictionary> getByItemName(final String itemName) {
		final String hql = " from Dictionary where itemName=? order by dicId asc";
		return (List<Dictionary>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						query.setString(0, itemName);
						return query.list();
					}
				});
	}
	
	/**
	 * 根据proTypeId去查找
	 * @param proTypeId
	 * @return
	 */
	@Override
	public List<Dictionary> getByProTypeId(final Long proTypeId) {
		final String hql = " from Dictionary where proTypeId=?";
		return (List<Dictionary>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						query.setLong(0, proTypeId);
						return query.list();
					}
				});
	}
	@Override
	public List<Dictionary> getByMapName(final String mapName) {
		final String hql = " from Dictionary where mapName=?";
		return (List<Dictionary>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						query.setString(0, mapName);
						return query.list();
					}
				});
	}
	@Override
	public List<String>  getByItemNameAndItemValue(final String itemName, final String itemIndex) {
		final String hql = "select itemValue from Dictionary where itemName=? and itemIndex=?";
		return (List<String>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						query.setString(0, itemName);
						query.setString(1, itemIndex);
						return query.list();
					}
				});
	}
	/* (non-Javadoc)
	 * 新增通过mapName和itemIndex数组查询数据字典
	 * @author wangzhongjin
	 * @see com.htsoft.oa.dao.system.DictionaryDao#getByMapNameAndItemIndex(java.lang.String, java.lang.String[])
	 */
	@Override
	public List<Dictionary> getByMapNameAndItemIndex(final String mapName, final String[] itemIndex) {
		String hql = "from Dictionary where mapName=? and (";
		int i=0;
		for(String s:itemIndex){
			if(i>0)hql+=" or ";
			hql+=" itemIndex="+s;
			i++;
		}
		hql+=")";
		final String hsql=hql;
		return (List<Dictionary>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hsql);
						query.setString(0, mapName);
						return query.list();
					}
				});
	}

	@Override
	public List<Dictionary> getByParentDicId(Long parentId) {
		String hql = "from Dictionary where relDic="+parentId;
		return findByHql(hql);
	}

	/**
	 * 获取职务的根节点
	 * @param itemName
	 * @return
	 */
	@Override
	public List<Dictionary>  getZwRoot(final String itemName) {
		final String hql = "from Dictionary where mapName=? and relDic is null";
		return (List<Dictionary>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						query.setString(0, itemName);
						return query.list();
					}
				});
	}


}