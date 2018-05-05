package com.ulane.running.dao.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.raq.dataserver.jdbc.ResultSet;
import com.ulane.running.dao.qucon.QcRandomExtractDao;
import com.ulane.running.model.qucon.ExtractRule;
import com.ulane.running.model.qucon.ExtractRuleToSQL;
import com.ulane.running.model.qucon.QcChkRul;
import com.ulane.running.model.qucon.RandomExtract;
import com.ulane.running.model.qucon.RandomExtractModel;
import com.ulane.running.model.qucon.UserExtractRuleToSQL;
import com.ulane.running.model.qucon.UserGroupExtractRuleToSQL;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcRandomExtractDaoImpl extends BaseDaoImpl implements QcRandomExtractDao{
	Map<Short, ExtractRuleToSQL> rule = new HashMap<Short, ExtractRuleToSQL>();
	
 	public QcRandomExtractDaoImpl() {
		super(Object.class);
	}
	
	public List<Long> extract(RandomExtractModel rem){
		final List <Long> rs = new ArrayList<Long>();
		rule.put(QcChkRul.OBJECT_TYPE_USERGROUP, new UserGroupExtractRuleToSQL());
		rule.put(QcChkRul.OBJECT_TYPE_USER, new UserExtractRuleToSQL());
		for(ExtractRule er : rem.getRules()){//抽取每条规则，并添加到结果集
			ExtractRuleToSQL erToSQL = rule.get(er.getRuleType());
			if(erToSQL != null){
				erToSQL.setDataSource(rem, er);
				System.out.println("抽取开始：");
				List<Long> rs_ = extract_detail(erToSQL);
				er.setResultSize(rs_.size());
				rs.addAll(rs_);
				System.out.println("抽取结束。");
			}else{
				System.out.println(er.getExtractType() + "未定义抽取解析规则");
			}
		}
		return rs;
	}

	/**
	 * 
	 * 针对一条详尽的抽取规则，使用一个规则转化器，进行抽取
	 * @param erToSQL
	 * @return
	 */
	public List<Long> extract_detail(final ExtractRuleToSQL erToSQL){
		
		final List <Long> array = new ArrayList<Long>();
		
		System.out.println("sql:" + erToSQL.toSQL());
		
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(erToSQL.toSQL(),
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						java.sql.ResultSet rs = ps.executeQuery();
						Set<Integer> indexs;
						if(erToSQL.getHelperSQL() == null){
							int allSize = 0;
							while(rs.next()){
								allSize++;
							}
//							int allSize = rs.getFetchSize();不可用
							System.out.println("no help sql,allSize:" + allSize);
							indexs = RandomExtract.getIndex(allSize, 
									erToSQL.getExtractSize(allSize));
						}else{
							System.out.println("need helpSQL");
							List<Integer> indexList = userOfGroupSize(erToSQL);
							System.out.println("helpSQL result" + indexList);
							List<Integer> indexList_extrSize = new ArrayList<Integer>();
							for(Integer i : indexList){
								indexList_extrSize.add(erToSQL.getExtractSize(i));
							}
							System.out.println("extract size" + indexList_extrSize);
							indexs = RandomExtract.getIndex(indexList, 
									indexList_extrSize);
						}
						System.out.println("result index:" + indexs);
						for(int index  : indexs){
							rs.absolute(index);
							array.add(rs.getLong(1));
						}
					}
				});
				return null;
			}
		});

		System.out.println("抽取结果ID:" + array);
		return array;
	}
	
	/**
	 * 
	 * 辅助的sql查询。目前是因为用户组的每个用户抽取。需要先查询用户组下的每个用户有多少条记录，再随意抽取。
	 * 返回排序过的每个用户的记录个数
	 * @param erToSQL
	 * @return
	 */
	private List<Integer> userOfGroupSize(final ExtractRuleToSQL erToSQL){
		if(erToSQL.getHelperSQL() == null){
			return null;
		}
		System.out.println("helpSql:" + erToSQL.getHelperSQL());
		final List <Integer> sizeList = new ArrayList<Integer>();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(erToSQL.getHelperSQL(),
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						java.sql.ResultSet rs = ps.executeQuery();
						while(rs.next()){
							sizeList.add(rs.getInt(1));
						}
					}
				});
				return null;
			}
		});
		return sizeList;
	}
}