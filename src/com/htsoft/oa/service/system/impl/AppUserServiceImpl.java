package com.htsoft.oa.service.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.springframework.jdbc.core.JdbcTemplate;

import com.google.gson.Gson;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.core.dynamicPwd.HttpClient;
import com.htsoft.oa.core.dynamicPwd.YooeResponse;
import com.htsoft.oa.dao.system.AppRoleDao;

import com.htsoft.oa.dao.system.AppUserDao;

import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.system.IndexDisplay;
import com.htsoft.oa.model.system.PanelItem;
import com.htsoft.oa.model.system.SysConfig;
import com.htsoft.oa.service.system.AppUserService;

import com.htsoft.oa.service.system.IndexDisplayService;
import com.htsoft.oa.service.system.SysConfigService;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.callout.model.outb.ObCallbatchCus;
import com.ulane.customer.model.customer.ConHis;

/**
 * @description 用户信息
 * @class AppUserServiceImpl
 * @author 优创融联科技
 * @updater YHZ
 * @company www.ulane.cn
 * @data 2010-12-27AM
 */
@SuppressWarnings("unused")
public class AppUserServiceImpl extends BaseServiceImpl<AppUser> implements
		AppUserService {
    
    	
	private AppUserDao  dao;
	@Resource
	protected JdbcTemplate jdbcTemplate;
	@Resource
	private AppRoleDao roledao;
	public AppUserServiceImpl(AppUserDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Resource
	private SysConfigService sysConfigService;
	
	@Resource
	IndexDisplayService indexDisplayService;
//// 用户管理
//	//public List<AppUser> getShowUser(Long userId) {
//		AppUser app=new AppUser();
//		
//		System.out.println("getShowUser  Service");
//		
//		// TODO Auto-generated method stub
//		//return dao.getShowUser(userId);
//	}
//		
//	// 2014-3-20
//	
//	public void getShowAppUser() {
//		//dao.getShowAppUser();
//		
//	}
//	
//	
//	
//	public List<AppUser> getShowUser() {
//		System.out.println("getShowUser  Service");
//		return dao.getShowUser();
//		// TODO Auto-generated method stub
//		
//	}
		
	
	
	
	
	@Override
	public AppUser findByUserName(String username) {
		return dao.findByUserName(username);
	}

	@Override
	public List<AppUser> findByDepartment(String path, PagingBean pb) {
		return dao.findByDepartment(path, pb);
	}

	@Override
	public List<AppUser> findByDepartment(String path, String userIds, PagingBean pb){
		return dao.findByDepartment(path, pb);
	}
	
	@Override
	public List<AppUser> findByRole(Long roleId, PagingBean pb) {
		return dao.findByRole(roleId, pb);
	}

	public List<AppUser> findByRoleId(Long roleId) {
		return dao.findByRole(roleId);
	}

	@Override
	public List<AppUser> findSubAppUser(String path, Set<Long> userIds,
			PagingBean pb) {
		return dao.findSubAppUser(path, userIds, pb);
	}

	@Override
	public List<AppUser> findSubAppUserByRole(Long roleId, Set<Long> userIds,
			PagingBean pb) {
		return dao.findSubAppUserByRole(roleId, userIds, pb);
	}

	@Override
	public List<AppUser> findByDepId(Long depId) {
		return dao.findByDepId(depId);
	}

	public String initDynamicPwd(HashMap<String, String> input, String function) {
		SysConfig dynamicPwdConfig = sysConfigService.findByKey("dynamicUri");
		URI base_uri = URI.create(dynamicPwdConfig.getDataValue());
		HttpClient client = new HttpClient(base_uri);
		try {

			YooeResponse response = client.call_api(function, input);

			String ret_cmd = response.getRetCmd();
			logger.debug("=============dynamicPwd status:" + ret_cmd);

			HashMap<String, String> output = response.getVarsDict();
			Iterator<String> i = output.keySet().iterator();
			String result = output.get("ret");

			while (i.hasNext()) {
				String name = i.next();
				String value = output.get(name);
				logger.debug("==============dynamicPwd info:" + name + "="
						+ value);
			}

			return result;

		} catch (IOException e) {
			e.printStackTrace();
			return "\"" + function + "\"失败，异常：" + e.getMessage();
			// TODO Auto-generated catch block
		} catch (Exception e) {
			e.printStackTrace();
			return "\"" + function + "\"失败，异常：" + e.getMessage();
			// TODO Auto-generated catch block
		}
	}

	/**
	 * 按角色ID查找用户
	 * 
	 * @param roleIds
	 * @return
	 */
	public List<AppUser> findUsersByRoleIds(String roleIds) {
		return dao.findUsersByRoleIds(roleIds);
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
		return dao.findRelativeUsersByUserId(userId, level);
	}
	

	/**
	 * 按角色取得用户列表
	 * @param roleId
	 * @return
	 */
	public List<AppUser> getUsersByRoleId(Long roleId){
		return dao.getUsersByRoleId(roleId);
	}
	
	/**
	 * 返回当前用户的信息，以Json格式返回
	 * @return
	 */
	public String getCurUserInfo(){
	    AppUser currentUser = ContextUtil.getCurrentUser();
		Department curDep = currentUser.getDepartment();
		if (curDep == null) {// 若所属部门为空，则设置一个缺省的部门 TODO
			curDep = new Department();
			curDep.setDepId(0l);
			curDep.setDepName(AppUtil.getCompanyName());
		}
		//去掉公共权限
		List<IndexDisplay> list = indexDisplayService.findByUser(currentUser
				.getUserId());
		List<PanelItem> items = new ArrayList<PanelItem>();
		for (IndexDisplay id : list) {
			PanelItem pi = new PanelItem();
			pi.setPanelId(id.getPortalId());
			pi.setColumn(id.getColNum());
			pi.setRow(id.getRowNum());
			items.add(pi);
		}
//		System.out.print("asdas"  + getDays(currentUser.getBeginDate(),currentUser.getEndDate()));
//		int a = getDays(currentUser.getBeginDate(),currentUser.getEndDate());
		StringBuffer sb = new StringBuffer();
		java.text.DateFormat df = new java.text.SimpleDateFormat("yyyy-MM-dd");
		try {
			sb.append("{success:true,user:{userId:'").append(
					currentUser.getUserId()).append("',fullname:'").append(
					currentUser.getFullname()).append("',username:'").append(
					currentUser.getUsername()).append("',depId:'").append(
					curDep.getDepId()).append("',depName:'").append(
					curDep.getDepName()).append("',begindate:'").append(
					currentUser.getBeginDate()).append("',enddate:'").append(
					currentUser.getEndDate()).append("',gonghao:'").append(
					currentUser.getEmployeeid()).append("',photo:'").append(
					currentUser.getPhoto()).append("',interval:'").append(
					getDays(df.parse(df.format(currentUser.getBeginDate())),currentUser.getEndDate())).append("',rights:'");
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		sb.append(currentUser.getRights().toString().replace("[", "").replace(
				"]", ""));
		
		Gson gson = new Gson();
		sb.append("',topModules:");
		sb.append(gson.toJson(currentUser.getTopModules().values()));
		sb.append(",items:").append(gson.toJson(items).toString());
		sb.append("},sysConfigs:{");
		//系统配置也在此时加载
		List<SysConfig> sysConfigs = sysConfigService.getAll();//2014-1-16修改把getAll修改成为getAll1()
		for(SysConfig sysConfig : sysConfigs){
			sb.append("'")
			  .append(sysConfig.getConfigKey())
			  .append("':'")
			  .append(sysConfig.getDataValue())
			  .append("',");
		}
		if(sysConfigs.size()>0){
			sb.deleteCharAt(sb.length()-1);
		}
		sb.append("}}");
		
		return sb.toString().replaceAll("\"", "'");
	}
	
	public int getDays(java.util.Date date1, java.util.Date date2){
        //date2应大于date1 
        int days   =   0; 
        days = (int) ( (date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000)); 
        return days; 
    } 

	@Override
	public List<AppUser> getAllUsers(Long flag) {
		return dao.getAllUsers(flag);
	}

	@Override
	public List<AppUser> findByUsergroup(Long pkUsergroupId, PagingBean pb) {
		return dao.findByUlUsergroup(pkUsergroupId, pb);
	}

	public List<AppUser> getUserIdsOrCalllistAssign(String type,String groupIds) {
		//String groupIds=getGroupIds();
		if(groupIds.equals("")) {
			return null;
		} else {
			List<AppUser> users = dao.listUsersByGroupIds(type,groupIds);
			
//			if(rightType!=null&&!rightType.equals("")) {
//				List<AppUser> users2 = new ArrayList<AppUser>();
//				if(users!=null&&users.size()>0) {
//					int count=users.size();
//					for(int i=0;i<count;i++) {
//						Map usermap=(Map)users.get(i);
//						if(usermap.get("userid")!=null) {
//							AppUser user=dao.get(((BigDecimal)usermap.get("userid")).longValue());
//							System.out.println("**********user*********************"+user.getUserId());
//							String sql="select * from app_role a where a.roleid in (select b.roleid from user_role b where b.userid ="+user.getUserId()+")";
//							System.out.println("**********sql*****************"+sql);
//							List<AppRole> roles=this.jdbcTemplate.queryForList(sql);
//							List<AppRole> roles2=new ArrayList<AppRole>();;
//							if(roles!=null&&roles.size()>0) {
//								int roleCount=roles.size();
//								for(int j=0;j<roleCount;j++) {
//									Map approle=(Map)roles.get(j);
//									roles2.add(roledao.get(((BigDecimal)approle.get("roleid")).longValue()));
//								}
//								for(AppRole role:roles2) {
//									String rights=role.getRights();
////									if(role.getRoleId()==-1) {
////										System.out.println("###################rights#########################"+rights);
////										System.out.println(rights.indexOf("__ALL"));
////									}
//									if(rights!=null&&!rights.equals("")) {
//										if(rights.indexOf(","+rightType)>=0||rights.indexOf(rightType)>=0||rights.indexOf(",__ALL")>=0||rights.indexOf("__ALL")>=0) {
//											System.out.println("###################rights2#########################"+rights);
//											users2.add(user);
//										}
//									}
//								}
//							}					    
//							
//							
//						}
//					}
//				}
//				return users2;
//			} else {
//				List<AppUser> usersZX = new ArrayList<AppUser>();
//				if(users!=null&&users.size()>0) {
//					int count=users.size();
//					for(int i=0;i<count;i++) {
//						Map usermap=(Map)users.get(i);
//						AppUser user=dao.get(((BigDecimal)usermap.get("userid")).longValue());
//						usersZX.add(user);
//					}
//				}
//				return usersZX;
//			}
			return users;
		}
	}
	
	//获取有经理分配权限的用户组
	public String getGroupIds() {
//		List<UlUsergroup> hasPerUserGroups=new ArrayList<UlUsergroup>();
		Long currentUserId=ContextUtil.getCurrentUserId();
        String sql="select * from ul_usergroup where pk_usergroup_id in(select pk_usergroup_id from ul_ugroup_user where userid="+currentUserId+")" +
        		" and is_delete="+UlUsergroup.ULUSERGROUP_DELETE_NO;
        List<UlUsergroup> userGroups = jdbcTemplate.queryForList(sql.toString());
		String groupIds="";
		if(userGroups!=null&&userGroups.size()>0) {
			int count=userGroups.size();
			for(int i=0;i<count;i++) {
				Map groupMap=(Map)userGroups.get(i);
	              if(groupIds.length()==0) {
	            	  groupIds=((BigDecimal)groupMap.get("pk_usergroup_id")).toString();
	              } else {
	            	  groupIds+=","+((BigDecimal)groupMap.get("pk_usergroup_id")).toString();
	             }				
			}
		}        
        
		
//		Set<UlUsergroup> userGroups=ContextUtil.getCurrentUser().getUlUsergroups();
//		if(userGroups!=null&&userGroups.size()>0) {
//			for(UlUsergroup usergroup:userGroups) {
////				String sql="select * from app_role a where a.roleid in (select b.roleid from ul_ugroup_role b where b.pk_usergroup_id ="+usergroup.getPkUsergroupId()+")";
////				List<AppRole> roles=this.jdbcTemplate.queryForList(sql);
////				List<AppRole> roles2=new ArrayList<AppRole>();;
////				if(roles!=null&&roles.size()>0) {
////					int count=roles.size();
////					for(int i=0;i<count;i++) {
////						Map approle=(Map)roles.get(i);
////						roles2.add(roledao.get(((BigDecimal)approle.get("roleid")).longValue()));
////					}
////					
////					for(AppRole role:roles2) {
////						String rights=role.getRights();
////						if(rights.indexOf(",_ObCalllistJFeipei")>0) {
////							hasPerUserGroups.add(usergroup);
////						}
////					}
////				}
//			}
//		}
		
//		String groupIds="";
//		if(userGroups!=null&&userGroups.size()>0) {
//			for(UlUsergroup usergroup:userGroups) {
//                if(groupIds.length()==0) {
//                	groupIds=usergroup.getPkUsergroupId().toString();
//                } else {
//                	groupIds+=","+usergroup.getPkUsergroupId().toString();
//                }
//            }
//		}
		return groupIds;
	}
	
	public long getCount() {
		String groupIds=getGroupIds();
		if(groupIds.equals("")) {
			return 0;
		} else {
			StringBuffer sb=new StringBuffer();
			sb.append("select * from app_user b where b.userid in ");
			sb.append("(select t.userid from  ( select a.* from ul_ugroup_user a where a.pk_usergroup_id in(");
			sb.append(groupIds).append("");
			sb.append(")  ) t ").append(")");
			sb.append("  and b.status=").append(AppUser.APPUSER_STATUS_ACTIV);
			sb.append(" and b.delflag=").append(AppUser.APPUSER_DELETE_NO);	
			List<AppUser> users = jdbcTemplate.queryForList(sb.toString());
			return users.size();
		}
	}

	@Override
	public List<AppUser> getselectSatus() {
		System.out.println("select  SUCCESS");
		return dao.getselectSatus();
	}

	@Override
	/*
	 * ==========================================删除用户
	 * */
	public void getDelUser(Long userId) {
		System.out.println(" delete   user success");
		dao.getDelUser(userId);
		
	}

	@Override
	public List<AppRole> selectRoleName(Long userId) {
		// TODO Auto-generated method stub
		return dao.selectRoleName(userId);
	}

	@Override
	public List<AppUser> SelectUserList(Integer start1, Integer limit1,
			String username, String fullname, String userNo, String status) {
		// TODO Auto-generated method stub
		return dao.SelectUserList(start1, limit1, username, fullname, userNo, status);
	}

	@Override
	public int SelectUserListCount(String username, String fullname,
			String userNo, String status) {
		// TODO Auto-generated method stub
		return dao.SelectUserListCount(username, fullname, userNo, status);
	}

	
	public List<AppRole> selectRole() {
		return dao.selectRole();
	}
	





//	@Override
//	public void removeByDefId(Long employeeid) {
//		// TODO Auto-generated method stub
//		
//	}
//
//
//
//
//
//
//	@Override
//	public List<AppUser> removeByDefId(String id) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//
//
//
//
//
//	@Override
//	public void getByUserIdDel(Long userId) {
//		
//		
//	}	
//	

	
	
}
