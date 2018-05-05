package com.ulane.customer.dao.customer.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import oracle.net.aso.q;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.jdbc.Work;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.model.TaskLink;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.core.dynamicPwd.YooeResponse;
import com.htsoft.oa.model.customer.BankType;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Region;
import com.htsoft.oa.util.SqlBuilder;

import com.ulane.base.model.info.QJContractHZRecord;
import com.ulane.base.model.info.QJContractRecordId;
import com.ulane.base.model.info.QJIssueCard;
import com.ulane.base.model.info.QJAddCard;
import com.ulane.base.model.info.QJTransferAccounts;
import com.ulane.base.model.xitong.Equipment;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.customer.dao.customer.ConHisDao;
import com.ulane.customer.model.customer.CTI_AfterWork_Info;
import com.ulane.customer.model.customer.CTI_Call_Info;
import com.ulane.customer.model.customer.CTI_Login_Info;
import com.ulane.customer.model.customer.CTI_Rest_Info;
import com.ulane.customer.model.customer.CTI_Ringing_Info;
import com.ulane.customer.model.customer.CallIdOrAgentInfo;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.Examine;
import com.ulane.customer.model.customer.MachineSelf;
import com.ulane.customer.model.customer.MachineSelfAttach;
import com.ulane.customer.model.customer.OperationData;
import com.ulane.customer.model.customer.SysWorkattendance;
import com.ulane.know.model.know.UkKnowType;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

@SuppressWarnings( { "unchecked", "unused" })
public class ConHisDaoImpl extends BaseDaoImpl<ConHis> implements ConHisDao {

	public ConHisDaoImpl() {
		super(ConHis.class);
	}

	public Integer JDBCCount(String sqlCount) {
		JdbcWork count = new JdbcWork() {
			public Object fillData(ResultSet rs) {
				int result = 0;
				try {
					rs.next();
					result = rs.getInt(1);
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return result;
			}
		};
		JdbcHelper help = new JdbcHelper();
		help.setJdbcWork(count);
		help.setSql(sqlCount);
		return (Integer) getHibernateTemplate().execute(help);
	}

	public Long getMaxConHis() {
		getHibernateTemplate().find("SELECT conHisId.currval FROM ConHis");
		return null;
	}

	@Override
	public void saveCallIdOrAgentId(String callid, String agentid,
			String machineid) {
		// TODO Auto-generated method stub
		Transaction ts = getSession().beginTransaction(); // 创建事物并开始
		CallIdOrAgentInfo callIdOrAgentInfo = new CallIdOrAgentInfo();
		callIdOrAgentInfo.setCallId(callid);
		callIdOrAgentInfo.setAgentId(agentid);
		callIdOrAgentInfo.setMachineId(machineid);
		this.getHibernateTemplate().saveOrUpdate(callIdOrAgentInfo);
		System.out.println("save CALLID SUCCESS");
		ts.commit(); // 提交结束事物
	}

	@Override
	public void updateDealNum(String conhisid, String cusName, String dealno) {
		Transaction ts = getSession().beginTransaction(); // 创建事物并开始
		Query query = getSession().createQuery(
				"update ConHis ch set ch.cusName='" + cusName
						+ "' , ch.serialNum = '" + dealno
						+ "' where ch.conHisId = " + conhisid + "");
		query.executeUpdate();
		System.out.println("update success");
		ts.commit();

	}

	@Override
	public Equipment selectEquiName(String eId) {
		// TODO Auto-generated method stub
		String hql = "from Equipment e where e.equipmentId = '" + eId + "' and e.delFlag = 1";
		// System.out.println("sql->"+hql);
		List<Equipment> eList = this.getHibernateTemplate().find(hql);
		if (eList.size() == 0) {
			return null;
		} else {
			return eList.get(0);
		}

	}

	/***
	 * 2014/07/29 hy 身份核查补录，后台记录数据，提供报表基础
	 * 
	 * @param callIdOrAgentInfo
	 */
	@Override
	public void insertExamineInfo(Examine examine) {
		// TODO Auto-generated method stub
		System.out.println("insertExamineBULU DAO >>>>> ");
		Transaction ts = getSession().beginTransaction(); // 创建事物并开始
		System.out.println("beginTransaction .... ");
		this.getHibernateTemplate().saveOrUpdate(examine);
		System.out.println("save Examine_BULU SUCCESS");
		ts.commit(); // 提交结束事物
	}

	// ----------------==================================================----------补录报表带分页查询信息

	/**
	 * 2014/11/7 补录报表的查询 （带分页） nk
	 */
	@Override
	public List<Examine> ExamineReport(Integer start, Integer limit,
			String dealNum, String cusName, String transactP, String examineP,
			String examineD, String examineR) {

		System.out
				.println("[machineSelfList] - invoke(调用) : machineSelfList()");

		AppUser user = ContextUtil.getCurrentUser();
		System.out
				.println("[machineSelfList] - invoke(调用) : machineSelfList()");

		Query query = null;

		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		if (dealNum == null && cusName == null && transactP == null
			&& examineP == null && examineD == null && examineR == null) {
			String hql = "";
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						 ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					//hql = "from Examine e order by e.examineD desc";
					hql="select * from  EXAMINE_BULU e   ";

				}
				
				if ("总行座席".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
					 hql="select * from  EXAMINE_BULU e where  e.EXAMINE_PERSONAL='"+ user.getUsername()+"'";

				}

			}
			hql = hql + " order by  e.EXAMINE_DATE desc ";
			query = getSession().createSQLQuery(hql).addEntity(Examine.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		} else {
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						 ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					//hql = "from Examine e order by e.examineD desc";
					hql.append("select * from  EXAMINE_BULU e  where 1=1 ");

				}
				
				if ("总行座席".equals(listR.get(i).getName())) {// 查看本支行的信息---总行座席
					hql.append("select * from  EXAMINE_BULU e where  e.EXAMINE_PERSONAL='"+ user.getUsername()+"'");

				}

			}
			if (!"".equals(dealNum) && dealNum != null) {
				hql.append(" and e.DEAL_NUM like '%" + dealNum + "%'");
			}
			if (!"".equals(cusName) && cusName != null) {
				hql.append(" and e.CUS_NAME like '%" + cusName + "%'");
			}
			if (!"".equals(transactP) && transactP != null) {
				hql.append(" and e.TRANSACT_PERSONAL like '%" + transactP + "%'");
			}
			if (!"".equals(examineP) && examineP != null) {
				hql.append(" and e.EXAMINE_PERSONAL like '%" + examineP + "%'");
			}
			if (!"".equals(examineD) && examineD != null) {
				hql.append("  and e.EXAMINE_DATE>= '" + examineD + "'");
			}
			if (!"".equals(examineR) && examineR != null) {
				hql.append(" and e.EXAMINE_RESULT like '%" + examineR + "%'");
			}
			hql.append(" order by  e.EXAMINE_DATE desc ");
			System.out.println("==[ConHisDaoImpl.java]==examineR" + examineR);
			query = getSession().createSQLQuery(hql.toString()).addEntity(Examine.class);
			System.out.println("====[ConHisDaoImpl.java]===query=" + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();
	
//		System.out
//				.println("-----[ConHisDaoImpl.java]----ExamineReport---------");
//		Query query;
//		if (dealNum == null && cusName == null && transactP == null
//				&& examineP == null && examineD == null && examineR == null) {
//			System.out.println("dao   查询所有");
//			String hql = "from Examine e order by e.examineD desc";
//			query = getSession().createQuery(hql);
//			System.out
//					.println("=====[ConHisDaoImpl.java]========query" + query);
//			query.setFirstResult(start);
//			query.setMaxResults(limit);
//			System.out.println("==[ConHisDaoImpl.java]=start===" + start
//					+ "======" + limit);
//		} else {
//			// 多条件的查询，用StringBuffer拼接字符串，在连接的时候 不能用or，or当查询多个条件的任意匹配时，用and(切记)
//			StringBuffer hql = new StringBuffer("from Examine e  where 1=1");
//			if (!"".equals(dealNum) && dealNum != null) {
//				hql.append(" and e.dealNum like '%" + dealNum + "%'");
//			}
//			if (!"".equals(cusName) && cusName != null) {
//				hql.append(" and e.cusName like '%" + cusName + "%'");
//			}
//			if (!"".equals(transactP) && transactP != null) {
//				hql.append(" and e.transactP like '%" + transactP + "%'");
//			}
//			if (!"".equals(examineP) && examineP != null) {
//				hql.append(" and e.examineP like '%" + examineP + "%'");
//			}
//			if (!"".equals(examineD) && examineD != null) {
//				hql.append("  and e.examineD>= '" + examineD + "'");
//			}
//			if (!"".equals(examineR) && examineR != null) {
//				hql.append(" and e.examineR like '%" + examineR + "%'");
//			}
//			System.out.println("==[ConHisDaoImpl.java]==examineR" + examineR);
//			query = getSession().createQuery(hql.toString());
//			System.out.println("====[ConHisDaoImpl.java]===query=" + query);
//			query.setFirstResult(start);// hibernate自带的分页查询，起始页
//			query.setMaxResults(limit);// 结束页
//
//		}
		//return query.list();
	}

	/**
	 * 2014/11/7 补录报表的查询总数 （带分页） nk
	 */
	public Integer ExamineReportCount(String dealNum, String cusName,
			String transactP, String examineP, String examineD, String examineR) {

		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : ExamineReportCount()...");

		AppUser user = ContextUtil.getCurrentUser();
		List<AppRole> listR = selectRoleName(user.getUserId());
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(*)");
		// SqlBuilder.FROM("EQUIPMENT e where e.delFlag=1");
		for (int i = 0; i < listR.size(); i++) {
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					 ||"总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				SqlBuilder.FROM(" EXAMINE_BULU e");

			}
			
			if ("总行座席".equals(listR.get(i).getName())) {// 查看本支行的信息---总行座席
				SqlBuilder.FROM(" EXAMINE_BULU e");
				// "   where c.main_contact_num  =e.equipmentid  and e.bank_type_id="+user.getBankTypeId());
				SqlBuilder
						.WHERE(" e.EXAMINE_PERSONAL='"+ user.getUsername()+"'");
			}
			
		
		if (!"".equals(dealNum) && dealNum != null) {
			System.out.println("jjfjfjf" + dealNum);
			SqlBuilder.WHERE("e.DEAL_NUM like" + "'%" + dealNum + "%'");
		}
		if (!"".equals(cusName) && cusName != null) {
			SqlBuilder.WHERE("e.CUS_NAME like" + "'%" + cusName + "%'");
		}
		if (!"".equals(transactP) && transactP != null) {
			SqlBuilder.WHERE("e.TRANSACT_PERSONAL like" + "'%" + transactP
					+ "%'");
		}
		if (!"".equals(examineP) && examineP != null) {
			SqlBuilder.WHERE("e.EXAMINE_PERSONAL like" + "'%" + examineP
					+ "%'");
		}
		if (!"".equals(examineD) && examineD != null) {
			SqlBuilder.WHERE("e.EXAMINE_DATE >= '" + examineD + "'");
		}
		if (!"".equals(examineR) && examineR != null) {
			SqlBuilder.WHERE("e.EXAMINE_RESULT like" + "'%" + examineR
					+ "%'");

		}
		System.out.println("查询所有数据 else ");
	}
	String sql_getCount = SqlBuilder.SQL();
	return JDBCCount(sql_getCount);
}
//		System.out.println("=====[ConHisDaoImpl.java]-ExamineReportAllCountIf  ");
//		SqlBuilder.BEGIN();
//		SqlBuilder.SELECT("count(*)");
//		SqlBuilder.FROM("EXAMINE_BULU e");
//		if (dealNum == null && cusName == null && transactP == null
//				&& examineP == null && examineD == null && examineR == null) {
//			System.out.println("[ConHisDaoImpl.java]-查询所有数据");
//		} else {
//			if (!"".equals(dealNum) && dealNum != null) {
//				System.out.println("jjfjfjf" + dealNum);
//				SqlBuilder.WHERE("e.DEAL_NUM like" + "'%" + dealNum + "%'");
//			}
//			if (!"".equals(cusName) && cusName != null) {
//				SqlBuilder.WHERE("e.CUS_NAME like" + "'%" + cusName + "%'");
//			}
//			if (!"".equals(transactP) && transactP != null) {
//				SqlBuilder.WHERE("e.TRANSACT_PERSONAL like" + "'%" + transactP
//						+ "%'");
//			}
//			if (!"".equals(examineP) && examineP != null) {
//				SqlBuilder.WHERE("e.EXAMINE_PERSONAL like" + "'%" + examineP
//						+ "%'");
//			}
//			if (!"".equals(examineD) && examineD != null) {
//				SqlBuilder.WHERE("e.EXAMINE_DATE >= '" + examineD + "'");
//			}
//			if (!"".equals(examineR) && examineR != null) {
//				SqlBuilder.WHERE("e.EXAMINE_RESULT like" + "'%" + examineR
//						+ "%'");
//
//			}
//			System.out.println("查询所有数据 else ");
//		}
//		String sql_getCount = SqlBuilder.SQL();
//
//		return JDBCCount(sql_getCount);
	

	@Override
	public List<SysWorkattendance> SysWorkattendance(Integer start,
			Integer limit, String loginTime, String logoutTime) {
		System.out
				.println("------[ConHisDaoImpl.java]---SysWorkattendance---------");

		AppUser user = ContextUtil.getCurrentUser();
		System.out
				.println("[machineSelfList] - invoke(调用) : machineSelfList()");

		Query query = null;

		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		if (loginTime == null && logoutTime == null) {
			String hql = "";
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						 ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					//hql = "from Examine e order by e.examineD desc";
					hql="select * from SYS_WORKATTENDANCE s ";

				}
				
				if ("总行座席".equals(listR.get(i).getName())) {//总行座席
					 hql="select * from SYS_WORKATTENDANCE s  where s.agentid='"+ user.getUsername()+"'";

				}

			}
			hql = hql + " order by s.LOGIN_SYS_TIME desc ";
			query = getSession().createSQLQuery(hql).addEntity(SysWorkattendance.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query+"......"+query.list().size());
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		} else {
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						 ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					//hql = "from Examine e order by e.examineD desc";
					hql.append(" select * from SYS_WORKATTENDANCE s  where 1=1 ");

				}
				
				if ("总行座席".equals(listR.get(i).getName())) {// --总行座席
					hql.append(" select * from SYS_WORKATTENDANCE s  where s.agentid='"+ user.getUsername()+"'");

				}

			}
			if (!"".equals(loginTime) && loginTime != null) {
				hql.append("  and s.LOGIN_SYS_TIME>= '" + loginTime + "'");
			}
			if (!"".equals(logoutTime) && logoutTime != null) {
				hql.append(" and s.LOGOUT_SYS_TIME <='" + logoutTime + "'");
			}
			hql.append(" order by s.LOGIN_SYS_TIME desc ");
			System.out.println("==[ConHisDaoImpl.java]==loginTime=" + loginTime);
			query = getSession().createSQLQuery(hql.toString()).addEntity(SysWorkattendance.class);
			System.out.println("====SysWorkattendance[ConHisDaoImpl.java]===query=" + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();
//		Query query;
//		if (loginTime == null && logoutTime == null) {
//			System.out.println("dao   查询所有");
//			String hql = "from SysWorkattendance e order by e.loginTime desc ";
//			query = getSession().createQuery(hql);
//			System.out.println("=============query" + query);
//			query.setFirstResult(start);
//			query.setMaxResults(limit);
//			System.out.println("===start===" + start + "======" + limit);
//		} else {
//			// 多条件的查询，用StringBuffer拼接字符串，在连接的时候 不能用or，or当查询多个条件的不能任意匹配，用and(切记)
//			StringBuffer hql = new StringBuffer(
//					"from SysWorkattendance  e where 1=1 ");
//
//			if (!"".equals(loginTime) && loginTime != null) {
//				hql.append("  and e.loginTime>= '" + loginTime + "'");
//			}
//			if (!"".equals(logoutTime) && logoutTime != null) {
//				hql.append(" and e.logoutTime <='" + logoutTime + "'");
//			}
//			System.out.println("=====[ConHisDaoImpl.java]" + loginTime
//					+ "============" + logoutTime);
//			query = getSession().createQuery(hql.toString());
//			System.out.println("====[ConHisDaoImpl.java]===query=" + query);
//			query.setFirstResult(start);// hibernate自带的分页查询，起始页
//			query.setMaxResults(limit);// 结束页
//
//		}
//		return query.list();
	}

	@Override
	public Integer SysWorkattendanceCount(String loginTime, String logoutTime) {
		System.out.println("[ConHisDaoImpl.java]--ExamineReportAllCountIf  ");
		AppUser user = ContextUtil.getCurrentUser();
		List<AppRole> listR = selectRoleName(user.getUserId());
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(*)");
		// SqlBuilder.FROM("EQUIPMENT e where e.delFlag=1");
		for (int i = 0; i < listR.size(); i++) {
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					 ||"总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				SqlBuilder.FROM(" SYS_WORKATTENDANCE e");

			}
			
			if ("总行座席".equals(listR.get(i).getName())) {// 查看本支行的信息---总行座席
				SqlBuilder.FROM(" SYS_WORKATTENDANCE e");
				// "   where c.main_contact_num  =e.equipmentid  and e.bank_type_id="+user.getBankTypeId());
				SqlBuilder
						.WHERE(" e.agentid='"+ user.getUsername()+"'");
			}
			
		
			if (!"".equals(loginTime) && loginTime != null) {
				SqlBuilder.WHERE("e.LOGIN_SYS_TIME >= '" + loginTime + "'");
			}
			if (!"".equals(logoutTime) && logoutTime != null) {
				SqlBuilder.WHERE("e.LOGOUT_SYS_TIME <= '" + logoutTime + "%'");

			}
		System.out.println("SysWorkattendanceCount ");
	}
	String sql_getCount = SqlBuilder.SQL();
	return JDBCCount(sql_getCount);
//		SqlBuilder.BEGIN();
//		SqlBuilder.SELECT("count(*)");
//		SqlBuilder.FROM("SYS_WORKATTENDANCE e");
//		if (loginTime == null && logoutTime == null) {
//			System.out.println("查询所有数据");
//		} else {
//
//			if (!"".equals(loginTime) && loginTime != null) {
//				SqlBuilder.WHERE("e.LOGIN_SYS_TIME >= '" + loginTime + "'");
//			}
//			if (!"".equals(logoutTime) && logoutTime != null) {
//				SqlBuilder.WHERE("e.LOGOUT_SYS_TIME <= '" + logoutTime + "%'");
//
//			}
//			System.out.println("查询所有数据 else ");
//		}
//		String sql_count = SqlBuilder.SQL();
//		return JDBCCount(sql_count);
	}

	/**
	 * ========================================================================
	 * ============================== 机构部门的增删改
	 * 
	 * @author wkj@nk
	 * 
	 * */
	@Override
	public List<BankType> findByParentId(Long parentId) {
		System.out.println("dao[ConHisDaoImpl.java]====findByParentId");
		String hql = "from BankType b where b.bankTypeStatus = 1 and b.parentId=? order by b.createDate ";
		Query query = getSession().createQuery(hql);

		query.setLong(0, parentId);
		// System.out.println("=====[ConHisDaoImpl.java]=query"+query);
		return query.list();

	}

	/**
	 * 查找树下面的子节点 子节点信息按照c.BRANCH_ID网点号排序
	 * 
	 * @param path
	 * @return
	 */
	@Override
	public List<BankType> findByParentIdForSql(final int start,
			final int limit, String path) {
		final List<BankType> bankTypeList = new ArrayList<BankType>();
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct(c.MECHANIS_ID),c.* from (");
		sb
				.append("select a.*, b.BANK_NAME as tname from jg_mechanis a left join jg_mechanis b on a.parent_id = b.MECHANIS_ID ");
		sb.append(") c");
		sb.append(" where path like '%" + path + "%'");
		sb.append(" and BANK_TYPE_STATUS = 1");
		sb.append("order by c.BRANCH_ID");
		// sb.append(" order by tname asc");
		final String sql = sb.toString();
		// System.out.println("====sql"+sql);
		final List<BigDecimal> idList = new ArrayList<BigDecimal>();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() { // 原生SQL查询不出知识相关对象及SET集合
							@Override
							public void execute(Connection con)
									throws SQLException {
								PreparedStatement ps = con.prepareStatement(
										sql, ResultSet.TYPE_SCROLL_SENSITIVE,
										ResultSet.CONCUR_UPDATABLE);
								java.sql.ResultSet rs = ps.executeQuery();
								if (rs.next()) {// 至少有一条记录，才可以定位
									rs.absolute(start + 1);
									idList
											.add(rs
													.getBigDecimal("MECHANIS_ID"));
									typeListAdd(bankTypeList, rs);
								}
								for (int i = 0; i < limit - 1; i++) {
									if (rs.next()) {
										idList.add(rs
												.getBigDecimal("MECHANIS_ID"));
										typeListAdd(bankTypeList, rs);
									}
								}
							}
						});
				return null;
			}
		});
		return bankTypeList;

	}

	public List<BankType> typeListAdd(List<BankType> bankTypeList, ResultSet rs)
			throws SQLException {
		BankType bankType = new BankType();
		bankType.setBankTypeId(rs.getLong("MECHANIS_ID"));
		bankType.setBankname(rs.getString("BANK_NAME"));
		bankType.setParentId(rs.getLong("PARENT_ID"));
		// bankType.setUpdateTime(rs.getDate("UPDATE_TIME"));
		// bankType.setBranchId("BRANCH_ID");注意：写成这个的前台页面收到的值：BRANCH_ID
		bankType.setBranchId(rs.getString("BRANCH_ID"));// 获取数据库中的值放在前台
		bankType.setPath(rs.getString("PATH"));
		bankType.setBankTypeStatus(rs.getInt("BANK_TYPE_STATUS"));
		bankType.setCreateBy(rs.getLong("CREATE_BY"));
		bankType.setCreateDate(rs.getTimestamp("CREATE_DATE"));
		String parentName = rs.getString("TNAME");
		if (parentName != null) {
			bankType.setParentName(parentName);
		} else {
			bankType.setParentName("总行");
		}
		bankTypeList.add(bankType);
		return bankTypeList;
	}

	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序(获得数量)
	 * 
	 * @param path
	 * @return
	 * @author wkj@nk
	 */
	@Override
	public int findByParentIdForSqlCount(final int start, final int limit,
			String path) {
		final List<Integer> knowList = new ArrayList<Integer>();
		StringBuffer sb = new StringBuffer();
		sb.append("select count(distinct(c.MECHANIS_ID)) from (");
		sb
				.append("select a.*, b.BANK_NAME as tname from jg_mechanis a left join jg_mechanis b on a.parent_id = b.MECHANIS_ID ");
		sb.append(") c");
		sb.append(" where path like '%" + path + "%'");
		sb.append(" and BANK_TYPE_STATUS = 1");
		sb.append("order by c.BRANCH_ID");
		// sb.append(" order by tname asc");
		final String sql = sb.toString();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() { // 原生SQL查询不出知识相关对象及SET集合
							@Override
							public void execute(Connection con)
									throws SQLException {
								PreparedStatement ps = con.prepareStatement(
										sql, ResultSet.TYPE_SCROLL_SENSITIVE,
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
	 * 机构部门的添加及保存操作
	 * 
	 * @author wkj@nk
	 */
	public void addBankType(String curDate, String bankName, Long parentId,
			String branchId) {
		// System.out.println("==[ConHisDaoImpl.java]==curDate"+curDate+"======="+bankName+"====="+
		// parentId);
		// System.out.println("=====[ConHisDaoImpl.java]=========addBankType    dao");
		Transaction tx = getSession().beginTransaction();// 创建事物
		BankType bt = new BankType();
		if (curDate != null) {
			SimpleDateFormat format = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			try {
				System.out.println("try");
				Date date1 = format.parse(curDate);
				System.out.println("date1" + date1);
				bt.setCreateDate(date1);
			} catch (ParseException e) {
				System.out.println("时间出错");
				e.printStackTrace();
			}
			String path = "";
			if (branchId != null) {
				bt.setBranchId(branchId);
			}
			Long curUser = ContextUtil.getCurrentUser().getUserId();

			if (bt.getBankTypeId() == null) {
				bt.setBankTypeStatus(1);// 新增未启用
				bt.setCreateBy(curUser);
				bt.setBankname(bankName);
				getSession().saveOrUpdate(bt);
				bt.setParentId(parentId);// 父节点
				if (parentId < 1) {
					path = "0";
				} else {
					// path=bt.getPath();//获取当前路径
					path = 0 + "." + bt.getParentId();
					// path=path+"."+bt.getPath();
					// System.out.println("==[ConHisDaoImpl.java]===path"+path);
				}
				bt.setPath(path + "." + bt.getBankTypeId());
				getSession().saveOrUpdate(bt);
			}

			tx.commit();// 提交事务

		}
	}

	@Override
	public List<BankType> collectFindByParentIdForRole(Long parentId) {
		StringBuffer sb = new StringBuffer();
		sb
				.append("select distinct(b.MECHANIS_ID),b.BRANCH_ID from jg_mechanis b ");
		sb.append("where b.parent_id = " + parentId
				+ " and  b.BANK_TYPE_STATUS=1 ");
		sb.append(" order by b.MECHANIS_ID");
		final String sql = sb.toString();
		// System.out.println("===[ConHisDaoImpl.java]===sql"+sql);
		final List<BigDecimal> idList = new ArrayList<BigDecimal>();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() { // 原生SQL查询不出知识相关对象及SET集合
							@Override
							public void execute(Connection con)
									throws SQLException {
								PreparedStatement ps = con.prepareStatement(
										sql, ResultSet.TYPE_SCROLL_SENSITIVE,
										ResultSet.CONCUR_UPDATABLE);
								java.sql.ResultSet rs = ps.executeQuery();
								while (rs.next()) {// 至少有一条记录，才可以定位
									idList
											.add(rs
													.getBigDecimal("MECHANIS_ID"));
								}
								ps.close();
								rs.close();
							}

						});
				return idList;
			}
		});
		String hql = "from BankType d ";
		if (idList.size() > 0) {
			hql = hql + " where";
			String ids = "";
			StringBuffer strBuffer = new StringBuffer();
			for (BigDecimal id : idList) {
				strBuffer.append(id);
				strBuffer.append(",");
			}
			ids = strBuffer.deleteCharAt(strBuffer.length() - 1).toString();
			hql = hql + " d.bankTypeId in (" + ids + ")";

		} else {
			hql = hql + " where d.bankTypeId = -1";
		}
		hql = hql + "  order by d.branchId  ";
		Query query = getSession().createQuery(hql);
		// System.out.println("==[ConHisDaoImpl.java]===query"+query.list()+"[[[["+query);
		return query.list();

	}

	/**
	 * 删除bank @author NK
	 * */
	public void getDelBank(Long bankTypeId) {
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) =getDelBank()  bankTypeId="
						+ bankTypeId);
		Transaction tx = getSession().beginTransaction();
		BankType bt = new BankType();
		Query query = getSession()
				.createSQLQuery(
						"update  jg_mechanis b set b.bank_type_status=2 where  b.MECHANIS_ID=?");
		System.out.println("[ConHisDaoImpl.java]  query" + query);
		query.setLong(0, bankTypeId);
		System.out
				.println("[ConHisDaoImpl.java] -update BankType b set  where bankTypeId=?"
						+ bankTypeId);
		query.executeUpdate();
		tx.commit();

	}

	/*
	 * 2015-01-17
	 * 
	 * @anthor :wkj 机构部门的修改
	 */

	public void updateBankType(Long bankTypeId, String bankName,
			String updateDate, String branchId) {
		System.out.println("====branchId=" + branchId);
		Transaction tx = getSession().beginTransaction();// 开启事物
		BankType bankType = new BankType();
		String hql = "update jg_mechanis e set e.BANK_NAME=?,e.update_date=to_date('"
				+ updateDate + "','yyyy-MM-ddhh24:mi:ss')";
		if (branchId != null) {
			hql = hql + ",e.BRANCH_ID='" + branchId + "'";
		}
		hql = hql + " where e.MECHANIS_ID=?";
		Query query = getSession().createSQLQuery(hql);
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) updateBankType =query"
						+ query);
		// System.out.println("=======update=====query" + query);
		query.setString(0, bankName);
		// query.setString(1, updateDate);
		query.setLong(1, bankTypeId);
		System.out.println("e.equipmentId=?,e.equipmentName=? where EId=?"
				+ bankTypeId);
		query.executeUpdate();

		tx.commit();// 提交事物

		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用)==updateBankType===成功");

	}

	@Override
	public List<BankType> getProvince() {
		String hql = "from BankType b where b.bankTypeStatus =1 and b.parentId=?  order by  b.branchId ";
		Query query = getSession().createQuery(hql);
		query.setLong(0, 0);
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : getProvince()...");
		return query.list();

	}

	@Override
	public List<BankType> selectparentName(Long id) {
		String hql = "from BankType b where b.bankTypeStatus =1 and b.parentId= '"
				+ id + "'";
		// System.out.println("sql->"+hql);
		List<BankType> eList = this.getHibernateTemplate().find(hql);
		if (eList.size() == 0) {
			return null;
		} else {
			return eList;
		}

	}

	@Override
	public void insertOperationData(Long BS_Num, String agentid,
			String insertTime, String Stype) {
		// TODO Auto-generated method stub
		System.out.println("insertOperationData DAO >>>>> ");
		Transaction ts = getSession().beginTransaction(); // 创建事物并开始
		OperationData od = new OperationData();
		od.setBS_Num(BS_Num);
		od.setAgentId(agentid);
		od.setInsertTime(insertTime);
		od.setStype(Stype);
		this.getHibernateTemplate().saveOrUpdate(od);
		System.out.println("save OperationData SUCCESS");
		ts.commit(); // 提交结束事物
	}

	@Override
	public OperationData selectMaxOpera() {
		System.out.println("进入Service  selectMaxOpera方法");
		String hql = "from OperationData od";
		List<OperationData> oDataList = this.getHibernateTemplate().find(hql);
		Long bsnum = new Long(0);
		for (int i = 0; i < oDataList.size(); i++) {
			if (oDataList.get(i).getBS_Num() > bsnum) {
				bsnum = oDataList.get(i).getBS_Num();
			}
		}
		System.out.println("进入DaoImpl  operation.BS_Num = " + bsnum);
		String hql1 = "from OperationData ods where ods.BS_Num = " + bsnum;
		System.out.println("----------------");
		List<OperationData> oList = this.getHibernateTemplate().find(hql1);
		return oList.get(0);
	}

	@Override
	public void insertWorkAttendance(Long BS_num, String agentid,
			String loginsystime, String loginctitime, String logoutsystime,
			String status, String reason, String remarks) {
		// TODO Auto-generated method stub
		System.out.println("insertWorkAttendance DAO >>>>> ");
		Transaction ts = getSession().beginTransaction(); // 创建事物并开始
		SysWorkattendance wa = new SysWorkattendance();
		wa.setBsNum(BS_num);
		wa.setAgentId(agentid);
		wa.setLoginTime(loginsystime);
		wa.setLoginCtiTime(loginctitime);
		wa.setLogoutTime(logoutsystime);
		wa.setStatus(status);
		wa.setReason(reason);
		wa.setRemarks(remarks);
		this.getHibernateTemplate().saveOrUpdate(wa);
		System.out.println("save insertWorkAttendance SUCCESS");
		ts.commit(); // 提交结束事物
	}

	@Override
	public List<MachineSelf> machineSelfList(Integer start, Integer limit,
			String wdNum, String cusName, String tellernum,
			String tradedateStart, String tradedateEnd, String traderesult) {
		System.out.println("[machineSelfList] - invoke(调用) : machineSelfList()");

		AppUser user = ContextUtil.getCurrentUser();
		System.out.println("[machineSelfList] - invoke(调用) : machineSelfList()");

		Query query = null;

		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		if (wdNum == null && cusName == null && tellernum == null
				&& tradedateStart == null && tradedateEnd == null
				&& traderesult == null) {
			String hql = "";
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName())||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql = " select  c.*  from  MACHINE_SELF c ";

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点
					// select c.* from con_his c ,equipment e,app_user a where
					// c.main_contact_num =e.equipmentid and
					// e.bank_type_id=a.bank_type_id
					hql = "select c.*  from  MACHINE_SELF c , equipment e  "
							+ "  where c.MS_WDNUM  =e.BRANCH_ID   and e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0) ";// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql=" select c.*  from  MACHINE_SELF c , equipment e ,jg_mechanis jm " +
							" where c.MS_WDNUM  =e.BRANCH_ID  and  e.bank_type_id=jm.mechanis_id " +
							" and jm.path like '0."+user.getBankTypeId()+"%' and e.delflag=1 and jm.bank_type_status=1 ";

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//					hql = " select c.*  from  MACHINE_SELF c , equipment e "
//							+ "   where c.MS_WDNUM  =e.BRANCH_ID  and e.delflag=1  and e.bank_type_id="
//							+ user.getBankTypeId();

					hql = " select c.*  from  MACHINE_SELF c , equipment e ,UlEmployee_Equipment ue "
						+ "   where c.MS_WDNUM  =e.BRANCH_ID  and e.delflag=1  and e.equipmentid =ue.equipment_id and e.bank_type_id="
						+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'";

				}

			}
			hql = hql + " order by c.MS_TRADEDATE desc ";
			query = getSession().createSQLQuery(hql).addEntity(
					MachineSelf.class);
			
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		} else {
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName())||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql
							.append(" select  c.*  from  MACHINE_SELF c  where 1=1 ");

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点
					// select c.* from con_his c ,equipment e,app_user a where
					// c.main_contact_num =e.equipmentid and
					// e.bank_type_id=a.bank_type_id
					hql.append("select c.*  from  MACHINE_SELF c , equipment e  "
									+ " where c.MS_WDNUM=e.BRANCH_ID  and  e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0)");// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql.append(" select c.*  from  MACHINE_SELF c , equipment e ,jg_mechanis jm " +
							" where c.MS_WDNUM  =e.BRANCH_ID  and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//					hql.append(" select c.*  from  MACHINE_SELF c , equipment e    where c.MS_WDNUM  =e.BRANCH_ID and e.delflag=1 and e.bank_type_id="
//									+ user.getBankTypeId());
					hql.append(" select c.*  from  MACHINE_SELF c , equipment e  ,UlEmployee_Equipment ue   " +
							" where c.MS_WDNUM  =e.BRANCH_ID and e.equipmentid =ue.equipment_id  and e.delflag=1 and e.bank_type_id="
							+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");

				}

			}
			if (!"".equals(wdNum) && wdNum != null) {
				hql.append(" and c.MS_WDNUM like '%" + wdNum + "%'");
			}
			if (!"".equals(cusName) && cusName != null) {
				hql.append(" and c.MS_CUSNAME like '%" + cusName + "%'");
			}
			if (!"".equals(tellernum) && tellernum != null) {
				hql.append(" and c.MS_TELLERNUM like '%" + tellernum + "%'");
			}
			if (!"".equals(tradedateStart) && tradedateStart != null) {
				hql.append(" and c.MS_TRADEDATE >= '" + tradedateStart + "'");
			}
			if (!"".equals(tradedateEnd) && tradedateEnd != null) {
				hql.append(" and c.MS_TRADEDATE <= '" + tradedateEnd
						+ " 23:59:59'");
			}
			if (!"".equals(traderesult) && traderesult != null) {
				hql.append(" and c.MS_TRADERESULT like" + "'%" + traderesult
						+ "%'");
			}
			hql.append(" order by c.MS_TRADEDATE desc");
			query = this.getSession().createSQLQuery(hql.toString()).addEntity(
					MachineSelf.class);
			// query = getSession().createQuery(hql.toString());
			System.out.println("[ConHisDaoImpl.java] - query :i " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();
	}

	@Override
	public Integer machineSelfCount(String wdNum, String cusName,
			String tellernum, String tradedateStart, String tradedateEnd,
			String traderesult) {
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : machineSelfCount()...");

		AppUser user = ContextUtil.getCurrentUser();
		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("【UlEmployeeDaoImpl 】调用==listEquipmentRoleCount  ");
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(m.MS_ID)");
		// SqlBuilder.FROM("EQUIPMENT e where e.delFlag=1");
		for (int i = 0; i < listR.size(); i++) {
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					|| "总行座席".equals(listR.get(i).getName()) || "总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				SqlBuilder.FROM(" MACHINE_SELF m ");

			}
			if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

				SqlBuilder.FROM(" MACHINE_SELF m , equipment e  ");
				// "  where c.main_contact_num  =e.equipmentid and e.bank_name like '北京%'");//中关村分行、北京管理部、郊区管理部、总行营业部
				SqlBuilder
						.WHERE("  m.MS_WDNUM  =e.BRANCH_ID and (e.bank_name like '北京%' or e.parent_id=0)");
			}
			if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//				SqlBuilder.FROM("  MACHINE_SELF m , equipment e ");
//				// "   where c.main_contact_num  =e.equipmentid  and e.bank_type_id="+user.getBankTypeId());
//				SqlBuilder
//						.WHERE(" m.MS_WDNUM  =e.BRANCH_ID  and e.bank_type_id="
//								+ user.getBankTypeId());
				SqlBuilder.FROM("  MACHINE_SELF m , equipment e ,UlEmployee_Equipment ue ");
//				// "   where c.main_contact_num  =e.equipmentid  and e.bank_type_id="+user.getBankTypeId());
				SqlBuilder.WHERE(" m.MS_WDNUM  =e.BRANCH_ID  and e.equipmentid =ue.equipment_id  and e.bank_type_id="
								+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
			}
			if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
				//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
				SqlBuilder.FROM("  MACHINE_SELF m , equipment e ,jg_mechanis jm ");
				//hql.append(" select c.*  from  MACHINE_SELF c , equipment e ,jg_mechanis jm " +
				SqlBuilder
				.WHERE(" m.MS_WDNUM  =e.BRANCH_ID  and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

			}
		}
		if (!"".equals(wdNum) && wdNum != null) {
			System.out.println("[ConHisDaoImpl.java] - wdNum=" + wdNum);
			SqlBuilder.WHERE(" m.MS_WDNUM like" + "'%" + wdNum + "%'");
		}
		if (!"".equals(cusName) && cusName != null) {
			SqlBuilder.WHERE("m.MS_CUSNAME like" + "'%" + cusName + "%'");
		}
		if (!"".equals(tellernum) && tellernum != null) {
			SqlBuilder.WHERE("m.MS_TELLERNUM like" + "'%" + tellernum + "%'");
		}
		if (!"".equals(tradedateStart) && tradedateStart != null) {
			SqlBuilder.WHERE("m.MS_TRADEDATE >= '" + tradedateStart + "'");
		}
		if (!"".equals(tradedateEnd) && tradedateEnd != null) {
			SqlBuilder.WHERE("m.MS_TRADEDATE <= '" + tradedateEnd
					+ " 23:59:59'");
		}
		if (!"".equals(traderesult) && traderesult != null) {
			SqlBuilder.WHERE("m.MS_TRADERESULT like" + "'%" + traderesult
					+ "%'");
		}
		System.out.println("查询所有数据 else ");

		String sql_getCount = SqlBuilder.SQL();

		return JDBCCount(sql_getCount);
	}

	/**
	 * 20150209 自助终端详细文件信息 Fernando
	 */
	@Override
	public List<MachineSelfAttach> machSelfAttachList(String msid) {
		// TODO Auto-generated method stub
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : machSelfAttachList()");
		String hql = "from MachineSelfAttach msf where msf.machineSelfid = '"
				+ msid + "'";
		System.out
				.println("[ConHisDaoImpl.java] - hql = from MachineSelfAttach msf where msf.machineSelfid = "
						+ msid);
		List<MachineSelfAttach> mList = (List<MachineSelfAttach>) this
				.getHibernateTemplate().find(hql);
		System.out
				.println("[ConHisDaoImpl.java] - List size = " + mList.size());
		return mList;
	}

	/**
	 * 业务资料查询
	 * 
	 * @author wangkaijuan 2015/05/06
	 */
	public List<ConHis> conHisList(Integer start, Integer limit, Long userid,
			String dealStaId, String busTypId, String buluS, String serialNum,
			String startimes, String endtimes, String mainContactNum,
			String agentName) {
		JdbcHelper helper = new JdbcHelper();
		SqlBuilder.BEGIN();
		AppUser currentUser = ContextUtil.getCurrentUser();

		List<BankType> parentid = new ArrayList<BankType>();
		System.out.println("currentUser" + currentUser.getBankTypeId());
		if (userid == 0 || currentUser.getBankTypeId() == 0) {
			System.out.println("总行---admin" + currentUser.getBankTypeId());
		} else {
			System.out.println("else==parentid" + currentUser.getBankTypeId());
			parentid = findByParentId(currentUser.getBankTypeId());
		}

		StringBuffer buff = new StringBuffer();
		if (dealStaId == null && busTypId == null && buluS == null
				&& serialNum == null && startimes == null && endtimes == null
				&& mainContactNum == null && agentName == null) {
			if (userid == 0 || currentUser.getBankTypeId() == 0) {

				buff.append(" select distinct * from con_His c  ");
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有总行数据");
			} else if (parentid.size() != 0 && currentUser.getBankTypeId() != 0) {// 分行---总行
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有分行数据");
				buff
						.append("select c.*  from con_his c ,equipment e,app_user a where "
								+ " c.main_contact_num  =e.equipmentid and e.parent_Id=a.bank_type_id and userid = "
								+ userid);
			} else if (parentid.size() == 0 && currentUser.getBankTypeId() != 0) {// 支行
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有支行数据 parentid.size()"
								+ parentid.size());
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有支行数据currentUser.getBankname()"
								+ currentUser.getBankname());
				if ("客服中心".equals(currentUser.getBankname())
						|| "0".equals(currentUser.getBankTypeId())) {// 这个部门可以查看全行的业务资料
					buff.append(" select * from con_His c  ");
					System.out
							.println("[ConHisDaoImpl.java] - if(All is Null) 电子银行部-> 查询所有总行数据");

				} else {
					buff
							.append("select c.* from con_his c where c.main_contact_num  in (select e.equipmentid from equipment e where e.bank_type_id in (select a.bank_type_id from app_user a where "
									+ "userid = " + userid + " ))");
				}

			}

		} else {
			if (userid == 0 || currentUser.getBankTypeId() == 0) {
				buff.append(" select * from con_His c where 1=1 ");
			} else if (parentid.size() != 0) {
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有分行数据");
				buff
						.append("select c.*  from con_his c ,equipment e,app_user a where "
								+ " c.main_contact_num  =e.equipmentid and e.parent_Id=a.bank_type_id and userid = "
								+ userid);
			} else {
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有支行数据 parentid.size()"
								+ parentid.size());
				if ("客服中心".equals(currentUser.getBankname())
						|| "0".equals(currentUser.getBankTypeId())) {
					buff.append(" select * from con_His c where 1=1 ");
					System.out
							.println("[ConHisDaoImpl.java] - if(All is Null) 电话营业部-> 查询所有总行数据");
				} else {
					buff
							.append("select c.*  from con_his c ,equipment e,app_user a where  c.main_contact_num  =e.equipmentid and e.bank_type_id=a.bank_type_id and userid = "
									+ userid);
					// buff.append("select c.* from con_his c where c.main_contact_num  in (select e.equipmentid from equipment e where e.bank_type_id in (select a.bank_type_id from app_user a where "
					// +
					// "userid = " +userid+
					// " ))");
				}
			}

			if (!"".equals(dealStaId) && dealStaId != null) {// 处理结果
				System.out.println("[ConHisDaoImpl.java] - wdNum=" + dealStaId);
				// SqlBuilder.WHERE("c.DEAL_STA_ID like"+"'%"+dealStaId+"%'");
				buff.append(" and c.DEAL_STA_ID like" + "'%"
						+ new Short(dealStaId) + "%'");
			}
			if (!"".equals(busTypId) && busTypId != null) {// 业务办理
				// SqlBuilder.WHERE("c.BUS_TYP_ID like"+"'%"+busTypId+"%'");
				if ("0".equals(busTypId)) {
					buff.append(" and  c.BUS_TYP_ID is null or c.BUS_TYP_ID ="
							+ new Short(busTypId));
				} else {
					// buff.append(" and c.BUS_TYP_ID like"+"'%"+new
					// Short(busTypId)+"%'");
					buff.append(" and c.BUS_TYP_ID =" + new Short(busTypId));
				}

			}
			if (!"".equals(buluS) && buluS != null) {// 补录信息
				// SqlBuilder.WHERE("c.REMARKS like"+"'%"+buluS+"%'");
				buff.append(" and c.REMARKS like" + "'%" + buluS + "%'");

			}
			if (!"".equals(startimes) && startimes != null) {// 开始时间

				buff.append(" and to_char( c.STA_TIME,'yyyy-MM-dd') >= '"
						+ startimes + "'");
			}
			if (!"".equals(endtimes) && endtimes != null) {// 结束时间
				// SqlBuilder.WHERE("c.END_TIME <= '" +endtimes+" 23:59:59'");
				buff.append(" and to_char( c.END_TIME,'yyyy-MM-dd') <= '"
						+ endtimes + " 23:59:59'");
				// buff.append(" and c.END_TIME <= '"
				// +endtimes.replace("-","/")+" 23:59:59'");
			}
			if (!"".equals(mainContactNum) && mainContactNum != null) {// 设备编号
				// SqlBuilder.WHERE("c.MAIN_CONTACT_NUM like"+"'%"+mainContactNum+"%'");
				buff.append(" and c.MAIN_CONTACT_NUM like" + "'%"
						+ mainContactNum + "%'");
			}
			if (!"".equals(serialNum) && serialNum != null) {// 流水号
				// SqlBuilder.WHERE("c.AGENT_NAME like"+"'%"+agentName+"%'");
				buff.append(" and c.SERIAL_NUM like" + "'%" + serialNum + "%'");
			}
			if (!"".equals(agentName) && agentName != null) {// 坐席员
				// SqlBuilder.WHERE("c.AGENT_NAME like"+"'%"+agentName+"%'");
				buff.append(" and c.AGENT_NAME like" + "'%" + agentName + "%'");
			}

		}
		buff.append("   order by c.service_id desc,c.con_his_id asc ");
		String sql = buff.toString();
		helper.setSql(sql);
		logger.debug("sql : " + sql);
		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				List<ConHis> result = new ArrayList<ConHis>();
				try {
					while (rs.next()) {
						ConHis r = new ConHis();
						AppUser ap = new AppUser();
						r.setConHisId(rs.getLong("CON_HIS_ID"));
						r.setAgentName(rs.getString("AGENT_NAME"));
						r.setBusTypId(rs.getShort("BUS_TYP_ID"));
						r.setConResId(rs.getShort("CON_RES_ID"));
						r.setConResRemarks(rs.getString("CON_RES_REMARKS"));
						r.setContactTypeId(rs.getShort("CONTACT_TYPE_ID"));
						r.setCredNum(rs.getString("CRED_NUM"));
						r.setCusName(rs.getString("CUS_NAME"));
						r.setCustomerid(rs.getLong("CUSTOMERID"));
						r.setDealStaId(rs.getShort("DEAL_STA_ID"));
						r.setDirId(rs.getShort("DIR_ID"));
						r.setEndTime(rs.getDate("END_TIME"));
						r.setLastContactNum(rs.getString("LAST_CONTACT_NUM"));
						r.setLinkmanid(rs.getLong("LINKMANID"));
						r.setMainContactNum(rs.getString("MAIN_CONTACT_NUM"));
						r.setOwnerId(rs.getInt("OWNER_ID"));
						r.setPlanId(rs.getLong("PLAN_ID"));
						r.setPreContactNum(rs.getString("PRE_CONTACT_NUM"));
						r.setRemarks(rs.getString("REMARKS"));
						r.setSerialNum(rs.getString("SERIAL_NUM"));
						r.setServiceId(rs.getLong("SERVICE_ID"));
						r.setSrcTypeId(rs.getShort("SRC_TYPE_ID"));
						r.setStaTime(rs.getDate("STA_TIME"));
						r.setStatusId(rs.getShort("STATUS_ID"));
						result.add(r);
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return result;
			}
		};
		helper.setJdbcWork(sqlWork);
		// help.setJdbcWork(getdata);
		helper.setSql(JdbcHelper.getPagingSql(sql, start, limit));
		return (List<ConHis>) getHibernateTemplate().execute(helper);

	}

	/**
	 * 业务资料总数
	 * 
	 * @author wangkaijuan 2015/05/06
	 */
	@Override
	public int conHisListCount(Long userid, String dealStaId, String busTypId,
			String buluS, String serialNum, String startimes, String endtimes,

			String mainContactNum, String agentName) {
		StringBuffer buff = new StringBuffer();
		AppUser currentUser = ContextUtil.getCurrentUser();
		List<BankType> parentid = new ArrayList<BankType>();
		if (userid == 0) {
			System.out.println("总行---admin");
		} else {

			parentid = findByParentId(currentUser.getBankTypeId());
		}
		if (dealStaId == null && busTypId == null && buluS == null
				&& serialNum == null && startimes == null && endtimes == null
				&& mainContactNum == null && agentName == null) {
			System.out
					.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有数据");
			if (userid == 0 || currentUser.getBankTypeId() == 0) {
				buff
						.append(" SELECT count(distinct (c.CON_HIS_ID)) as conHiscount from con_his c where 1=1 ");
			} else if (parentid.size() != 0) {
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有分行数据");
				buff
						.append("SELECT count(distinct (c.CON_HIS_ID)) as conHiscount from con_his c ,equipment e,app_user a where  c.main_contact_num  =e.equipmentid and e.bank_type_id=a.bank_type_id and userid = "
								+ userid);
			} else {
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有支行数据 parentid.size()"
								+ parentid.size());
				if ("客服中心".equals(currentUser.getBankname())
						|| "0".equals(currentUser.getBankTypeId())) {
					buff
							.append(" SELECT count(distinct (c.CON_HIS_ID)) as conHiscount from con_his c where 1=1 ");
					System.out
							.println("[ConHisDaoImpl.java] - if(All is Null) 电话营业部-> 查询所有总行数据");
				} else {
					buff
							.append("SELECT count(distinct (c.CON_HIS_ID)) as conHiscount from con_his c ,equipment e,app_user a where  c.main_contact_num  =e.equipmentid and e.bank_type_id=a.bank_type_id and userid = "
									+ userid);
				}
			}
		} else {
			if (userid == 0 || currentUser.getBankTypeId() == 0) {
				buff
						.append(" SELECT count(distinct (c.CON_HIS_ID)) as conHiscount from con_his c where 1=1 ");
			} else if (parentid.size() != 0) {
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有分行数据");
				buff
						.append("SELECT count(distinct (c.CON_HIS_ID)) as conHiscount from con_his c ,equipment e,app_user a where  c.main_contact_num  =e.equipmentid and e.bank_type_id=a.bank_type_id and userid = "
								+ userid);
			} else {
				System.out
						.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有支行数据 parentid.size()"
								+ parentid.size());
				if ("客服中心".equals(currentUser.getBankname())
						|| "0".equals(currentUser.getBankTypeId())) {
					buff
							.append(" SELECT count(distinct (c.CON_HIS_ID)) as conHiscount from con_his c where 1=1 ");
					System.out
							.println("[ConHisDaoImpl.java] - if(All is Null) 电话营业部-> 查询所有总行数据");
				} else {
					buff
							.append("SELECT count(distinct (c.CON_HIS_ID)) as conHiscount from con_his c ,equipment e,app_user a where  c.main_contact_num  =e.equipmentid and e.bank_type_id=a.bank_type_id and userid = "
									+ userid);
				}
			}
			if (!"".equals(dealStaId) && dealStaId != null) {
				System.out.println("[ConHisDaoImpl.java] - wdNum=" + dealStaId);
				// SqlBuilder.WHERE("c.DEAL_STA_ID like"+"'%"+dealStaId+"%'");
				buff.append(" and c.DEAL_STA_ID like" + "'%"
						+ new Short(dealStaId) + "%'");
			}
			if (!"".equals(busTypId) && busTypId != null) {
				// SqlBuilder.WHERE("c.BUS_TYP_ID like"+"'%"+busTypId+"%'");
				if ("0".equals(busTypId)) {
					buff.append(" and  c.BUS_TYP_ID is null or c.BUS_TYP_ID ="
							+ new Short(busTypId));
				} else {
					// buff.append(" and c.BUS_TYP_ID like"+"'%"+new
					// Short(busTypId)+"%'");
					buff.append(" and c.BUS_TYP_ID =" + new Short(busTypId));
				}
				// buff.append(" and c.BUS_TYP_ID like"+"'%"+new
				// Short(busTypId)+"%'");
			}
			if (!"".equals(buluS) && buluS != null) {
				// SqlBuilder.WHERE("c.REMARKS like"+"'%"+buluS+"%'");
				buff.append(" and c.REMARKS like" + "'%" + buluS + "%'");

			}
			if (!"".equals(startimes) && startimes != null) {
				buff.append(" and to_char( c.STA_TIME,'yyyy-MM-dd') >= '"
						+ startimes + "'");
			}
			if (!"".equals(endtimes) && endtimes != null) {
				// SqlBuilder.WHERE("c.END_TIME <= '" +endtimes+" 23:59:59'");
				buff.append(" and to_char( c.END_TIME,'yyyy-MM-dd') <= '"
						+ endtimes + " 23:59:59'");
			}
			if (!"".equals(mainContactNum) && mainContactNum != null) {
				// SqlBuilder.WHERE("c.MAIN_CONTACT_NUM like"+"'%"+mainContactNum+"%'");
				buff.append(" and c.MAIN_CONTACT_NUM like" + "'%"
						+ mainContactNum + "%'");
			}

			if (!"".equals(agentName) && agentName != null) {
				// SqlBuilder.WHERE("c.AGENT_NAME like"+"'%"+agentName+"%'");
				buff.append(" and c.AGENT_NAME like" + "'%" + agentName + "%'");
			}
		}

		String sql = buff.toString();
		JdbcHelper helper = new JdbcHelper();
		helper.setSql(sql);
		logger.debug("sql : " + sql);
		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				int count = 0;
				try {
					while (rs.next()) {
						count = rs.getInt("conHiscount");
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return count;
			}
		};
		helper.setJdbcWork(sqlWork);
		Integer conHiscount = (Integer) getHibernateTemplate().execute(helper);

		return conHiscount;

	}

	@Override
	public List<BankType> selectName() {
		String hql = "from BankType b where b.bankTypeStatus =1 ";
		// System.out.println("sql->"+hql);
		List<BankType> eList = this.getHibernateTemplate().find(hql);
		return eList;
	}

	// ---------------------------------------------------20150630----wkj--------------------清机加卡---------------------
	@Override
	public List<QJContractRecordId> ContractRecordList(Integer start,
			Integer limit, Long userid, String serialNum, String startimes,
			String endtimes, String mainContactNum) {
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : MachineSefList()");
		Query query;

		if (serialNum == null && startimes == null && endtimes == null
				&& mainContactNum == null) {
			System.out
					.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有数据");
			// String hql = "from ContractRecord e ";
			String hql = "SELECT c.* "
					+ "  FROM QJ_CONTRACT_RECORD c"
					+ "  left join equipment e on c.OPERATOR_ID = e.OPERATOR_ID"
					+ "  left join app_user a on e.bank_type_id = a.bank_type_id";

			System.out.println("==hql===" + hql);
			// query=getSession().createQuery(hql);
			// query = getSession().createSQLQuery(hql);
			query = this.getSession().createSQLQuery(hql).addEntity(
					QJContractRecordId.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);
			query.setMaxResults(limit);
		} else {
			// 多条件的查询，用StringBuffer拼接字符串，在连接的时候 不能用or，or当查询多个条件的任意匹配时，用and(切记)
			// hql=new StringBuffer("");
			StringBuffer hql = new StringBuffer(
					"from ContractRecord e where 1=1");
			// hql.append("from ContractRecordId e where 1=1");
			if (!"".equals(serialNum) && serialNum != null) {
				hql.append(" and e.id.serialNumber like '%" + serialNum + "%'");
			}

			if (!"".equals(startimes) && startimes != null) {
				hql.append(" and e.id.contracttime >= '" + startimes
						+ "' and e.id.contracttime <= '" + startimes
						+ " 23:59:59'");
			}
			if (!"".equals(endtimes) && endtimes != null) {
				hql.append(" and e.id.equipmentName like '% '" + endtimes
						+ "%'");
			}
			if (!"".equals(mainContactNum) && mainContactNum != null) {
				hql.append(" and e.id.operatorId like" + "'%" + mainContactNum
						+ "%'");
			}
			// hql.append(" order by e.tradedate desc");
			System.out.println("[ConHisDaoImpl.java] - tellernum="
					+ mainContactNum + "   SQL = " + hql);
			query = getSession().createQuery(hql.toString());
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();
	}

	@Override
	public List<QJContractRecordId> ListAdd(final Integer start,
			final Integer limit) {
		final List<QJContractRecordId> contractRecordId = new ArrayList<QJContractRecordId>();
		StringBuffer sb = new StringBuffer();
		sb
				.append("SELECT e.EQUIPMENTNAME,c.* FROM contract_record c  left join equipment e on c.OPERATOR_ID = e.OPERATOR_ID  left join app_user a on e.bank_type_id = a.bank_type_id");

		final String sql = sb.toString();
		// final List<BigDecimal> idList = new ArrayList<BigDecimal>();
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() { // 原生SQL查询不出知识相关对象及SET集合
							@Override
							public void execute(Connection con)
									throws SQLException {
								PreparedStatement ps = con.prepareStatement(
										sql, ResultSet.TYPE_SCROLL_SENSITIVE,
										ResultSet.CONCUR_UPDATABLE);
								java.sql.ResultSet rs = ps.executeQuery();
								// if (rs.next()) {// 至少有一条记录，才可以定位
								rs.absolute(start + 1);
								// idList.add(rs.getBigDecimal("know_type_id"));
								ListAdd(contractRecordId, rs);
								// }
								for (int i = 0; i < limit - 1; i++) {
									if (rs.next()) {
										// idList.add(rs.getBigDecimal("know_type_id"));
										ListAdd(contractRecordId, rs);
									}
								}
							}
						});
				return null;
			}
		});
		return contractRecordId;

	}

	public List<QJContractRecordId> ListAdd(
			List<QJContractRecordId> contractRecordId, ResultSet rs)
			throws SQLException {
		QJContractRecordId cr = new QJContractRecordId();
		cr.setBranchId(rs.getString("BRANCH_ID"));
		cr.setBusinessResults(rs.getLong("BUSINESS_RESULTS"));
		cr.setCheckMember(rs.getString("BRANCH_ID"));
		cr.setContractID(rs.getLong("contract_ID"));
		cr.setContracttime(rs.getDate("CONTRACT_TIME"));
		cr.setPrintDate(rs.getDate("PRINT_DATE"));
		cr.setPrintTime(rs.getDate("PRINT_TIME"));
		cr.setCustomerName(rs.getString("CUSTOMER_NAME"));
		cr.setEquipmentName(rs.getString("EQUIPMENTNAME"));
		cr.setFrame(rs.getLong("FRAME"));
		cr.setIdCardNumber(rs.getString("ID_CARD_NUMBER"));
		cr.setOperator(rs.getString("OPERATOR"));
		cr.setOperatorId(rs.getString("OPERATOR_ID"));
		cr.setSerialNumber(rs.getString("SERIAL_NUMBER"));

		return contractRecordId;
	}

	/**
	 * //远程智能柜员易转账明细清单
	 * **/
	@Override
	public List<QJTransferAccounts> TransferAccountsList(Integer start,
			Integer limit, String branchId, String operatorId,
			String equipmentName, String starts, String endTims) {
		AppUser user = ContextUtil.getCurrentUser();
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : TransferAccountsList()");
		System.out.println("===branchId=" + branchId + operatorId + starts
				+ endTims);
		Query query = null;

		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		if (branchId == null && operatorId == null && equipmentName == null
				&& starts == null && endTims == null) {
			String hql = "";
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName())||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql = "SELECT  T.* FROM QJ_TRANSFER_ACCOUNTS T ";

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					hql = "select T.* from QJ_TRANSFER_ACCOUNTS T, equipment e  "
							+ "  where T.operator_id=e.operator_id  and (e.bank_name like '北京%' or e.parent_id=0) ";// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql="select c.*  from  QJ_TRANSFER_ACCOUNTS T , equipment e ,jg_mechanis jm " +
							" where T.operator_id=e.operator_id  and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'";

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//					hql = "select T.*, e.bank_name from QJ_TRANSFER_ACCOUNTS T, equipment e "
//							+ "   where T.operator_id=e.operator_id and e.bank_type_id="
//							+ user.getBankTypeId();
					hql = "select T.*, e.bank_name from QJ_TRANSFER_ACCOUNTS T, equipment e ,UlEmployee_Equipment ue "
						+ "   where T.operator_id=e.operator_id and e.equipmentid =ue.equipment_id and  e.bank_type_id="
						+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'";

				}

			}
			hql = hql + " order by T.TRA_ACC_TIME desc ";
			query = getSession().createSQLQuery(hql).addEntity(
					QJTransferAccounts.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		} else {
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的

				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					// String hql="SELECT  c.* FROM QJ_ADD_CARD c " ;
					hql
							.append(" SELECT  T.* FROM QJ_TRANSFER_ACCOUNTS T where 1=1 ");

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					// String hql="select c.* from qj_add_card c, equipment e  "
					// +
					// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
					// ;//中关村分行、北京管理部、郊区管理部、总行营业部
					hql
							.append(" select T.* from QJ_TRANSFER_ACCOUNTS T, equipment e "
									+ " where T.operator_id=e.operator_id and (e.bank_name like '北京%' or e.parent_id=0) ");

				} 
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql.append("select c.*  from  QJ_TRANSFER_ACCOUNTS T , equipment e ,jg_mechanis jm " +
							" where T.operator_id=e.operator_id  and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
			
//					hql.append(" select T.*, e.bank_name from QJ_TRANSFER_ACCOUNTS T, equipment e"
//									+ " where T.operator_id=e.operator_id and e.bank_type_id="
//									+ user.getBankTypeId());
					hql.append(" select T.*, e.bank_name from QJ_TRANSFER_ACCOUNTS T, equipment e,UlEmployee_Equipment ue "
							+ " where T.operator_id=e.operator_id and e.equipmentid =ue.equipment_id and  e.bank_type_id="
							+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
				}

			}
			if (!"".equals(operatorId) && operatorId != null) {
				hql.append(" and  T.OPERATOR_ID like '%" + operatorId + "%'");
			}

			if (!"".equals(branchId) && branchId != null) {
				hql.append(" and T.BRANCH_ID  like '%" + branchId + "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				hql.append(" and T.EQUIPMENTNAME  like '% " + equipmentName
						+ "%'");
			}
			if (!"".equals(starts) && starts != null) {
				hql.append("and to_char( T.TRA_ACC_TIME,'yyyy-MM-dd') >= '"
						+ starts + "'");
			}
			if (!"".equals(endTims) && endTims != null) {
				hql.append(" and to_char( T.CONTRACT_DATE,'yyyy-MM-dd')<= '"
						+ endTims + "'");
			}
			hql.append(" order by T.TRA_ACC_TIME desc");
			System.out.println("[ConHisDaoImpl.java] - tellernum=" + endTims
					+ "   SQL = " + hql);
			query = this.getSession().createSQLQuery(hql.toString()).addEntity(
					QJTransferAccounts.class);
			// query = getSession().createQuery(hql.toString());
			System.out.println("[ConHisDaoImpl.java] - query :i " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();
	}

	@Override
	public int TransferAccountsCount(String branchId, String operatorId,
			String equipmentName, String starts, String endTims) {
		AppUser user = ContextUtil.getCurrentUser();
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : TransferAccountsCount()");
		System.out.println("===branchId=" + branchId + operatorId + starts
				+ endTims);
		Query query = null;

		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : TransferAccountsCount()...");
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(distinct (c.TRA_ACC_ID))");
		for (int i = 0; i < listR.size(); i++) {
			// 查看所有的
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				// SqlBuilder.SELECT="SELECT  c.* FROM QJ_ADD_CARD c " ;
				SqlBuilder.FROM(" QJ_TRANSFER_ACCOUNTS c  ");
			}
			if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

				// hql="select c.* from qj_add_card c, equipment e  " +
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// ;//中关村分行、北京管理部、郊区管理部、总行营业部
				SqlBuilder.FROM(" QJ_TRANSFER_ACCOUNTS c , equipment e  ");
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// );
				SqlBuilder
						.WHERE(" c.operator_id=e.operator_id and (e.bank_name like '北京%' or e.parent_id=0)");

			}
			if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
				//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
				SqlBuilder.FROM(" QJ_TRANSFER_ACCOUNTS c , equipment e  ,jg_mechanis jm ");
					
				SqlBuilder
				.WHERE(" c.operator_id=e.operator_id and and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");
			}
			if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
			// hql="select c.*, e.bank_name from qj_add_card c, equipment e " +
			// "   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
				SqlBuilder.FROM(" QJ_TRANSFER_ACCOUNTS c , equipment e ,UlEmployee_Equipment ue  ");
				SqlBuilder
						.WHERE(" c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id and  e.bank_type_id="
								+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
				// " where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId()
				// );
			}

		}
		if (branchId == null && operatorId == null && equipmentName == null
				&& starts == null && endTims == null) {
			System.out
					.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有数据");
		} else {
			if (!"".equals(branchId) && branchId != null) {
				System.out.println("[ConHisDaoImpl.java] - wdNum=" + branchId);
				SqlBuilder.WHERE(" c.BRANCH_ID like" + "'%" + branchId + "%'");
			}
			if (!"".equals(operatorId) && operatorId != null) {
				SqlBuilder.WHERE("c.OPERATOR_ID  like" + "'%" + operatorId
						+ "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				SqlBuilder.WHERE("c.EQUIPMENTNAME  like" + "'%" + equipmentName
						+ "%'");
			}
			if (!"".equals(starts) && starts != null) {
				SqlBuilder.WHERE(" to_char( c.TRA_ACC_TIME,'yyyy-MM-dd') >= '"
						+ starts + "'");
			}
			if (!"".equals(endTims) && endTims != null) {
				SqlBuilder.WHERE(" to_char( c.CONTRACT_DATE,'yyyy-MM-dd')<= '"
						+ endTims + " 23:59:59'");
			}

		}
		String sql_getCount = SqlBuilder.SQL();
		return JDBCCount(sql_getCount);
	}

	@Override
	// ---Start----------------------------远程智能柜员机重空汇总清单-------------------------------------------
	public int qJAddCardCount(String branchId, String operatorId,
			String equipmentName, String starts, String endTims) {
		AppUser user = ContextUtil.getCurrentUser();
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : qJAddCardCount()");
		System.out.println("===branchId=" + branchId + operatorId + starts
				+ endTims);
		Query query = null;

		List<AppRole> listR = selectRoleName(user.getUserId());

		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : qJAddCardCount()...");
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(distinct (c.ADD_CARD_ID))");
		for (int i = 0; i < listR.size(); i++) {
			// 查看所有的
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				// SqlBuilder.SELECT="SELECT  c.* FROM QJ_ADD_CARD c " ;
				SqlBuilder.FROM(" QJ_ADD_CARD c  ");
				SqlBuilder
				.WHERE(" c.FLAG=1 ");
			}
			if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

				// hql="select c.* from qj_add_card c, equipment e  " +
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// ;//中关村分行、北京管理部、郊区管理部、总行营业部
				SqlBuilder.FROM(" QJ_ADD_CARD c , equipment e  ");
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// );
				SqlBuilder
						.WHERE(" c.operator_id=e.operator_id and e.delflag=1 and  c.FLAG=1 and (e.bank_name like '北京%' or e.parent_id=0)");

			}
			if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
				//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
				SqlBuilder.FROM(" QJ_ADD_CARD c , equipment e  ,jg_mechanis jm ");
						SqlBuilder
						.WHERE(" c.operator_id=e.operator_id and  c.FLAG=1 and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");
			}
			if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
			// hql="select c.*, e.bank_name from qj_add_card c, equipment e " +
			// "   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
//				SqlBuilder.FROM(" QJ_ADD_CARD c , equipment e  ");
//				// " where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId()
//				// );
//				SqlBuilder
//						.WHERE(" c.operator_id=e.operator_id and  c.FLAG=1 and e.bank_type_id="
//								+ user.getBankTypeId());
				SqlBuilder.FROM(" QJ_ADD_CARD c , equipment e,UlEmployee_Equipment ue   ");
				// " where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId()
				// );
				SqlBuilder
						.WHERE(" c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id and  c.FLAG=1 and e.bank_type_id="
								+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
			}

		}

		// SqlBuilder.FROM(" QJ_ADD_CARD c  " +
		// "left join equipment e on c.OPERATOR_ID = e.OPERATOR_ID  " +
		// "left join app_user a on e.bank_type_id = a.bank_type_id");
		if (branchId == null && operatorId == null && equipmentName == null
				&& starts == null && endTims == null) {
			System.out
					.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有数据");
		} else {
			if (!"".equals(branchId) && branchId != null) {
				System.out.println("[ConHisDaoImpl.java] - wdNum=" + branchId);
				SqlBuilder.WHERE(" c.BRANCH_ID like" + "'%" + branchId + "%'");
			}
			if (!"".equals(operatorId) && operatorId != null) {
				SqlBuilder.WHERE("c.OPERATOR_ID  like" + "'%" + operatorId
						+ "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				SqlBuilder.WHERE("c.EQUIPMENTNAME like" + "'%" + equipmentName
						+ "%'");
			}
			if (!"".equals(starts) && starts != null) {
				SqlBuilder.WHERE(" to_char( c.ADD_CARD_DATE,'yyyy-MM-dd') >= '"
						+ starts + "'");
			}
			if (!"".equals(endTims) && endTims != null) {
				SqlBuilder.WHERE(" to_char( c.ADD_CARD_TIME,'yyyy-MM-dd')<= '"
						+ endTims + " 23:59:59'");
			}

		}
		String sql_getCount = SqlBuilder.SQL();
		return JDBCCount(sql_getCount);
	}

	// =================================
	public List<QJAddCard> qJAddCardList(Integer start, Integer limit,
			String branchId, String operatorId, String equipmentName,
			String starts, String endTims) {
		AppUser user = ContextUtil.getCurrentUser();
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : qJAddCardList()");
		System.out.println("===branchId=" + branchId + operatorId + starts
				+ endTims);
		Query query = null;

		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		if (branchId == null && operatorId == null && equipmentName == null
				&& starts == null && endTims == null) {
			String hql = "";
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql = "SELECT  c.* FROM QJ_ADD_CARD c where c.FLAG=1 ";
					// "  where   c.ADD_CARD_DATE>=(SELECT T.ADD_CARD_DATE FROM qj_add_card  T WHERE NOT EXISTS "
					// +
					// " (SELECT 1 FROM qj_add_card T1 where TRUNC(T1.ADD_CARD_DATE) > TRUNC(T.ADD_CARD_DATE))) "
					// +
					// "  and c.ADD_CARD_TIME <=(SELECT T.ADD_CARD_DATE FROM qj_add_card  T WHERE NOT EXISTS "
					// +
					// "  (SELECT 1 FROM qj_add_card T1 where TRUNC(T1.ADD_CARD_DATE) > TRUNC(T.ADD_CARD_DATE))) "
					// ;

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					hql = "select c.* from qj_add_card c, equipment e  "
							+ "  where e.delflag=1 and c.operator_id=e.operator_id and c.FLAG=1 and (e.bank_name like '北京%' or e.parent_id=0) ";
					// "  and  c.ADD_CARD_DATE>=(SELECT T.ADD_CARD_DATE FROM qj_add_card  T WHERE NOT EXISTS "
					// +
					// " (SELECT 1 FROM qj_add_card T1 where TRUNC(T1.ADD_CARD_DATE) > TRUNC(T.ADD_CARD_DATE))) "
					// +
					// "  and c.ADD_CARD_TIME <=(SELECT T.ADD_CARD_DATE FROM qj_add_card  T WHERE NOT EXISTS "
					// +
					// " (SELECT 1 FROM qj_add_card T1 where TRUNC(T1.ADD_CARD_DATE) > TRUNC(T.ADD_CARD_DATE))) "
					// ;//中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql =" select c.* from qj_add_card c, equipment e  ,jg_mechanis jm where " +
							" c.operator_id=e.operator_id and e.delflag=1 and " +
							" jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id " +
							" and c.FLAG=1 and jm.path like '0."+user.getBankTypeId()+"%' ";
				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//					hql = "select c.*, e.bank_name from qj_add_card c, equipment e  where  c.FLAG=1 and "
//							+
//							"  e.delflag=1 and  c.operator_id=e.operator_id and e.bank_type_id="
//							+ user.getBankTypeId();
					hql = "select c.*, e.bank_name from qj_add_card c, equipment e ,UlEmployee_Equipment ue  where  c.FLAG=1 and "+
						"  e.delflag=1 and  c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id and e.bank_type_id="
						+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'";

				}

			}
			hql = hql + " order by c.ADD_CARD_ID desc ";
			query = getSession().createSQLQuery(hql).addEntity(QJAddCard.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		} else {
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql.append("SELECT  c.* FROM QJ_ADD_CARD c where c.FLAG=1 ");
					// "  where   c.ADD_CARD_DATE>=(SELECT T.ADD_CARD_DATE FROM qj_add_card  T WHERE NOT EXISTS "
					// +
					// " (SELECT 1 FROM qj_add_card T1 where TRUNC(T1.ADD_CARD_DATE) > TRUNC(T.ADD_CARD_DATE))) "
					// +
					// "  and c.ADD_CARD_TIME <=(SELECT T.ADD_CARD_DATE FROM qj_add_card  T WHERE NOT EXISTS "
					// +
					// "  (SELECT 1 FROM qj_add_card T1 where TRUNC(T1.ADD_CARD_DATE) > TRUNC(T.ADD_CARD_DATE))) "
					// ;

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					hql
							.append("select c.* from qj_add_card c, equipment e  "
									+ "  where  c.FLAG=1 and c.operator_id=e.operator_id  and  e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0) ");
					// "  and  c.ADD_CARD_DATE>=(SELECT T.ADD_CARD_DATE FROM qj_add_card  T WHERE NOT EXISTS "
					// +
					// " (SELECT 1 FROM qj_add_card T1 where TRUNC(T1.ADD_CARD_DATE) > TRUNC(T.ADD_CARD_DATE))) "
					// +
					// "  and c.ADD_CARD_TIME <=(SELECT T.ADD_CARD_DATE FROM qj_add_card  T WHERE NOT EXISTS "
					// +
					// " (SELECT 1 FROM qj_add_card T1 where TRUNC(T1.ADD_CARD_DATE) > TRUNC(T.ADD_CARD_DATE))) "
					// ;//中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql.append(" select c.*, e.bank_name from qj_add_card c, equipment e ,jg_mechanis jm " +
							"  where c.operator_id=e.operator_id  and e.bank_type_id=jm.mechanis_id and e.delflag=1 and jm.bank_type_status=1 " +
							"  and  c.FLAG=1 and jm.path like '0."+user.getBankTypeId()+"%'");
				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
					hql.append("select c.*, e.bank_name from qj_add_card c, equipment e ,UlEmployee_Equipment ue  where  c.FLAG=1 and e.delflag=1 and "+
									" c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id and e.bank_type_id="+ user.getBankTypeId()
									+" and ue.ulemployee_no='"+user.getUsername()+"'");

				}

			}
			if (!"".equals(operatorId) && operatorId != null) {
				hql.append(" and  c.OPERATOR_ID like '%" + operatorId + "%'");
			}

			if (!"".equals(branchId) && branchId != null) {
				hql.append(" and c.BRANCH_ID  like '%" + branchId + "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				hql.append(" and c.EQUIPMENTNAME  like '% " + equipmentName
						+ "%'");
			}
			if (!"".equals(starts) && starts != null) {
				hql.append("and to_char( c.ADD_CARD_DATE,'yyyy-MM-dd') >= '"
						+ starts + "'");
			}
			if (!"".equals(endTims) && endTims != null) {
				hql.append(" and to_char( c.ADD_CARD_TIME,'yyyy-MM-dd')<= '"
						+ endTims + "'");
			}
			hql.append(" order by c.ADD_CARD_ID desc");
			System.out.println("[ConHisDaoImpl.java] - tellernum=" + endTims
					+ "   SQL = " + hql);
			query = getSession().createSQLQuery(hql.toString()).addEntity(
					QJAddCard.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}

		return query.list();
	}

	// ---Start----------------------------远程智能柜员机重空汇总清单-------------------------------------------
	@Override
	public List<QJAddCard> numcount() {
		String hql = "SELECT T. ADD_CARD_NUM FROM qj_add_card  T WHERE NOT EXISTS "
				+ "(SELECT 1 FROM qj_add_card T1 where TRUNC(T1.ADD_CARD_DATE) > TRUNC(T.ADD_CARD_DATE))";
		Query query = getSession().createSQLQuery(hql);
		return query.list();
	}

	/**
	 * ===========Strat======================================================
	 * 远程智能柜员机重空明细清单=======================
	 * */
	@Override
	public int QJIssueCardCount(String branchId, String operatorId,
			String equipmentName, String starts, String endTims) {
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : QJIssueCardCount()");
		AppUser user = ContextUtil.getCurrentUser();
		System.out.println("===branchId=" + branchId + operatorId + starts
				+ endTims);
		Query query = null;

		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(distinct (c.ISSUE_CARD_ID))");
		for (int i = 0; i < listR.size(); i++) {
			// 查看所有的
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				// SqlBuilder.SELECT="SELECT  c.* FROM QJ_ADD_CARD c " ;
				SqlBuilder.FROM(" QJ_ISSUE_CARD  c  ");
				SqlBuilder.WHERE(" c.business_results  <>210 and  c.business_results  <>0 " );
			}
			if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

				// hql="select c.* from qj_add_card c, equipment e  " +
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// ;//中关村分行、北京管理部、郊区管理部、总行营业部
				SqlBuilder.FROM(" QJ_ISSUE_CARD c , equipment e  ");
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// );
				SqlBuilder
						.WHERE("  c.operator_id=e.operator_id " +
								" and c.business_results  <>210 and  c.business_results  <>0 " +
								" and (e.bank_name like '北京%' or e.parent_id=0) ");

			}
			if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
				//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
				SqlBuilder.FROM(" QJ_ISSUE_CARD c , equipment e ,jg_mechanis jm ");
				SqlBuilder
						.WHERE(" c.operator_id=e.operator_id " +
								" and c.business_results  <>210 and  c.business_results  <>0 " +
								" and e.delflag=1 and jm.bank_type_status=1 " +
								" and e.bank_type_id=jm.mechanis_id " +
								" and jm.path like '0."+user.getBankTypeId()+"%'");
			
			}
			if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
			// hql="select c.*, e.bank_name from qj_add_card c, equipment e " +
			// "   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
//				SqlBuilder.FROM(" QJ_ISSUE_CARD c , equipment e  ");
//				SqlBuilder
//						.WHERE("  c.operator_id=e.operator_id " +
//								" and c.business_results  <>210 and  c.business_results  <>0 " +
//								" and e.bank_type_id="
//								+ user.getBankTypeId());
				SqlBuilder.FROM(" QJ_ISSUE_CARD c , equipment e ,UlEmployee_Equipment ue  ");
				SqlBuilder
						.WHERE("  c.operator_id=e.operator_id  and e.equipmentid =ue.equipment_id " +
								" and c.business_results  <>210 and  c.business_results  <>0 " +
								" and e.bank_type_id="+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
				// " where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId()
				// );
			}

		}
		// SqlBuilder.FROM(" QJ_ISSUE_CARD c  " +
		// "left join equipment e on c.OPERATOR_ID = e.OPERATOR_ID  " +
		// "left join app_user a on e.bank_type_id = a.bank_type_id ");
		if (branchId == null && operatorId == null && equipmentName == null
				&& starts == null && endTims == null) {
			System.out.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有数据");
		} else {
			System.out.println("[ConHisDaoImpl.java] - if(All is Null) -> 部分所有数据");
			if (!"".equals(branchId) && branchId != null) {
				System.out.println("[ConHisDaoImpl.java] - wdNum=" + branchId);
				SqlBuilder.WHERE("  c.BRANCH_ID like" + "'%" + branchId + "%'");
			}
			if (!"".equals(operatorId) && operatorId != null) {
				SqlBuilder.WHERE(" c.OPERATOR_ID  like" + "'%" + operatorId
						+ "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				SqlBuilder.WHERE(" c.EQUIPMENTNAME  like" + "'%"
						+ equipmentName + "%'");
			}
			if (!"".equals(starts) && starts != null) {
				SqlBuilder.WHERE(" to_char( c.TRANSACTION_TIME,'yyyy-mm-dd hh24:mi:ss') >= '"
						+ starts + "'");
			}
			if (!"".equals(endTims) && endTims != null) {
				SqlBuilder.WHERE(" to_char( c.TRANSACTION_TIME,'yyyy-mm-dd hh24:mi:ss')<= '"
								+ endTims + "'");
			}

		}
		String sql_getCount = SqlBuilder.SQL();
		System.out.println("==sql_getCount==" + sql_getCount);
		return JDBCCount(sql_getCount);
	}

	/**
	 * ---------远程智能柜员机重空明细清单
	 * */
	@Override
	public List<QJIssueCard> QJIssueCardList(Integer start, Integer limit,
			String branchId, String operatorId, String equipmentName,
			String starts, String endTims) {

		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : qJAddCardList()");
		System.out.println("===branchId=" + branchId + operatorId + starts
				+ endTims);
		Query query = null;

		AppUser user = ContextUtil.getCurrentUser();
		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		if (branchId == null && operatorId == null && equipmentName == null
				&& starts == null && endTims == null) {
			String hql = "";

			for (int i = 0; i < listR.size(); i++) {

				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql = " SELECT  c.* from  QJ_ISSUE_CARD  c  where c.business_results  <>210 and  c.business_results  <>0 ";

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					hql = "select c.* from QJ_ISSUE_CARD c, equipment e  "
							+ "  where c.operator_id=e.operator_id  " +
							" and c.business_results  <>210 and  c.business_results  <>0 and e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0) ";// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql=" select c.* from QJ_ISSUE_CARD c, equipment e,jg_mechanis jm " +
							"  where  c.operator_id=e.operator_id and e.delflag=1 and" +
							" jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id " +
							" and c.business_results  <>210 and  c.business_results  <>0 " +
							" and jm.path like '0."+user.getBankTypeId()+"%'";
				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//					hql = "select c.*, e.bank_name from QJ_ISSUE_CARD c, equipment e "
//							+ "   where  e.delflag=1 and  c.operator_id=e.operator_id " +
//							" and c.business_results  <>210 and  c.business_results  <>0 " +
//							" and e.bank_type_id="+ user.getBankTypeId();
					hql = "select c.*, e.bank_name from QJ_ISSUE_CARD c, equipment e ,UlEmployee_Equipment ue "
						+ "   where  e.delflag=1 and  c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id " +
						" and c.business_results  <>210 and  c.business_results  <>0 " +
						" and e.bank_type_id="+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'";

				}

			}
			hql = hql + " order by c.TRADE_DATE desc ";
			query = getSession().createSQLQuery(hql).addEntity(
					QJIssueCard.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		} else {
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的

				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					// String hql="SELECT  c.* FROM QJ_ADD_CARD c " ;
					hql.append(" SELECT  c.* FROM QJ_ISSUE_CARD c where 1=1  and c.business_results  <>210 and  c.business_results  <>0 " );

				} else if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					// String hql="select c.* from qj_add_card c, equipment e  "
					// +
					// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
					// ;//中关村分行、北京管理部、郊区管理部、总行营业部
					hql.append(" select c.* from QJ_ISSUE_CARD c, equipment e "
									+ " where c.operator_id=e.operator_id " +
											" and c.business_results  <>210 and  c.business_results  <>0" +
											" and  e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0) ");

				} else if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql.append(" select c.* from QJ_ISSUE_CARD c, equipment e,jg_mechanis jm " +
							"  where  c.operator_id=e.operator_id and e.delflag=1 " +
							"  and c.business_results  <>210 and  c.business_results  <>0 " +
							"  and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id " +
							"  and jm.path like '0."+user.getBankTypeId()+"%'");
				}else {// 查看本支行的信息---支行操作员
				// String
				// hql="select c.*, e.bank_name from qj_add_card c, equipment e "
				// +
				// "   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
//					hql.append(" select c.*, e.bank_name from QJ_ISSUE_CARD c, equipment e"
//									+ " where e.delflag=1 and c.operator_id=e.operator_id " +
//									  "  and c.business_results  <>210 and  c.business_results  <>0 " +
//									  "  and e.bank_type_id="+ user.getBankTypeId());
					hql.append(" select c.*, e.bank_name from QJ_ISSUE_CARD c, equipment e, UlEmployee_Equipment ue "
							+ " where e.delflag=1 and c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id " +
							  "  and c.business_results  <>210 and  c.business_results  <>0 " +
							  "  and e.bank_type_id="+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
					
				}

			}
			if (!"".equals(operatorId) && operatorId != null) {
				hql.append(" and  c.OPERATOR_ID like '%" + operatorId + "%'");
			}

			if (!"".equals(branchId) && branchId != null) {
				hql.append(" and c.BRANCH_ID  like '%" + branchId + "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				hql.append(" and c.EQUIPMENTNAME  like '% " + equipmentName
						+ "%'");
			}
			//if (!"".equals(starts) && starts != null) {
			if (!"".equals(starts) && starts != null) {
				hql.append(" and to_char( c.TRANSACTION_TIME,'yyyy-mm-dd hh24:mi:ss') >= '"
						+ starts + "'");
			}
			if (!"".equals(endTims) && endTims != null) {
				hql.append("and to_char( c.TRANSACTION_TIME,'yyyy-mm-dd hh24:mi:ss') <= '"
						+ endTims + "'");

			}
			hql.append(" order by c.TRADE_DATE desc");
			System.out.println("[ConHisDaoImpl.java] - tellernum=" + endTims
					+ "   SQL = " + hql);
			query = this.getSession().createSQLQuery(hql.toString()).addEntity(
					QJIssueCard.class);
			// query = getSession().createQuery(hql.toString());
			System.out.println("[ConHisDaoImpl.java] - query :i " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();
	}

	/**
	 * ===========end======================================================
	 * 远程智能柜员机重空明细清单=======================
	 * */

	// ============Strat==wkj=============================合约重空明细表=================================

	public int ContractRecordCount(String branchId, String operatorId,
			String equipmentName, String startimes, String endtimes) {

		System.out.println("[ConHisDaoImpl.java] - invoke(调用) : ContractRecordCount()...");
		AppUser user = ContextUtil.getCurrentUser();
		Query query = null;
		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		JdbcHelper help = new JdbcHelper();
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(distinct (c.contract_ID))");
		for (int i = 0; i < listR.size(); i++) {
			// 查看所有的
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				// SqlBuilder.SELECT="SELECT  c.* FROM QJ_ADD_CARD c " ;
				SqlBuilder.FROM(" QJ_CONTRACT_RECORD  c  ");
			}
			if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

				// hql="select c.* from qj_add_card c, equipment e  " +
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// ;//中关村分行、北京管理部、郊区管理部、总行营业部
				SqlBuilder.FROM(" QJ_CONTRACT_RECORD c , equipment e  ");
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// );
				SqlBuilder
						.WHERE(" c.operator_id=e.operator_id and e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0)");

			}
			if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
				//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
				SqlBuilder.FROM(" QJ_CONTRACT_RECORD c , equipment e ,jg_mechanis jm ");
						
						SqlBuilder
						.WHERE(" c.operator_id=e.operator_id and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

			}
			if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
			// hql="select c.*, e.bank_name from qj_add_card c, equipment e " +
			// "   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
//				SqlBuilder.FROM(" QJ_CONTRACT_RECORD c , equipment e  ");
//				SqlBuilder
//						.WHERE("c.operator_id=e.operator_id and e.delflag=1 and  e.bank_type_id="
//								+ user.getBankTypeId());
				SqlBuilder.FROM(" QJ_CONTRACT_RECORD c , equipment e ,UlEmployee_Equipment ue  ");
				SqlBuilder
						.WHERE("c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id  and e.delflag=1 and  e.bank_type_id="
								+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
				
			}

		}
		// SqlBuilder.FROM(" QJ_CONTRACT_RECORD c  " +
		// "left join equipment e on c.OPERATOR_ID = e.OPERATOR_ID  " +
		// "left join app_user a on e.bank_type_id = a.bank_type_id ");
		if (branchId == null && operatorId == null && equipmentName == null
				&& startimes == null && endtimes == null) {
			System.out
					.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有数据");
		} else {
			if (!"".equals(branchId) && branchId != null) {
				System.out.println("[ConHisDaoImpl.java] - wdNum=" + branchId);
				SqlBuilder.WHERE(" c.BRANCH_ID like" + "'%" + branchId + "%'");
			}
			if (!"".equals(operatorId) && operatorId != null) {
				SqlBuilder.WHERE("c.OPERATOR_ID  like" + "'%" + operatorId
						+ "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				SqlBuilder.WHERE("c.EQUIPMENTNAME  like" + "'%" + equipmentName
						+ "%'");
			}
			if (!"".equals(startimes) && startimes != null) {
				SqlBuilder.WHERE(" to_char( c.CONTRACT_TIME,'yyyy-mm-dd hh24:mi:ss') >= '"
						+ startimes + "'");
			}
			if (!"".equals(endtimes) && endtimes != null) {
				SqlBuilder.WHERE(" to_char( c.CONTRACT_TIME,'yyyy-mm-dd hh24:mi:ss')<= '"
						+ endtimes + "'");
			}

		}
		String sql_getCount = SqlBuilder.SQL();
		return JDBCCount(sql_getCount);
	}

	// =========================Strat=============远程智能柜员机合约明细清单
	public List<QJContractRecordId> ContractRecordList(Integer start,
			Integer limit, String branchId, String operatorId,
			String equipmentName, String startimes, String endtimes) {

		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : qJAddCardList()");
		System.out.println("===branchId=" + branchId + operatorId + startimes
				+ endtimes);
		Query query = null;

		AppUser user = ContextUtil.getCurrentUser();
		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		if (branchId == null && operatorId == null && equipmentName == null
				&& startimes == null && endtimes == null) {
			String hql = "";

			for (int i = 0; i < listR.size(); i++) {

				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql = "SELECT  c.* from  QJ_CONTRACT_RECORD  c ";

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					hql = "select c.* from QJ_CONTRACT_RECORD c, equipment e  "
							+ "  where c.operator_id=e.operator_id and (e.bank_name like '北京%' or e.parent_id=0)";// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql = "select c.* from QJ_CONTRACT_RECORD c, equipment e,jg_mechanis jm " +
							" where c.operator_id=e.operator_id and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'";

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//					hql = "select c.*, e.bank_name from QJ_CONTRACT_RECORD c, equipment e "
//							+ "   where c.operator_id=e.operator_id and e.bank_type_id="
//							+ user.getBankTypeId();
					hql = "select c.*, e.bank_name from QJ_CONTRACT_RECORD c, equipment e,UlEmployee_Equipment ue "
						+ "   where c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id and e.bank_type_id="
						+ user.getBankTypeId()+" and e.equipmentid =ue.equipment_id "+user.getUsername()+"'";

				}

			}
			hql = hql + " order by c.CONTRACT_TIME desc ";
			query = getSession().createSQLQuery(hql).addEntity(
					QJContractRecordId.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		} else {
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的

				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) || "总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					// String hql="SELECT  c.* FROM QJ_ADD_CARD c " ;
					hql
							.append(" SELECT  c.* FROM QJ_CONTRACT_RECORD c where 1=1 ");

				} else if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					// String hql="select c.* from qj_add_card c, equipment e  "
					// +
					// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
					// ;//中关村分行、北京管理部、郊区管理部、总行营业部
					hql
							.append(" select c.* from QJ_CONTRACT_RECORD c, equipment e "
									+ " where c.operator_id=e.operator_id and e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0) ");

				}else if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql .append( "select c.* from QJ_CONTRACT_RECORD c, equipment e,jg_mechanis jm " +
							" where c.operator_id=e.operator_id and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

				} else {// 查看本支行的信息---支行操作员
				// String
				// hql="select c.*, e.bank_name from qj_add_card c, equipment e "
				// +
				// "   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
//					hql.append(" select c.*, e.bank_name from QJ_CONTRACT_RECORD c, equipment e"
//									+ " where c.operator_id=e.operator_id and e.delflag=1 and e.bank_type_id="
//									+ user.getBankTypeId());
					hql.append(" select c.*, e.bank_name from QJ_CONTRACT_RECORD c, equipment e,UlEmployee_Equipment ue "
							+ " where c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id and e.delflag=1 and e.bank_type_id="
							+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
				}

			}

			if (!"".equals(operatorId) && operatorId != null) {
				hql.append(" and  c.OPERATOR_ID like '%" + operatorId + "%'");
			}

			if (!"".equals(branchId) && branchId != null) {
				hql.append(" and c.BRANCH_ID  like '%" + branchId + "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				hql.append(" and c.EQUIPMENTNAME  like '% " + equipmentName
						+ "%'");
			}
			if (!"".equals(startimes) && startimes != null) {
				hql.append(" and to_char( c.CONTRACT_TIME,'yyyy-mm-dd hh24:mi:ss') >= '"
						+ startimes + "'");
			}
			if (!"".equals(endtimes) && endtimes != null) {
				hql.append("and to_char( c.CONTRACT_TIME,'yyyy-mm-dd hh24:mi:ss') <= '"
						+ endtimes + "'");

			}
			hql.append(" order by c.CONTRACT_TIME desc");
			System.out.println("[ConHisDaoImpl.java] - tellernum=" + endtimes
					+ "   SQL = " + hql);
			query = this.getSession().createSQLQuery(hql.toString()).addEntity(
					QJContractRecordId.class);
			// query = getSession().createQuery(hql.toString());
			System.out.println("[ConHisDaoImpl.java] - query :i " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();
	}

	// ============Strat==wkj=============================远程智能柜员机重空明细清单================================
	public int QJContractRecordZKCount(String branchId, String operatorId,
			String equipmentName, String startimes, String endtimes) {

		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : ContractRecordCount()...");
		AppUser user = ContextUtil.getCurrentUser();
		Query query = null;
		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		JdbcHelper help = new JdbcHelper();
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(distinct (c.CON_ID))");
		for (int i = 0; i < listR.size(); i++) {
			// 查看所有的
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				// SqlBuilder.SELECT="SELECT  c.* FROM QJ_ADD_CARD c " ;
				SqlBuilder.FROM(" QJ_CONTRACT_HZ  c  ");
				//c.FLAG=1 and
				SqlBuilder
				.WHERE(" c.FLAG=1 ");
			}
			if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

				// hql="select c.* from qj_add_card c, equipment e  " +
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// ;//中关村分行、北京管理部、郊区管理部、总行营业部
				SqlBuilder.FROM(" QJ_CONTRACT_HZ c , equipment e  ");
				// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
				// );
				SqlBuilder
						.WHERE(" c.operator_id=e.operator_id and c.FLAG=1 and e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0)");

			}
			if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
				//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
				SqlBuilder.FROM(" QJ_CONTRACT_HZ c , equipment e  ,jg_mechanis jm ");
				SqlBuilder
				.WHERE(" c.operator_id=e.operator_id and e.delflag=1 and c.FLAG=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

			}
			if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
			// hql="select c.*, e.bank_name from qj_add_card c, equipment e " +
			// "   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
//				SqlBuilder.FROM(" QJ_CONTRACT_HZ c , equipment e  ");
//				SqlBuilder.WHERE("c.operator_id=e.operator_id and e.delflag=1 and c.FLAG=1 and  e.bank_type_id="
//								+ user.getBankTypeId());
				SqlBuilder.FROM(" QJ_CONTRACT_HZ c , equipment e ,UlEmployee_Equipment ue ");
				SqlBuilder.WHERE("c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id and e.delflag=1 and c.FLAG=1 and  e.bank_type_id="
								+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
				
			}

		}
		// SqlBuilder.FROM(" QJ_CONTRACT_RECORD c  " +
		// "left join equipment e on c.OPERATOR_ID = e.OPERATOR_ID  " +
		// "left join app_user a on e.bank_type_id = a.bank_type_id ");
		if (branchId == null && operatorId == null && equipmentName == null
				&& startimes == null && endtimes == null) {
			System.out
					.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有数据");
		} else {
			if (!"".equals(branchId) && branchId != null) {
				System.out.println("[ConHisDaoImpl.java] - wdNum=" + branchId);
				SqlBuilder.WHERE(" c.BRANCH_ID like" + "'%" + branchId + "%'");
			}
			if (!"".equals(operatorId) && operatorId != null) {
				SqlBuilder.WHERE("c.OPERATOR_ID  like" + "'%" + operatorId
						+ "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				SqlBuilder.WHERE("c.EQUIPMENTNAME  like" + "'%" + equipmentName
						+ "%'");
			}
			if (!"".equals(startimes) && startimes != null) {
				SqlBuilder.WHERE(" to_char( c.CON_TIME,'yyyy-mm-dd hh24:mi:ss') >= '"
						+ startimes + "'");
			}
			if (!"".equals(endtimes) && endtimes != null) {
				SqlBuilder.WHERE(" to_char( c.CON_TIME,'yyyy-mm-dd hh24:mi:ss')<= '"
						+ endtimes + "'");
			}

		}
		String sql_getCount = SqlBuilder.SQL();
		return JDBCCount(sql_getCount);

	}

	// -------strat-------远程智能柜员机合约汇总清单

	public List<QJContractHZRecord> QJContractRecordZKlist(Integer start,
			Integer limit, String branchId, String operatorId,
			String equipmentName, String starts, String endTims) {
		System.out.println("[ConHisDaoImpl.java] - invoke(调用) : qJAddCardList()");
		System.out.println("===branchId=" + branchId + operatorId + starts + endTims);
		Query query = null;

		AppUser user = ContextUtil.getCurrentUser();
		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		if (branchId == null && operatorId == null && equipmentName == null
				&& starts == null && endTims == null) {
			String hql = "";

			for (int i = 0; i < listR.size(); i++) {

				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql = "SELECT  c.* from  QJ_CONTRACT_HZ  c  where c.FLAG=1 ";

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					hql = "select c.* from QJ_CONTRACT_HZ c, equipment e  "
							+ "  where c.operator_id=e.operator_id and  c.FLAG=1 and e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0)";// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql = "select c.* from QJ_CONTRACT_HZ c, equipment e ,jg_mechanis jm " +
							" where c.operator_id=e.operator_id  and c.FLAG=1 and e.delflag=1 and jm.bank_type_status=1 and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'";

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//					hql = "select c.*, e.bank_name from  QJ_CONTRACT_HZ c, equipment e "
//							+ "   where c.operator_id=e.operator_id and c.FLAG=1 and e.delflag=1 and  e.bank_type_id="
//							+ user.getBankTypeId();
					hql = "select c.*, e.bank_name from  QJ_CONTRACT_HZ c, equipment e ,UlEmployee_Equipment ue "
						+ "   where c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id  and c.FLAG=1 and e.delflag=1 and  e.bank_type_id="
						+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'";
				}

			}
			hql = hql + " order by c.CON_ID desc ";
			query = getSession().createSQLQuery(hql).addEntity(
					QJContractHZRecord.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		} else {
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的

				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					// String hql="SELECT  c.* FROM QJ_ADD_CARD c " ;
					hql.append(" SELECT  c.* FROM  QJ_CONTRACT_HZ c where 1=1 and c.FLAG=1 ");

				} else if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					// String hql="select c.* from qj_add_card c, equipment e  "
					// +
					// "  where c.operator_id=e.operator_id and e.bank_name like '北京%'"
					// ;//中关村分行、北京管理部、郊区管理部、总行营业部
					hql.append(" select c.* from  QJ_CONTRACT_HZ c, equipment e "
									+ " where c.operator_id=e.operator_id and c.FLAG=1 and e.delflag=1 and (e.bank_name like '北京%' or e.parent_id=0) ");

				}else if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql.append("select c.* from QJ_CONTRACT_HZ c, equipment e ,jg_mechanis jm " +
							" where c.operator_id=e.operator_id and e.delflag=1 and c.FLAG=1 and jm.bank_type_status=1 " +
							" and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

				}else {// 查看本支行的信息---支行操作员
				// String
				// hql="select c.*, e.bank_name from qj_add_card c, equipment e "
				// +
				// "   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
//					hql.append(" select c.*, e.bank_name from  QJ_CONTRACT_HZ c, equipment e"
//									+ " where c.operator_id=e.operator_id and  c.FLAG=1 and e.delflag=1 and  e.bank_type_id="
//									+ user.getBankTypeId());
					hql.append(" select c.*, e.bank_name from  QJ_CONTRACT_HZ c, equipment e ,UlEmployee_Equipment ue "
							+ " where c.operator_id=e.operator_id and e.equipmentid =ue.equipment_id  and  c.FLAG=1 and e.delflag=1 and  e.bank_type_id="
							+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
				}

			}

			if (!"".equals(operatorId) && operatorId != null) {
				hql.append(" and  c.OPERATOR_ID like '%" + operatorId + "%'");
			}

			if (!"".equals(branchId) && branchId != null) {
				hql.append(" and c.BRANCH_ID  like '%" + branchId + "%'");
			}
			if (!"".equals(equipmentName) && equipmentName != null) {
				hql.append(" and c.EQUIPMENTNAME  like '% " + equipmentName
						+ "%'");
			}
			if (!"".equals(starts) && starts != null) {
				hql.append(" and to_char( c.CON_TIME,'yyyy-mm-dd hh24:mi:ss') >= '"
						+ starts + "'");
			}
			if (!"".equals(endTims) && endTims != null) {
				hql.append("and to_char( c.CON_TIME,'yyyy-mm-dd hh24:mi:ss') <= '"
						+ endTims + "'");

			}
			hql.append(" order by c.CON_ID desc");
			System.out.println("[ConHisDaoImpl.java] - tellernum=" + endTims
					+ "   SQL = " + hql);
			query = this.getSession().createSQLQuery(hql.toString()).addEntity(
					QJContractHZRecord.class);
			// query = getSession().createQuery(hql.toString());
			System.out.println("[ConHisDaoImpl.java] - query :i " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();

	}

	// -------strat-------远程智能柜员机合约汇总清单

	// 获取操作员的号
	public List<Equipment> operatorId() {
		AppUser currentUser = ContextUtil.getCurrentUser();
		String hql = " select e.OPERATOR_ID ,equipmentid  from app_user a  , equipment e  where e.bank_type_id = "
				+ currentUser.getBankTypeId();
		Query query;
		query = getSession().createSQLQuery(hql);
		return query.list();

	}

	// 获取当前用户的角色

	public List<AppRole> selectRoleName(Long userId) {
		Query query = getSession()
				.createSQLQuery(
						"select ap.* from app_role ap,user_role ur,app_user au "
								+ " where ap.roleid=ur.roleid and ur.userid=au.userid and au.userid=?")
				.addEntity(AppRole.class);
		System.out.println("====================query" + query);
		query.setLong(0, userId);
		System.out.println("============ query.setLong(0, EId)"
				+ query.setLong(0, userId));
		// query.executeUpdate();
		return query.list();
	}

	@Override
	public List<Equipment> listEquipmentRole(Integer start, Integer limit,
			String suoshuhang, String branchId, String operatorId) {
		System.out.println("---------ExamineReport---------");
		Query query = null;
		AppUser user = ContextUtil.getCurrentUser();
		Long bankid = user.getBankTypeId();
		List<AppRole> listR = selectRoleName(user.getUserId());
		if (suoshuhang == null && branchId == null && operatorId == null) {
			System.out
					.println("【UlEmployeeDaoImpl 】调用--listEquipmentRole   查询所有");
			// String hql =
			// "from Equipment e where e.delFlag=1 order by e.equipmentId desc";
			// String hql =
			// "from Equipment e where e.delFlag=1 order by e.equipmentId desc";
			String hql = "";

			for (int i = 0; i < listR.size(); i++) {

				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql = "SELECT  e.* from  EQUIPMENT  e where e.DELFLAG=1 ";

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					hql = "select e.* from   Equipment e  "
							+ "  where e.delFlag=1 and (e.bank_name like '北京%' or e.parent_id=0) ";// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql =" select e.* from   Equipment e ,jg_mechanis jm " +
							" where  e.delflag=1 and jm.bank_type_status=1 " +
							" and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'";

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
					System.out.println("=====");
					hql = " select e.* from  Equipment e   where  e.delFlag=1  and e.bank_type_id="
							+ user.getBankTypeId();
					// query.setLong(0, user.getBankTypeId());
					System.out.println("=======");
				}

			}

			hql = hql + " order by e.equipmentId desc ";
			System.out.println("====hql" + hql);

			query = getSession().createSQLQuery(hql).addEntity(Equipment.class);
			System.out.println("=============query" + query);

			query.setFirstResult(start);
			query.setMaxResults(limit);
			System.out.println("===start===" + start + "======" + limit);
		} else {
			// 多条件的查询，用StringBuffer拼接字符串，在连接的时候 不能用or，or当查询多个条件的不能任意匹配，用and(切记)
			// StringBuffer hql=new
			// StringBuffer("from  Equipment  e where  1=1 and e.delFlag=1 ");
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {

				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql.append("SELECT  e.* from  Equipment  e  where e.delFlag=1 ");

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

					hql.append("select e.* from    Equipment  e  "
									+ "  where e.delFlag=1 and (e.bank_name like '北京%' or e.parent_id=0)");// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql.append(" select e.* from   Equipment e ,jg_mechanis jm " +
							" where  e.delflag=1 and jm.bank_type_status=1 " +
							" and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
					hql.append("select e.* from  Equipment e "
							+ " where  e.delFlag=1  and e.bank_type_id="
							+ user.getBankTypeId());

				}

			}

			if (!"".equals(suoshuhang) && suoshuhang != null) {
				hql.append(" and e.BANK_NAME like '%" + suoshuhang + "%'");
				hql.append(" or e.PARENT_NAME like '%" + suoshuhang + "%'");
			}

			if (!"".equals(branchId) && branchId != null) {
				hql.append(" and e.BRANCH_ID like '%" + branchId + "%'");
			}
			if (!"".equals(operatorId) && operatorId != null) {
				hql.append(" and e.OPERATOR_ID like '%" + operatorId + "%'");
			}
			hql.append(" order by e.equipmentId desc ");
			System.out.println("===【UlEmployeeDaoImpl 】调用==operatorId"
					+ branchId + suoshuhang + "============" + operatorId);
			query = getSession().createSQLQuery(hql.toString()).addEntity(
					Equipment.class);
			System.out.println("=【UlEmployeeDaoImpl 】调用===query=" + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();
	}

	@Override
	public int listEquipmentRoleCount(String suoshuhang, String branchId,
			String operatorId) {
		AppUser user = ContextUtil.getCurrentUser();
		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("【UlEmployeeDaoImpl 】调用==listEquipmentRoleCount  ");
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(e.EId)");
		// SqlBuilder.FROM("EQUIPMENT e where e.delFlag=1");
		for (int i = 0; i < listR.size(); i++) {

			// 查看所有的
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				SqlBuilder.FROM(" Equipment e ");// where e.delFlag=1 ");
				SqlBuilder.WHERE(" e.delFlag=1 ");

			}
			if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

				SqlBuilder.FROM("  Equipment e  ");
				SqlBuilder.WHERE(" and (e.bank_name like '北京%' or e.parent_id=0)");
				// "  where e.delFlag=1 and  e.bank_name like '北京%'");//中关村分行、北京管理部、郊区管理部、总行营业部

			}
			if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
				//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
				SqlBuilder.FROM(" Equipment e ,jg_mechanis jm " );
				SqlBuilder.WHERE("e.delflag=1 and jm.bank_type_status=1 " +
						" and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

			}
			if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
				SqlBuilder.FROM("  Equipment  e ");
				// "   where  e.delFlag=1  and e.bank_type_id="+user.getBankTypeId());
				SqlBuilder.WHERE(" e.delFlag=1  and e.bank_type_id="
						+ user.getBankTypeId());

			}

		}
		if (suoshuhang == null && branchId == null && operatorId == null) {
			System.out.println("查询所有数据");
		} else {
			if (!"".equals(suoshuhang) && suoshuhang != null) {
				System.out.println("jjfjfjf" + suoshuhang);
				SqlBuilder
						.WHERE(" e.BANK_NAME like" + "'%" + suoshuhang + "%'");
				SqlBuilder.WHERE(" e.PARENT_NAME like" + "'%" + suoshuhang
						+ "%'");
			}

			if (!"".equals(branchId) && branchId != null) {
				SqlBuilder.WHERE(" e.BRANCH_ID like" + "'%" + branchId + "%'");
			}
			if (!"".equals(operatorId) && operatorId != null) {
				SqlBuilder.WHERE(" e.OPERATOR_ID like" + "'%" + operatorId
						+ "%'");
			}

			System.out.println("查询所有数据 else ");
		}
		String sql_getCount = SqlBuilder.SQL();

		return JDBCCount(sql_getCount);
	}

	@Override
	public List<ConHis> SelectRoleCon(Integer start, Integer limit,
			String dealStaId, String busTypId, String buluS, String serialNum,
			String startimes, String endtimes, String mainContactNum,
			String agentName) {
		AppUser user = ContextUtil.getCurrentUser();
		System.out
				.println("[ConHisDaoImpl.java] - invoke(调用) : SelectRoleCon()");

		Query query = null;

		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("=listR==" + listR + "user.getUserId()"
				+ user.getUserId());
		if (dealStaId == null && busTypId == null && buluS == null
				&& serialNum == null && startimes == null && endtimes == null
				&& mainContactNum == null && agentName == null) {
			String hql = "";
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql = " select  c.*  from  con_His c ";

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点
					// select c.* from con_his c ,equipment e,app_user a where
					// c.main_contact_num =e.equipmentid and
					// e.bank_type_id=a.bank_type_id
					hql = "select c.*  from  con_His c , equipment e  "
							+ "  where c.main_contact_num  =e.equipmentid and (e.bank_name like '北京%' or e.parent_id=0)";// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql = "select c.*  from  con_His c , equipment e   ,jg_mechanis jm " +
							"  where c.main_contact_num  =e.equipmentid and e.delflag=1 and jm.bank_type_status=1 " +
							" and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'";

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//					hql = " select c.*  from  con_His c , equipment e "
//							+ "   where c.main_contact_num  =e.equipmentid  and e.bank_type_id="
//							+ user.getBankTypeId();
					hql = " select c.*  from  con_His c , equipment e ,UlEmployee_Equipment ue "
						+ "   where c.main_contact_num  =e.equipmentid  and e.equipmentid =ue.equipment_id and e.bank_type_id="
						+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'";

				}

			}
			hql = hql + " order by c.service_id desc,c.con_his_id asc ";
			query = getSession().createSQLQuery(hql).addEntity(ConHis.class);
			System.out.println("[ConHisDaoImpl.java] - query : " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页
                           
		} else {
			StringBuffer hql = new StringBuffer();
			for (int i = 0; i < listR.size(); i++) {
				// 查看所有的
				System.out.println("------" + listR.get(i).getName());
				if ("总行管理员".equals(listR.get(i).getName())
						|| "总行操作员".equals(listR.get(i).getName())
						|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
						|| "超级管理员".equals(listR.get(i).getName())) {
					hql.append(" select  c.*  from  con_His c  where 1=1 ");

				}
				if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点
					// select c.* from con_his c ,equipment e,app_user a where
					// c.main_contact_num =e.equipmentid and
					// e.bank_type_id=a.bank_type_id
					hql.append("select c.*  from  con_His c , equipment e  "
									+ "  where c.main_contact_num  =e.equipmentid and (e.bank_name like '北京%' or e.parent_id=0) ");// 中关村分行、北京管理部、郊区管理部、总行营业部

				}
				if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
					//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
					hql .append ( "select c.*  from  con_His c , equipment e   ,jg_mechanis jm " +
							"  where c.main_contact_num  =e.equipmentid and e.delflag=1 and jm.bank_type_status=1 " +
							" and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");

				}
				if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//					hql.append(" select c.*  from  con_His c , equipment e "
//									+ "   where c.main_contact_num  =e.equipmentid  and e.bank_type_id="
//									+ user.getBankTypeId());
					hql.append(" select c.*  from  con_His c , equipment e ,UlEmployee_Equipment ue "
							+ "   where c.main_contact_num  =e.equipmentid  and e.equipmentid =ue.equipment_id  and e.bank_type_id="
							+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");

				}

			}
			if (!"".equals(dealStaId) && dealStaId != null) {// 处理结果
				System.out.println("[ConHisDaoImpl.java] - wdNum=" + dealStaId);
				// SqlBuilder.WHERE("c.DEAL_STA_ID like"+"'%"+dealStaId+"%'");
				hql.append(" and c.DEAL_STA_ID like" + "'%"
						+ new Short(dealStaId) + "%'");
			}
			if (!"".equals(busTypId) && busTypId != null) {// 业务办理
				// SqlBuilder.WHERE("c.BUS_TYP_ID like"+"'%"+busTypId+"%'");
				if ("0".equals(busTypId)) {
					hql.append(" and ( c.BUS_TYP_ID is null or c.BUS_TYP_ID ="
							+ new Short(busTypId)+")");
				} else {
					// buff.append(" and c.BUS_TYP_ID like"+"'%"+new
					// Short(busTypId)+"%'");
					hql.append(" and c.BUS_TYP_ID =" + new Short(busTypId));
				}

			}
			if (!"".equals(buluS) && buluS != null) {// 补录信息
				// SqlBuilder.WHERE("c.REMARKS like"+"'%"+buluS+"%'");
				hql.append(" and c.REMARKS like" + "'%" + buluS + "%'");

			}
			if (!"".equals(startimes) && startimes != null) {// 开始时间

				hql.append(" and to_char( c.STA_TIME,'yyyy-MM-dd') >= '"
						+ startimes + "'");
			}
			if (!"".equals(endtimes) && endtimes != null) {// 结束时间
				// SqlBuilder.WHERE("c.END_TIME <= '" +endtimes+" 23:59:59'");
				hql.append(" and to_char( c.END_TIME,'yyyy-MM-dd') <= '"
						+ endtimes + " 23:59:59'");
				// buff.append(" and c.END_TIME <= '"
				// +endtimes.replace("-","/")+" 23:59:59'");
			}
			if (!"".equals(mainContactNum) && mainContactNum != null) {// 设备编号
				// SqlBuilder.WHERE("c.MAIN_CONTACT_NUM like"+"'%"+mainContactNum+"%'");
				hql.append(" and c.MAIN_CONTACT_NUM like" + "'%"
						+ mainContactNum + "%'");
			}
			if (!"".equals(serialNum) && serialNum != null) {// 流水号
				// SqlBuilder.WHERE("c.AGENT_NAME like"+"'%"+agentName+"%'");
				hql.append(" and c.SERIAL_NUM like" + "'%" + serialNum + "%'");
			}
			if (!"".equals(agentName) && agentName != null) {// 坐席员
				// SqlBuilder.WHERE("c.AGENT_NAME like"+"'%"+agentName+"%'");
				hql.append(" and c.AGENT_NAME like" + "'%" + agentName + "%'");
			}
			hql.append(" order by c.service_id desc,c.con_his_id asc ");
			query = this.getSession().createSQLQuery(hql.toString()).addEntity(
					ConHis.class);
			// query = getSession().createQuery(hql.toString());
			System.out.println("[ConHisDaoImpl.java] - query :i " + query);
			query.setFirstResult(start);// hibernate自带的分页查询，起始页
			query.setMaxResults(limit);// 结束页

		}
		return query.list();
	}

	@Override
	public int SelectRoleCount(String dealStaId, String busTypId, String buluS,
			String serialNum, String startimes, String endtimes,
			String mainContactNum, String agentName) {
		AppUser user = ContextUtil.getCurrentUser();
		List<AppRole> listR = selectRoleName(user.getUserId());
		System.out.println("【UlEmployeeDaoImpl 】调用==listEquipmentRoleCount  ");
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(c.CON_HIS_ID)");
		// SqlBuilder.FROM("EQUIPMENT e where e.delFlag=1");
		for (int i = 0; i < listR.size(); i++) {
			System.out.println("------" + listR.get(i).getName());
			if ("总行管理员".equals(listR.get(i).getName())
					|| "总行操作员".equals(listR.get(i).getName())
					|| "总行座席".equals(listR.get(i).getName()) ||"总行座席班长".equals(listR.get(i).getName())
					|| "超级管理员".equals(listR.get(i).getName())) {
				SqlBuilder.FROM(" con_His  c ");

			}
			if ("总行后督".equals(listR.get(i).getName())) {// 查看北京地区所有网点

				SqlBuilder.FROM(" con_His c , equipment e  ");
				// "  where c.main_contact_num  =e.equipmentid and e.bank_name like '北京%'");//中关村分行、北京管理部、郊区管理部、总行营业部
				SqlBuilder.WHERE("  c.main_contact_num  =e.equipmentid and  e.delflag=1  and (e.bank_name like '北京%' or e.parent_id=0)");
			}
			if ("分行后督".equals(listR.get(i).getName())) {// 查看本分行地区所有网点
				//select * from equipment e,jg_mechanis jm where e.bank_type_id=jm.mechanis_id and jm.path like '0.420%'
				SqlBuilder.FROM(" con_His c , equipment e    ,jg_mechanis jm ");
				SqlBuilder.WHERE("  c.main_contact_num  =e.equipmentid and  e.delflag=1 and jm.bank_type_status=1 " +
						" and e.bank_type_id=jm.mechanis_id and jm.path like '0."+user.getBankTypeId()+"%'");
					

			}
			if ("支行操作员".equals(listR.get(i).getName())) {// 查看本支行的信息---支行操作员
//				SqlBuilder.FROM("  con_His c , equipment e ");
//				// "   where c.main_contact_num  =e.equipmentid  and e.bank_type_id="+user.getBankTypeId());
//				SqlBuilder.WHERE(" c.main_contact_num  =e.equipmentid  and  e.delflag=1  and e.bank_type_id="
//								+ user.getBankTypeId());
				SqlBuilder.FROM("  con_His c , equipment e, UlEmployee_Equipment ue ");
//				// "   where c.main_contact_num  =e.equipmentid  and e.bank_type_id="+user.getBankTypeId());
				SqlBuilder.WHERE(" c.main_contact_num  =e.equipmentid  and e.equipmentid =ue.equipment_id  and  e.delflag=1  and e.bank_type_id="
								+ user.getBankTypeId()+" and ue.ulemployee_no='"+user.getUsername()+"'");
			}

		}
		if (!"".equals(dealStaId) && dealStaId != null) {
			System.out.println("[ConHisDaoImpl.java] - wdNum=" + dealStaId);
			// SqlBuilder.WHERE("c.DEAL_STA_ID like"+"'%"+dealStaId+"%'");
			SqlBuilder.WHERE(" c.DEAL_STA_ID like" + "'%"
					+ new Short(dealStaId) + "%'");
		}
		if (!"".equals(busTypId) && busTypId != null) {
			// SqlBuilder.WHERE("c.BUS_TYP_ID like"+"'%"+busTypId+"%'");
			if ("0".equals(busTypId)) {
				SqlBuilder.WHERE(" ( c.BUS_TYP_ID is null or c.BUS_TYP_ID ="
						+ new Short(busTypId)+")");
			} else {
				// buff.append(" and c.BUS_TYP_ID like"+"'%"+new
				// Short(busTypId)+"%'");
				SqlBuilder.WHERE(" c.BUS_TYP_ID =" + new Short(busTypId));
			}
			// buff.append(" and c.BUS_TYP_ID like"+"'%"+new
			// Short(busTypId)+"%'");
		}
		if (!"".equals(buluS) && buluS != null) {
			// SqlBuilder.WHERE("c.REMARKS like"+"'%"+buluS+"%'");
			SqlBuilder.WHERE(" c.REMARKS like" + "'%" + buluS + "%'");

		}
		if (!"".equals(startimes) && startimes != null) {
			SqlBuilder.WHERE(" to_char( c.STA_TIME,'yyyy-MM-dd') >= '"
					+ startimes + "'");
		}
		if (!"".equals(endtimes) && endtimes != null) {
			// SqlBuilder.WHERE("c.END_TIME <= '" +endtimes+" 23:59:59'");
			SqlBuilder.WHERE(" to_char( c.END_TIME,'yyyy-MM-dd') <= '"
					+ endtimes + " 23:59:59'");
		}
		if (!"".equals(mainContactNum) && mainContactNum != null) {
			// SqlBuilder.WHERE("c.MAIN_CONTACT_NUM like"+"'%"+mainContactNum+"%'");
			SqlBuilder.WHERE(" c.MAIN_CONTACT_NUM like" + "'%" + mainContactNum
					+ "%'");
		}

		if (!"".equals(agentName) && agentName != null) {
			// SqlBuilder.WHERE("c.AGENT_NAME like"+"'%"+agentName+"%'");
			SqlBuilder.WHERE(" c.AGENT_NAME like" + "'%" + agentName + "%'");
		}
		System.out.println("查询所有数据 else ");

		String sql_getCount = SqlBuilder.SQL();

		return JDBCCount(sql_getCount);
	}

	@Override
	// 查询重空清机表中的记录
	public List<QJAddCard> SelectAddCardR(String operatorId, String branchId) {
		String hql = "select c.* from qj_add_card c where c.FLAG=1 and c.OPERATOR_ID='"
				+ operatorId + "' and c.branch_id='" + branchId + "'";
		Query query = getSession().createSQLQuery(hql).addEntity(
				QJAddCard.class);
		return query.list();
	}

	@Override
	public List<QJAddCard> SelectAddRMX(String operatorId, String branchId,String addId) {
		// String
		// hql="select c.* from qj_add_card c where c.OPERATOR_ID='"+operatorId+"' and c.branch_id='"+branchId+"'";
		System.out.println("Dao   ->   addId = " + addId);
		String hql = "select * from "
				+ "(select d.* from QJ_ADD_CARD d  where d.FLAG=1 and d.OPERATOR_ID='"
				+ operatorId + "' and d.branch_id='" + branchId
				+ "' and d.add_card_id<=" + addId + "  order by  d.add_card_id desc) " + " where FLAG=1 and  rownum<3";

		Query query = getSession().createSQLQuery(hql).addEntity(
				QJAddCard.class);
		System.out.println("====query==" + query);
		return query.list();

	}
	//获取合约汇总的最近两天时间：根据ConId判断
	@Override
	public List<QJContractHZRecord> selectConRMX(String operatorId,
			String branchId, String conId) {
		
		System.out.println("Dao selectConRMX  ->   addId = " + conId);
		String hql = "select * from "
				+ "(select d.* from QJ_CONTRACT_HZ d  where d.OPERATOR_ID='"
				+ operatorId + "' and d.branch_id='" + branchId
				+ "' and d.CON_ID<=" + conId + "  order by  d.CON_ID desc) " + " where rownum<3 and  FLAG=1 ";

		Query query = getSession().createSQLQuery(hql).addEntity(
				QJContractHZRecord.class);
		System.out.println("selectConRMX====query==" + query);
		return query.list();
	}
	//带着两个日期来查询合约明细中是否有数据
	@Override
	public List<QJContractRecordId> selectReoMX(String operatorId,
			String branchId, String startDate, String endDate) {
		
		//List<QJAddCard> list = SelectAddRMX(operatorId, branchId);
		System.out.println("--> daoimpl 带着两个日期来查询合约明细中是否有数据..");
		// 取出时间，进行比较取出时间的大小，小的放在前面，大的放在后面
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss ");
		System.out.println("try");
		String date1 = "", date2 = "";

		date1 = startDate;
		date2 = endDate;
		System.out.println("date1" + date1);
		System.out.println("date1" + date2);
		String hql = "select * from QJ_CONTRACT_RECORD qc"
				+ " where qc.operator_id='" + operatorId
				+ "' and qc.branch_id='" + branchId + "'"
				+ " and to_char( qc.CONTRACT_TIME,'yyyy-mm-dd hh24:mi:ss') >= '" + date1
				+ "'"
				+ " and to_char( qc.CONTRACT_TIME,'yyyy-mm-dd hh24:mi:ss') <= '"
				+ date2 + "'";

		// "qi.trade_date between  to_date('2015/5/22','yyyy-mm-dd') and to_date('2015/7/29 ','yyyy-mm-dd ') ";
		Query query = getSession().createSQLQuery(hql).addEntity(
				QJContractRecordId.class);
		System.out.println("====query" + query);
		return query.list();
	}

	@Override
	public List<QJIssueCard> selectIssueR(String operatorId, String branchId,
			String staDate, String endDate,String addId) {
		//List<QJAddCard> list = SelectAddRMX(operatorId, branchId,addId);
		// 取出时间，进行比较取出时间的大小，小的放在前面，大的放在后面
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss ");
		System.out.println("try");
		String date1 = "", date2 = "";

		date1 = staDate;
		date2 = endDate;
		System.out.println("date1" + date1);
		System.out.println("date1" + date2);
		String hql = "select * from qj_issue_card  qi  "
				+ " where qi.operator_id='"
				+ operatorId
				+ "' and qi.branch_id='"
				+ branchId
				+ "'"
				+ " and to_char( qi.TRANSACTION_TIME,'yyyy-mm-dd hh24:mi:ss') >= '"
				+ date2
				+ "'"
				+ " and to_char( qi.TRANSACTION_TIME,'yyyy-mm-dd hh24:mi:ss') <= '"
				+ date1 + "'";

		// "qi.trade_date between  to_date('2015/5/22','yyyy-mm-dd') and to_date('2015/7/29 ','yyyy-mm-dd ') ";
		Query query = getSession().createSQLQuery(hql).addEntity(
				QJIssueCard.class);
		System.out.println("====query" + query);
		return query.list();
	}

	@Override
	public List<QJContractRecordId> selectContraR(String operatorId,
			String branchId, String staDate, String endDate) {
		//List<QJAddCard> list = SelectAddRMX(operatorId, branchId);
		// 取出时间，进行比较取出时间的大小，小的放在前面，大的放在后面
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss ");
		System.out.println("try");
		String date1 = "", date2 = "";

		date1 = staDate;
		date2 = endDate;
		System.out.println("date1" + date1);
		System.out.println("date1" + date2);
		String hql = "select * from QJ_CONTRACT_RECORD  qc  "
				+ " where qc.operator_id='" + operatorId
				+ "' and qc.branch_id='" + branchId + "'"
				+ " and to_char( qc.CONTRACT_TIME,'yyyy-MM-dd ') >= '" + date2
				+ "'"
				+ " and to_char( qc.CONTRACT_TIME,'yyyy-MM-dd HH:mm:ss') <= '"
				+ date1 + "'";

		// "qi.trade_date between  to_date('2015/5/22','yyyy-mm-dd') and to_date('2015/7/29 ','yyyy-mm-dd ') ";
		Query query = getSession().createSQLQuery(hql).addEntity(
				QJContractRecordId.class);
		System.out.println("====query" + query);
		return query.list();
	}

	@Override
	public List<QJContractHZRecord> SelectQJContractHZR(String operatorId,
			String branchId) {
		String hql = "select c.* from QJ_CONTRACT_HZ c where c.OPERATOR_ID='"
				+ operatorId + "' and c.branch_id='" + branchId + "'";
		Query query = getSession().createSQLQuery(hql).addEntity(
				QJContractHZRecord.class);
		System.out.println("===SelectQJContractHZR==" + query);
		return query.list();
	}

	@Override  //20150819
	public List<QJIssueCard> getQJAddCardZuiJin(String MaxDate, String MinDate) {
		
		return null;
	}

	@Override    //20150911 统计易转账总金额接口
	public String CountMoney(String StartT, String EndT) {
		// TODO Auto-generated method stub
		//此处SQL主要是因为判断时间的时候  结束时间总是会判断前一天，所以暂用此sql过滤数据
		String count = "";
		try {
			System.out.println("--dao -> StartT:" + StartT + "    EndT:" + EndT);
			String hql = "";
			if(StartT.equals("") || EndT.equals("")){
				hql = "select SUM(ms.MS_AMOUNT) from MACHINE_SELF ms where ms.MS_TRADERESULT like '%成功%'";
			}else{
				 hql = "select SUM(ms.MS_AMOUNT) from MACHINE_SELF ms where (ms.MS_TRADEDATE >= '"+
				 		StartT+" %' and ms.MS_TRADEDATE <= '"+EndT+" %' and ms.MS_TRADERESULT like '%成功%') or ms.MS_TRADEDATE like '"+EndT+" %'";
			}
			System.out.println("---CountMoney Dao  SQL = " + hql);
			SQLQuery qu = this.getSession().createSQLQuery(hql);
			count = qu.uniqueResult().toString();
			System.out.println("--总合：" + count);
		} catch (Exception e) {
			System.err.println("---CountMoney Dao  Exception e = " + e.toString());
		}
		return count;
	}

	@Override
	public String CountAmount(String startimes, String endtimes, String wdNum,
			String cusName, String tellernum, String traderesult) {
		System.out.println("--dao -> startimes:" + startimes + 
				"    endtimes:" + endtimes+"wdNum :"+wdNum+" cusName："+cusName+" tellernum:"+tellernum+" traderesult:"+traderesult);
		String count = "";
		try {
			String hql = "";
				if(startimes.isEmpty()&& startimes==null && endtimes.isEmpty() && endtimes==null
						&& wdNum.isEmpty() && wdNum==null && cusName.isEmpty() && cusName==null 
						&& tellernum.isEmpty() && tellernum==null && traderesult.isEmpty()&& traderesult==null){
					
					hql = "select SUM(ms.MS_AMOUNT) from MACHINE_SELF ms ";
				
			 }else{
				 hql = "select SUM(ms.MS_AMOUNT) from MACHINE_SELF ms where 1=1 ";
			 
				if (!"".equals(wdNum) && wdNum != null) {
					hql=hql+" and ms.MS_WDNUM like '%" + wdNum + "%'";
				}
				if (!"".equals(cusName) && cusName != null) {
					hql=hql+" and ms.MS_CUSNAME like '%" + cusName + "%'";
				}
				if (!"".equals(tellernum) && tellernum != null) {
					hql=hql+" and ms.MS_TELLERNUM like '%" + tellernum + "%'";
				}
				if (!"".equals(startimes) && startimes != null) {
					hql=hql+" and ms.MS_TRADEDATE >= '" + startimes + " %'";
				}
				if (!"".equals(endtimes) && endtimes != null) {
					hql=hql+" and ms.MS_TRADEDATE <= '" + endtimes
							+ " 23:59:59'";
				}
				if (!"".equals(traderesult) && traderesult != null) {
					hql=hql+ " and ms.MS_TRADERESULT like" + "'%" + traderesult
							+ "%'";
				}
			 }
				hql=hql+" order by ms.MS_TRADEDATE desc";
				System.out.println("---CountAmount Dao  SQL = " + hql);
				SQLQuery qu = this.getSession().createSQLQuery(hql);
				count = qu.uniqueResult().toString();
				System.out.println("--总合：" + count);
		} catch (Exception e) {
			System.err.println("---CountAmount Dao  Exception e = " + e.toString());
	    }
	 return count;
  }
	

	@Override//插入登录表数据
	public void saveOrUpdateLoginCTI(CTI_Login_Info loginInfo) {
		// TODO Auto-generated method stub
		//System.out.println("saveOrUpdateLoginCTI DAO,CTI_Login_Info >>>>> ");
		Transaction ts = getSession().beginTransaction(); // 创建事物并开始
		
		this.getHibernateTemplate().saveOrUpdate(loginInfo);
		//System.out.println("save saveOrUpdateLoginCTI SUCCESS...");
		ts.commit(); // 提交结束事物
	}

	@Override//获取登录表中最大的maxID
	public List<CTI_Login_Info> getMaxLoginInfo(String AgentId) {
		String hql = "select * from Z_CTI_LOGIN L where L.LAGENTID = '" + AgentId + "' and l.LID = (select Max(LID) from Z_CTI_LOGIN where LAGENTID = '"+AgentId+"')";
		Query query = getSession().createSQLQuery(hql).addEntity(CTI_Login_Info.class);
		return query.list();
	}

	//插入CTI小休时间数据
	@Override
	public void saveOrUpdateRestCTI(CTI_Rest_Info restInfo) {
		// TODO Auto-generated method stub
		//System.out.println("-[ConHisDaoImpl] saveOrUpdateRestCTI DAO,CTI_Rest_Info >>>>> ");
		Transaction ts = getSession().beginTransaction();
		this.getHibernateTemplate().saveOrUpdate(restInfo);
		//System.out.println("-[ConHisDaoImpl] save saveOrUpdateRestCTI SUCCESS...");
		ts.commit(); 
	}

	@Override
	public List<CTI_Rest_Info> getMaxRestInfo(String AgentId) {
		//System.out.println("-getMaxRestInfov(AgentId)," + AgentId);
		String hql = "select * from Z_CTI_REST R where R.RAGENTID = '" + AgentId + "' and R.RID = (select Max(RID) from Z_CTI_REST where RAGENTID = '"+AgentId+"')";
		//System.out.println("-getMaxRestInfo SQL : " + hql);
		Query query = getSession().createSQLQuery(hql).addEntity(CTI_Rest_Info.class);
		//System.out.println("-getMaxRestInfo , Query : " + query);
		return query.list();
	}

	@Override
	public void saveOrUpdateAfterWorkCTI(CTI_AfterWork_Info afterWorkInfo) {
		// TODO Auto-generated method stub
		//System.out.println("saveOrUpdateAfterWorkCTI DAO,CTI_AfterWork_Info >>>>> ");
		Transaction ts = getSession().beginTransaction(); // 创建事物并开始
		
		this.getHibernateTemplate().saveOrUpdate(afterWorkInfo);
		//System.out.println("save saveOrUpdateAfterWorkCTI SUCCESS...");
		ts.commit(); 
	}

	@Override
	public List<CTI_AfterWork_Info> getMaxAfterWorkInfo(String AgentId) {
		// TODO Auto-generated method stub
		//System.out.println("-getMaxAfterWorkInfo(AgentId)," + AgentId);
		String hql = "select * from Z_CTI_AFTERWORK A where A.AAGENTID = '" + AgentId + "' and A.AID = (select Max(AID) from Z_CTI_AFTERWORK where AAGENTID = '"+AgentId+"')";
		//System.out.println("-getMaxAfterWorkInfo SQL : " + hql);
		Query query = getSession().createSQLQuery(hql).addEntity(CTI_AfterWork_Info.class);
		//System.out.println("-getMaxAfterWorkInfo , Query : " + query);
		return query.list();
	}


	@Override
	public void saveOrUpdateRingingCTI(CTI_Ringing_Info ringingInfo) {
		// TODO Auto-generated method stub
		System.out.println("-[ConHisDaoImpl] saveOrUpdateRingingCTI DAO,CTI_Ringing_Info >>>>> ");
		Transaction ts = getSession().beginTransaction();
		this.getHibernateTemplate().saveOrUpdate(ringingInfo);
		System.out.println("-[ConHisDaoImpl] save saveOrUpdateRingingCTI SUCCESS...");
		ts.commit(); 
	}

	@Override
	public List<CTI_Ringing_Info> getMaxRingingInfo(String AgentId) {
		// TODO Auto-generated method stub
		//System.out.println("-getMaxRingingInfo(AgentId)," + AgentId);
		String hql = "select * from Z_CTI_RINGING R where R.RAGENTID = '" + AgentId + "' and R.RID = (select Max(RID) from Z_CTI_RINGING where RAGENTID = '"+AgentId+"')";
		//System.out.println("-getMaxRingingInfo SQL : " + hql);
		Query query = getSession().createSQLQuery(hql).addEntity(CTI_Ringing_Info.class);
		//System.out.println("-getMaxRingingInfo , Query : " + query);
		return query.list();
	}

	@Override
	public void saveOrUpdateCallInfoCTI(CTI_Call_Info callInfo) {
		// TODO Auto-generated method stub
		//System.out.println("-[ConHisDaoImpl] saveOrUpdateCallInfoCTI DAO,CTI_Ringing_Info >>>>> ");
		Transaction ts = getSession().beginTransaction();
		this.getHibernateTemplate().saveOrUpdate(callInfo);
		//System.out.println("-[ConHisDaoImpl] save saveOrUpdateCallInfoCTI SUCCESS...");
		ts.commit(); 
	}

	@Override
	public List<CTI_Call_Info> getMaxCallInfo(String AgentId) {
		// TODO Auto-generated method stub
		//System.out.println("-getMaxCallInfo(AgentId)," + AgentId);
		String hql = "select * from Z_CTI_CALLINFO C where C.CAGENTID = '" + AgentId + "' and CID = (select Max(CID) from Z_CTI_CALLINFO where CAGENTID = '"+AgentId+"')";
		//System.out.println("-getMaxRingingInfo SQL : " + hql);
		Query query = getSession().createSQLQuery(hql).addEntity(CTI_Call_Info.class);
		//System.out.println("-getMaxCallInfo , Query : " + query);
		return query.list();
	}
	
	@Override
	public List<QJTransferAccounts> selectQJTransferAcco(String machineSelfid) {
		System.out.println(" 【ConhisDaoImpl 】调用 selectQJTransferAcco  " +
				" ulEmpBTypeId"+machineSelfid);
		 Query query = null;
			String hql="select q.*  from QJ_TRANSFER_ACCOUNTS q ,machine_self m " +
					" where   m.MS_BUSDEALNUM = q.SERIAL_NUMBER " +
					  " and q.SERIAL_NUMBER='"+machineSelfid+"'" ;
					//"and m.MS_ID= "+new Long(machineSelfid);
			query = getSession().createSQLQuery(hql).addEntity(QJTransferAccounts.class);
			System.out.println("selectQJTransferAcco  query "+query);
		return query.list();
	
		
	}
}
