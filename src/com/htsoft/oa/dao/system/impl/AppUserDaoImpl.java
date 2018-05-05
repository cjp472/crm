package com.htsoft.oa.dao.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.security.userdetails.UserDetails;
import org.springframework.security.userdetails.UserDetailsService;
import org.springframework.security.userdetails.UsernameNotFoundException;

import com.htsoft.core.Constants;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.util.SqlBuilder;
import com.ulane.base.model.info.QJTransferAccounts;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.customer.model.customer.ConHis;

/**
 * @description 用户信息管理
 * @class AppUserDaoImpl
 * @author 优创融联科技
 * @updater YHZ
 * @company www.ulane.cn
 * @data 2010-12-27AM
 */
@SuppressWarnings("unchecked")
public class AppUserDaoImpl extends BaseDaoImpl<AppUser> implements AppUserDao,
		UserDetailsService {

	public AppUserDaoImpl() {
		super(AppUser.class);
	}

	@Override
	public AppUser findByUserName(String username) {
		//String hql = "from AppUser au where au.username=?";
		String hql = "from AppUser au where au.username=? and au.delFlag=0 ";
		Object[] params = {username};
		List<AppUser> list = findByHql(hql, params);
		AppUser user = null;
		if (list.size() != 0) {
			user = list.get(0);
			
		}

		return user;
	}

	@Override
	public UserDetails loadUserByUsername(final String username)
			throws UsernameNotFoundException, DataAccessException {
		AppUser user = (AppUser) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {

						String hql = "from AppUser ap where ap.username=? and ap.delFlag = ?";
						Query query = session.createQuery(hql);
						query.setString(0, username);
						query.setShort(1, Constants.FLAG_UNDELETED);
						AppUser user = null;
						// try {

						user = (AppUser) query.uniqueResult();

						if (user != null) {
							Hibernate.initialize(user.getRoles());
							Hibernate.initialize(user.getDepartment());

							// 进行合并权限的处理
							Set<AppRole> roleSet = user.getRoles();
							Iterator<AppRole> it = roleSet.iterator();

							while(it.hasNext()){
								AppRole role=it.next();
								if(role.getRoleId().equals(AppRole.SUPER_ROLEID)){//具有超级权限
									user.getRights().clear();
									user.getTopModules().clear();
									user.getRights().add(AppRole.SUPER_RIGHTS);
									user.getTopModules().putAll(AppUtil.getAllTopModels());
									break;
								}else{
									if(StringUtils.isNotEmpty(role.getRights())){
										String[]items=role.getRights().split("[,]");
										for(int i=0;i<items.length;i++){
											String item=items[i];
											//代表模板菜单,即上面的菜单
											if(item.startsWith("Mod_")){
												if(!user.getTopModules().containsKey(item)){
													user.getTopModules().put(items[i], AppUtil.getAllTopModels().get(item));
												}
												continue;
											}
											if(!user.getRights().contains(item)){
												user.getRights().add(item);
											}
										}
									}
								}
							}

						}
						// } catch (Exception ex) {
						// logger.warn("user:" + username
						// + " can't not loding rights:"
						// + ex.getMessage());
						// }
						return user;
					}
				});
		
		return user;
	}

	/**
	 * 根据部门PATH属性查找
	 */
	@Override
	public List findByDepartment(String path, PagingBean pb) {
		List list = new ArrayList();
		String hql = new String();
		if ("0.".equals(path)) {
			hql = "from AppUser vo2 where vo2.delFlag = ? and vo2.status = 1";
			list.add(Constants.FLAG_UNDELETED);
		} else {
			//TODO
			hql="select distinct au from AppUser au where au.department.path like ? and au.delFlag=? and au.status=1";
//			hql = "select DISTINCT vo2 from Department vo1,AppUser vo2,DepUsers vo3 where 1=1"
//					+ " and vo3.appUser=vo2"
//					+ " and vo3.department=vo1"
//					+ " and vo1.path like ? and vo2.delFlag = ? order by vo3.sn";
			list.add(path + "%");
			list.add(Constants.FLAG_UNDELETED);
		}
		return findByHql(hql, list.toArray(), pb);
	}

	@Override
	public List findByDepartment(Department department) {
		String hql = "select vo2 from Department vo1,AppUser vo2 where vo1=vo2.department and vo1.path like ? and vo2.delFlag = ? and vo2.status=1";
		Object[] params = { department.getPath() + "%",
				Constants.FLAG_UNDELETED };
		return findByHql(hql, params);
	}

	@Override
	public List findByRole(Long roleId) {
		String hql = "select vo from AppUser vo join vo.roles roles where roles.roleId=? and vo.delFlag = ? and vo.status = 1";
		Object[] objs = { roleId, Constants.FLAG_UNDELETED };
		return findByHql(hql, objs);
	}

	@Override
	public List findByRole(Long roleId, PagingBean pb) {
		String hql = "select vo from AppUser vo join vo.roles roles where roles.roleId=? and vo.delFlag = ? and vo.status = 1";
		Object[] objs = { roleId, Constants.FLAG_UNDELETED };
		return findByHql(hql, objs, pb);
	}

	@Override
	public List<AppUser> findByDepartment(String path) {
		String hql = "select vo2 from Department vo1,AppUser vo2 where vo1.depId=vo2.depId and vo1.path like ? and vo2.delFlag =? and vo2.status = 1";
		Object[] params = { path + "%", Constants.FLAG_UNDELETED };
		return findByHql(hql, params);
	}

	public List findByRoleId(Long roleId) {
		String hql = "select vo from AppUser vo join vo.roles as roles where roles.roleId=? and vo.delFlag =? and vo.status = 1";
		return findByHql(hql, new Object[] { roleId, Constants.FLAG_UNDELETED });
	}

	public List findByUserIds(Long... userIds) {
		String hql = "select vo from AppUser vo where vo.delFlag=? and vo.status=1";

		if (userIds == null || userIds.length == 0)
			return null;
		hql += " where vo.userId in (";
		int i = 0;
		for (@SuppressWarnings("unused") Long userId : userIds) {
			if (i++ > 0) {
				hql += ",";
			}
			hql += "?";
		}
		hql += " )";

		return findByHql(hql,
				new Object[] { Constants.FLAG_UNDELETED, userIds });
	}

	@Override
	public List<AppUser> findSubAppUser(String path, Set<Long> userIds,
			PagingBean pb) {
		String st = "";
		if (userIds.size() > 0) {
			Iterator<Long> it = userIds.iterator();
			StringBuffer sb = new StringBuffer();
			while (it.hasNext()) {
				sb.append(it.next().toString() + ",");
			}
			sb.deleteCharAt(sb.length() - 1);
			st = sb.toString();
		}

		List list = new ArrayList();
		StringBuffer hql = new StringBuffer();
		if (path != null) {
			hql
					.append("select vo2 from Department vo1,AppUser vo2 where vo1=vo2.department ");
			hql.append(" and vo1.path like ?");
			list.add(path + "%");
		} else {
			hql.append("from AppUser vo2 where 1=1 ");
		}
		if (st != "") {
			hql.append(" and vo2.userId not in (" + st + ")");
		}
		hql.append(" and vo2.delFlag = ? and vo2.status=1");
		list.add(Constants.FLAG_UNDELETED);
		return findByHql(hql.toString(), list.toArray(), pb);
	}

	@Override
	public List<AppUser> findSubAppUserByRole(Long roleId, Set<Long> userIds,
			PagingBean pb) {
		String st = "";
		if (userIds.size() > 0) {
			Iterator<Long> it = userIds.iterator();
			StringBuffer sb = new StringBuffer();
			while (it.hasNext()) {
				sb.append(it.next().toString() + ",");
			}
			sb.deleteCharAt(sb.length() - 1);
			st = sb.toString();
		}
		StringBuffer hql = new StringBuffer(
				"select vo from AppUser vo join vo.roles roles where roles.roleId=?");
		List list = new ArrayList();
		list.add(roleId);
		if (st != "") {
			hql.append(" and vo.userId not in (" + st + ")");
		}
		hql.append(" and vo.delFlag =? and vo.status=1");
		list.add(Constants.FLAG_UNDELETED);
		return findByHql(hql.toString(), list.toArray(), pb);
	}

	@Override
	public List<AppUser> findByDepId(Long depId) {
		String hql = "from AppUser vo where vo.delFlag=0 and vo.department.depId=? and vo.status=1";
		Object[] objs = { depId };
		return findByHql(hql, objs);
	}

	/**
	 * 查找某组角色列表下所有的用户
	 * 
	 * @param roleIds
	 * @return
	 */
	public List<AppUser> findUsersByRoleIds(String roleIds) {
		if (StringUtils.isEmpty(roleIds)) {
			return new ArrayList();
		}
		String hql = "select distinct au from AppUser as au join au.roles as roles where roles.roleId in ("
				+ roleIds + ") and au.delFlag =? and au.status=1";

		return findByHql(hql, new Object[] { Constants.FLAG_UNDELETED });
	}

	/**
	 * @description 根据用户userId查询对应用户的上下级信息
	 * @author YHZ
	 * @data 2010-12-23PM
	 * @param userId
	 *            用户id
	 * @param level
	 *            0.下级,1.上级,2.同级
	 * @return List<AppUser>
	 */
	@Override
	public List<AppUser> findRelativeUsersByUserId(Long userId, Short level) {
		StringBuffer sb = new StringBuffer(
				"select u.jobUser from RelativeUser u where u.appUser.userId = ? ");
		boolean bo = level != null && level < 3;
		if (bo)
			sb.append("and u.isSuper = ? ");
		Query query = getSession().createQuery(sb.toString());
		query.setLong(0, userId);
		if (bo)
			query.setShort(1, level);
		logger.debug("我的下属查询：" + sb.toString());
		return query.list();
	}

	@Override
	public List<AppUser> findByDepartment(String path, String userIds,
			PagingBean pb) {
		List<Object> list = new ArrayList<Object>();
		StringBuffer hql = new StringBuffer("");
		if ("0.".equals(path)) {
			hql.append("from AppUser vo2 where vo2.delFlag = ? and vo2.status=1");
			list.add(Constants.FLAG_UNDELETED);
		} else {
			hql.append( "select DISTINCT vo2 from Department vo1,AppUser vo2,DepUsers vo3 where 1=1"
					+ " and vo3.appUser=vo2"
					+ " and vo3.department=vo1"
					+ " and vo1.path like ? and vo2.delFlag = ? and vo2.status=1");
			list.add(path + "%");
			list.add(Constants.FLAG_UNDELETED);
		}
		//删除userIds中的数据
		if(userIds != null && !userIds.equals("")){
			hql.append("and vo2.userId in (?) ");
			list.add(userIds);
		}
		hql.append("order by vo3.sn "); //排序
		logger.debug("自定义AppUserDaoImpl : " + hql.toString());
		return findByHql(hql.toString(), list.toArray(), pb);
	}
	
	/**
	 * 按角色取得用户列表
	 * @param roleId
	 * @return
	 */
	public List<AppUser> getUsersByRoleId(Long roleId){
		String hql="from AppUser au join au.roles as role where role.roleId=? and au.status=1";
		return (List<AppUser>)findByHql(hql, new Object[]{roleId});
	}

	@Override
	public List<AppUser> getAllUsers(Long userid) {
		String hql="from AppUser au where delflag= '0' and userid = ? and au.status=1";
		return (List<AppUser>)findByHql(hql, new Object[]{userid});
	}
	
	/*
	 * 根据用户组id查询用户信息,并且代有分布
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.system.AppUserDao#findByUlUsergroup(java.lang.Long)
	 */
	@Override
	public List<AppUser> findByUlUsergroup(Long pkUsergroupId, PagingBean pb) {
		
		String hql = "select vo from AppUser vo join vo.ulUsergroups usergroups where usergroups.pkUsergroupId=? and vo.delFlag = ? and vo.status=1";
		Object[] objs = { pkUsergroupId, Constants.FLAG_UNDELETED };
		return findByHql(hql, objs, pb);
	}
	
	/**
	 * 根据用户组查询用户
	 * @param groupIds
	 * @return
	 */		
	public List<AppUser> listUsersByGroupIds(String type,String groupIds) {
		StringBuffer sb=new StringBuffer();
		sb.append("select * from app_user b,ul_employee empl,dictionary dic where b.userid in ");
		sb.append("(select t.userid from  ( select rownum rowindex,m.* from (select distinct a.userid from ul_ugroup_user a where a.pk_usergroup_id in (select pk_usergroup_id from ul_ugroup_user where userid=").append(ContextUtil.getCurrentUserId()).append(") and a.pk_usergroup_id in(");
		sb.append(groupIds).append("");
		//sb.append(") ) m ) t WHERE t.rowindex>").append(start).append(" AND t.rowindex <").append(start+limit+1).append(")");
		sb.append(") ) m ) t WHERE 1=1 ").append(")");
		//sb.append("  and b.status=").append(AppUser.APPUSER_STATUS_ACTIV);
		sb.append("  and b.status=1");//用户状态
		sb.append("  and b.userType=").append("'0'");//用户类型
		sb.append(" and b.delflag=").append(AppUser.APPUSER_DELETE_NO);
		sb.append(" and b.useid=empl.useid and empl.zhiwei=dic.itemindex and dic.protypeid=").append(10029);
		sb.append(" and empl.status=2");
		//sb.append(" and empl.type=1");
		if(type.equals("0")) {
			sb.append(" and empl.zhiwei=").append(AppUser.APPUSER_ZHIWEI_JL);
		}else if(type.equals("1")) {
			sb.append(" and empl.zhiwei=").append(AppUser.APPUSER_ZHIWEI_BZ);
		}else {
			sb.append(" and empl.zhiwei=").append(AppUser.APPUSER_ZHIWEI_ZX);
		}
		sb.append(" order by b.userid");
		System.out.println("******************sb.toString()****************"+sb.toString());
		Query query = this.getSession().createSQLQuery(sb.toString()).addEntity(AppUser.class);	
		return query.list();
	}

	@Override
	public List<AppUser> getselectSatus() {
		String hql="from AppUser au  where au.status=1 and au.delFlag=0";
		return this.getHibernateTemplate().find(hql);
	}
	
	
    /*
     *============================ 用户删除
     * */
	@Override
		public void getDelUser(Long userId) {
			System.out.println("===========userId" + userId);
//			Query query = getSession().createQuery(
//					"delete from AppUser e where e.userId=?");
			Query query=getSession().createSQLQuery("update  app_user au set au.delFlag=1 where  au.userId=?");
			System.out.println("====================query" + query);
			query.setLong(0, userId);
			System.out.println("============ query.setLong(0, EId)"
					+ query.setLong(0, userId));
			query.executeUpdate();
			System.out.println("==============dao删除====成功");
			
		}

	@Override
	public List<AppRole> selectRoleName(Long userId) {
		Query query=getSession().createSQLQuery("select ap.* from app_role ap,user_role ur,app_user au " +
				" where ap.roleid=ur.roleid and ur.userid=au.userid and au.userid=?").addEntity(AppRole.class);
		System.out.println("====================query" + query);
		query.setLong(0, userId);
		System.out.println("============ query.setLong(0, EId)"
				+ query.setLong(0, userId));
		//query.executeUpdate();
		return  query.list();
	}

	
//	public List<AppUser> SelectUserList() {
//	     Query query=getSession().createSQLQuery(
//			" select au.* from app_user au ,bank_type bt where bt.bank_type_id=au.bank_type_id and  " +
//			" bt.parent_id=0 and au.delflag=0 ").addEntity(AppUser.class);
//		System.out.println("====================query" + query);
//		//query.setLong(0, userId);
//		//System.out.println("============ query.setLong(0, EId)"
//				//+ query.setLong(0, userId));
//		//query.executeUpdate();
//		return  query.list();
//		
//	}
//
//	@Override
//	public List<AppUser> SelectZHUserList() {
//		AppUser user = ContextUtil.getCurrentUser();
//		 Query query=getSession().createSQLQuery(
//					" select au.* from app_user au ,bank_type bt where bt.bank_type_id=au.bank_type_id and  " +
//					"  bt.path like '0."+user.getBankTypeId()+".%' and au.delflag=0 ").addEntity(AppUser.class);
//				System.out.println("====================query" + query);
//				//query.setLong(0, userId);
//				//System.out.println("============ query.setLong(0, EId)"
//						//+ query.setLong(0, userId));
//				//query.executeUpdate();
//				return  query.list();
//	}

	@Override
	public List<AppUser> SelectUserList(Integer start1, Integer limit1,
			String username, String fullname, String userNo, String status) {
		    AppUser user = ContextUtil.getCurrentUser();
			System.out.println("[AppUserDaoImpl.java] - invoke(调用) : SelectUserListCount()");
			System.out.println("===username="+username+fullname+userNo+status);
			Query query = null ; 
			
			List<AppRole> listR=selectRoleName(user.getUserId());
		if(username==null && fullname==null && userNo==null  && status==null ){
			String hql="";
			for(int i=0;i<listR.size();i++){
				 //查看所有的
				
					 System.out.println("------"+listR.get(i).getName());
				 if("超级管理员".equals(listR.get(i).getName())||"总行操作员".equals(listR.get(i).getName())){//查看所有行
					 //SqlBuilder.SELECT="SELECT  c.* FROM QJ_ADD_CARD c " ;
					 hql=" select c.* from  app_user c where  c.delflag=0 " ;
					 hql=hql+ " order by c.username asc ";
				  }
				  if("总行管理员".equals(listR.get(i).getName())){//查看分行所有用户的账号
                        hql="select c.* from app_role ap,user_role ur,app_user c " +
                        		" where ap.roleid=ur.roleid and ur.userid=c.userid  and c.delflag=0 and " +
                        		"  (ap.rolename='总行座席' or ap.rolename='分行管理员' or ap.rolename='总行后督'or ap.rolename='总行操作员' or c.bank_name like '北京%') ";
//					  hql= " select  c.*　from app_user c , bank_type bt where bt.bank_type_id=c.bank_type_id and   " +
//							" bt.parent_id=0 and c.delflag=0 " ;
					  hql=hql+ " order by c.username asc ";
				  }
				  if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
					  hql= "select  c.*　from  app_user c  ,jg_mechanis bt where bt.MECHANIS_ID=c.bank_type_id and " +
						 " bt.path like '0."+user.getBankTypeId()+".%' and c.delflag=0" ;
					  hql=hql+ " order by c.username asc ";
				  }
				 
			}
			
			 query = getSession().createSQLQuery(hql).addEntity(AppUser.class);
			System.out.println("[ConHisDaoImpl.java] - query : "+ query);
			query.setFirstResult(start1);//hibernate自带的分页查询，起始页
			query.setMaxResults(limit1);//结束页	
		}else {
			StringBuffer hql=new StringBuffer();
			for(int i=0;i<listR.size();i++){
				 //查看所有的
					 System.out.println("------"+listR.get(i).getName());
				 if("超级管理员".equals(listR.get(i).getName())||"总行操作员".equals(listR.get(i).getName())){//查看所有行
					 //SqlBuilder.SELECT="SELECT  c.* FROM QJ_ADD_CARD c " ;
					 hql.append(" select c.* from  app_user c where c.delflag=0 and 1=1  " );
				  }
				  if("总行管理员".equals(listR.get(i).getName())){//查看分行所有用户的账号
//					 hql="select c.* from qj_add_card c, equipment e  " +
//							"  where c.operator_id=e.operator_id and e.bank_name like '北京%'" ;//中关村分行、北京管理部、郊区管理部、总行营业部
					 // hql.append(" select  c.*　from app_user c , bank_type bt where bt.bank_type_id=c.bank_type_id and   " +
							//"   bt.parent_id=0 and c.delflag=0 "  );
					  hql.append("select c.* from app_role ap,user_role ur,app_user c " +
              		" where ap.roleid=ur.roleid and ur.userid=c.userid  and c.delflag=0 and " +
              		"  (ap.rolename='总行座席' or ap.rolename='分行管理员' or ap.rolename='总行后督'or ap.rolename='总行操作员' or c.bank_name like '北京%')");
				  
				  }
				  if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
//					 hql="select c.*, e.bank_name from qj_add_card c, equipment e " +
//					 		"   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
					  hql.append(" select  c.*　from app_user c ,jg_mechanis bt where bt.MECHANIS_ID=c.bank_type_id and " +
						 " bt.path like '0."+user.getBankTypeId()+".%' and c.delflag=0 " );
				  }
			
			}
			if(!"".equals(username)&& username!=null){
				System.out.println("[ConHisDaoImpl.java] - wdNum="+username);
				hql.append(" and  c.username like"+"'%"+username+"%'");
			}
			if(!"".equals(fullname)&& fullname!=null){
				hql.append(" and c.fullname  like"+"'%"+fullname+"%'");
			}
			if(!"".equals(userNo)&& userNo!=null){
				hql.append(" and c.employeeid  like"+"'%"+userNo+"%'");
			}
			if(!"".equals(status)&& status!=null){
				hql.append(" and c.status like "+"'%"+new Short(status)+"%'");
			}	
			
			hql.append("order by c.username asc");
			System.out.println("[ConHisDaoImpl.java] - tellernum="+status+ "   SQL = " + hql);
			query = this.getSession().createSQLQuery(hql.toString()).addEntity(AppUser.class);
			//query = getSession().createQuery(hql.toString());
			System.out.println("[ConHisDaoImpl.java] - query :i "+ query);
			query.setFirstResult(start1);//hibernate自带的分页查询，起始页
 		    query.setMaxResults(limit1);//结束页
	    }
	  return query.list();
	}

	@Override
	public int SelectUserListCount(String username, String fullname,
			String userNo, String status) {
		     AppUser user = ContextUtil.getCurrentUser();
			System.out.println("[AppUserDaoImpl.java] - invoke(调用) : SelectUserListCount()");
			System.out.println("===username="+username+fullname+userNo+status);
			Query query = null;    
			List<AppRole> listR=selectRoleName(user.getUserId());
		   SqlBuilder.BEGIN();
		   SqlBuilder.SELECT("count(distinct (c.userId))");
		for(int i=0;i<listR.size();i++){
			 //查看所有的
				 System.out.println("------"+listR.get(i).getName());
			 if("超级管理员".equals(listR.get(i).getName())|| "总行操作员".equals(listR.get(i).getName())){//查看所有行
				 //SqlBuilder.SELECT="SELECT  c.* FROM QJ_ADD_CARD c " ;
				 SqlBuilder.FROM(" app_user c   " );
			  }
			  if("总行管理员".equals(listR.get(i).getName())){//查看分行所有用户的账号
//				 hql="select c.* from qj_add_card c, equipment e  " +
//						"  where c.operator_id=e.operator_id and e.bank_name like '北京%'" ;//中关村分行、北京管理部、郊区管理部、总行营业部
//				  SqlBuilder.FROM(" app_user c , bank_type bt where bt.bank_type_id=c.bank_type_id and   " +
//						"   bt.parent_id=0  "  );
				  SqlBuilder.FROM(" app_role ap,user_role ur,app_user c");// +
				  SqlBuilder.WHERE(" ap.roleid=ur.roleid and ur.userid=c.userid " +
				  		" and c.delflag=0 and   (ap.rolename='总行座席' or ap.rolename='分行管理员' or ap.rolename='总行后督'or ap.rolename='总行操作员' or c.bank_name like '北京%') ");
		              		//" where ap.roleid=ur.roleid and ur.userid=au.userid  and au.delflag=0 and " +
		              		//"  (ap.rolename='总行坐席员' or ap.rolename='分行管理员' or ap.rolename='总行后督'or ap.rolename='总行操作员')");
			  
			  }
			  if("分行管理员".equals(listR.get(i).getName())){//查看本支行的信息---支行操作员
//				 hql="select c.*, e.bank_name from qj_add_card c, equipment e " +
//				 		"   where c.operator_id=e.operator_id and e.bank_type_id="+user.getBankTypeId();
				  SqlBuilder.FROM(" app_user c  ,jg_mechanis bt  " );
//				  		"where bt.bank_type_id=c.bank_type_id and " +
//					 " bt.path like '0."+user.getBankTypeId()+".%' and c.delflag=0" );
				  SqlBuilder.WHERE(" bt.MECHANIS_ID=c.bank_type_id and bt.path like '0."+user.getBankTypeId()+".%' and c.delflag=0");
			  }
		
		}
		if(username==null && fullname==null && userNo==null  && status==null ){
			System.out.println("[ConHisDaoImpl.java] - if(All is Null) -> 查询所有数据");
		}else {
			if(!"".equals(username)&& username!=null){
				System.out.println("[ConHisDaoImpl.java] - wdNum="+username);
				 SqlBuilder.WHERE(" c.username like"+"'%"+username+"%'");
			}
			if(!"".equals(fullname)&& fullname!=null){
				 SqlBuilder.WHERE(" c.fullname  like"+"'%"+fullname+"%'");
			}
			if(!"".equals(userNo)&& userNo!=null){
				 SqlBuilder.WHERE(" c.employeeid  like"+"'%"+userNo+"%'");
			}
			if(!"".equals(status)&& status!=null){
				 SqlBuilder.WHERE(" c.status like "+"'%"+new Short(status)+"%'");
			}	
			
						
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
	public List<AppRole> selectRole() {
		Query query=getSession().createSQLQuery("select ap.* from app_role ap ").addEntity(AppRole.class);
		System.out.println("====================query" + query);
		//query.setLong(0, userId);
		System.out.println("==========333======query" + query.list());
		//query.executeUpdate();
		return  query.list();
	}
}