package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.model.TaskLink;
import com.htsoft.core.util.ContextUtil;
import com.ulane.know.dao.know.UkKnowTemplateDao;
import com.ulane.know.dao.know.UkKnowTypeDao;
import com.ulane.know.model.know.UkKnowType;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkKnowTypeDaoImpl extends BaseDaoImpl<UkKnowType> implements UkKnowTypeDao{

	@Resource
	private UkKnowTemplateDao ukKnowTemplateDao;
	public UkKnowTypeDaoImpl() {
		super(UkKnowType.class);
	}

	@Override
	public List<UkKnowType> findByParentId(Long parentId) {
		final String hql = "from UkKnowType d where d.knowTypeStatus = 1 and d.parentId=?";
//		final String hql = "from UkKnowType d where d.knowTypeStatus = 1 and d.parentId=?";
        Object[] params = { parentId };
        return findByHql(hql, params);
	}
	
	
	public List<UkKnowType> typeListAdd(List<UkKnowType> ukKnowTypeList,ResultSet rs) throws SQLException{
		UkKnowType ukKnowType = new UkKnowType();
		ukKnowType.setKnowTypeId(rs.getLong("KNOW_TYPE_ID"));
		ukKnowType.setName(rs.getString("NAME"));
		ukKnowType.setComMent(rs.getString("COM_MENT"));
		ukKnowType.setParentId(rs.getLong("PARENT_ID"));
		ukKnowType.setUpdateTime(rs.getDate("UPDATE_TIME"));
		ukKnowType.setPath(rs.getString("PATH"));
		ukKnowType.setKnowTypeStatus(rs.getInt("KNOW_TYPE_STATUS"));
		ukKnowType.setKnowSort(rs.getInt("KNOW_SORT"));
		ukKnowType.setCreateBy(rs.getLong("CREATE_BY"));
		ukKnowType.setUpdateBy(rs.getLong("UPDATE_BY"));
		ukKnowType.setCreateDate(rs.getTimestamp("CREATE_DATE"));
		ukKnowType.setUpdateDate(rs.getTimestamp("CREATE_DATE"));
		Long tempId = rs.getLong("KNOW_TMP_ID");
		if(tempId!=null){
			ukKnowType.setUkKnowTemplate(ukKnowTemplateDao.get(tempId));
		}
		ukKnowType.setAccessPurview(rs.getLong("ACCESS_PURVIEW"));
		ukKnowType.setGrantAccess(rs.getLong("GRANT_ACCESS"));
		String parentName = rs.getString("TNAME");
		if(parentName != null){
			ukKnowType.setParentName(parentName);	
		}else{
			ukKnowType.setParentName("知识类别");
		}
		ukKnowTypeList.add(ukKnowType);
		return ukKnowTypeList;
	}
	
	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序
	 * @param path
	 * @return
	 */
	@Override
	public List<UkKnowType> findByParentIdForSql(final int start,final int limit,String path) {
		final List<UkKnowType> ukKnowTypeList = new ArrayList<UkKnowType>();
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct(c.know_type_id),c.* from (");
		sb.append("select a.*, b.name as tname from Uk_know_type a left join Uk_know_type b on a.parent_id = b.know_type_id ");
		sb.append(") c");
		sb.append(" where path like '%"+path+"%'");
//		sb.append(" and KNOW_TYPE_STATUS = 1");
		sb.append(" order by tname");
		final String sql = sb.toString();
//		final List<BigDecimal> idList = new ArrayList<BigDecimal>();
		getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						session.doWork(new Work() {											//原生SQL查询不出知识相关对象及SET集合
							@Override
							public void execute(Connection con) throws SQLException {
								PreparedStatement ps = con.prepareStatement(sql,
										ResultSet.TYPE_SCROLL_SENSITIVE,
										ResultSet.CONCUR_UPDATABLE);
								java.sql.ResultSet rs = ps.executeQuery();
								if (rs.next()) {// 至少有一条记录，才可以定位
									rs.absolute(start+1);
//									idList.add(rs.getBigDecimal("know_type_id"));
									typeListAdd(ukKnowTypeList,rs);
								}
								for (int i = 0; i < limit-1; i++) {
									if (rs.next()) {
//										idList.add(rs.getBigDecimal("know_type_id"));
										typeListAdd(ukKnowTypeList,rs);
									}
								}
							}
						});
						return null;
					}
				});
		return ukKnowTypeList;
//		StringBuffer hql = new StringBuffer("from UkKnowType s");
//		if (idList.size() > 0) {
//			hql.append(" where");
//			String ids = "";
//			StringBuffer strBuffer = new StringBuffer();
//			for (BigDecimal id : idList) {
//				strBuffer.append(id);
//				strBuffer.append(",");
//			}
//			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
//			hql.append(" s.knowTypeId in (");
//			hql.append(ids);
//			hql.append(")");
//		} else {
//			hql.append(" where s.knowTypeId = -1");
//		}
//		return findByHql(hql.toString());
	}
	
	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序(获得数量)
	 * @param path
	 * @return
	 */
	@Override
	public int findByParentIdForSqlCount(final int start,final int limit,String path) {
		final List<Integer> knowList = new ArrayList<Integer>();
		StringBuffer sb = new StringBuffer();
		sb.append("select count(distinct(c.know_type_id)) from (");
		sb.append("select a.*, b.name as tname from Uk_know_type a left join Uk_know_type b on a.parent_id = b.know_type_id ");
		sb.append(") c");
		sb.append(" where path like '"+path+"%'");
//		sb.append(" and KNOW_TYPE_STATUS = 1");
		sb.append(" order by tname");
		final String sql = sb.toString();
		getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						session.doWork(new Work() {											//原生SQL查询不出知识相关对象及SET集合
							@Override
							public void execute(Connection con) throws SQLException {
								PreparedStatement ps = con.prepareStatement(sql,
										ResultSet.TYPE_SCROLL_SENSITIVE,
										ResultSet.CONCUR_UPDATABLE);
								java.sql.ResultSet rs = ps.executeQuery();
								rs.next();
								knowList.add(rs.getInt(1));
								
								rs.close();
								ps.close();
							}
						});
						return null;
					}
				});
		return knowList.get(0);
	}
	
	
	/**
	 * 查找树,根据权限
	 * @param parentId
	 * @return
	 */
	@Override
	public List<UkKnowType> findByParentIdForRole(Long parentId) {
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct(t.know_type_id) from uk_know_type t ");
		sb.append("left join uk_know_type_role r ");
		sb.append("on t.know_type_id = r.know_type_id ");
		sb.append("where t.parent_id = "+parentId+" and t.know_type_status=1 and t.grant_access =1  or t.know_type_id in(select tr.know_type_id from user_role r ");
		sb.append("left join uk_know_type_role tr ");
		sb.append("on r.roleid = tr.roleid ");
		sb.append("left join uk_know_type kt ");
		sb.append("on kt.know_type_id = tr.know_type_id ");
		sb.append("where r.userid = "+ContextUtil.getCurrentUserId()+" and kt.parent_id="+parentId+" and kt.know_type_status=1 and t.ACCESS_PURVIEW != 3 )");
		final String sql = sb.toString();
		final List<BigDecimal> idList = new ArrayList<BigDecimal>();
		getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session) 
							throws HibernateException, SQLException {
						session.doWork(new Work() {											//原生SQL查询不出知识相关对象及SET集合
							@Override
							public void execute(Connection con) throws SQLException {
								PreparedStatement ps = con.prepareStatement(sql,
										ResultSet.TYPE_SCROLL_SENSITIVE,
										ResultSet.CONCUR_UPDATABLE);
								java.sql.ResultSet rs = ps.executeQuery();
								while(rs.next()) {// 至少有一条记录，才可以定位
									idList.add(rs.getBigDecimal("know_type_id"));
								}
							}
						});
						return idList;
					}
				});
		StringBuffer hql = new StringBuffer("from UkKnowType d");
		if (idList.size() > 0) {
			hql.append(" where");
			String ids = "";
			StringBuffer strBuffer = new StringBuffer();
			for (BigDecimal id : idList) {
				strBuffer.append(id);
				strBuffer.append(",");
			}
			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
			hql.append(" d.knowTypeId in (");
			hql.append(ids);
			hql.append(")");
		}else {
			hql.append(" where d.knowTypeId = -1");
		}
		return findByHql(hql.toString());
	}
	
	/**
	 * 查找采集权限树,根据权限
	 * @param parentId
	 * @return
	 */
	@Override
	public List<UkKnowType> collectFindByParentIdForRole(Long parentId) {
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct(t.know_type_id) from uk_know_type t ");
		sb.append("left join uk_know_type_role r ");
		sb.append("on t.know_type_id = r.know_type_id ");
		sb.append("where t.parent_id = "+parentId+" and t.know_type_status=1 and t.grant_access =1 or t.know_type_id in(select tr.know_type_id from user_role r ");
		sb.append("left join uk_know_type_role tr ");
		sb.append("on r.roleid = tr.roleid ");
		sb.append("left join uk_know_type kt ");
		sb.append("on kt.know_type_id = tr.know_type_id ");
		sb.append("where r.userid = "+ContextUtil.getCurrentUserId()+" and kt.parent_id="+parentId+" and kt.know_type_status=1 and t.ACCESS_PURVIEW = 2 )");
		final String sql = sb.toString();
		final List<BigDecimal> idList = new ArrayList<BigDecimal>();
		getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session) 
							throws HibernateException, SQLException {
						session.doWork(new Work() {											//原生SQL查询不出知识相关对象及SET集合
							@Override
							public void execute(Connection con) throws SQLException {
								PreparedStatement ps = con.prepareStatement(sql,
										ResultSet.TYPE_SCROLL_SENSITIVE,
										ResultSet.CONCUR_UPDATABLE);
								java.sql.ResultSet rs = ps.executeQuery();
								while(rs.next()) {// 至少有一条记录，才可以定位
									idList.add(rs.getBigDecimal("know_type_id"));
								}
							}
						});
						return idList;
					}
				});
		StringBuffer hql = new StringBuffer("from UkKnowType d");
		if (idList.size() > 0) {
			hql.append(" where");
			String ids = "";
			StringBuffer strBuffer = new StringBuffer();
			for (BigDecimal id : idList) {
				strBuffer.append(id);
				strBuffer.append(",");
			}
			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
			hql.append(" d.knowTypeId in (");
			hql.append(ids);
			hql.append(")");
		}else {
			hql.append(" where d.knowTypeId = -1");
		}
		return findByHql(hql.toString());
	}
	
	@Override
	public List findKnowTypeKnowid(String knowTypeIds) {
		final String sql = " select distinct u.know_id from uk_know_type_know u where u.know_type_id in ( " + knowTypeIds +" )";
		
		return  (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql);
				return query.list();
			}
		});
	}

}