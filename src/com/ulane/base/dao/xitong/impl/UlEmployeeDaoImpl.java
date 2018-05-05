package com.ulane.base.dao.xitong.impl;
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
import java.util.Iterator;
import java.util.List;
import java.util.TreeSet;



import net.fckeditor.response.GetResponse;
import net.fckeditor.tool.Utils;
import oracle.net.aso.q;

import org.apache.commons.lang.StringUtils;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.jdbc.Work;
import org.jbpm.api.Configuration;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.model.customer.BankType;
import com.htsoft.oa.model.system.AppFunction;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FunUrl;
import com.htsoft.oa.model.system.Region;
import com.htsoft.oa.util.SqlBuilder;
import com.ulane.base.dao.xitong.UlEmployeeDao;

import com.ulane.base.model.xitong.Equipment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.model.xitong.UlEmployeeEquipment;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.customer.model.customer.ConHis;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings({ "unchecked", "unused" })
public class UlEmployeeDaoImpl extends BaseDaoImpl<UlEmployee> implements UlEmployeeDao{

	protected static final String EId = null;

	public UlEmployeeDaoImpl() {
		super(UlEmployee.class);
		System.out.println("=========UlEmployeeDaoImpl==========="+UlEmployee.class);
	}

	/**
	 * 根据组织机构去查找员工
	 */
	@Override
	public List<UlEmployee> findByDepartment(String path, PagingBean pb) {
		List list = new ArrayList();
		String hql = new String();
		if ("0.".equals(path)) {
			hql = "from UlEmployee vo2 order by vo2.userNo asc"; // where vo2.delFlag = ?
//			list.add(Constants.FLAG_UNDELETED);
		} else {
			//TODO
			hql="select distinct au from UlEmployee au where au.ulDepartment.path like ? order by au.userNo asc";  // and au.delFlag=? 
			list.add(path + "%");
//			list.add(Constants.FLAG_UNDELETED);
		}
		return findByHql(hql, list.toArray(), pb);
	}
	
	public UlEmployee getEmployeeByUserNo(String userNo) {
		String hql="select vo from UlEmployee vo where vo.userNo=?";
		List<UlEmployee> employees=findByHql(hql,new Object[]{userNo});
		if(employees!=null&&employees.size()>0) {
			return employees.get(0);
		} else {
			return null;
		}
	}

	@Override
	public Integer getEmployeeCount() {
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(*)");
		SqlBuilder.FROM("ul_employee");
		String sql_getCount = SqlBuilder.SQL();

		JdbcWork getCount = new JdbcWork() {
			@Override
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
		help.setJdbcWork(getCount);
		help.setSql(sql_getCount);

		return (Integer) getHibernateTemplate().execute(help);
	}

	//查询员工信息
	public List<UlEmployee> getShowList() {
		String hql = "from UlEmployee vo2 order by vo2.userNo asc";
		List<UlEmployee> ue= this.getHibernateTemplate().find(hql);
		System.out.println("select - -  SUCCESS");
		return ue ;
	}

	// 查看用户信息
	
	
	
	public AppUser selectSomeOne(){
		String hql = "from AppUser au where order by au.status=1 desc";
		List<AppUser> au= this.getHibernateTemplate().find(hql);
		System.out.println("select - -  SUCCESS");
		for(int i=0;i<au.size();i++){
		   System.out.println("排序："+au.get(i));
		}
		return null;
		
		//return (AppUser) au;
		//this.getHibernateTemplate().u
	}
	//03/14
	public void update(AppUser au){
		//String hql="update AppUser au";
		String hql="update AppUser au set au.delFlag=1 where au.status=3 or au.status=5 order by au.status=1 desc";
		System.out.println("===hql"+hql);
		System.out.println("状态以正常排序："+au.getStatus().toString());
		Query query=getSession().createQuery(hql);
		query.executeUpdate();
	
		//this.getHibernateTemplate().update(au);
		System.out.println("update  - - SUCCESS----");
	}
	
	//03/14
	public AppUser selectSomeOne(Long id){
		String hql = "from AppUser au where au.ulEmployee.useid="+id;
		List<AppUser> au= this.getHibernateTemplate().find(hql);
		System.out.println("select - -  SUCCESS");
		//System.out.println("状态以正常排序："+au.get(0));
		return au.get(0);
		//return (AppUser) au;
		//this.getHibernateTemplate().u
	}
	
	/** 2014/4/2 设备管理的增删改查 */
	@Override
	// 1 显示设备的信息
	public List<Equipment> getShowEquipment(String equipmentId,
			String equipmentName) {
		
	     String hql = "from Equipment e where e.equipmentId=? or e.equipmentName=?";
		  Query query = getSession().createQuery(hql);
		  System.out.println("=============query" + query);
		  query.setString(0, equipmentId);
		 System.out.println("======0000000000======equipment" + equipmentId);
		 query.setString(1, equipmentName);
		 System.out.println("=====111111111========equipment" + equipmentName);
//	
		 return query.list();
		
	}

	// 修改和添加时的查询和查询显示全部的列表
	public List<Equipment> getShowEquipment() {
		// if(equipmentId==null && equipmentName==null){
		String hql = "from  Equipment  e where e.delFlag=1";
		List<Equipment> equipments = this.getHibernateTemplate().find(hql);
		System.out.println("=================equipments=" + equipments);
		System.out.println("===========equipments" + equipments.size());
		return equipments;
		// }

	}
/*
 * 2014/6/3 添加分页 修改
 * 
 * */
	
	public List<Equipment> getShowEquipment(Integer start, Integer limit) {

		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("*");
		SqlBuilder.FROM("equipment");
		String sql = SqlBuilder.SQL();

		JdbcWork getdata = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				List<Equipment> result = new ArrayList<Equipment>();
				try {
					while (rs.next()) {
						Equipment e = new Equipment();
						e.setEId(rs.getLong("EId"));
						e.setEquipmentId(rs.getString("EQUIPMENTID"));
						e.setEquipmentName(rs.getString("EQUIPMENTNAME"));
						result.add(e);
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return result;
			}
		};
		JdbcHelper help = new JdbcHelper();
		help.setJdbcWork(getdata);
		help.setSql(JdbcHelper.getPagingSql(sql, start, limit));
		return (List<Equipment>) getHibernateTemplate().execute(help);
	}

	
	// 删除
	public void getDelEquipment(Equipment eq) {
		this.getHibernateTemplate().delete(eq);
		// Query query=session.createQuery("delete from Equipment where EId=?");
		String hql = "delete from Equipment";
		System.out.println("===========eq" + eq);
		// eq.setEId(1,new Long(EId);
		System.out.println("========eid" + EId);

		// //this.getHibernateTemplate().update(hql, new Object[]{EId});
		// this.update(hql, new Object[]{EId});
		;
		// this.getHibernateTemplate().delete(eq);
		this.getHibernateTemplate().delete(hql, eq);
		// this.getHibernateTemplate().update(hql, eq);
		System.out.println("=====成功");

	}

	// @Override 单个删除设备2014/4/3
	public void getDelEquipment(Long EId) {
		System.out.println("===========EId" + EId);

		// Session session=(Session) this.getSessionFactory();
		// session.beginTransaction().begin();
//		Query query = getSession().createQuery(
//				"delete from Equipment e where e.EId=?");
		Query query=getSession().createSQLQuery("update  EQUIPMENT e set e.DELFLAG=0 where  e.EId=?");
		System.out.println("====================query" + query);
		query.setLong(0, EId);
		System.out.println("============ query.setLong(0, EId)"
				+ query.setLong(0, EId));
		query.executeUpdate();
		// session.beginTransaction().commit();
		System.out.println("==============dao删除====成功");

	}

	// 添加设备管理(注解：hibernate当中如果是添加，修改操作，一定要开启事务，关闭事务)

	public void addEquipment(String newname, String newId) {
		System.out.println("==============add    dao");
		Transaction tx = getSession().beginTransaction();
		Equipment eq = new Equipment();
		eq.setEquipmentId(newId);
		eq.setEquipmentName(newname);
		//this.getHibernateTemplate().saveOrUpdate(eq);
		//getSession().saveOrUpdate(eq);
		getSession().save(eq);
	   tx.commit();
	}

	// 修改 huyang3868@163.com

	public void updateEquipment(Long EId, String equipmentId,
			String equipmentName) {
		Transaction tx = getSession().beginTransaction();
		Equipment equipment = new Equipment();
		
		Query query = getSession()
				.createSQLQuery(
						"update Equipment e set e.equipmentId=?,e.equipmentName=? where EId=?");
		System.out.println("====query" + query);
		System.out.println("=======update=====query" + query);
		query.setString(0, equipmentId);
		query.setString(1, equipmentName);
		// query.setString(1,equipment.getEquipmentName());
		// query.setString(2, equipment.getEquipmentName());
		query.setLong(2, EId);
		System.out.println("e.equipmentId=?,e.equipmentName=? where EId=?"
				+ EId);
		// query.setLong(3, equipment.getEId());
		query.executeUpdate();

		tx.commit();

		System.out.println("==============dao修改====成功");

	}

	@Override
	// 查询用户和员工是否有关联
	public List<AppUser> selectOnly(Long id) {
		 String hql = "from AppUser au where au.ulEmployee.useid="+id;
		List<AppUser> au= this.getHibernateTemplate().find(hql);
		System.out.println("select - -  SUCCESS");
		//System.out.println("状态以正常排序："+au.get(0).getStatus());
		return au;
		
	}

	@Override
	public List<AppUser> updateOnly(AppUser au) {
		
		//String hql="update AppUser au set au.delFlag=1 where au.useid=?";
		String hql="update AppUser au set au.delFlag=1 where au.status=3 or au.status=5 order by au.status=1 desc";
		System.out.println("===hql"+hql);
		System.out.println("状态以正常排序："+au.getStatus().toString());
		Query query=getSession().createQuery(hql);
		query.setLong(0, au.getUserId());
		query.executeUpdate();
	
		//this.getHibernateTemplate().update(au);
		System.out.println("update  - - SUCCESS----");
		return query.list();
	}

	@Override
	public void getUpdateDelAppUser(Long useid) {
//		 String hql = "update AppUser au set au.delFlag=1 where au.status=3 or au.status=5";
//		//String hql="update AppUser au set au.delFlag=1 where au.status=3 or au.status=5";
//		//String hql="update AppUser au set au.delFlag=1 where au.status=3 or au.status=5 order by au.status=1 desc";
//		System.out.println("===hql"+hql);
//		Query query=getSession().createQuery(hql);
//		//query.setLong(0, useid);
//		query.executeUpdate();
		Query query=getSession().createSQLQuery("update  app_user au set au.delFlag=1 where  au.useid=?");
		System.out.println("====================query" + query);
		query.setLong(0, useid);
	
		query.executeUpdate();
		// session.beginTransaction().commit();
		System.out.println("==============dao删除====成功");

	}

	
	

		
		

   

	
	
	
	
	
	

     /*
      * 查询设备管理中
      * 网点名称  2014/06/06
      * */
	@Override
	public List<Equipment> getEqName(String id) {
	
	   String hql="from Equipment e where  e.equipmentId='"+id+"'";
	   System.out.println("====dao==="+hql);
	   return this.getHibernateTemplate().find(hql);
		
		
	}

	@Override


	/*
	 * 2014/06/06   设备管理查询的分页
	 * 
	 * 
	 * */
	public String getShowEquipment(Integer start, Integer limit,
			String equipmentId, String equipmentName) {
		JdbcHelper helper = new JdbcHelper();
		
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("EQUIPMENTID,EQUIPMENTNAME");
		SqlBuilder.FROM("equipment");
		if(StringUtils.isNotEmpty(equipmentName)||StringUtils.isNotEmpty(equipmentId))
		  SqlBuilder.WHERE("equipmentId like"+"'%"+equipmentId+"%'");
		  SqlBuilder.WHERE("equipmentName like"+"'%"+equipmentName+"%'");
		String sql = SqlBuilder.SQL();

		JdbcWork getdata = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				//List<Equipment> result = new ArrayList<Equipment>();
				StringBuffer buff=new StringBuffer("[");
				try {
					while (rs.next()) {
						
						    buff.append("["+rs.getString("EQUIPMENTID")+"','"+rs.getString("EQUIPMENTNAME")+"',]'");
						
						buff.deleteCharAt(buff.length() - 1);
					}
					buff.append("]");
					//buff.append(pb.getPageSize());
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return buff.toString();
			}
		};
		//JdbcHelper help = new JdbcHelper();
		helper.setJdbcWork(getdata);
		helper.setSql(JdbcHelper.getPagingSql(sql, start, limit));
		return (String) getHibernateTemplate().execute(helper);
	}

	@Override
	/*
	 * 2014/06/09  设备管理与业务资料的查询的网点名称
	 * */
	public Equipment getselectEqName(String id)throws Exception {
		 String hql="from Equipment e where  e.equipmentId='"+id+"'";
		   System.out.println("====dao==="+hql);
		   List<Equipment> eqName=this.getHibernateTemplate().find(hql);
		// return (Equipment) this.getHibernateTemplate().find(hql);
		   if(eqName.size() == 0){
			   return null;
		   }else{
			   return eqName.get(0);
		   }
		   
	}

	@Override
	public List<ConHis> selectCoHis() {
		String hql="from ConHis ch";
		List<ConHis> conhis = this.getHibernateTemplate().find(hql);
		System.out.println("=================equipments=" + conhis);
		System.out.println("===========equipments" + conhis.size());
		return conhis;
	}
	
	
	
	
	
	//=============================================
	/**
	 * 2015/3/15
	 * 设备管理的查询
	 * （带分页）
	 * nk
	 */
	@Override
	public List<Equipment> listEquipment(Integer start, Integer limit,
			String bankname, String branchId,String operatorId) {
		System.out.println("---------ExamineReport---------");
		Query query;
		if(bankname==null && branchId==null && operatorId==null){
			 System.out.println("【UlEmployeeDaoImpl 】调用--listEquipment   查询所有");
			 //String hql = "from Equipment e where e.delFlag=1 order by e.equipmentId desc";
			 String hql = "from Equipment e where e.delFlag=1 order by e.equipmentId desc";
			 query = getSession().createQuery(hql);
			 System.out.println("=============query" + query);
			 query.setFirstResult(start);
			 query.setMaxResults(limit);
			 System.out.println("===start==="+start+"======"+limit);
		}else{
			//多条件的查询，用StringBuffer拼接字符串，在连接的时候 不能用or，or当查询多个条件的不能任意匹配，用and(切记)
				StringBuffer hql=new StringBuffer("from  Equipment  e where  1=1 and e.delFlag=1 ");
				
				if(!"".equals(bankname)&& bankname!=null){
					hql.append(" and e.bankname like '%" + bankname + "%'");
					hql.append(" or e.parentName like '%" + bankname + "%'");
				}
				
				if(!"".equals(branchId)&& branchId!=null){
					hql.append(" and e.branchId like '%" + branchId + "%'");
				}	
				if(!"".equals(operatorId)&& operatorId!=null){
					hql.append(" and e.operatorId like '%" + operatorId + "%'");
				}
				System.out.println("===【UlEmployeeDaoImpl 】调用==operatorId"+branchId+bankname+"============"+operatorId);
				query = getSession().createQuery(hql.toString());
				System.out.println("=【UlEmployeeDaoImpl 】调用===query="+ query);
				query.setFirstResult(start);//hibernate自带的分页查询，起始页
     		    query.setMaxResults(limit);//结束页
				
		}
	  return query.list();
	}

	@Override
	public Integer listEquipmentCount(String bankname, String branchId,String operatorId) {
		System.out.println("【UlEmployeeDaoImpl 】调用==ExamineReportAllCountIf  ");
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(EId)");
		SqlBuilder.FROM(" EQUIPMENT e ");
		 SqlBuilder.WHERE(" e.delFlag=1 ");
		if(bankname==null && branchId==null && operatorId==null){
			System.out.println("查询所有数据");
		}else {
			if(!"".equals(bankname)&& bankname!=null){
				System.out.println("jjfjfjf"+bankname);
				 SqlBuilder.WHERE(" e.BANK_NAME like"+"'%"+bankname+"%'");
				 SqlBuilder.WHERE(" e.PARENT_NAME like"+"'%"+bankname+"%'");
			}
			
			if(!"".equals(branchId)&& branchId!=null){
				 SqlBuilder.WHERE(" e.BRANCH_ID like"+"'%"+branchId+"%'");
			}
			if(!"".equals(operatorId)&& operatorId!=null){
				 SqlBuilder.WHERE(" e.OPERATOR_ID like"+"'%"+operatorId+"%'");
			}
			
			    System.out.println("查询所有数据 else ");
	         }
		String sql_getCount = SqlBuilder.SQL();
		
		return JDBCCount(sql_getCount);
	}
	
	
	public Integer JDBCCount(String sqlCount){
		JdbcWork count =new JdbcWork(){
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

	@Override
	public void addlistEquipment(String equipmentId, String operatorId,
			String equipmentName, String branchId, String curdate,
			String bankTypeId, String bankTypeName, String ip, String parentId,String address,String parentName) {
		System.out.println("【UlEmployeeDaoImpl 】调用========addlistEquipment    dao");
		System.out.println("=【UlEmployeeDaoImpl 】调用========="+bankTypeName+bankTypeId+curdate+branchId+
				equipmentName+operatorId+equipmentId+ip);
		Transaction tx = getSession().beginTransaction();
		Equipment eq= new Equipment() ;
		eq.setEquipmentId(equipmentId);
		eq.setOperatorId(operatorId);
		eq.setEquipmentName(equipmentName);
		eq.setBranchId(branchId);
		eq.setCurdate(curdate);
		eq.setBankTypeId(new Long (bankTypeId));
		eq.setBankname(bankTypeName);
		eq.setIpAddress(ip);
		eq.setParentId(new Long(parentId));
		eq.setDelFlag(new Long(1));
		eq.setAddress(address);
		eq.setParentName(parentName);
		getSession().saveOrUpdate(eq);
		tx.commit();
  
	}

	@Override
	public Equipment getByEquipmentId(String equipmentId) {
		String hql="from Equipment e where e.equipmentId=?";
		return (Equipment)findUnique(hql, new Object[]{equipmentId});
	}

	@Override
	public void updatelistEquipment(Long EId, String equipmentId,
			String operatorId, String equipmentName, String branchId,
			String curdate, Long bankTypeId, String bankTypeName, String ip,
			Long parentId,String address,String parentName) {
		System.out.println("【UlEmployeeDaoImpl 】调用updatelistEquipment() " +
				"----address="+address+EId+equipmentId+curdate+bankTypeId+bankTypeName+parentId+ip);
		Transaction tx = getSession().beginTransaction();
			Equipment eq= new Equipment() ;
			eq.setEquipmentId(equipmentId);
			eq.setOperatorId(operatorId);
			eq.setEquipmentName(equipmentName);
			eq.setBranchId(branchId);
			eq.setCurdate(curdate);
			eq.setBankTypeId(new Long (bankTypeId));
			eq.setBankname(bankTypeName);
			eq.setIpAddress(ip);
			eq.setParentId(new Long(parentId));
			eq.setDelFlag(new Long(1));
			eq.setEId(EId);
			eq.setAddress(address);
			eq.setParentName(parentName);
		   getSession().saveOrUpdate(eq);
		  //getSession().update(eq);
		   tx.commit();
		
//		Transaction tx = getSession().beginTransaction();
//		Equipment equipment = new Equipment();
		//String hql="update EQUIPMENT e set e.EQUIPMENTID='"+equipmentId+"',e.OPERATOR_ID='"+operatorId+"', e.EQUIPMENTNAME='"+equipmentName+"', e.BRANCH_ID='"+branchId+"' ,e.CUR_DATE='"+curdate+"', e.BANK_NAME='"+bankTypeName+"',e.IP_ADDRESS='"+ip+"' ,e.PARENT_ID="+parentId+" ,e.BANK_TYPE_ID="+bankTypeId+" where e.EId="+EId+" and e.delFlag=1";
         
		//String hql="update EQUIPMENT e set e.EQUIPMENTID=?,e.OPERATOR_ID=?, e.EQUIPMENTNAME=?, e.BRANCH_ID=? ,e.CUR_DATE=?, e.BANK_NAME=?,e.IP_ADDRESS=? ,e.PARENT_ID=? ,e.BANK_TYPE_ID=? where e.EId='"+EId+"' and e.delFlag=1";
		
//		String hql="update Equipment e set e.equipmentId=?,e.operatorId=?, e.equipmentName=?, e.branchId=? ,e.curdate=?, e.bankname=?,e.ipAddress=? ,e.parentId=? ,e.bankTypeId=? where e.EId="+EId+" and e.delFlag=1";
//		Query query=getSession().createQuery(hql);
//		//Query query=getSession().createSQLQuery(hql);
//		query.setString(0,equipmentId);
//		query.setString(1, operatorId);
//		//query.setString(2, equipmentId);
//		query.setString(2, branchId);
//		query.setString(3,curdate);
//		query.setLong(4, bankTypeId);
//		query.setString(5,bankTypeName);
//		query.setString(6,equipmentName);
//		query.setString(7, ip);
//		query.setLong(8,parentId);
//		query.executeUpdate();
//		
//		System.out.println("=============="+query);
		
		
		
		//getHibernateTemplate().update(hql);
		// Query query=getSession().createSQLQuery(hql);
          //query.executeUpdate();
		
		//		Query query = getSession()
//				.createSQLQuery(
//						"update EQUIPMENT" +
//						" e set e.EQUIPMENTID='"+equipmentId+"',e.OPERATOR_ID='"+operatorId+"',e.EQUIPMENTNAME='"+equipmentName+"',e.BRANCH_ID='"+branchId+"',e.CUR_DATE='"+curdate+"',e.BANK_NAME="+bankTypeName+",'e.IP_ADDRESS='"+ip+"',e.PARENT_ID="+parentId+",e.BANK_TYPE_ID="+bankTypeId+" where e.EId="+EId+" and e.delFlag=1");
//		System.out.println("====query" + query);
//		System.out.println("=======update=====query" + query);
////		query.setString(0, equipmentId);
////		query.setString(1, equipmentName);
////		// query.setString(1,equipment.getEquipmentName());
////		// query.setString(2, equipment.getEquipmentName());
////		query.setLong(2, EId);
		System.out.println("e.equipmentId=?,e.equipmentName=? where EId=?"
				+ EId);
		// query.setLong(3, equipment.getEId());
		//query.;

		//tx.commit();

		System.out.println("==============dao修改====成功");
		
		
		
		
		
		
	}

	@Override
	public List<AppRole> getRoleName() {
		System.out.println("[UlEmployeeDaoImpl] - invoke(调用) : getRoleName()...");
		//判断当前用户是那种角色：
		//超级管理员：除了自己，可以添加所有的角色
		// 总行管理员：除了超级管理员、总行管理员、分行后督
		//分行管理员：支行操作员、分行后督
		 AppUser user = ContextUtil.getCurrentUser();
			Query query = null ; 
			List<AppRole> listR=appUserDao.selectRoleName(user.getUserId());
			String hql="";
		for(int i=0;i<listR.size();i++){
			
			 if("超级管理员".equals(listR.get(i).getRoleName())){// 
//				 hql=" select * from app_role ap where 1=1 and (ap.rolename='总行后督'" +
//				 		" or ap.rolename='分行管理员' or ap.rolename='支行操作员' " +
//				 		" or ap.rolename='总行座席'   or ap.rolename='总行管理员'" +
//				 		" or ap.rolename='分行后督'   or ap.rolename='呼叫中心主管' or ap.rolename='总行操作员' " +
//				 		" or ap.rolename='总行座席班长') ";
				 hql=" select * from  app_role ap  ";
			 }
			 
			 if("总行管理员".equals(listR.get(i).getRoleName())){// 
				 hql=" select * from app_role ap where 1=1 and (ap.rolename='总行后督'" +
				 		" or ap.rolename='分行管理员' or ap.rolename='支行操作员' or ap.rolename='总行操作员' " +
				 		" or ap.rolename='总行座席'   or ap.rolename='呼叫中心主管' " +
				 		" or ap.rolename='总行座席班长') ";
			 }
			 if("分行管理员".equals(listR.get(i).getRoleName())){// 
				 hql=" select * from app_role ap where 1=1 and ( ap.rolename='支行操作员'  or ap.rolename='分行后督')";
			 }
			 
			 
			
		}
		query = getSession().createSQLQuery(hql).addEntity(AppRole.class);
		return query.list();
	}

	//保存部门的depid---
	public void updateDepid(Long userid) {
		Transaction tx = getSession().beginTransaction();
		String hql = "update  ul_employee set depid=561 where useid="+userid;
		
		System.out.println("===hql"+hql);
		Query query=getSession().createSQLQuery(hql);
		
		query.executeUpdate();
		tx.commit();
		//this.getHibernateTemplate().update(au);
		System.out.println("update  - - SUCCESS----");
	}

	@Override
	public List<UlEmployee> SelectUlempList(Integer start, Integer limit,
			String fullname, String userNo, String zhiwei) {

	    AppUser user = ContextUtil.getCurrentUser();
		System.out.println("[AppUserDaoImpl.java] - invoke(调用) : SelectUserListCount()");
		System.out.println("===username="+fullname+fullname+userNo+zhiwei);
		Query query = null ; 
		
		List<AppRole> listR=appUserDao.selectRoleName(user.getUserId());
		if(fullname==null && userNo==null  && zhiwei==null ){
		String hql="";
		for(int i=0;i<listR.size();i++){
			 //查看所有的
			
				 System.out.println("------"+listR.get(i).getName());
			 if("超级管理员".equals(listR.get(i).getName())||"总行操作员".equals(listR.get(i).getName()) || "总行管理员".equals(listR.get(i).getName())){//查看所有行
				 hql=" select c.* from  UL_EMPLOYEE c  " ;
			     hql=hql+ " order by c.USERNO asc ";
			  }
//			  if("总行管理员".equals(listR.get(i).getName())){//查看分行所有用户的账号
//                    hql="select u.* from app_role ap,user_role ur,app_user c ,UL_EMPLOYEE u " +
//                    		" where ap.roleid=ur.roleid and ur.userid=c.userid  and c.USEID=u.USEID and " +
//                    		"  (ap.rolename='总行座席' or ap.rolename='分行管理员' or ap.rolename='总行后督' or ap.rolename='总行操作员' " +
//                    		" or ap.rolename='分行后督' or c.bank_name like '北京%') ";
//                    hql=hql+ " order by u.USERNO asc ";
//			  }
			  if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
				  hql= "select  c.*　from  UL_EMPLOYEE c , jg_mechanis bt where bt.MECHANIS_ID=c.bank_type_id and " +
					 " bt.path like '0."+user.getBankTypeId()+"%' and ( c.zhiwei='支行操作员'  or c.zhiwei='分行后督')" ;
				  hql=hql+ " order by c.USERNO asc ";
			  }
			 
		}
		
		 query = getSession().createSQLQuery(hql).addEntity(UlEmployee.class);
		System.out.println("[ConHisDaoImpl.java] - query : "+ query);
		query.setFirstResult(start);//hibernate自带的分页查询，起始页
		query.setMaxResults(limit);//结束页	
	}else {
		StringBuffer hql=new StringBuffer();
		for(int i=0;i<listR.size();i++){

			 //查看所有的
			
				 System.out.println("------"+listR.get(i).getName());
			 if("超级管理员".equals(listR.get(i).getName())
					 ||"总行操作员".equals(listR.get(i).getName())|| "总行管理员".equals(listR.get(i).getName()) ){//查看所有行
				 hql.append(" select c.* from  UL_EMPLOYEE c  where 1=1 ") ;
			     //hql=hql+ " order by c.USERNO asc ";
			  }
//			  if("总行管理员".equals(listR.get(i).getName())){//查看分行所有用户的账号
//				  hql.append("select c.* from app_role ap,user_role ur,app_user u ,UL_EMPLOYEE c " +
//                   		" where ap.roleid=ur.roleid and ur.userid= u.userid  and c.USEID=u.USEID and " +
//                   		"  (ap.rolename='总行座席' or ap.rolename='分行管理员' or ap.rolename='总行后督'" +
//                   		"  or ap.rolename='总行操作员' or ap.rolename='分行后督' or c.bank_name like '北京%') ");
//                   //hql=hql+ " order by u.USERNO asc ";
//			  }
			  if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
				  hql.append( "select  c.*　from  UL_EMPLOYEE c , jg_mechanis bt where bt.MECHANIS_ID=c.bank_type_id and " +
					 " bt.path like '0."+user.getBankTypeId()+"%'  and ( c.zhiwei='支行操作员'  or c.zhiwei='分行后督') ");
				  //hql=hql+ " order by c.USERNO asc ";
			  }
			 
		
			
			
			
			
		}
		if(!"".equals(fullname)&& fullname!=null){
			hql.append(" and c.fullname  like"+"'%"+fullname+"%'");
		}
		if(!"".equals(userNo)&& userNo!=null){
			hql.append(" and c.USERNO  like"+"'%"+userNo+"%'");
		}
		if(!"".equals(zhiwei)&& zhiwei!=null){
			hql.append(" and c.zhiwei like "+"'%"+zhiwei+"%'");
		}	
		hql.append("order by c.USERNO asc");
		//hql.append("order by c.username asc");
		//System.out.println("[ConHisDaoImpl.java] - tellernum="+status+ "   SQL = " + hql);
		query = this.getSession().createSQLQuery(hql.toString()).addEntity(UlEmployee.class);
		//query = getSession().createQuery(hql.toString());
		System.out.println("[ConHisDaoImpl.java] - query :i "+ query);
		query.setFirstResult(start);//hibernate自带的分页查询，起始页
		query.setMaxResults(limit);//结束页
       }
     return query.list();

		
		
		
		
		
		
	}
//		//超级管理员---总行后督--查看所有的员工信息
//		// 总行管理员只能查看出支行以外 的员工信息
//		// 分行只能查看其下支行以及分行后督的信息的信息
////		['1', '超级管理员'], ['2', '总行管理'],['3', '总行坐席员'],['4', '总行操作员'],
////        ['5', '支行操作员'],['6', '分行管理员'],['7', '总行后督'], ['8', '分行后督'], 
////        ['9', '呼叫中心主管'], ['10', '呼叫中心客服主管']
//		// 
//		
//		  AppUser user = ContextUtil.getCurrentUser();//获取当前的用户
//			System.out.println("[UlEmployeeDaoImpl.java] - invoke(调用) : SelectUlempList()");
//			//System.out.println("===username="+username+fullname+userNo+status);
//			Query query = null ; 
//			
//			List<UlEmployee> listR=new ArrayList<UlEmployee>();
//			
//			if(fullname==null && userNo==null  && zhiwei==null ){
//				String hql="";
//				if(user.getUserId()==0){
//					 hql=" select c.* from  UL_EMPLOYEE c  " ;
//					 hql=hql+ " order by c.USERNO asc ";
//					 System.out.println("===hql"+hql);
//				}else{
//					
//				listR=selectRoleName();
//					System.out.println("===========listR"+listR);
//				for(int i=0;i<listR.size();i++){
//					System.out.println("===========listR"+listR.get(i).getZhiwei());
//					if("1".equals(listR.get(i).getZhiwei()) || "4".equals(listR.get(i).getZhiwei())){
//						
//						 hql=" select c.* from  UL_EMPLOYEE c  " ;
//						 hql=hql+ " order by c.USERNO asc ";
//						 System.out.println("===hql"+hql);
//					  }
//					  if("2".equals(listR.get(i).getZhiwei())){//查看分行所有用户的账号
//	                        hql=" select c.* from  UL_EMPLOYEE c  " +
//	                        		" where  " +
//	                        		"  (c.zhiwei='3' or c.zhiwei ='6' or c.zhiwei='7'or c.zhiwei='4' or c.bank_name like '北京%') ";
//	                        hql=hql+ " order by c.USERNO asc ";
//					  }
//					  if("6".equals(listR.get(i).getZhiwei())){//查看本支行的信息---支行操作员
//						  hql= "select c.* from  UL_EMPLOYEE c  ,bank_type bt where bt.bank_type_id=c.bank_type_id and " +
//							 " ( bt.path like '0."+user.getBankTypeId()+".%' or c.zhiwei='8' )" ;
//						  hql=hql+ " order by c.USERNO asc ";
//					  }
//					 
//				}
//			}
//				System.out.println("===hql"+hql);
//				query = getSession().createSQLQuery(hql).addEntity(UlEmployee.class);
//				System.out.println("[ConHisDaoImpl.java] - query : "+ query);
//				query.setFirstResult(start);//hibernate自带的分页查询，起始页
//				query.setMaxResults(limit);//结束页			
//			}else{
//				StringBuffer hql=new StringBuffer();
//				if(user.getUserId()==0){
//					hql.append(" select c.* from  UL_EMPLOYEE c where 1=1 " ) ;
//					 //hql=hql+ " order by c.USERNO asc ";
//					 System.out.println("===hql"+hql);
//				}else{
//				     for(int i=0;i<listR.size();i++){
//					
//					if(user.getUserId()==0 || "1".equals(listR.get(i).getZhiwei()) || "4".equals(listR.get(i).getZhiwei())){
//						
//						hql.append(" select c.* from  UL_EMPLOYEE c  ") ;
//						// hql=hql+ " order by c.USERNO asc ";
//					  }
//					  if("2".equals(listR.get(i).getZhiwei())){//查看分行所有用户的账号
//						  hql.append(" select c.* from  UL_EMPLOYEE c  " +
//	                        		" where  " +
//	                        		"  (c.zhiwei='3' or c.zhiwei ='6' or c.zhiwei='7'or c.zhiwei='4' or c.bank_name like '北京%') ");
//	                       // hql=hql+ " order by c.USERNO asc ";
//					  }
//					  if("6".equals(listR.get(i).getZhiwei())){//查看本支行的信息---支行操作员
//						  hql.append( "select c.* from  UL_EMPLOYEE c  ,bank_type bt where bt.bank_type_id=c.bank_type_id and " +
//							 " ( bt.path like '0."+user.getBankTypeId()+".%' or c.zhiwei='8' )") ;
//						//  hql=hql+ " order by c.USERNO asc ";
//					  }
//			
//				  }
//				}
//				
//				if(!"".equals(fullname)&& fullname!=null){
//					hql.append(" and c.fullname  like"+"'%"+fullname+"%'");
//				}
//				if(!"".equals(userNo)&& userNo!=null){
//					hql.append(" and c.USERNO  like"+"'%"+userNo+"%'");
//				}
//				if(!"".equals(zhiwei)&& zhiwei!=null){
//					hql.append(" and c.zhiwei like "+"'%"+zhiwei+"%'");
//				}	
//				
//				hql.append("order by c.USERNO asc");
//				System.out.println("[UlEmployeeDaoImpl.java] - tellernum="+zhiwei+ "   SQL = " + hql);
//				query = this.getSession().createSQLQuery(hql.toString()).addEntity(UlEmployee.class);
//				//query = getSession().createQuery(hql.toString());
//				System.out.println("[UlEmployeeDaoImpl.java] - query :i "+ query);
//				query.setFirstResult(start);//hibernate自带的分页查询，起始页
//	 		    query.setMaxResults(limit);//结束页
//		    }
//		
//		
//		
//		
//		return query.list();
//	}

	

	@Override
	public int SelectUlempListCount(String fullname, String userNo,
						String zhiwei) {
			
				     AppUser user = ContextUtil.getCurrentUser();
					System.out.println("[AppUserDaoImpl.java] - invoke(调用) : SelectUserListCount()");
					System.out.println("===username="+fullname+fullname+userNo+zhiwei);
					Query query = null;    
					List<AppRole> listR=appUserDao.selectRoleName(user.getUserId());
				   SqlBuilder.BEGIN();
				   SqlBuilder.SELECT("count(distinct (c.USEID))");
				for(int i=0;i<listR.size();i++){
					 //查看所有的
						 System.out.println("------"+listR.get(i).getName());
					 if("超级管理员".equals(listR.get(i).getName())|| "总行操作员".equals(listR.get(i).getName())|| "总行管理员".equals(listR.get(i).getName())){//查看所有行
						 //SqlBuilder.SELECT="SELECT  c.* FROM QJ_ADD_CARD c " ;
						 SqlBuilder.FROM(" UL_EMPLOYEE c   " );
					  }
//					  if("总行管理员".equals(listR.get(i).getName())){//查看分行所有用户的账号
//						  SqlBuilder.FROM(" app_role ap,user_role ur,app_user u,UL_EMPLOYEE c");// +
//						  SqlBuilder.WHERE(" ap.roleid=ur.roleid and ur.userid=u.userid  and c.USEID=u.USEID " +
//						  		"and (ap.rolename='总行坐席' or ap.rolename='分行管理员' or ap.rolename='总行后督'" +
//						  		" or ap.rolename='总行操作员'or ap.rolename='分行后督' or c.bank_name like '北京%') ");
//				              		//" where ap.roleid=ur.roleid and ur.userid=au.userid  and au.delflag=0 and " +
//				              		//"  (ap.rolename='总行坐席员' or ap.rolename='分行管理员' or ap.rolename='总行后督'or ap.rolename='总行操作员')");
//					  
//					  }
					  if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
			//			 hql="select c.*, e.bank_name from qj_add_card c, equipment e " +
			//			 		"   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
						  SqlBuilder.FROM(" UL_EMPLOYEE c  ,jg_mechanis bt  " );
			//			  		"where bt.bank_type_id=c.bank_type_id and " +
			//				 " bt.path like '0."+user.getBankTypeId()+".%' and c.delflag=0" );
						  SqlBuilder.WHERE(" bt.MECHANIS_ID=c.bank_type_id and bt.path like '0."+user.getBankTypeId()+"%'  and ( c.zhiwei='支行操作员'  or c.zhiwei='分行后督') ");
					  }
				
				   }
				if(fullname==null && userNo==null  && zhiwei==null ){
					System.out.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有数据");
				}else {
					
					if(!"".equals(fullname)&& fullname!=null){
						 SqlBuilder.WHERE(" c.fullname  like"+"'%"+fullname+"%'");
					}
					if(!"".equals(userNo)&& userNo!=null){
						 SqlBuilder.WHERE(" c.USERNO  like"+"'%"+userNo+"%'");
					}
					if(!"".equals(zhiwei)&& zhiwei!=null){
						 SqlBuilder.WHERE(" c.zhiwei like "+"'%"+zhiwei+"%'");
					}	
					
								
			    }
					
								
			  
			
				String sql_getCount = SqlBuilder.SQL();
				return JDBCCount(sql_getCount);
			
					
					
					
					
				}

	
	
	public List<AppRole> selectRoleName() {
		try{
			Query query=getSession().createSQLQuery("select  * from  app_role ").addEntity(AppRole.class);
			System.out.println("query" + query);
		
			return  query.list();
		}catch(Exception e){
			System.out.println("没有数据---");
		}
		return null;
			
	}

	@Override
	public AppRole selectRoleZWName(Long zhiwei) {
		 System.out.println("AppRole->"+zhiwei);

		Query query=getSession().createSQLQuery("select * from app_role ap  where  ap.roleid="+zhiwei).addEntity(AppRole.class);
			System.out.println("====================query" + query);
			//query.setLong(0, new Long(zhiwei));
	       System.out.println("selectRoleZWName->"+query);
		List<AppRole> eList = query.list();
		if (eList.size() == 0) {
			return null;
		} else {
			return eList.get(0);
		}
  }

		/****
		根据角色的权限来显示机构部门
		 显示树形列表，实际上是tree()*/
		public List<BankType> collectFindByParentIdForRole(Long parentId) {
			AppUser user = ContextUtil.getCurrentUser();
			List<AppRole> listR=appUserDao.selectRoleName(user.getUserId());
			 StringBuffer sb = new StringBuffer();
		   for(int i=0;i<listR.size();i++){
			
			 if("超级管理员".equals(listR.get(i).getRoleName())){// 
				
					sb.append("select distinct(b.MECHANIS_ID),b.BRANCH_ID from jg_mechanis b ");
					sb.append("where b.parent_id = " + parentId
							+ " and  b.BANK_TYPE_STATUS=1 ");
					sb.append(" order by b.MECHANIS_ID");
			 }
			 
			 if("总行管理员".equals(listR.get(i).getRoleName())){// 
				 sb.append("select distinct(b.MECHANIS_ID),b.BRANCH_ID from jg_mechanis b ");
					sb.append("where b.parent_id = " + parentId
							+ " and  b.BANK_TYPE_STATUS=1 ");
					sb.append(" order by b.MECHANIS_ID");
			 }
			 if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
//				  hql= " select * from  jg_mechanis bt where  bt.bank_type_status =1 and " +
//					 " bt.path like '0."+user.getBankTypeId()+"%'" ;
//				  query = getSession().createSQLQuery(hql).addEntity(BankType.class);
				 sb.append("select distinct(b.MECHANIS_ID),b.BRANCH_ID from jg_mechanis b ");
				sb.append(" where b.parent_id = " + parentId
							+ " and  b.BANK_TYPE_STATUS=1 and  b.path like '0."+parentId+"%'");
				sb.append(" order by b.MECHANIS_ID");
			       //long1= user.getBankTypeId();
			  }
			 
			 
			
		}
			
			final String sql = sb.toString();
			System.out.println("===[ConHisDaoImpl.java]===sql"+sql);
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
			System.out.println("==[ConHisDaoImpl.java]===query"+query.list()+"[[[["+query);
			return query.list();

		}
	
		@Override
		public List<BankType> findByParentId(Long long1) {
			System.out.println("[UlEmployeeDaoImpl] - findByParentId(调用) : findByParentId()...");
			//判断当前用户是那种角色：
			//超级管理员：除了自己，可以添加所有的角色
			// 总行管理员：除了超级管理员、总行管理员、分行后督
			//分行管理员：支行操作员、分行后督
			AppUser user = ContextUtil.getCurrentUser();
			Query query = null ; 
			List<AppRole> listR=appUserDao.selectRoleName(user.getUserId());
			System.out.println("user"+user.getBankTypeId()+user.getBankname());
			String hql="";
		   for(int i=0;i<listR.size();i++){
			
			 if("超级管理员".equals(listR.get(i).getRoleName())){// 
				 hql = " from BankType b where b.bankTypeStatus = 1 and b.parentId=? order by b.createDate ";
				 query = getSession().createQuery(hql);
				 query.setLong(0, long1);
			 }
			 
			 if("总行管理员".equals(listR.get(i).getRoleName())){// 
				 hql = " from BankType b where b.bankTypeStatus = 1 and b.parentId=? order by b.createDate ";
				  query = getSession().createQuery(hql);
				  query.setLong(0, long1);
			 }
			 if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
				  hql= " select * from  jg_mechanis bt where  bt.bank_type_status =1 and bt.PARENT_ID="+long1 +
					 " and bt.path like '0."+user.getBankTypeId()+"%'" ;
				  query = getSession().createSQLQuery(hql).addEntity(BankType.class);
			       //long1= user.getBankTypeId();
			  }
			 
			 
			
		}
			
			return query.list();

		}

		@Override
		public List<BankType> findRoleByParentIdForSql(final int start, final int limit,
				String path) {
			final List<BankType> bankTypeList = new ArrayList<BankType>();
			StringBuffer sb = new StringBuffer();
			AppUser user = ContextUtil.getCurrentUser();
			List<AppRole> listR=appUserDao.selectRoleName(user.getUserId());
			System.out.println("findRoleByParentIdForSql"+user.getBankTypeId()+user.getBankname());
		   for(int i=0;i<listR.size();i++){
			
			 if("超级管理员".equals(listR.get(i).getRoleName())){// 
				 sb.append("select distinct(c.MECHANIS_ID),c.* from (");
					sb.append("select a.*, b.BANK_NAME as tname from jg_mechanis a left join jg_mechanis b on a.parent_id = b.MECHANIS_ID ");
					sb.append(") c");
					sb.append(" where path like '%" + path + "%'");
					sb.append(" and BANK_TYPE_STATUS = 1");
					sb.append("order by c.BRANCH_ID");
			 }
			 
			 if("总行管理员".equals(listR.get(i).getRoleName())){// 
				    sb.append("select distinct(c.MECHANIS_ID),c.* from (");
					sb.append("select a.*, b.BANK_NAME as tname from jg_mechanis a left join jg_mechanis b on a.parent_id = b.MECHANIS_ID ");
					sb.append(") c");
					sb.append(" where path like '%" + path + "%'");
					sb.append(" and BANK_TYPE_STATUS = 1");
					sb.append("order by c.BRANCH_ID");
			 }
			 if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
				 sb.append("select distinct(c.MECHANIS_ID),c.* from (");
					sb.append("select a.*, b.BANK_NAME as tname from jg_mechanis a left join jg_mechanis b on a.parent_id = b.MECHANIS_ID ");
					sb.append(") c");
					sb.append(" where path like '%" + user.getBankTypeId() + "%'");
					sb.append(" and BANK_TYPE_STATUS = 1");
					sb.append("order by c.BRANCH_ID");
			  }
			 
			 
			
		}
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

		@Override
		public int findRoleByParentIdForSqlCount(int start, final int limit,
				 String path) {
			
		     AppUser user = ContextUtil.getCurrentUser();
			System.out.println(" findRoleByParentIdForSqlCount()");   
			List<AppRole> listR=appUserDao.selectRoleName(user.getUserId());
		   SqlBuilder.BEGIN();
		   SqlBuilder.SELECT(" count(distinct(c.MECHANIS_ID))");
		for(int i=0;i<listR.size();i++){
			 //查看所有的
				 System.out.println("------"+listR.get(i).getName());
			 if("超级管理员".equals(listR.get(i).getName())){//查看所有行
				 SqlBuilder.FROM("( select a.*, b.BANK_NAME as tname from jg_mechanis a left join jg_mechanis b on a.parent_id = b.MECHANIS_ID ) c " );
				    
				  SqlBuilder.WHERE(" path like '%" + path + "%'");
					 SqlBuilder.WHERE(" BANK_TYPE_STATUS = 1 ");
					 SqlBuilder.ORDER_BY(" c.BRANCH_ID ");
			  }
			  if("总行管理员".equals(listR.get(i).getName())){//查看分行所有用户的账号
				  SqlBuilder.FROM("( select a.*, b.BANK_NAME as tname from jg_mechanis a left join jg_mechanis b on a.parent_id = b.MECHANIS_ID ) c " );
				    
				  SqlBuilder.WHERE(" path like '%" + path + "%'");
					 SqlBuilder.WHERE(" BANK_TYPE_STATUS = 1 ");
					 SqlBuilder.ORDER_BY(" c.BRANCH_ID ");
			  }
			  if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
				  SqlBuilder.FROM("( select a.*, b.BANK_NAME as tname from jg_mechanis a left join jg_mechanis b on a.parent_id = b.MECHANIS_ID ) c " );
				    
				  SqlBuilder.WHERE(" path like '%" + user.getBankTypeId() + "%'");
					 SqlBuilder.WHERE(" BANK_TYPE_STATUS = 1 ");
					 SqlBuilder.ORDER_BY(" c.BRANCH_ID ");
			  }
		
		   }
	
		String sql_getCount = SqlBuilder.SQL();
		return JDBCCount(sql_getCount);
		
	}

		@Override
		public List<AppUser> selectPhoto(Long long1) {
			Query query = getSession()
			.createSQLQuery("select * from app_user  au where au.useid=?")
			.addEntity(AppUser.class);
					System.out.println("selectPhoto" + query);
					query.setLong(0, long1);
					System.out.println("selectPhoto(0, EId)"
							+ query.setLong(0, long1));
					// query.executeUpdate();
					return query.list();
		}

		@Override
		public List<AppUser> selectUserid(Long long1) {
			 System.out.println("selectUserid->"+long1);

				Query query=getSession().createSQLQuery("select * from app_user  au where au.useid="+long1).addEntity(AppUser.class);
					System.out.println("====================query" + query);
					//query.setLong(0, new Long(zhiwei));
			       System.out.println("selectRoleZWName->"+query);
				return query.list();
		}

		@Override
		/*==============================================================员工维护设备信息=======================
		 * */
		public List<Equipment> ulempEquipSelect(Integer start, Integer limit,
				String operatorId, String busTypId,String equipmentName) {
			System.out.println("【UlEmployeeDaoImpl 】调用--ulempEquipSelect " +
					" operatorId="+operatorId+"busTypId ="+busTypId+"equipmentName "+equipmentName);
			Query query = null;
			if (operatorId == null || equipmentName==null ) {
				String hql = "select e.* from  Equipment e   where  e.delFlag=1  and e.bank_type_id="+new Long(busTypId);
				hql = hql + " order by e.equipmentId desc ";
				System.out.println("【UlEmployeeDaoImpl 】调用--ulempEquipSelect hql" + hql);
				query = getSession().createSQLQuery(hql).addEntity(Equipment.class);
				System.out.println("【UlEmployeeDaoImpl 】调用--ulempEquipSelect =query" + query);
				query.setFirstResult(start);
				query.setMaxResults(limit);
				System.out.println("【UlEmployeeDaoImpl 】调用--ulempEquipSelect start=" + start + "limit= " + limit);
			} else {
				// 多条件的查询，用StringBuffer拼接字符串，在连接的时候 不能用or，or当查询多个条件的不能任意匹配，用and(切记)
				StringBuffer hql = new StringBuffer();
						hql.append("select e.* from  Equipment e  where  e.delFlag=1  and e.bank_type_id="+ new Long(busTypId));
				if (!"".equals(operatorId) && operatorId != null) {
					hql.append(" and e.OPERATOR_ID like '%" + operatorId + "%'");
				}
				if (!"".equals(equipmentName) && equipmentName != null) {
					hql.append(" and e.EQUIPMENTNAME like '%" + equipmentName + "%'");
				}
				hql.append(" order by e.equipmentId desc ");
				query = getSession().createSQLQuery(hql.toString()).addEntity(Equipment.class);
				System.out.println("=【UlEmployeeDaoImpl 】调用--ulempEquipSelect==query=" + query);
				query.setFirstResult(start);// hibernate自带的分页查询，起始页
				query.setMaxResults(limit);// 结束页

			}
			return query.list();
		
			
		}

		@Override
		public int ulempEquipSelectCount(String operatorId, String busTypId,String equipmentName) {
			System.out.println("【UlEmployeeDaoImpl 】调用==ulempEquipSelectCount " +
					" busTypId："+busTypId+"operatorId:"+operatorId+"equipmentName "+equipmentName);
			SqlBuilder.BEGIN();
			SqlBuilder.SELECT("count(EId)");
			SqlBuilder.FROM(" EQUIPMENT e ");
			 SqlBuilder.WHERE(" e.delFlag=1 ");
			if(  operatorId==null){
				if(!"".equals(busTypId)&& busTypId!=null){
					 SqlBuilder.WHERE(" e.bank_type_id like"+"'%"+busTypId+"%'");
				}
			}else {
				if(!"".equals(busTypId)&& busTypId!=null){
					 SqlBuilder.WHERE(" e.bank_type_id like"+"'%"+busTypId+"%'");
				}
				if(!"".equals(operatorId)&& operatorId!=null){
					 SqlBuilder.WHERE(" e.OPERATOR_ID like"+"'%"+operatorId+"%'");
				}
				if (!"".equals(equipmentName) && equipmentName != null) {
					SqlBuilder.WHERE(" e.EQUIPMENTNAME like '%" + equipmentName + "%'");
				}
				    System.out.println("【UlEmployeeDaoImpl 】调用==ulempEquipSelectCount 查询所有数据 else ");
		         }
			String sql_getCount = SqlBuilder.SQL();
			
			return JDBCCount(sql_getCount);
		}

		@Override
		public void UlEmployeeEquipmentsave(String userNo, String operatorId,Long userid,String equipmentId,Long eqEIds) {
			System.out.println("【UlEmployeeDaoImpl 】调用 UlEmployeeEquipmentsave userNo："+userNo+"operatorId:"+operatorId+" eqEIds： "+eqEIds);
			Transaction tx = getSession().beginTransaction();
			UlEmployeeEquipment uleme=new UlEmployeeEquipment();
			uleme.setUlEmployeeNo(userNo);
			uleme.setEquipOperatorId(operatorId);
			uleme.setUlEmployeeId(userid);
			uleme.setEquipmentId(equipmentId);
			uleme.setEqId(eqEIds);
		    getSession().saveOrUpdate(uleme);
		    tx.commit();
			
		}
		public void getDelteULEmpEquip(Long useid) {
			System.out.println("【UlEmployeeDaoImpl 】调用getDelteULEmpEquip"+useid);
			Transaction tx = getSession().beginTransaction();
			Query query = getSession()
			.createSQLQuery("delete  from UlEmployee_Equipment  ue where ue.ULEMPLOYEE_ID=? ");
			query.setLong(0, useid);
			System.out.println("【UlEmployeeDaoImpl 】调用 delete" + query);
			query.executeUpdate();	
			System.out.println("【UlEmployeeDaoImpl 】调用getDelteULEmpEquip 删除成功 useid="+ useid);
		    tx.commit();
			
		}

	         //设备端维护员工---查询该机构下所有的员工信息
		public List<UlEmployee> EquipmentULEmploySelect(Integer start,
				Integer limit, String ulEmpBTypeId, String userNo,String fullname) {
			System.out.println(" 【UlEmployeeDaoImpl 】调用 EquipmentULEmploySelect  " +
					" ulEmpBTypeId"+ulEmpBTypeId+"userNo"+userNo+" fullname:"+fullname);
			Query query = null;
			if (userNo == null || fullname==null) {
				String hql = "select ul.* from  ul_employee  ul   where  ul.zhiwei='支行操作员' and  ul.bank_type_id="+new Long(ulEmpBTypeId);
				hql = hql + " order by ul.USERNO asc ";
				System.out.println("【UlEmployeeDaoImpl 】调用 EquipmentULEmploySelect =hql" + hql);
				query = getSession().createSQLQuery(hql).addEntity(UlEmployee.class);
				query.setFirstResult(start);
				query.setMaxResults(limit);
				System.out.println("【UlEmployeeDaoImpl 】调用 EquipmentULEmploySelect query=" + query);
			} else {
				// 多条件的查询，用StringBuffer拼接字符串，在连接的时候 不能用or，or当查询多个条件的不能任意匹配，用and(切记)
				StringBuffer hql = new StringBuffer();
						hql.append("select e.* from  ul_employee e  where e.zhiwei='支行操作员' and  e.bank_type_id="+new Long(ulEmpBTypeId));
				if (!"".equals(userNo) && userNo != null) {
					hql.append(" and e.USERNO like '%" + userNo + "%'");
				}
				if (!"".equals(fullname) && fullname != null) {
					hql.append(" and e.FULLNAME like '%" + fullname + "%'");
				}
				hql.append(" order by e.USERNO asc ");
				query = getSession().createSQLQuery(hql.toString()).addEntity(UlEmployee.class);
				System.out.println("【UlEmployeeDaoImpl 】调用 EquipmentULEmploySelect query=" + query);
				query.setFirstResult(start);// hibernate自带的分页查询，起始页
				query.setMaxResults(limit);// 结束页
			}
			return query.list();
		
			
		}
		public int EquipmentULEmploySelectCount(String ulEmpBTypeId, String userNo,String fullname) {
			System.out.println("【UlEmployeeDaoImpl 】调用==EquipmentULEmploySelectCount  " +
					"ulEmpBTypeId："+ulEmpBTypeId+"userNo:"+userNo+" fullname:"+fullname);
			SqlBuilder.BEGIN();
			SqlBuilder.SELECT("count(USEID)");
			SqlBuilder.FROM(" ul_employee e ");
			SqlBuilder.WHERE(" e.zhiwei='支行操作员' ");
			if(  userNo==null){
				if(!"".equals(ulEmpBTypeId)&& ulEmpBTypeId!=null){
					 SqlBuilder.WHERE(" e.bank_type_id like"+"'%"+new Long(ulEmpBTypeId)+"%'");
				}
			}else {
				if(!"".equals(ulEmpBTypeId)&& ulEmpBTypeId!=null){
					 SqlBuilder.WHERE(" e.bank_type_id like"+"'%"+new Long(ulEmpBTypeId)+"%'");
				}
				if(!"".equals(userNo)&& userNo!=null){
					 SqlBuilder.WHERE(" e.USERNO like"+"'%"+userNo+"%'");
				}
				if (!"".equals(fullname) && fullname != null) {
					SqlBuilder.WHERE(" e.FULLNAME like '%" + fullname + "%'");
				}
			   System.out.println("【UlEmployeeDaoImpl 】调用==EquipmentULEmploySelectCount  else ");
		    }
			String sql_getCount = SqlBuilder.SQL();
			
			return JDBCCount(sql_getCount);
		}

		@Override
		public void EquipmentUlEmployeesave(String UlEmpEquips,
				String operatorId, Long eid, String equipmentId,Long useid) {
			System.out.println("【UlEmployeeDaoImpl 】调用 EquipmentUlEmployeesave userNo：" +
					""+UlEmpEquips+"operatorId:"+operatorId+" useid:"+ useid);
			Transaction tx = getSession().beginTransaction();
			UlEmployeeEquipment uleme=new UlEmployeeEquipment();
			uleme.setUlEmployeeNo(UlEmpEquips);
			uleme.setEquipOperatorId(operatorId);
			uleme.setUlEmployeeId(useid);
			uleme.setEquipmentId(equipmentId);
			uleme.setEqId(eid);	
		    getSession().saveOrUpdate(uleme);
		    tx.commit();
			
		}

		@Override
		public void getDelteEquip(Long eid) {
			System.out.println("【UlEmployeeDaoImpl 】调用getDelteEquip"+eid);
			Transaction tx = getSession().beginTransaction();
			Query query = getSession()
			.createSQLQuery("delete  from UlEmployee_Equipment  ue where ue.EQ_ID=? ");
			query.setLong(0, eid);
			System.out.println("【UlEmployeeDaoImpl 】调用 delete" + query);
			query.executeUpdate();	
			System.out.println("【UlEmployeeDaoImpl 】调用getDelteULEmpEquip 删除成功 useid="+ eid);
		    tx.commit();
		}
		  
		public List<UlEmployeeEquipment> selectEquipmentId(String useid) {
			System.out.println("【UlEmployeeDaoImpl 】调用selectEquipmentId"+useid);
			//String hql = "from UlEmployeeEquipment e where e.ulEmployeeId =" +new Long(useid);
			String hql = "from UlEmployeeEquipment e where e.ulEmployeeNo ='"+useid+"'";
			Query query = getSession().createQuery(hql);
			System.out.println("query"+query);
			return query.list();
		}
		
		public List<UlEmployeeEquipment> selectUlEmployeeId(String useid) {
			System.out.println("【UlEmployeeDaoImpl 】调用selectUlEmployeeId"+useid);
			String hql = "from UlEmployeeEquipment e where e.equipmentId ='" +useid+"'";	
			Query query = getSession().createQuery(hql);	
			return query.list();
		}

		
		
		
	
	
	
	
}


	




