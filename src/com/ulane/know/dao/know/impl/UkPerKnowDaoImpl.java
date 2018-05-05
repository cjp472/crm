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
import java.util.Date;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.ContextUtil;
import com.ulane.know.dao.know.UkPerKnowDao;
import com.ulane.know.model.know.UkPerKnow;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkPerKnowDaoImpl extends BaseDaoImpl<UkPerKnow> implements UkPerKnowDao{
	Logger log = LoggerFactory.getLogger(UkPerKnowDaoImpl.class);
	public UkPerKnowDaoImpl() {
		super(UkPerKnow.class);
	}

	/**
	 * 别人推荐的 和别人推荐的     (1:我推荐的 2:别人推荐的) 
	 * 根据知识名称和知识关键字 和知识状态查找我推荐的知识
	 * @author ricoh.lin@gmail.com
	 * @createtime 2012年6月19日 15:40:18
	 * @param String title, String keyWordName,String knowTypeName
	 */
	@Override
	public List<UkPerKnow> tuiJianList(String title, String keyWordName,String knowTypeName,Long tuijian) {
		StringBuffer sb = new StringBuffer();
		sb.append("select * from uk_per_know p where p.know_id in ( ");
		sb.append("select s.know_Id  from Uk_Sys_Know s where  1=1"); 
//				+"s.know_Id in( ");
//		sb.append("select kk.know_id from uk_know_keyword_know kk where kk.keyword_id in( ");
//		sb.append("select w.keyword_id from uk_know_keyword w ");
		if(keyWordName != null && keyWordName != ""){
			sb.append("where s.KNOW_KEYWORDS '%"+keyWordName+"%'");
		}
//		sb.append("))");
		sb.append(" and s.know_id in(");
		sb.append("select ktk.know_id from uk_know_type_know ktk where ktk.know_type_id in( ");
		sb.append("select t.know_type_id from uk_know_type t ");
		if(knowTypeName != null && knowTypeName != ""){
			sb.append("where t.name like '%"+knowTypeName+"%'");
		}
		sb.append("))");
		sb.append("and s.sys_know_status=5");
		if(title != null && title != ""){
			sb.append("and s.TI_TLE like '%"+title+"%'");
		}
		sb.append(")");
		if(tuijian == 1){
			sb.append(" and p.REFEREE = "+ContextUtil.getCurrentUserId().toString());
		}else if(tuijian == 2){
			sb.append(" and p.USERID = "+ContextUtil.getCurrentUserId().toString());
		}
		sb.append(" and p.OPERATE_TYPE = "+UkPerKnow.TUIJIAN);
		
		
		final String sql= sb.toString();
		List<BigDecimal> idList =  (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql);
				return query.list();
			}
		});
		StringBuffer hql= new StringBuffer("from UkSysKnow s");
		if(idList.size()>0){
			hql.append(" where");
			String ids = "";
			for(BigDecimal id :idList){
				for(int i=0;i<idList.size();i++){
					if(i>0){
						ids+=",";
					}
					ids+=id;
				}
				hql.append(" s.knowId in (");
				hql.append(ids);
				hql.append(")");
			}
			hql.append(" order by s.knowId desc");
		
		}else{
			hql.append(" where s.knowId = -1");
		}
		return findByHql(hql.toString());
	}
	
	/**
	 * 根据知识分类找我的推荐
	 * @author Zhangyl
	 * @createtime 2012年6月20日 16:18:56
	 * @param typeId
	 * @return
	 */
	public List<UkPerKnow> findPerKnowByType(String typeId){
		final String sql = "select p.per_know_id from uk_per_know p,uk_know_type_know t where p.know_id=t.know_id and t.know_type_id in("+typeId+")";
		List<BigDecimal> idList =  (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createSQLQuery(sql);
				return query.list();
			}
		});
		StringBuffer hql= new StringBuffer("from UkPerKnow p");
		if(idList.size()>0){
			hql.append(" where");
			String ids = "";
			for(BigDecimal id :idList){
				for(int i=0;i<idList.size();i++){
					if(i>0){
						ids+=",";
					}
					ids+=id;
				}
				hql.append(" p.perKnowId in (");
				hql.append(ids);
				hql.append(")");
			}
			hql.append(" order by p.perKnowId desc");
		
		}else{
			hql.append(" where p.perKnowId = -1");
		}
		return findByHql(hql.toString());
	}
	
	/**
	 * 别人推荐的 和别人推荐的 (1:我推荐的 2:别人推荐的) 
	 * 根据知识关键字和(推荐人或被推荐人)和知识推荐时间或接收时间查推荐的知识
	 * @author gst
	 * @createtime 
	 * @param String keyWordName, String recommender, String receiver, String startTime, String endTime
	 */
	@Override
	public List<UkPerKnow> tuiJianList(final int start,final int limit,String keyWordName, String recommender,
			String receiver, String startTime, String endTime, Long tuijian) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("select * from uk_per_know p where p.know_id in ( ");
		sb.append("select s.know_Id  from Uk_Sys_Know s where 1=1"); 
//				+
//				"s.know_Id in( ");
//		sb.append("select kk.know_id from uk_know_keyword_know kk where kk.keyword_id in( ");
//		sb.append("select w.keyword_id from uk_know_keyword w ");
		if(keyWordName != null && !keyWordName.equals("")){
//			sb.append("where w.key_word like '%"+keyWordName+"%'");
			sb.append("where s.KNOW_KEYWORDS like '%"+keyWordName+"%'");
		}
//		sb.append("))");
		sb.append("and s.sys_know_status=5");
		sb.append(")");
		
		//我推荐的
		if(tuijian == 1){
			sb.append(" and p.REFEREE = "+ContextUtil.getCurrentUserId().toString());
			if (receiver != null && !receiver.equals("")){
				sb.append("and p.USERID in (select apu.userid from app_user apu where apu.fullname like '%" + receiver);
				sb.append("%')");
			}
		}else if(tuijian == 2){
			sb.append(" and p.USERID = "+ContextUtil.getCurrentUserId().toString());
			if (recommender != null && !recommender.equals("")){
				sb.append("and p.REFEREE in (select apu.userid from app_user apu where apu.fullname like '%" + recommender);
				sb.append("%')");
			}
		}
		
		if (startTime != null && !startTime.equals("")){
			if (tuijian == 1){
				sb.append(" and p.OPERATE_TIME>TO_CHAR(TO_DATE('" + startTime + "','yyyy-MM-dd hh:mi:ss'), 'DD-Mon-YY HH24.MI.SS.SSSSS AM')");
			}else if(tuijian == 2){
				sb.append(" and p.OPERATE_TIME>TO_CHAR(TO_DATE('" + startTime + "','yyyy-MM-dd hh:mi:ss'), 'DD-Mon-YY HH24.MI.SS.SSSSS AM')");
			}
		}
		
		if (endTime != null && !endTime.equals("")){
			if (tuijian == 1){
				sb.append(" and p.OPERATE_TIME<TO_CHAR(TO_DATE('" + endTime + "','yyyy-MM-dd hh:mi:ss'), 'DD-Mon-YY HH24.MI.SS.SSSSS AM')");
			}else if(tuijian == 2){
				sb.append(" and p.OPERATE_TIME<TO_CHAR(TO_DATE('" + endTime + "','yyyy-MM-dd hh:mi:ss'), 'DD-Mon-YY HH24.MI.SS.SSSSS AM')");
			}
		}
		sb.append(" and p.OPERATE_TYPE = "+UkPerKnow.TUIJIAN);
		logger.error("tuiJianList()：sqld===" + sb.toString());
//		System.out.println(sb.toString());
		final String sql= sb.toString();
		final List<BigDecimal> idList = new ArrayList<BigDecimal>();
		
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {			//原生SQL查询不出知识相关对象及SET集合
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(sql,
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						java.sql.ResultSet rs = ps.executeQuery();
						if (rs.next()) {// 至少有一条记录，才可以定位
							rs.absolute(start+1);
							idList.add(rs.getBigDecimal("KNOW_ID"));
						}
						for (int i = 0; i <= limit; i++) {
							if (rs.next()) {
								idList.add(rs.getBigDecimal("KNOW_ID"));
							}
						}
					}
				});
				return idList;
			}
		});
		
		StringBuffer hql= new StringBuffer("from UkPerKnow s");
		if(idList.size()>0){
			hql.append(" where");
			String ids = "";
			int i = 0;
			
			for(BigDecimal id :idList){
				if(0<i && i<idList.size()){
					ids+=",";
				}
				ids+=id;
				i++;
//				for(int i=0;i<idList.size();i++){
//					if(i>0){
//						ids+=",";
//					}
//					ids+=id;
//				}
			}
			hql.append(" s.ukSysKnow.knowId in (");
			hql.append(ids);
			hql.append(")");
			
			hql.append(" order by s.operateTime desc");
		
		}else{
			hql.append(" where s.perKnowId = -1");
		}
		return findByHql(hql.toString());
	}

	@Override
	public int queryPerKnowCount(int start, int limit, String keyWordName,
			String recommender, String receiver, String startTime,
			String endTime,Long tuijian) {
		// TODO Auto-generated method stub
		final List<Integer> knowList = new ArrayList<Integer>();
		StringBuffer sb = new StringBuffer();
//		sb.append("select count(distinct(s.know_Id)) from Uk_Per_Know s");
		sb.append("select count(distinct(p.know_id)) from uk_per_know p where p.know_id in ( ");
		sb.append("select s.know_Id  from Uk_Sys_Know s where 1=1" );
//				+
//				"s.know_Id in( ");
//		sb.append("select kk.know_id from uk_know_keyword_know kk where kk.keyword_id in( ");
//		sb.append("select w.keyword_id from uk_know_keyword w ");
		if(keyWordName != null && !keyWordName.equals("")){
//			sb.append("where w.key_word like '%"+keyWordName+"%'");
			sb.append("where s.KNOW_KEYWORDS like '%"+keyWordName+"%'");
		}
//		sb.append("))");
		sb.append("and s.sys_know_status=5");
		sb.append(")");
		
		//我推荐的
		if(tuijian == 1){
			sb.append(" and p.REFEREE = "+ContextUtil.getCurrentUserId().toString());
			if (receiver != null && !receiver.equals("")){
				sb.append("and p.USERID in (select apu.userid from app_user apu where apu.fullname like '%" + receiver);
				sb.append("%')");
			}
		}else if(tuijian == 2){
			sb.append(" and p.USERID = "+ContextUtil.getCurrentUserId().toString());
			if (recommender != null && !recommender.equals("")){
				sb.append("and p.REFEREE in (select apu.userid from app_user apu where apu.fullname like '%" + recommender);
				sb.append("%')");
			}
		}
		
		if (startTime != null && !startTime.equals("")){
			if (tuijian == 1){
				sb.append(" and p.OPERATE_TIME>TO_CHAR(TO_DATE('" + startTime + "','yyyy-MM-dd hh:mi:ss'), 'DD-Mon-YY HH24.MI.SS.SSSSS AM')");
			}else if(tuijian == 2){
				sb.append(" and p.OPERATE_TIME>TO_CHAR(TO_DATE('" + startTime + "','yyyy-MM-dd hh:mi:ss'), 'DD-Mon-YY HH24.MI.SS.SSSSS AM')");
			}
		}
		
		if (endTime != null && !endTime.equals("")){
			if (tuijian == 1){
				sb.append(" and p.OPERATE_TIME<TO_CHAR(TO_DATE('" + endTime + "','yyyy-MM-dd hh:mi:ss'), 'DD-Mon-YY HH24.MI.SS.SSSSS AM')");
			}else if(tuijian == 2){
				sb.append(" and p.OPERATE_TIME<TO_CHAR(TO_DATE('" + endTime + "','yyyy-MM-dd hh:mi:ss'), 'DD-Mon-YY HH24.MI.SS.SSSSS AM')");
			}
		}
		sb.append(" and p.OPERATE_TYPE = "+UkPerKnow.TUIJIAN);
//		System.out.println(sb.toString() + "==查询条数");
		logger.error("查询条数：sql===" + sb.toString());
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

}