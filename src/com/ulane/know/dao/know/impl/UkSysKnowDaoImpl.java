package com.ulane.know.dao.know.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.io.File;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import org.apache.lucene.queryParser.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.service.system.DictionaryService;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.know.dao.know.UkKnowApproveDao;
import com.ulane.know.dao.know.UkKnowTemplateDao;
import com.ulane.know.dao.know.UkSysKnowDao;
import com.ulane.know.model.know.UkSysKnow;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

@SuppressWarnings("unchecked")
public class UkSysKnowDaoImpl extends BaseDaoImpl<UkSysKnow> implements
		UkSysKnowDao {
	Logger log = LoggerFactory.getLogger(UkSysKnowDaoImpl.class);

	@Resource 
	private UkKnowTemplateDao ukKnowTemplateDao;
	@Resource
	private UkKnowApproveDao ukKnowApproveDao; 
	@Resource
	private AppUserDao appUserDao;
	@Resource
	private DictionaryService dictionaryService;
	
	public UkSysKnowDaoImpl() {
		super(UkSysKnow.class);
	}

	@Override
	public List<UkSysKnow> findDianPing() {
		String hql = "from UkSysKnow  d where  d.knowId in ((select count(b.ukSysKnow.knowId) from "
				+ " UkSysKnow a,UkKnowDianping b where a.knowId=b.ukSysKnow.knowId group by b.ukSysKnow.knowId )) and d.isDel = 'false' desc";
		return findByHql(hql);
	}

	@Override
	public List<UkSysKnow> findByStatus(int status) {
		String hql = "from UkSysKnow d where d.sysKnowStatus = " + status
				+ " and d.isDel = 'false' order by d.knowId desc";
		return findByHql(hql);
	}

	@Override
	public List<UkSysKnow> findInStatus(String status) { 
		String hql = "from UkSysKnow d where d.sysKnowStatus in(" + status
				+ ") and d.isDel = 'false' order by d.createDate desc";
		return findByHql(hql);
	}
	
	@Override
	public List<UkSysKnow> findByStatusAndId(int status, long knowApproveId) {
		String hql = "from UkSysKnow d where d.ukKnowApprove.knowApproveId ="
				+ knowApproveId + " and d.sysKnowStatus = " + status
				+ " and d.isDel = 'false' order by d.knowId desc";
		return findByHql(hql);
	}

	@Override
	public List<UkSysKnow> findByApproveId(long knowApproveId) {
		String hql = "from UkSysKnow d where d.ukKnowApprove.knowApproveId ="
				+ knowApproveId + " and d.isDel = 'false' order by d.knowId desc";
		return findByHql(hql);
	}

	/**
	 *  过期知识
	 *  @param keyWordName 关键字名称
	 *  @param knowTypeName 知识类型名称
	 *  @param minPastTime	开始时间
	 *  @param maxPastTime 结束时间
	 */
	public List<UkSysKnow> expiredKnow(String keyWordName, String knowTypeName,
			String minPastTime, String maxPastTime,String title) {
		StringBuffer sb = new StringBuffer();
		sb.append("select s.know_Id  from Uk_Sys_Know s where s.know_Id in( ");
		sb.append("select kk.know_id from uk_know_keyword_know kk where ");
//				+"kk.keyword_id in( ");
//		sb.append("select w.keyword_id from uk_know_keyword w ");
		if (keyWordName != null && keyWordName != "") {
//			sb.append("where w.key_word like '%" + keyWordName + "%'");
			sb.append("where kk.KNOW_KEYWORDS like '%" + keyWordName + "%'");
		}
//		sb.append("))");
		sb.append(" and s.know_id in(");
		sb.append("select ktk.know_id from uk_know_type_know ktk where ktk.know_type_id in( ");
		sb.append("select t.know_type_id from uk_know_type t ");
		if (knowTypeName != null && knowTypeName != "") {
			sb.append("where t.name like '%" + knowTypeName + "%'");
		}
		sb.append("))");
		sb.append(" and s.sys_know_status=5");
		if (minPastTime != null && minPastTime != "" && maxPastTime != null
				&& maxPastTime != "") {
			sb.append(" and s.past_time <= sysdate");
		}
		if (minPastTime != null && minPastTime != "") {
			sb.append(" and s.past_time>=to_date('");
			sb.append(minPastTime);
			sb.append("','yyyy-mm-dd')");
		}
		if (maxPastTime != null && maxPastTime != "") {
			sb.append(" and s.past_time<=to_date('");
			sb.append(maxPastTime);
			sb.append("','yyyy-mm-dd')");
		}
		if(title != null && title != ""){
			sb.append(" and s.TI_TLE like '%"+title+"%'");
		}
		sb.append(" and s.IS_DEL='false'");
		sb.append(" and s.know_id in (select distinct(kr.know_id) from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid where ur.userid = " + ContextUtil.getCurrentUserId()+")");
		final String sql = sb.toString();
		List<BigDecimal> idList = (List) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createSQLQuery(sql);
						return query.list();
					}
				});
		StringBuffer hql = new StringBuffer("from UkSysKnow s");
		if (idList.size() > 0) {
			hql.append(" where");
			String ids = "";
			StringBuffer strBuffer = new StringBuffer();
			for (BigDecimal id : idList) {
				strBuffer.append(id);
				strBuffer.append(",");
			}
			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
			hql.append(" s.knowId in (");
			hql.append(ids);
			hql.append(")");
			hql.append(" order by s.knowId desc");

		} else {
			hql.append(" where s.knowId = -1");
		}
		return findByHql(hql.toString());
	}

	/**
	 * @methodName 知识全文搜索(*用于知识搜索*)
	 * @param searchContent
	 *            搜索内容
	 * @param pb
	 *            分页
	 * @param uploadPath
	 *            索引路径
	 * @param old
	 *            是否过期
	 * @param drop
	 *            是否废弃
	 * @return List<UkSysKnow>
	 * @author zhangyl
	 * @createtime 2012年6月29日 16:49:04
	 */
	@Override
	public List<UkSysKnow> findBySearch(String searchContent, PagingBean pb,
			String uploadPath, String old, String drop) {
		List<String> ls = new ArrayList<String>();
		File indexDir = new File(uploadPath);
		try {
			Analyzer analyzer = new StandardAnalyzer(Version.LUCENE_36);
			Directory directory = FSDirectory.open(indexDir, null);
			// 简单索引
			IndexSearcher searcher = new IndexSearcher(directory);
			String[] fields = { "contents" };
			QueryParser qp = new MultiFieldQueryParser(Version.LUCENE_36,
					fields, analyzer);
			org.apache.lucene.search.Query query = qp.parse(searchContent);
			// 获得得分靠前的100个匹配记录
			ScoreDoc[] docs = searcher.search(query, 100).scoreDocs;
			for (int i = 0; i < docs.length; i++) {
				String path = searcher.doc(docs[i].doc).get("path");
				path = path.substring(path.lastIndexOf("\\") + 1);
				ls.add(path);
			}
		} catch (Exception e) {
			System.out.println(e);
//			e.printStackTrace();
		}

		final StringBuffer sql = new StringBuffer();
		sql.append("select k.know_id from  uk_sys_know k where (k.know_id in(");
		sql.append(" select distinct ka.KNOW_ID from uk_know_attach ka where FILEID in (select distinct fa.fileId from file_attach fa where fa.fileName like '%"
				+ searchContent + "%'");
		for (String s : ls) {
			sql.append(" or fa.FILEPATH like '%").append(s).append("'");
		}
		sql.append(")");
		sql.append(")");
//		sql.append(" or k.know_id in( select kk.know_id from uk_know_keyword_know kk where kk.keyword_id in( select w.keyword_id from uk_know_keyword w where w.key_word like '%"
//				+ searchContent + "%' ))");
		sql.append(" or k.KNOW_KEYWORDS like '%" +searchContent + "%'");
		sql.append(" or k.ti_tle like '%" + searchContent + "%' ");
		sql.append(" or k.SYS_KNOW_COMMENT like '%" + searchContent + "%'");
		sql.append(" or k.plus1 like '%" + searchContent + "%'");
		sql.append(" or k.plus2 like '%" + searchContent + "%'");
		sql.append(" or k.plus3 like '%" + searchContent + "%'");
		sql.append(" or k.plus4 like '%" + searchContent + "%'");
		sql.append(" or k.plus5 like '%" + searchContent + "%'");
		sql.append(" or k.plus6 like '%" + searchContent + "%'");
		sql.append(" or k.plus7 like '%" + searchContent + "%'");
		sql.append(" or k.plus8 like '%" + searchContent + "%')");
		if (!"on".equals(old) && !"on".equals(drop)) {
//			sql.append(" and k.sys_know_status=5");
		} else {
			if ("on".equals(old)) { // 过期
				sql.append(" and k.past_time <sysdate");
			}
			if ("on".equals(drop)) { // 作废
				sql.append(" and k.sys_know_status = 6");
			}

		}
		sql.append(" and k.sys_know_status=5");
		sql.append(" and k.IS_DEL='false'");
		List<BigDecimal> idList = (List) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createSQLQuery(sql.toString());
						return query.list();
					}
				});

		StringBuffer hql = new StringBuffer("from UkSysKnow s");
		if (idList.size() > 0) {
			hql.append(" where");
			String ids = "";
			StringBuffer strBuffer = new StringBuffer();
			for (BigDecimal id : idList) {
				strBuffer.append(id);
				strBuffer.append(",");
			}
			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
			hql.append(" s.knowId in (");
			hql.append(ids);
			hql.append(")");
			hql.append(" order by s.knowId desc");

		} else {
//			if (!"".equals(searchContent)) {
				hql.append(" where s.knowId = -1");
//			}
		}

		return findByHql(hql.toString(), null, pb);
	}

	/**
	 * @methodName 根据标题,业务类型,关键字,是否过期,是否作废查询(*用于知识搜索*)
	 * @param searchContent
	 *            搜索内容
	 * @param pb
	 *            分页
	 * @param title
	 *            标题
	 * @param type
	 *            业务类型
	 * @param keyword
	 *            关键字
	 * @param old
	 *            是否过期
	 * @param drop
	 *            是否作废
	 * @return List<UkSysKnow>
	 * @author zhangyl
	 * @createtime 2012年6月29日 16:49:04
	 */
	public List<UkSysKnow> findByNoSearch(String searchContent, PagingBean pb,
			String title, String type, String keyword, String old, String drop) {
		final StringBuffer sb = new StringBuffer();
		int i = 0;
		sb.append("select k.know_id from uk_sys_know k");
		if ("on".equals(title) || "on".equals(type) || "on".equals(keyword)
				|| "on".equals(old) || "on".equals(drop)) {
			sb.append(" where");
			if ("on".equals(title)) {
				if (i == 1) {
					sb.append(" and");
				}
				sb.append(" k.ti_tle like '%" + searchContent + "%'");
				i = 1;
			}
			if ("on".equals(type)) {
				if (i == 1) {
					sb.append(" and");
				}
				sb.append(" k.busi_type in ( select d.itemindex from dictionary d where d.mapname ='BUSI_TYPE' and d.itemvalue like '%"
						+ searchContent + "%')");
				i = 1;
			}
			if ("on".equals(keyword)) {
				if (i == 1) {
					sb.append(" and");
				}
//				sb.append(" k.know_id in ( select kk.know_id from uk_know_keyword_know kk where kk.keyword_id in( select w.keyword_id from uk_know_keyword w where w.key_word like '%"
//						+ searchContent + "%'))");
				sb.append(" k.KNOW_KEYWORDS like '%"+searchContent+"%'");
				i = 1;
			}
			if ("on".equals(old)) {
				if (i == 1) {
					sb.append(" and");
				}
				sb.append(" k.past_time <sysdate ");
				i = 1;
			}
			if ("on".equals(drop)) {
				if (i == 1) {
					sb.append(" and");
				}
				sb.append(" k.sys_know_status = 6");
				i = 1;
			}
			sb.append(" and k.sys_know_status=5");
			sb.append(" and k.IS_DEL='false'");
			
		}

		List<BigDecimal> idList = (List) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createSQLQuery(sb.toString());
						return query.list();
					}
				});

		StringBuffer hql = new StringBuffer("from UkSysKnow s");
		if (idList.size() > 0) {
			hql.append(" where");
			String ids = "";
			StringBuffer strBuffer = new StringBuffer();
			for (BigDecimal id : idList) {
				strBuffer.append(id);
				strBuffer.append(",");
			}
			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
			hql.append(" s.knowId in (");
			hql.append(ids);
			hql.append(")");
			hql.append(" order by s.knowId desc");
		} else {
			if (!"".equals(searchContent)) {
				hql.append(" where s.knowId = -1");
			}
		}

		return findByHql(hql.toString(), null, pb);
	}

	@Override
	public boolean delete_real(Long ukKnowId) {
		final String sql = "delete from UK_SYS_KNOW_CUSTOMER where KNOW_ID = "
				+ ukKnowId;

		log.debug("sql " + sql + ",id=" + ukKnowId);
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(sql);
						ps.executeUpdate(sql);
						ps.close();
					}
				});
				return null;
			}
		});
		return true;
	}
	
	/**
	 *  知识查询通用方法
	 *  @param title 知识标题
	 *  @param keyWordName 关键字名称
	 *  @param knowTypeName 知识类型名称
	 *  @param isNew  是否是最新的
	 *  @param isViewCount 是否是排行榜
	 *  @param isdianpingCount 点评榜
	 *  @param status 知识状态
	 *  @param isDel 是否删除
	 *  @param isOverdue 是否过期
	 *  @param knowTypeId 知识类型ID(用于知识分类树型控件检索)
	 *  @param minPastTime 最小过期时间
	 *  @param maxPastTime 最大过期时间
	 *  @param NEQStatus  不等于什么状态
	 *  @param isPermission 是否验证权限
	 *  @param busiType 业务类型
	 *  @param  checkTypeRole 分类权限验证
	 *  @author zhangyl
	 *  @createtime 2012年8月30日 10:44:29
	 */
	public List<UkSysKnow> queryKnow(final int start,final int limit,String title,String keyWordName, String knowTypeName , String isNew, String isViewCount, String isdianpingCount , String status , String IS_DEL , String isOverdue ,String knowTypeId,String minPastTime, String maxPastTime , String NEQStatus , String isPermission,String busiType,String checkTypeRole) {
//		final List<UkSysKnow> knowList = new ArrayList<UkSysKnow>();
		StringBuffer sb = new StringBuffer();
		sb.append("select s.know_Id from Uk_Sys_Know s");
		if(knowTypeId != null && knowTypeId != ""){			//判断ID是否存在
			if(!"".equals(checkTypeRole)  || checkTypeRole != null){//是否需要验证分类的权限
				sb.append(" left join uk_know_type_know ktk on ktk.know_id = s.know_id where ktk.know_type_id in(");
				//独立权限验证语句 --Begin
				sb.append("select t.know_type_id from uk_know_type t ");
				sb.append("left join uk_know_type_role r ");
				sb.append("on t.know_type_id = r.know_type_id ");
				sb.append("where t.know_type_id= "+knowTypeId+" and t.know_type_status=1 and t.grant_access =1 and t.ACCESS_PURVIEW != 3  or t.know_type_id in(select tr.know_type_id from user_role r ");
				sb.append("left join uk_know_type_role tr ");
				sb.append("on r.roleid = tr.roleid ");
				sb.append("left join uk_know_type kt ");
				sb.append("on kt.know_type_id = tr.know_type_id ");
				sb.append("where r.userid = "+ContextUtil.getCurrentUserId()+" and kt.parent_id="+knowTypeId+" and kt.know_type_status=1 and t.ACCESS_PURVIEW != 3 )");
				//独立权限验证语句 --End
				sb.append(")");
//				sb.append(" or s.ACCESS_MANAGE = 1");
			}else{
				sb.append(" left join uk_know_type_know ktk on ktk.know_id = s.know_id where ktk.know_type_id = "+knowTypeId);
//				sb.append(" or s.ACCESS_MANAGE = 1");
			}
		}else{
			if(!"".equals(checkTypeRole)  && checkTypeRole != null){			//是否需要验证分类的权限
				sb.append(" left join uk_know_type_know ktk on ktk.know_id = s.know_id where ktk.know_type_id in(");
				//独立权限验证语句 --Begin
				sb.append("select t.know_type_id from uk_know_type t ");
				sb.append("left join uk_know_type_role r ");
				sb.append("on t.know_type_id = r.know_type_id ");
				sb.append("where t.know_type_status=1 and t.grant_access =1 and t.ACCESS_PURVIEW != 3  or t.know_type_id in(select tr.know_type_id from user_role r ");
				sb.append("left join uk_know_type_role tr ");
				sb.append("on r.roleid = tr.roleid ");
				sb.append("left join uk_know_type kt ");
				sb.append("on kt.know_type_id = tr.know_type_id ");
				sb.append("where r.userid = "+ContextUtil.getCurrentUserId()+"  and kt.know_type_status=1 and t.ACCESS_PURVIEW != 3 )");
				//独立权限验证语句 --End
				sb.append(")");
//				sb.append(" or s.ACCESS_MANAGE = 1");
			}else{
				sb.append(" where 1=1 ");
//				sb.append(" or s.ACCESS_MANAGE = 1");
			}
		}
		if(title != null && title != ""){
			sb.append(" and s.TI_TLE like '%"+title+"%'");
		}
		
		if (keyWordName != null && keyWordName != "") {
//			sb.append(" and s.know_Id in( select kk.know_id from uk_know_keyword_know kk where kk.keyword_id in( ");
//			sb.append("select w.keyword_id from uk_know_keyword w ");
//			sb.append("where w.key_word like '%" + keyWordName + "%'");
//			sb.append("))");
			sb.append(" and s.KNOW_KEYWORDS like '%"+keyWordName+"%'");
		}
		
		
		if (knowTypeName != null && knowTypeName != "") {
			sb.append(" and s.know_id in(");
			sb.append("select ktk.know_id from uk_know_type_know ktk where ktk.know_type_id in( ");
			sb.append("select t.know_type_id from uk_know_type t ");
			sb.append("where t.name like '%" + knowTypeName + "%'");
			sb.append("))");
		}
		if(!"".equals(status) && status != null){			//知识状态	1:已采集  2:待审批  3:审批中  4: 待发布  5: 已发布  6:已作废
			sb.append(" and s.sys_know_status ="+status);
		}else if(!"".equals(NEQStatus) && NEQStatus != null){			//状态是不等于
			sb.append(" and s.sys_know_status not in ("+NEQStatus + ")");
		}else{
			sb.append(" and s.sys_know_status=5");
		}
		if(!"".equals(IS_DEL) && IS_DEL != null){			//是否是已删除的
			sb.append(" and s.IS_DEL = 'true'");
		}else{
			sb.append(" and s.IS_DEL='false'");
		}
		if(!"".equals(isOverdue) && isOverdue != null){		//是否过期
			if(!"notCheck".equals(isOverdue)){
				sb.append(" and s.PAST_TIME <=sysdate");
			}
		}else{
			if(!"notCheck".equals(isOverdue)){
				sb.append(" and s.PAST_TIME >=sysdate");
			}
		}
		
		//过期时间 区间值检索方法
		if (minPastTime != null && !"".equals(minPastTime) && maxPastTime != null
				&&  !"".equals(maxPastTime)) {
			sb.append(" and s.past_time <= sysdate");
		}
		if (minPastTime != null && !"".equals(minPastTime)) {			//最小过期时间
			sb.append(" and s.past_time>=to_date('");
			sb.append(minPastTime);
			sb.append("','yyyy-mm-dd')");
		}
		if (maxPastTime != null && !"".equals(maxPastTime)) {			//最大过期时间
			sb.append(" and s.past_time<=to_date('");
			sb.append(maxPastTime);
			sb.append("','yyyy-mm-dd')");
		}
		if(!"".equals(busiType) && busiType != null){					//业务类型
			sb.append(" and BUSI_TYPE = "+busiType);
		}
		
		if("".equals(isPermission)  || isPermission == null){			//是否区分权限.发布给我自己的
			sb.append(" and s.know_id in (select distinct(kr.know_id) from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid where ur.userid = " + ContextUtil.getCurrentUserId()+" or s.ACCESS_MANAGE = 1)");
		}
		
		if(!"".equals(isNew) && isNew != null){				//是否是最新的
			sb.append(" order by s.UPDATE_DATE desc");
		}else
		if(!"".equals(isViewCount) && isViewCount != null){		//是否是排行榜
			sb.append(" order by s.VIEW_COUNT desc"); 
		}else
		if(!"".equals(isdianpingCount) &&  isdianpingCount != null){	//点评排行榜
			sb.append(" order by s.AVG_COUNT desc"); 
		}else{
			sb.append(" order by s.UPDATE_DATE desc"); 
		}
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
								if (rs.next()) {// 至少有一条记录，才可以定位
									rs.absolute(start+1);
//									knowListAdd(knowList,rs);
									idList.add(rs.getBigDecimal("know_Id"));
								}
								for (int i = 0; i < limit-1; i++) {
									if (rs.next()) {
//										knowListAdd(knowList,rs);
										idList.add(rs.getBigDecimal("know_Id"));
									}
								}
							}
						});
						return idList;
					}
				});
//		return knowList;
		StringBuffer hql = new StringBuffer("from UkSysKnow s");
		if (idList.size() > 0) {
			hql.append(" where");
			String ids = "";
			StringBuffer strBuffer = new StringBuffer();
			for (BigDecimal id : idList) {
				strBuffer.append(id);
				strBuffer.append(",");
			}
			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
			hql.append(" s.knowId in (");
			hql.append(ids);
			hql.append(")");
			if(!"".equals(isNew) && isNew != null){				//是否是最新的
				hql.append(" order by s.updateDate desc");
			}else
			if(!"".equals(isViewCount) && isViewCount != null){		//是否是排行榜
				hql.append(" order by s.viewCount desc"); 
			}else
			if(!"".equals(isdianpingCount) &&  isdianpingCount != null){	//点评排行榜
				hql.append(" order by s.averageCount desc"); 
			}else{
				hql.append(" order by s.updateDate desc"); 
			}
			
			
//			hql.append(" order by s.updateDate desc");

		} else {
			hql.append(" where s.knowId = -1");
		}
		return findByHql(hql.toString());
	}
	
	/**
	 *  知识查询通用方法(获得查询条数)
	 *  @param title 知识标题
	 *  @param keyWordName 关键字名称
	 *  @param knowTypeName 知识类型名称
	 *  @param isNew  是否是最新的
	 *  @param isViewCount 是否是排行榜
	 *  @param isdianpingCount 点评榜
	 *  @param status 知识状态
	 *  @param isDel 是否删除
	 *  @param isOverdue 是否过期
	 *  @param knowTypeId 知识类型ID(用于知识分类树型控件检索)
	 *  @param minPastTime 最小过期时间
	 *  @param maxPastTime 最大过期时间
	 *  @param NEQStatus  不等于什么状态
	 *  @param isPermission 是否验证权限
	 *  @param busiType 业务类型
	 *  @author zhangyl
	 *  @createtime 2012年8月30日 10:44:29
	 */
	public int queryKnowCount(final int start,final int limit,String title,String keyWordName, String knowTypeName , String isNew, String isViewCount, String isdianpingCount , String status , String IS_DEL , String isOverdue ,String knowTypeId,String minPastTime, String maxPastTime , String NEQStatus , String isPermission , String busiType,String checkTypeRole) {
		final List<Integer> knowList = new ArrayList<Integer>();
		StringBuffer sb = new StringBuffer();
		sb.append("select count(distinct(s.know_Id)) from Uk_Sys_Know s");
		if(knowTypeId != null && knowTypeId != ""){			//判断ID是否存在
			if(!"".equals(checkTypeRole)  || checkTypeRole != null){//是否需要验证分类的权限
				sb.append(" left join uk_know_type_know ktk on ktk.know_id = s.know_id where ktk.know_type_id in(");
				//独立权限验证语句 --Begin
				sb.append("select t.know_type_id from uk_know_type t ");
				sb.append("left join uk_know_type_role r ");
				sb.append("on t.know_type_id = r.know_type_id ");
				sb.append("where t.know_type_id= "+knowTypeId+" and t.know_type_status=1 and t.grant_access =1 and t.ACCESS_PURVIEW != 3  or t.know_type_id in(select tr.know_type_id from user_role r ");
				sb.append("left join uk_know_type_role tr ");
				sb.append("on r.roleid = tr.roleid ");
				sb.append("left join uk_know_type kt ");
				sb.append("on kt.know_type_id = tr.know_type_id ");
				sb.append("where r.userid = "+ContextUtil.getCurrentUserId()+" and kt.parent_id="+knowTypeId+" and kt.know_type_status=1 and t.ACCESS_PURVIEW != 3 )");
				//独立权限验证语句 --End
				sb.append(")");
//				sb.append(" or s.ACCESS_MANAGE = 1");
			}else{
				sb.append(" left join uk_know_type_know ktk on ktk.know_id = s.know_id where ktk.know_type_id = "+knowTypeId);
//				sb.append(" or s.ACCESS_MANAGE = 1");
			}
		}else{
			if(!"".equals(checkTypeRole)  && checkTypeRole != null){			//是否需要验证分类的权限
				sb.append(" left join uk_know_type_know ktk on ktk.know_id = s.know_id where ktk.know_type_id in(");
				//独立权限验证语句 --Begin
				sb.append("select t.know_type_id from uk_know_type t ");
				sb.append("left join uk_know_type_role r ");
				sb.append("on t.know_type_id = r.know_type_id ");
				sb.append("where t.know_type_status=1 and t.grant_access =1 and t.ACCESS_PURVIEW != 3  or t.know_type_id in(select tr.know_type_id from user_role r ");
				sb.append("left join uk_know_type_role tr ");
				sb.append("on r.roleid = tr.roleid ");
				sb.append("left join uk_know_type kt ");
				sb.append("on kt.know_type_id = tr.know_type_id ");
				sb.append("where r.userid = "+ContextUtil.getCurrentUserId()+"  and kt.know_type_status=1 and t.ACCESS_PURVIEW != 3 )");
				//独立权限验证语句 --End
				sb.append(")");
//				sb.append(" or s.ACCESS_MANAGE = 1");
			}else{
				sb.append(" where 1=1 ");
//				sb.append(" or s.ACCESS_MANAGE = 1");
			}
		}
		if(title != null && title != ""){
			sb.append(" and s.TI_TLE like '%"+title+"%'");
		}
		
		if (keyWordName != null && keyWordName != "") {
//			sb.append(" and s.know_Id in( select kk.know_id from uk_know_keyword_know kk where kk.keyword_id in( ");
//			sb.append("select w.keyword_id from uk_know_keyword w ");
//			sb.append("where w.key_word like '%" + keyWordName + "%'");
//			sb.append("))");
			sb.append(" and s.KNOW_KEYWORDS like '%"+keyWordName+"%'");
		}
		
		
		if (knowTypeName != null && knowTypeName != "") {
			sb.append(" and s.know_id in(");
			sb.append("select ktk.know_id from uk_know_type_know ktk where ktk.know_type_id in( ");
			sb.append("select t.know_type_id from uk_know_type t ");
			sb.append("where t.name like '%" + knowTypeName + "%'");
			sb.append("))");
		}
		if(!"".equals(status) && status != null){			//知识状态	1:已采集  2:待审批  3:审批中  4: 待发布  5: 已发布  6:已作废
			sb.append(" and s.sys_know_status ="+status);
		}else if(!"".equals(NEQStatus) && NEQStatus != null){			//状态是不等于
			sb.append(" and s.sys_know_status not in ("+NEQStatus + ")");
		}else{
			sb.append(" and s.sys_know_status=5");
		}
		if(!"".equals(IS_DEL) && IS_DEL != null){			//是否是已删除的
			sb.append(" and s.IS_DEL = 'true'");
		}else{
			sb.append(" and s.IS_DEL='false'");
		}
		if(!"".equals(isOverdue) && isOverdue != null){		//是否过期
			if(!"notCheck".equals(isOverdue)){
				sb.append(" and s.PAST_TIME <=sysdate");
			}
		}else{
			if(!"notCheck".equals(isOverdue)){
				sb.append(" and s.PAST_TIME >=sysdate");
			}
		}
		
		//过期时间 区间值检索方法
		if (minPastTime != null && !"".equals(minPastTime) && maxPastTime != null
				&&  !"".equals(maxPastTime)) {
			sb.append(" and s.past_time <= sysdate");
		}
		if (minPastTime != null && !"".equals(minPastTime)) {			//最小过期时间
			sb.append(" and s.past_time>=to_date('");
			sb.append(minPastTime);
			sb.append("','yyyy-mm-dd')");
		}
		if (maxPastTime != null && !"".equals(maxPastTime)) {			//最大过期时间
			sb.append(" and s.past_time<=to_date('");
			sb.append(maxPastTime);
			sb.append("','yyyy-mm-dd')");
		}
		if(!"".equals(busiType) && busiType != null){					//业务类型
			sb.append(" and BUSI_TYPE = "+busiType);
		}
		
		if("".equals(isPermission)  || isPermission == null){			//是否区分权限.发布给我自己的
			sb.append(" and s.know_id in (select distinct(kr.know_id) from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid where ur.userid = " + ContextUtil.getCurrentUserId()+" or s.ACCESS_MANAGE = 1)");
		}
		
		if(!"".equals(isNew) && isNew != null){				//是否是最新的
			sb.append(" order by s.UPDATE_DATE desc");
		}else
		if(!"".equals(isViewCount) && isViewCount != null){		//是否是排行榜
			sb.append(" order by s.VIEW_COUNT desc"); 
		}else
		if(!"".equals(isdianpingCount) &&  isdianpingCount != null){	//点评排行榜
			sb.append(" order by s.AVG_COUNT desc"); 
		}else{
			sb.append(" order by s.UPDATE_DATE desc"); 
		}
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
	
	//原生SQL使用RS集合
	public List<UkSysKnow> knowListAdd(List<UkSysKnow> ukSysKnowList,java.sql.ResultSet rs) throws SQLException{
		UkSysKnow ukSysKnow = new UkSysKnow();
		ukSysKnow.setKnowId(rs.getLong("KNOW_ID"));		//知识ID
		ukSysKnow.setTiTle(rs.getString("TI_TLE"));		//标题
		ukSysKnow.setBusiType(rs.getLong("BUSI_TYPE"));	//业务类型
		ukSysKnow.setEnableTime(rs.getDate("ENABLE_TIME"));//生效时间
		ukSysKnow.setPastTime(rs.getDate("PAST_TIME"));//过期时间
		ukSysKnow.setSysKnowStatus(rs.getInt("SYS_KNOW_STATUS"));	//知识状态
		ukSysKnow.setViewCount(rs.getInt("VIEW_COUNT"));			//点击次数
		ukSysKnow.setSysKnowComment(rs.getString("SYS_KNOW_COMMENT")); //摘要
		ukSysKnow.setPlus1(rs.getString("PLUS1"));
		ukSysKnow.setPlus2(rs.getString("PLUS2"));
		ukSysKnow.setPlus3(rs.getString("PLUS3"));
		ukSysKnow.setPlus4(rs.getString("PLUS4"));
		ukSysKnow.setPlus5(rs.getString("PLUS5"));
		ukSysKnow.setPlus6(rs.getString("PLUS6"));
		ukSysKnow.setPlus7(rs.getString("PLUS7"));
		ukSysKnow.setPlus8(rs.getString("PLUS8"));
		ukSysKnow.setCreateDate(rs.getDate("CREATE_DATE"));			//创建时间
		ukSysKnow.setUpdateDate(rs.getDate("UPDATE_DATE")); 		//修改时间
		Long createUserId = rs.getLong("CREATE_BY");				//获取ID 查询到用户 
		if(createUserId!=null){
			ukSysKnow.setCreateBy(appUserDao.get(createUserId));
		}
		Long updateUserId = rs.getLong("UPDATE_BY");				//获取ID 查询到用户 
		if(updateUserId!=null){
			ukSysKnow.setCreateBy(appUserDao.get(updateUserId));
		}
		ukSysKnow.setSysKnowVersion(rs.getInt("SYS_KNOW_VERSION")); //版本号
		ukSysKnow.setFankuiShu(rs.getLong("FANKUISHU")); 			//反馈数
		ukSysKnow.setDianpingCount(rs.getInt("DIANPING_COUNT"));	//点评次数
		ukSysKnow.setDelReason(rs.getInt("DEL_REASON"));			//删除原因
		ukSysKnow.setDelRemark(rs.getString("DEL_REMARK")); 		//删除备注
		ukSysKnow.setContentType(rs.getLong("DEL_REMARK"));         //显示方式
		ukSysKnow.setIsDel(rs.getString("IS_DEL"));  				//是否真删
		ukSysKnowList.add(ukSysKnow);
		return ukSysKnowList;
	}
	
	
		//保存浏览数
	public void saveCount(Long knowId,Integer countView){
			final String sql="update uk_sys_know set VIEW_COUNT = " +countView+" where KNOW_ID = "+knowId;
			getHibernateTemplate().execute(
					new HibernateCallback() {
						public Object doInHibernate(Session session)
								throws HibernateException, SQLException {
							session.doWork(new Work() {
								@Override
								public void execute(Connection connection) throws SQLException {
									PreparedStatement ps = connection.prepareStatement(sql);
									ps.executeUpdate();
									ps.close();
								}
							});
							return null;
						}
					});
		}
	
	
	
	/**
	 * 查询知识订阅
	 * @param start
	 * @param limit
	 * @param busiType
	 * @param knowType
	 * @param keyWord
	 * @param STitle
	 * @param SBusiType
	 * @return
	 */
	public List<UkSysKnow> findByDingYue(final int start,final int limit,String busiType,String knowType,String keyWord,String STitle,String SBusiType){
		StringBuffer sb = new StringBuffer();
		sb.append("select a.know_Id from uk_sys_know a");
		if(knowType!= null){
			sb.append(" left join uk_know_type_know t  on  t.know_id = a.know_id");
		}
		if(keyWord!= null){
			sb.append(" left join uk_know_keyword_know kk on kk.know_id = a.know_id");
		}
		sb.append(" where 1=1");
		if(STitle!=null && !"".equals(STitle)){
			sb.append(" AND a.TI_TLE like '%"+STitle+"%'");
		}
		if(SBusiType!=null && !"".equals(SBusiType)){
			sb.append(" AND a.BUSI_TYPE = "+SBusiType);
		}
		sb.append(" and a.sys_know_status=5");
		sb.append(" and a.IS_DEL='false'");
		sb.append(" and a.PAST_TIME >=sysdate");
		sb.append(" and a.know_id in (select distinct(kr.know_id) from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid where ur.userid = " + ContextUtil.getCurrentUserId()+")");
		if(busiType!= null){
			String[] busiTypeIds = busiType.split(",");
			int i = 0;
			for(String busiTypeId : busiTypeIds){
				if(!"".equals(busiTypeId) && busiTypeId != null){
					if(i==0){
						sb.append(" AND a.busi_type = "+busiTypeId); 
					}
					i++;
					if(i>1){
						sb.append(" OR a.busi_type = "+busiTypeId); 
					}
				}
				
			}
		}
		if(knowType!= null){
			String[] knowTypeIds = knowType.split(",");
			int i = 0;
			for(String knowTypeId : knowTypeIds){
				if(!"".equals(knowTypeId) && knowTypeId != null){
					if(i==0){
						sb.append(" AND t.know_type_id = "+knowTypeId); 
					}
					i++;
					if(i>1){
						sb.append(" OR t.know_type_id = "+knowTypeId); 
					}
				}
				
			}
		}
		if(keyWord!= null){
			String[] keyWordIds = keyWord.split(",");
			int i = 0;
			for(String keyWordId : keyWordIds){
				if(!"".equals(keyWordId) && keyWordId != null){
					if(i==0){
						sb.append(" AND kk.keyword_id = "+keyWordId); 
					}
					i++;
					if(i>1){
						sb.append(" OR kk.keyword_id = "+keyWordId); 
					}
				}
				
			}
		}
		
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
								if (rs.next()) {// 至少有一条记录，才可以定位
									rs.absolute(start+1);
									idList.add(rs.getBigDecimal("know_Id"));
								}
								for (int i = 0; i < limit-1; i++) {
									if (rs.next()) {
										idList.add(rs.getBigDecimal("know_Id"));
									}
								}
							}
						});
						return idList;
					}
				});
//		return knowList;
		StringBuffer hql = new StringBuffer("from UkSysKnow s");
		if (idList.size() > 0) {
			hql.append(" where");
			String ids = "";
			StringBuffer strBuffer = new StringBuffer();
			for (BigDecimal id : idList) {
				strBuffer.append(id);
				strBuffer.append(",");
			}
			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
			hql.append(" s.knowId in (");
			hql.append(ids);
			hql.append(")");
			hql.append(" order by s.updateDate desc");

		} else {
			hql.append(" where s.knowId = -1");
		}
		return findByHql(hql.toString());
		
	}
	
	/**
	 * 查询知识订阅(条目)
	 * @param start
	 * @param limit
	 * @param busiType
	 * @param knowType
	 * @param keyWord
	 * @param STitle
	 * @param SBusiType
	 * @return
	 */
	public int findByDingYueCount(final int start,final int limit,String busiType,String knowType,String keyWord,String STitle,String SBusiType){
		final List<Integer> knowList = new ArrayList<Integer>();
		StringBuffer sb = new StringBuffer();
		sb.append("select count(distinct(a.know_Id)) from uk_sys_know a ");
		if(knowType!= null){
			sb.append(" left join uk_know_type_know t  on  t.know_id = a.know_id");
		}
		if(keyWord!= null){
			sb.append(" left join uk_know_keyword_know kk on kk.know_id = a.know_id");
		}
		sb.append(" where 1=1");
		if(STitle!=null && !"".equals(STitle)){
			sb.append(" AND a.TI_TLE like '%"+STitle+"%'");
		}
		if(SBusiType!=null && !"".equals(SBusiType)){
			sb.append(" AND a.BUSI_TYPE = "+SBusiType);
		}
		sb.append(" and a.sys_know_status=5");
		sb.append(" and a.IS_DEL='false'");
		sb.append(" and a.PAST_TIME >=sysdate");
		sb.append(" and a.know_id in (select distinct(kr.know_id) from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid where ur.userid = " + ContextUtil.getCurrentUserId()+")");
		if(busiType!= null){
			String[] busiTypeIds = busiType.split(",");
			int i = 0;
			for(String busiTypeId : busiTypeIds){
				if(!"".equals(busiTypeId) && busiTypeId != null){
					if(i==0){
						sb.append(" AND a.busi_type = "+busiTypeId); 
					}
					i++;
					if(i>1){
						sb.append(" OR a.busi_type = "+busiTypeId); 
					}
				}
				
			}
		}
		if(knowType!= null){
			String[] knowTypeIds = knowType.split(",");
			int i = 0;
			for(String knowTypeId : knowTypeIds){
				if(!"".equals(knowTypeId) && knowTypeId != null){
					if(i==0){
						sb.append(" AND t.know_type_id = "+knowTypeId); 
					}
					i++;
					if(i>1){
						sb.append(" OR t.know_type_id = "+knowTypeId); 
					}
				}
				
			}
		}
		if(keyWord!= null){
			String[] keyWordIds = keyWord.split(",");
			int i = 0;
			for(String keyWordId : keyWordIds){
				if(!"".equals(keyWordId) && keyWordId != null){
					if(i==0){
						sb.append(" AND kk.keyword_id = "+keyWordId); 
					}
					i++;
					if(i>1){
						sb.append(" OR kk.keyword_id = "+keyWordId); 
					}
				}
				
			}
		}
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

	@Override
	public boolean delete_dimensionality_know(Long ukKnowId) {
		final String sql = "delete from UK_DIMENSIONALITY_KNOW where KNOW_ID = " + ukKnowId;

		log.debug("sql " + sql + ",id=" + ukKnowId);
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(sql);
						ps.executeUpdate(sql);
						ps.close();
					}
				});
				return null;
			}
		});
		return true;
	}
	
	/**
	 * 修改知识的状态
	 * @param knowId
	 */
	@Override
	public void updateKnowStatus(String knowId,String knowStatus){
		final String sql="update uk_sys_know u set u.sys_know_status = "+knowStatus+" where u.know_id = "+knowId;
		getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						session.doWork(new Work() {
							@Override
							public void execute(Connection connection) throws SQLException {
								PreparedStatement ps = connection.prepareStatement(sql);
								ps.executeUpdate();
								ps.close();
							}
						});
						return null;
					}
				});
	}
	
	@Override
	public List<UkSysKnow> findMyKnow(final int start, final int limit, String title, String keyWordName, String mark, String dimenId, String dimStrIds) {
		StringBuffer buff = new StringBuffer();
		Department dep = ContextUtil.getCurrentUser().getDepartment();
		UlEmployee emp = ContextUtil.getCurrentUser().getUlEmployee();
		Long dicId = null;
		Long depId = null;
		if(emp!=null){
			String zhiWei = emp.getZhiwei();
			if(zhiWei!=null){
				QueryFilter filter = new QueryFilter();
				filter.addFilter("Q_itemIndex_S_EQ", zhiWei);
				filter.addFilter("Q_mapName_S_EQ", "ZW001");
				List<Dictionary> dicList = dictionaryService.getAllNoRequest(filter);
				dicId = dicList.get(0).getDicId();
			}
		}
		if(dep!=null)depId = dep.getDepId();
		
		buff.append(" select t.know_id from uk_sys_know t where t.is_del = 'false' and t.sys_know_status = 5 and ( ");
		if(dimenId==null || dimenId.equals("")){
			buff.append(" t.access_manage = 1 or ");
		}
		buff.append(" t.know_id in (select distinct kr.know_id from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid  where ur.userid = "+ContextUtil.getCurrentUserId()+" ");
		buff.append(" and kr.know_id in (select ud.know_id from uk_dimensionality_know ud where 1 = 1 ");
		if(dimenId!=null && !dimenId.equals("")){
			if(mark!=null && !mark.equals("")){
				if(mark.equals("1")){
					if(new Integer(dimenId)<=0){
						if(dimStrIds!=null)buff.append(" and ud.dimensionality_id in ( "+dimStrIds+" ) ");
					}else{
						buff.append(" and ud.dimensionality_id = "+dimenId);
					}
				}else if(mark.equals("2")){
					if(depId!=null){
						buff.append(" and ud.depid = "+depId);
					}else if(new Integer(dimenId)>0){
						buff.append(" and ud.depid = "+dimenId);
					}else{
						buff.append(" and ud.depid is not null ");
					}
				}else if(mark.equals("3")){
					if(dicId!=null){
						buff.append(" and ud.dicid = "+dicId);
					}else if(new Integer(dimenId)>0){
						buff.append(" and ud.dicid = "+dimenId);
					}else{
						buff.append(" and ud.dicid is not null ");
					}
				}
			}
		}else{
			if(dimStrIds!=null || dicId!=null || depId!=null){
				buff.append(" and (");
				if(dimStrIds!=null){
					buff.append(" ud.dimensionality_id in ( "+dimStrIds+" ) ");
					if(depId!=null)buff.append(" or ud.depid = "+depId);
					if(dicId!=null)buff.append(" or ud.dicid = "+dicId);
				}else if(depId!=null){
					buff.append(" ud.depid = "+depId);
					if(dicId!=null)buff.append(" or ud.dicid = "+dicId);
				}else{
					buff.append(" ud.dicid = "+dicId);
				}
				buff.append(")");
			}
		}
		buff.append(")))");
		if(title!=null && !title.equals("")){
			buff.append(" and t.ti_tle like '%"+title+"%' ");
		}
		if(keyWordName!=null && !keyWordName.equals("")){
//			buff.append(" and t.know_id in (select kk.know_id from uk_know_keyword_know kk where kk.keyword_id in "
//					+ "(select w.keyword_id from uk_know_keyword w where w.key_word like '%"
//					+ keyWordName + "%')) ");
			buff.append(" and t.KNOW_KEYWORDS like '%"+keyWordName+"%'");
		}
		buff.append(" order by t.view_count desc ");
		
		final String sql = buff.toString();
		final List<BigDecimal> idList = new ArrayList<BigDecimal>();
		getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						session.doWork(new Work() {//原生SQL查询不出知识相关对象及SET集合
							@Override
							public void execute(Connection con) throws SQLException {
								PreparedStatement ps = con.prepareStatement(sql,
										ResultSet.TYPE_SCROLL_SENSITIVE,
										ResultSet.CONCUR_UPDATABLE);
								java.sql.ResultSet rs = ps.executeQuery();
								if (rs.next()) {// 至少有一条记录，才可以定位
									rs.absolute(start+1);
									idList.add(rs.getBigDecimal("know_Id"));
								}
								for (int i = 0; i < limit-1; i++) {
									if (rs.next()) {
										idList.add(rs.getBigDecimal("know_Id"));
									}
								}
							}
						});
						return idList;
					}
				});
		
		StringBuffer hql = new StringBuffer("from UkSysKnow s");
		if (idList.size() > 0) {
			hql.append(" where");
			String ids = "";
			StringBuffer strBuffer = new StringBuffer();
			for (BigDecimal id : idList) {
				strBuffer.append(id);
				strBuffer.append(",");
			}
			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
			hql.append(" s.knowId in (");
			hql.append(ids);
			hql.append(")");
			hql.append(" order by s.viewCount desc"); 
		} else {
			hql.append(" where s.knowId = -1");
		}
		return findByHql(hql.toString());

	}

	@Override
	public int countMyKnow(int start, int limit, String title, String keyWordName, String mark, String dimenId, String dimStrIds) {
		StringBuffer buff = new StringBuffer();
		Department dep = ContextUtil.getCurrentUser().getDepartment();
		UlEmployee emp = ContextUtil.getCurrentUser().getUlEmployee();
		Long dicId = null;
		Long depId = null;
		if(emp!=null){
			String zhiWei = emp.getZhiwei();
			if(zhiWei!=null){
				QueryFilter filter = new QueryFilter();
				filter.addFilter("Q_itemIndex_S_EQ", zhiWei);
				filter.addFilter("Q_mapName_S_EQ", "ZW001");
				List<Dictionary> dicList = dictionaryService.getAllNoRequest(filter);
				dicId = dicList.get(0).getDicId();
			}
		}
		if(dep!=null)depId = dep.getDepId();
		
		buff.append(" select count(distinct(t.know_id)) as knowcount from uk_sys_know t where t.is_del = 'false' and t.sys_know_status = 5 and ( ");
		if(dimenId==null || dimenId.equals("")){
			buff.append(" t.access_manage = 1 or ");
		}
		buff.append(" t.know_id in (select distinct kr.know_id from user_role ur left join uk_know_role kr on kr.roleid = ur.roleid  where ur.userid = "+ContextUtil.getCurrentUserId()+" ");
		buff.append(" and kr.know_id in (select ud.know_id from uk_dimensionality_know ud where 1 = 1 ");
		if(dimenId!=null && !dimenId.equals("")){
			if(mark!=null && !mark.equals("")){
				if(mark.equals("1")){
					if(new Integer(dimenId)<=0){
						if(dimStrIds!=null)buff.append(" and ud.dimensionality_id in ( "+dimStrIds+" ) ");
					}else{
						buff.append(" and ud.dimensionality_id = "+dimenId);
					}
				}else if(mark.equals("2")){
					if(depId!=null){
						buff.append(" and ud.depid = "+depId);
					}else if(new Integer(dimenId)>0){
						buff.append(" and ud.depid = "+dimenId);
					}else{
						buff.append(" and ud.depid is not null ");
					}
				}else if(mark.equals("3")){
					if(dicId!=null){
						buff.append(" and ud.dicid = "+dicId);
					}else if(new Integer(dimenId)>0){
						buff.append(" and ud.dicid = "+dimenId);
					}else{
						buff.append(" and ud.dicid is not null ");
					}
				}
			}
		}else{
			if(dimStrIds!=null || dicId!=null || depId!=null){
				buff.append(" and (");
				if(dimStrIds!=null){
					buff.append(" ud.dimensionality_id in ( "+dimStrIds+" ) ");
					if(depId!=null)buff.append(" or ud.depid = "+depId);
					if(dicId!=null)buff.append(" or ud.dicid = "+dicId);
				}else if(depId!=null){
					buff.append(" ud.depid = "+depId);
					if(dicId!=null)buff.append(" or ud.dicid = "+dicId);
				}else{
					buff.append(" ud.dicid = "+dicId);
				}
				buff.append(")");
			}
		}
		buff.append(")))");
		if(title!=null && !title.equals("")){
			buff.append(" and t.ti_tle like '%"+title+"%' ");
		}
		if(keyWordName!=null && !keyWordName.equals("")){
//			buff.append(" and t.know_id in (select kk.know_id from uk_know_keyword_know kk where kk.keyword_id in "
//					+ "(select w.keyword_id from uk_know_keyword w where w.key_word like '%"
//					+ keyWordName + "%')) ");
			buff.append(" and t.KNOW_KEYWORDS like '%"+keyWordName+"%'");
		}
		buff.append(" order by t.view_count desc ");
		
		String sql = buff.toString();
		JdbcHelper helper = new JdbcHelper();
		helper.setSql(sql);
		logger.debug("sql : " + sql);
		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				int count = 0;
				try {
					while(rs.next()){
						count = rs.getInt("knowcount");
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return count;
			}
		};
		helper.setJdbcWork(sqlWork);
		Integer knowCount = (Integer) getHibernateTemplate().execute(helper);
		
		return knowCount;
	}
}

