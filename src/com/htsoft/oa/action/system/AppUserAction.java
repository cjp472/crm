package com.htsoft.oa.action.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import java.lang.reflect.Type;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.log.Action;
import com.htsoft.core.model.OnlineUser;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.StringUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.customer.BankType;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.system.IndexDisplay;
import com.htsoft.oa.model.system.PanelItem;
import com.htsoft.oa.model.system.SysConfig;
import com.htsoft.oa.service.system.AppRoleService;

import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.DepartmentService;
import com.htsoft.oa.service.system.IndexDisplayService;
import com.htsoft.oa.service.system.RelativeUserService;
import com.htsoft.oa.service.system.SysConfigService;
import com.htsoft.oa.service.system.UserSubService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.base.service.xitong.UlUsergroupService;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.service.customer.ConHisService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.comlist
 * 
 */
@SuppressWarnings("unused")
public class AppUserAction extends BaseAction {
	private static Long SUPPER_MANAGER_ID = -1l;// 超级管理员角色ID
	@Resource
	private AppUserService appUserService;	
	@Resource
	private AppRoleService appRoleService;
	@Resource
	private UserSubService userSubService;
	@Resource
	private IndexDisplayService indexDisplayService;
	@Resource
	private UlEmployeeService ulemployeeServie;
	@Resource
	private DepartmentService departmentService;

	@Resource
	private UlDepartmentService ulDepartmentService;
	// @Resource
	// private DepUsersService depUsersService;
	// @Resource
	// private UserJobService userJobService;
	// @Resource
	// private UlUgroupUserService ulUgroupUserService;

	@Resource
	private SysConfigService sysConfigService;
	@Resource
	private RelativeUserService relativeUserService;
	
	private AppUser appUser;

	private String joiner;

	private Long userId;

	private Long depId;

	private Long roleId;

	private String userIdStrs;
	private ConHisService conHisService;
	public String getUserIdStrs() {
		return userIdStrs;
	}

	public void setUserIdStrs(String userIdStrs) {
		this.userIdStrs = userIdStrs;
	}

	public String getJoiner() {
		return joiner;
	}

	public void setJoiner(String joiner) {
		this.joiner = joiner;
	}

	public Long getDepId() {
		return depId;
	}

	public void setDepId(Long depId) {
		this.depId = depId;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	/**
	 * 显示当前用户,并且加载该用户的所有权限
	 * 
	 * @return
	 */
	public String getCurrent() {
		AppUser currentUser = ContextUtil.getCurrentUser();
		Department curDep = currentUser.getDepartment();
		if (curDep == null) {// 若所属部门为空，则设置一个缺省的部门 TODO
			curDep = new Department();
			curDep.setDepId(0l);
			curDep.setDepName(AppUtil.getCompanyName());
		}
		// 去掉公共权限
		// Iterator<String> publicIds = AppUtil.getPublicMenuIds().iterator();
		// StringBuffer publicIdSb = new StringBuffer();
		//
		// while (publicIds.hasNext()) {
		// publicIdSb.append(",").append(publicIds.next());
		// }
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
		StringBuffer sb = new StringBuffer();
		sb.append("{success:true,user:{userId:'").append(
				currentUser.getUserId()).append("',fullname:'").append(
				currentUser.getFullname()).append("',username:'").append(
				currentUser.getUsername()).append("',depId:'").append(
				curDep.getDepId()).append("',depName:'").append(
				curDep.getDepName()).append("',rights:'");
		sb.append(currentUser.getRights().toString().replace("[", "").replace(
				"]", ""));
		// 去掉公共权限
		// if (!"".equals(currentUser.getRights()) && publicIdSb.length() > 0) {
		// sb.append(publicIdSb.toString());
		// }

		Gson gson = new Gson();
		sb.append("',topModules:");
		sb.append(gson.toJson(currentUser.getTopModules().values()));
		sb.append(",items:").append(gson.toJson(items).toString());
		sb.append("},sysConfigs:{");
		// 系统配置也在此时加载
		List<SysConfig> sysConfigs = sysConfigService.getAll();
		for (SysConfig sysConfig : sysConfigs) {
			sb.append("'").append(sysConfig.getConfigKey()).append("':'")
					.append(sysConfig.getDataValue()).append("',");
		}
		if (sysConfigs.size() > 0) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("}}");

		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String list() {
		
		 AppUser user = ContextUtil.getCurrentUser();
		 List<BankType> parentid = new ArrayList<BankType>();
          List<AppRole> roles = appUserService.selectRoleName(user.getUserId());
           System.out.println("=====roles======"+roles);
          
    	   if (user.getUserId() == 0 || user.getBankTypeId()==0) {
   			System.out.println("超级管理员显示所有的---admin"+user.getBankTypeId());
   		 }else {
   			System.out.println("else==parentid"+user.getBankTypeId());
   			//parentid =conHisService.findByParentId(user.getBankTypeId());
   		 }
    	  
    	       
//    	   QueryFilter filter = new QueryFilter(getRequest());
//			System.out.println("========AppUser======="+filter);
//			filter.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());// 显示0
//			filter.addSorted("username", "asc");
//			List<AppUser> list = appUserService.getAll(filter);
//           for(int i=0;i<roles.size();i++){
//        	   System.out.println("=====roles======"+roles.get(i).getRoleName());
//        	   if("总行管理员".equals(roles.get(i).getRoleName())&& parentid.size() != 0){
//             	  //总行管理员----除了支行不显示其余可以查看编辑删除
//        		  if(list.get(i).getBankname().endsWith("支行")){
//        			  System.out.println("===if=="+list+" "+list.get(i).getBankname());
//        		  }else{
//        			  System.out.println("===else=="+list+list.get(i).getBankname());
//        		  }
//        			
//        	        System.out.println("=====AppUser=======list"+list);
//        			// List<AppUser> list = appUserService.getAllUsers(new Long(0));
//        			StringBuffer sb = new StringBuffer();
//        			for (AppUser appUser : list) {
//        		     
//        				Set<UlUsergroup> gulist = appUser.getUlUsergroups();
//        				for (UlUsergroup u : gulist) {
//        					// sb.append("["+u.getUlUsergroup().getUsergroupName()+"],");
//        					sb.append(u.getUsergroupName() + ",");
//        				}
//        	
//        				if (sb.length() > 0) {
//        					String str = sb.substring(0, sb.length() - 1);
//        					sb = new StringBuffer();//
//        					appUser.setYonghuzu(str);
//        	
//        				}
//        	
//        			}
//        	
//        			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
//        					.append(filter.getPagingBean().getTotalItems()).append(
//        							",result:");
//        			System.out.println("===========buff"+buff);
//        			JSONSerializer serializer = new JSONSerializer();
//        			serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
//        					"accessionTime", "beginDate", "endDate" });
//        			buff.append(serializer.exclude(new String[] { "password" }).serialize(
//        					list));
//        			buff.append("}");
//        			jsonString = buff.toString();
//        		   
//               }else{
//             	  //分行管理员----除了对本支行---可以查看编辑删除
//                     System.out.println("-----");
//               }
//        	   
//        	   
//           }
            
         
              
        
         
           
         
         
		QueryFilter filter = new QueryFilter(getRequest());
		System.out.println("========AppUser======="+filter);
		filter.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());// 显示0
		filter.addSorted("username", "asc");
		List<AppUser> list = appUserService.getAll(filter);
        System.out.println("=====AppUser=======list"+list);
		// List<AppUser> list = appUserService.getAllUsers(new Long(0));
        System.out.println("=====AppUser=======list"+list);
		StringBuffer sb = new StringBuffer();
		for (AppUser appUser : list) {
			// List<UlUgroupUser> gulist =
			// ulUgroupUserService.findByUserId(appUser.getUserId());
			// List<UlUgroupUser> gulist =
			// ulUgroupUserService.findByUserId(appUser.getUserId());
			Set<UlUsergroup> gulist = appUser.getUlUsergroups();
			for (UlUsergroup u : gulist) {
				// sb.append("["+u.getUlUsergroup().getUsergroupName()+"],");
				sb.append(u.getUsergroupName() + ",");
			}

			if (sb.length() > 0) {
				String str = sb.substring(0, sb.length() - 1);
				sb = new StringBuffer();//
				appUser.setYonghuzu(str);

			}

		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		System.out.println("===========buff"+buff);
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"accessionTime", "beginDate", "endDate" });
		buff.append(serializer.exclude(new String[] { "password" }).serialize(
				list));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	// showGroupGrid
	public String showgrid() {

		QueryFilter filter = new QueryFilter(getRequest());

		String userid = getRequest().getParameter("Q_appUser.userId_L_EQ");
		List<UlUsergroup> gulist = new ArrayList<UlUsergroup>();
		appUser = appUserService.get(Long.parseLong(userid));
		for (UlUsergroup u : appUser.getUlUsergroups()) {
			gulist.add(u);
		}
//      用户注销不显示的问题(更改前)
//		List<AppUser> list = appUserService.getAllUsers(new Long(userid));
//		List<UlUsergroup> gulist = new ArrayList<UlUsergroup>();
//
//		for (AppUser appUser : list) {
//			for (UlUsergroup u : appUser.getUlUsergroups()) {
//				gulist.add(u);
//			}
//
//		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(gulist.size()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		buff.append(serializer.exclude(new String[] { "password" }).serialize(
				gulist));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;

	}

	/**
	 * 根据部门查找列表
	 */
	public String select() {
		PagingBean pb = getInitPagingBean();
		String strDepId = getRequest().getParameter("depId");
		// 表示从上级目录开始进行查找
		String path = "0.";
		appUser = ContextUtil.getCurrentUser();
		if (StringUtils.isNotEmpty(strDepId)) {
			Long depId = Long.parseLong(strDepId);
			Department dep = departmentService.get(depId);
//			UlDepartment dep = ulDepartmentService.get(depId);
			if (dep != null) {
				path = dep.getPath();
			}
		} else {
			Department dep = appUser.getDepartment();
			if (dep != null) {
				path = dep.getPath();
			}
		}
		List<AppUser> list = appUserService.findByDepartment(path, pb);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "accessionTime" });
		buff.append(serializer.exclude("department","ulDepartment").exclude(new String[] { "password" }).serialize(
				list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 在线用户
	 * 
	 * @return
	 */
	public String online() {
		Map<String, OnlineUser> onlineUsers = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByDep = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByRole = new HashMap<String, OnlineUser>();

		onlineUsers = AppUtil.getOnlineUsers();// 获得所有在线用户

		// 按部门选择在线用户
		if (depId != null) {
			for (String sessionId : onlineUsers.keySet()) {
				OnlineUser onlineUser = new OnlineUser();
				onlineUser = onlineUsers.get(sessionId);
				// if(onlineUser.getDepId().equals(depId)){
				String path = "";
				if (!onlineUser.getUserId().equals(AppUser.SUPER_USER)) {
					path = onlineUser.getDepPath();
				}
				if (!depId.equals(new Long(0))) {
					if (java.util.regex.Pattern.compile("." + depId + ".")
							.matcher(path).find()) {
						onlineUsersByDep.put(sessionId, onlineUser);
					}
				} else {
					onlineUsersByDep.put(sessionId, onlineUser);
				}
			}
		}

		// 按角色选择在线用户
		if (roleId != null) {
			for (String sessionId : onlineUsers.keySet()) {
				OnlineUser onlineUser = new OnlineUser();
				onlineUser = onlineUsers.get(sessionId);
				if (java.util.regex.Pattern.compile("," + roleId + ",")
						.matcher(onlineUser.getRoleIds()).find()) {
					onlineUsersByRole.put(sessionId, onlineUser);
				}
			}
		}

		Type type = new TypeToken<java.util.Collection<OnlineUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(onlineUsers.size()).append(",result:");

		Gson gson = new Gson();
		if (depId != null) {
			buff.append(gson.toJson(onlineUsersByDep.values(), type));
		} else if (roleId != null) {
			buff.append(gson.toJson(onlineUsersByRole.values(), type));
		} else {
			buff.append(gson.toJson(onlineUsers.values(), type));
		}
		
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 
	 * 根据角色查询
	 */
	public String find() {
		String strRoleId = getRequest().getParameter("roleId");
		PagingBean pb = getInitPagingBean();
		if (StringUtils.isNotEmpty(strRoleId)) {
			List<AppUser> userList = appUserService.findByRole(Long
					.parseLong(strRoleId), pb);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(pb.getTotalItems()).append(",result:");
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd"),
					new String[] { "accessionTime" });
			buff.append(serializer.exclude(new String[] { "password" }).serialize(
					userList));
			buff.append("}");

			jsonString = buff.toString();
		} else {
			jsonString = "{success:false}";
		}
		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		StringBuffer buff = new StringBuffer("{success:true");
		if (ids != null) {
			buff.append(",msg:'");
			for (String id : ids) {
				AppUser delUser = appUserService.get(new Long(id));
				AppRole superManager = appRoleService.get(SUPPER_MANAGER_ID);
				if (delUser.getRoles().contains(superManager)) {
					buff.append("员工:").append(delUser.getUsername()).append(
							"是超级管理员,不能注销!<br><br/>");
				} else if (delUser.getUserId().equals(
						ContextUtil.getCurrentUserId())) {
					buff.append("不能注销自己!<br></br>");
				} else {
		
					delUser.setStatus(new Short("5")); //5在数据字典里代表注销
					//delUser.setDelFlag(Constants.FLAG_DELETED);
//					delUser.setUsername("__" + delUser.getUsername());
					delUser.setUpdateBy(ContextUtil.getCurrentUser().getFullname());
					Date dd = new Date();
//					SimpleDateFormat df = new SimpleDateFormat("yyyy-M-d");
//					String sd = df.format(dd);
//					try {
//						dd = df.parse(sd);
//					} catch (ParseException e) {
//						// TODO Auto-generated catch block
//						e.printStackTrace();
//					}
					
					delUser.setUpdateDate(dd);
					
					appUserService.save(delUser);
				}
			}
			buff.append("'");
		}
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	
	
	
	
	
	
	

	/**
	 * 显示详细信息 add两个日期变量
	 * 
	 * @return
	 */
	public String get() {
		AppUser appUser = null;
		JSONSerializer json = JsonUtil.getJSONSerializer(new String[] {
				"accessionTime", "beginDate", "endDate" });
		
		if (userId != null) {
			appUser = appUserService.get(userId);
			
			
		} else {
			json.exclude(new String[] { "accessionTime", "beginDate",
							"endDate", "department", "password", "status",
							"position" });
			appUser = ContextUtil.getCurrentUser();
		}
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:[");
		sb.append(JsonUtil.getJSONSerializer(
				new String[] { "accessionTime", "beginDate", "endDate" })
				.serialize(appUser));
		sb.append("]}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	
	/**
	 * 添加及保存操作
	 */
	@Action(description = "添加或保存用户信息")
	public String save() {

		Set<AppRole> roles = new HashSet<AppRole>();

		String rolesIds = getRequest().getParameter("AppUserRoles");
		String zhiwei = getRequest().getParameter("appUser.zhiwei");
		//String zhiwei = getRequest().getParameter("zhiwei");
		//String sex = getRequest().getParameter("sex");
		System.out.println("===rolesIds="+rolesIds+"zhiwei"+zhiwei);
		
		// 查询角色-----
		
		List<AppRole>  listr=appUserService.selectRole();
		System.out.println("=bbbbbbbbbbbbbbb"+listr.size());
		System.out.println("=cccccccccccccccccccc"+listr.get(0).getRoleId());
		Long roleid = null;
		if(listr.size()!=0){
			System.out.println("listr.size()"+listr.size());
			 for(int i=0;i<listr.size();i++){
                         System.out.println("99999"+listr.size());
					if(zhiwei.equals(listr.get(i).getRoleName())){
						System.out.println("==listr.get(i).getRoleId()=--="+listr.get(i).getRoleId());
						roleid=listr.get(i).getRoleId(); 
					  }
			 }
		}
		
		AppRole role = appRoleService.get(roleid);
		roles.add(role);
		
//		if (zhiwei != null) {
//			String[] ids = zhiwei.split(",");
//			for (String id : ids) {
//				if (!"".equals(id)) {
//					AppRole role = appRoleService.get(new Long(id));
//					roles.add(role);
//				}
//			}
//		}
		// group
		String groupParams = getRequest().getParameter("groupParams");
		//groupParams="[]";
		System.out.println("====groupParams"+groupParams);
		if (StringUtils.isNotEmpty(groupParams)) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			String[] ids = gson.fromJson(groupParams, String[].class);
			
			for (String id : ids) {
				// System.out.println(id);
				//id=901;
				UlUsergroup ug = ulUsergroupService.get(new Long(901));
				if(ug!=null){
					roles.addAll(ug.getRoles());
					System.out.println("2222"+roles);
					if(appUser.getUlUsergroups() == null){
						appUser.setUlUsergroups(new HashSet<UlUsergroup>());
					}
					appUser.getUlUsergroups().add(ug);
				}
			}
			// appUser.setUlUsergroups(s);
			// appUserService.save(appUser);
		}
		// boolean saveTrue = true;
		Iterator<AppRole> ite = roles.iterator();
		while(ite.hasNext()){
			AppRole approle = ite.next();
			System.out.println("3333"+approle);
//			System.out.println(approle.getName() + "---角色---");
		}
		
		appUser.setRoles(roles);
		// employee                         useid --> employeeid
		String useid = getRequest().getParameter("appUser.useid");
		if (StringUtils.isNotEmpty(useid)) {
			Long empid = new Long(useid);
			UlEmployee ue = ulemployeeServie.get(empid);
			appUser.setUlEmployee(ue);
			appUser.setUsername(ue.getUserNo());
			//appUser.setTitle(new Short(sex));
//			appUser.setEmployeeid(useid);
			appUser.setEmployeeid(ue.getUserNo());//工号
			String emp_deppath = ue.getUlDepartment().getPath();
			appUser.setDepPath(emp_deppath);
			appUser.setRoles(roles);
			System.out.println("5555"+roles);
	        if(ue!=null){
	            Department department = departmentService.get(ue.getUlDepartment().getDepid());
	            appUser.setDepartment(department);
	            appUser.setUserType("0");
	            appUser.setStatus(new Short("1"));
	            appUser.setDelFlag(new Short("0"));
	        }
	        appUser.setFullname(ue.getFullname());
	        appUserService.save(appUser);
		}

		if (appUser.getUserId() != null) {
			System.out.println("appUser.getUserId()"+appUser.getUserId());
			AppUser old = appUserService.get(appUser.getUserId());

			appUser.setDelFlag(old.getDelFlag());
			appUser.setUserType("0");
			appUser.setStatus(new Short("1"));
			appUser.setPassword(old.getPassword());
			appUser.setDynamicPwd(old.getDynamicPwd());
			appUser.setDyPwdStatus(old.getDyPwdStatus());
			appUserService.merge(appUser);
			setJsonString("{success:true}");
		} else {
			System.out.println("getUsername()"+appUser.getUsername());
			if (appUserService.findByUserName(appUser.getUsername()) == null) {
				appUser.setDelFlag(Constants.FLAG_UNDELETED);
				appUser.setPassword(StringUtil.encryptSha256(appUser
						.getPassword()));
				appUser.setStatus(new Short("1"));
				appUserService.save(appUser);
				setJsonString("{success:true}");
			} else {
				// saveTrue = false;
				System.out.println("getUsername()"+appUser.getUsername());
				setJsonString("{success:false,msg:'用户登录账号:"
						+ appUser.getUsername() + "已存在,请重新输入账号.'}");
			}
		}
		
		return SUCCESS;
	}

	/**
	 * 查询已有角色
	 */
	public String selectedRoles() {
		if (userId != null) {
			setAppUser(appUserService.get(userId));
			Set<AppRole> roles = appUser.getRoles();
			StringBuffer sb = new StringBuffer("[");
			for (AppRole role : roles) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName()
						+ "'],");
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]");
			setJsonString(sb.toString());
		}
		return SUCCESS;
	}

	/**
	 * 查询可选角色
	 * 
	 * @return
	 */
	public String chooseRoles() {
		List<AppRole> chooseRoles = appRoleService.getAll();
		if (userId != null) {
			setAppUser(appUserService.get(userId));
			Set<AppRole> selectedRoles = appUser.getRoles();
			for (AppRole role : selectedRoles) {
				chooseRoles.remove(role);
			}
		}
		StringBuffer sb = new StringBuffer("[");
		for (AppRole role : chooseRoles) {
			if (role.getStatus() != 0) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName()
						+ "'],");
			}
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 修改密码
	 * 
	 * @return
	 */
	@Action(description = "修改密码")
	public String resetPassword() {
		String userId = getRequest().getParameter("appUserUserId");
		String oldPassword = StringUtil.encryptSha256(getRequest()
				.getParameter("oldPassword"));
		String newPassword = getRequest().getParameter("newPassword");
		String againPassword = getRequest().getParameter("againPassword");
		String newBegindate = getRequest().getParameter("appUser.begindate");
		String newEnddate = getRequest().getParameter("appUser.enddate");
		String newUpdateby = getRequest().getParameter("appUser.updateby");
		if (StringUtils.isNotEmpty(userId)) {
			setAppUser(appUserService.get(new Long(userId)));
		} else {
			setAppUser(ContextUtil.getCurrentUser());
		}
		StringBuffer msg = new StringBuffer("{msg:'");
		boolean pass = false;
		if (oldPassword.equals(appUser.getPassword())) {
			if (newPassword.equals(againPassword)) {
				pass = true;
			} else
				msg.append("两次输入不一致.'");
		} else
			msg.append("旧密码输入不正确.'");
		if (pass) {
			appUser.setPassword(StringUtil.encryptSha256(newPassword));
			try {
				java.text.DateFormat df = new java.text.SimpleDateFormat(
						"yyyy-MM-dd");
				java.util.Date nbd = df.parse(newBegindate);
				appUser.setBeginDate(nbd);
				java.util.Date ned = df.parse(newEnddate);
				appUser.setEndDate(ned);
				appUser.setUpdateBy(newUpdateby);
				appUser.setUpdateDate(nbd);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			appUserService.save(appUser);
			setJsonString("{success:true}");
		} else {
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		return SUCCESS;
	}

	/**
	 * 重置密码
	 * 
	 * @return
	 */
	@Action(description = "重置密码")
	public String createPassword() {
		String userId = getRequest().getParameter("appUserUserId");
		String newPassword = getRequest().getParameter("newpassword");
		String password = getRequest().getParameter("password");
		StringBuffer msg = new StringBuffer("{msg:'");
		if (StringUtils.isNotEmpty(userId)) {
			setAppUser(appUserService.get(new Long(userId)));
		} else {
			setAppUser(ContextUtil.getCurrentUser());
		}

		if (newPassword.equals(password)) {
			appUser.setPassword(StringUtil.encryptSha256(newPassword));
			appUserService.save(appUser);
			setJsonString("{success:true}");
		} else {
			msg.append("重置失败!,两次输入的密码不一致,请重新输入!.'");
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}

		return SUCCESS;
	}

	/**
	 * 删除用户照片
	 * 
	 * @return
	 */
	public String photo() {
		setAppUser(appUserService.get(getUserId()));
		appUser.setPhoto("");
		appUserService.save(appUser);
		return SUCCESS;
	}

	/**
	 * 按部门查找合适做下属的用户
	 * 
	 * @return
	 */
	public String subAdepartment() {
		PagingBean pb = getInitPagingBean();
		String strDepId = getRequest().getParameter("depId");
		String path = "0.";
		AppUser user = ContextUtil.getCurrentUser();
		if (StringUtils.isNotEmpty(strDepId)) {
			Long depId = Long.parseLong(strDepId);
			Department dep = departmentService.get(depId);
			if (dep != null) {
				path = dep.getPath();
			}
		} else {
			Department dep = user.getDepartment();
			if (dep != null) {
				path = dep.getPath();
			}
		}
		if ("0.".equals(path)) {
			path = null;
		}
		Long uId = user.getUserId();
		Set<Long> userIds = userSubService.findAllUpUser(uId);
		List<Long> userIdsL = userSubService.subUsers(uId);
		userIds.add(uId);
		for (Long l : userIdsL) {
			userIds.add(l);
		}
		List<AppUser> list = appUserService.findSubAppUser(path, userIds, pb);
		Type type = new TypeToken<List<AppUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 根据角色来选择合适做下属的用户
	 * 
	 * @return
	 */
	public String subArole() {
		String strRoleId = getRequest().getParameter("roleId");
		PagingBean pb = getInitPagingBean();
		AppUser user = ContextUtil.getCurrentUser();
		if (StringUtils.isNotEmpty(strRoleId)) {
			Long uId = user.getUserId();
			Set<Long> userIds = userSubService.findAllUpUser(uId);
			List<Long> userIdsL = userSubService.subUsers(uId);
			userIds.add(uId);
			for (Long l : userIdsL) {
				userIds.add(l);
			}
			List<AppUser> userList = appUserService.findSubAppUserByRole(
					new Long(strRoleId), userIds, pb);
			// List<AppUser>
			// userList=appUserService.findByRole(Long.parseLong(strRoleId),
			// pb);
			Type type = new TypeToken<List<AppUser>>() {
			}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(pb.getTotalItems()).append(",result:");
			Gson gson = new GsonBuilder()
					.excludeFieldsWithoutExposeAnnotation().create();
			buff.append(gson.toJson(userList, type));
			buff.append("}");
			jsonString = buff.toString();
		} else {
			jsonString = "{success:false}";
		}
		return SUCCESS;
	}

	/**
	 * 按在线查找合适当下属的用户
	 */

	public String onlineAsub() {
		Map<String, OnlineUser> onlineUsers = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersBySub = new HashMap<String, OnlineUser>();
		onlineUsers = AppUtil.getOnlineUsers();// 获得所有在线用户
		// 按在线用户
		AppUser user = ContextUtil.getCurrentUser();
		Long uId = user.getUserId();
		Set<Long> userIds = userSubService.findAllUpUser(uId);
		userIds.add(uId);
		List<Long> userIdsL = userSubService.subUsers(uId);
		for (Long l : userIdsL) {
			userIds.add(l);
		}
		for (String sessionId : onlineUsers.keySet()) {
			OnlineUser onlineUser = new OnlineUser();
			onlineUser = onlineUsers.get(sessionId);
			if (!userIds.contains(onlineUser.getUserId())) {
				onlineUsersBySub.put(sessionId, onlineUser);
			}
		}
		Type type = new TypeToken<java.util.Collection<OnlineUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(onlineUsers.size()).append(",result:");
		Gson gson = new Gson();
		buff.append(gson.toJson(onlineUsersBySub.values(), type));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 上属
	 * 
	 * @return
	 */
	public String upUser() {
		Set<AppUser> set = relativeUserService.getUpUser(ContextUtil
				.getCurrentUserId());

		StringBuffer buff = new StringBuffer("[");
		for (Iterator it = set.iterator(); it.hasNext();) {
			AppUser user = (AppUser) it.next();
			buff.append("['" + user.getUserId().toString() + "','"
					+ user.getFullname() + "'],");
		}
		if (set.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 当前用户修改个人资料
	 * 
	 * @return
	 */
	@Action(description = "修改个人资料")
	public String profile() {
		AppUser old = ContextUtil.getCurrentUser();
		try {
			BeanUtil.copyNotNullProperties(old, appUser);
		} catch (Exception e) {
			logger.info(e);
		}
		appUserService.save(old);
		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 
	 * @return
	 */
	public String bindDyPwd() {
		StringBuffer msg = new StringBuffer("{success:true,msg:'");
		String curDynamicPwd = getRequest().getParameter("curDynamicPwd");
		HashMap<String, String> input = new HashMap<String, String>();
		input.put("app", "demoauthapp");
		input.put("user", appUser.getDynamicPwd());
		input.put("pw", curDynamicPwd);

		String result = appUserService.initDynamicPwd(input, "bind");

		if (result.equals("ok")) {
			AppUser orgUser = appUserService.get(appUser.getUserId());
			orgUser.setDynamicPwd(appUser.getDynamicPwd());
			orgUser.setDyPwdStatus(AppUser.DYNPWD_STATUS_BIND);
			appUserService.save(orgUser);
			msg.append("成功绑定!");
		} else {
			msg.append(result);
		}
		msg.append("'}");
		setJsonString(msg.toString());
		return SUCCESS;
	}

	/**
	 * 
	 */
	public String unbindDyPwd() {
		StringBuffer msg = new StringBuffer("{success:true,msg:'");
		String curDynamicPwd = getRequest().getParameter("curDynamicPwd");
		HashMap<String, String> input = new HashMap<String, String>();
		input.put("app", "demoauthapp");
		input.put("user", appUser.getDynamicPwd());
		input.put("pw", curDynamicPwd);

		String result = appUserService.initDynamicPwd(input, "unbind");

		if (result.equals("ok")) {
			AppUser orgUser = appUserService.get(appUser.getUserId());
			orgUser.setDyPwdStatus(AppUser.DYNPWD_STATUS_UNBIND);
			appUserService.save(orgUser);
			msg.append("解绑成功!");
		} else {
			msg.append(result);
		}
		msg.append("'}");
		setJsonString(msg.toString());
		return SUCCESS;
	}

	@Resource
	private UlUsergroupService ulUsergroupService;

	/**
	 * 加载tree节点
	 */
	public String treeLoad() {
		StringBuffer sb = new StringBuffer("[{id:'0',text:'"
				+ AppUtil.getCompanyName() + "',expanded:true,children:[");
		// 查询顶级父节点UlUsergroup
		List<UlUsergroup> list = ulUsergroupService
				.findByCondition(new Long(0));
		for (UlUsergroup jb : list) {
			sb.append("{id:'" + jb.getPkUsergroupId() + "',text:'"
					+ jb.getUsergroupName() + "',");
			sb.append(findChildren(jb.getPkUsergroupId()));
		}
		if (!list.isEmpty()) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]}]");
		jsonString = sb.toString();
		return SUCCESS;
	}

	/**
	 * 根据parentId查询对应的节点
	 */
	private String findChildren(Long parentId) {
		StringBuffer sb = new StringBuffer();
		List<UlUsergroup> list = ulUsergroupService.findByCondition(parentId);
		if (list.isEmpty() || list.size() == 0) { // 不存在子节点
			sb.append("leaf:true},");
			return sb.toString();
		} else { // 存在子节点
			sb.append("expanded:true,children:[");
			for (UlUsergroup jb : list) {
				sb.append("{id:'" + jb.getPkUsergroupId() + "',text:'"
						+ jb.getUsergroupName() + "',");
				sb.append(findChildren(jb.getPkUsergroupId()));
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]},");
			return sb.toString();
		}
	}

	public String multiDelGroups() {

		String[] ids = getRequest().getParameterValues("ids");
		String userid = getRequest().getParameter("userId");
		AppUser appuserNew = appUserService.get(new Long(userid));
		Set<UlUsergroup> newGroups = new HashSet<UlUsergroup>();
		newGroups = appuserNew.getUlUsergroups();

		if (ids != null) {
			for (String id : ids) {
				// ulUgroupUserService.remove(new Long(id));
				UlUsergroup ug = ulUsergroupService.get(new Long(id));
				if (newGroups.contains(ug))
					newGroups.remove(ug);
				// ulUgroupUserService.removeUG(new Long(id));//多项删除用户-用户组
			}
		}
		appuserNew.setUlUsergroups(newGroups);
		appUserService.save(appuserNew);
		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 根据多个ID获得一个字符串集合 信息
	 * 
	 * @return
	 */
	public String getUserName() {

		String[] groupId = joiner.trim().split(",");
		StringBuffer sbr = new StringBuffer();
		String str = "";
		for (int i = 0; i < groupId.length; i++) {
			AppUser appUser = appUserService.get(new Long(groupId[i]));
			sbr.append(appUser.getFullname() + ",");

		}
		str = sbr.substring(0, sbr.length() - 1);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:{username:");
		sb.append(gson.toJson(str));
		sb.append("}}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 
	 * 根据用户组查询用户信息
	 */
	public String findByUgroup() {
		String pkUsergroupId = getRequest().getParameter("pkUsergroupId");
		PagingBean pb = getInitPagingBean();

		if (StringUtils.isNotEmpty(pkUsergroupId)) {
			if (Long.parseLong(pkUsergroupId) != 0) {
				List<AppUser> userList = appUserService.findByUsergroup(Long
						.parseLong(pkUsergroupId), pb);
				
				StringBuffer buff = new StringBuffer(
						"{success:true,'totalCounts':").append(
						pb.getTotalItems()).append(",result:");
				JSONSerializer serializer = new JSONSerializer();
				serializer.transform(new DateTransformer("yyyy-MM-dd"),
						new String[] { "accessionTime" });
				buff.append(serializer.exclude(new String[] { "password","department","ulEmployee.ulDepartment","ulEmployee.class" }).serialize(
						userList));
				buff.append("}");
				jsonString = buff.toString();
			} else {
				List<AppUser> userList = appUserService.getAll(pb);
				
				StringBuffer buff = new StringBuffer(
						"{success:true,'totalCounts':").append(
						pb.getTotalItems()).append(",result:");
				JSONSerializer serializer = new JSONSerializer();
				serializer.transform(new DateTransformer("yyyy-MM-dd"),
						new String[] { "accessionTime" });
				buff.append(serializer.exclude(new String[] { "password","department","ulEmployee.ulDepartment","ulEmployee.class" }).serialize(
						userList));
				buff.append("}");
				jsonString = buff.toString();
			}
		} else {
			jsonString = "{success:false}";
		}
		return SUCCESS;
	}

	/**
	 * 供用户选择器使用. 根据已有的ID加载选择器中的已选用户
	 * @author zhangyl
	 * 2012年5月9日 17:34:31
	 */
	public String findbyUserStr() {
		if (userIdStrs != null && userIdStrs.length()>0) {
		String[] userId = userIdStrs.trim().split(",");
		List<AppUser> appUserList = new ArrayList<AppUser>();
		for (int i = 0; i < userId.length; i++) {
			AppUser appUser = appUserService.get(new Long(userId[i]));
			appUserList.add(appUser);
		}

		StringBuffer sb = new StringBuffer("[");
		for (AppUser user : appUserList) {
			if (user.getUserId() != null
					&& !user.getUserId().equals("")) {
				sb.append("['" + user.getUserId() + "','"
						+ user.getUsername() + "','" + user.getFullname() + "','" + user.getEmployeeid() + "'],");
			}

		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		}
		return SUCCESS;
		
	}
	
	public String deletePhoto(){
		String userId = getRequest().getParameter("userId");
		if(StringUtils.isEmpty(userId)) return null;
		AppUser ap = appUserService.get(Long.parseLong(userId));
		ap.setPhone("");
		return SUCCESS;
	}

	
	
	/**
	 * 获得当前用户的资料
	 * @return
	 */
	public String getMySelf(){
	    AppUser currentUser = ContextUtil.getCurrentUser();
	    StringBuffer sb = new StringBuffer();
	    sb.append("{success:true,user:{");
//	    Type type = new TypeToken<List<AppUser>>() { }.getType();
	    sb.append("\"userId\":").append(currentUser.getUserId());
	    sb.append(",\"username\":\"").append(currentUser.getUsername()).append("\"");
	    sb.append(",\"accessionTime\":\"").append(currentUser.getAccessionTime()).append("\"");
	    sb.append(",\"endDate\":\"").append(currentUser.getEndDate()).append("\"");
	    sb.append(",\"beginDate\":\"").append(currentUser.getBeginDate()).append("\"");
	    sb.append(",\"photo\":\"").append(currentUser.getPhoto()).append("\"");
	    sb.append(",\"userType\":").append(currentUser.getUserType());
	    Set<AppRole> arlist = new HashSet<AppRole>();
	    if(currentUser.getRoles()!=null&&currentUser.getRoles().size()>0){
	        arlist = currentUser.getRoles();
	        sb.append(",\"roleName\":\"");
	        for(AppRole appRole:arlist){
	            sb.append(appRole.getRoleName()).append(","); 
	        }
	        if (arlist.size() > 0) {
	            sb.deleteCharAt(sb.length() - 1);
	        }
	        sb.append("\"");
	    }
	    Set<UlUsergroup> gulist = new HashSet<UlUsergroup>();
	    if(currentUser.getUlUsergroups()!=null&&currentUser.getUlUsergroups().size()>0){
	        gulist = currentUser.getUlUsergroups();
	        sb.append(",\"usergroupName\":\"");
	        for(UlUsergroup ulUsergroup:gulist){
	            sb.append(ulUsergroup.getUsergroupName()).append(","); 
	        }
	        if (gulist.size() > 0) {
	            sb.deleteCharAt(sb.length() - 1);
	        }
	        sb.append("\"");	        
	    }
	    if (currentUser.getUlEmployee() != null){
	    	if(currentUser.getUlEmployee().getUseid()!=null){
		        UlEmployee ulEmployee = ulemployeeServie.get(new Long(currentUser.getUlEmployee().getUseid()));
		        sb.append(",\"ulEmployee\":{\"fullname\":\"").append(ulEmployee.getFullname()).append("\",")
		        //.append("\"depname\":\"").append(ulEmployee.getUlDepartment().getDepname()).append("\",")
		        .append("\"depname\":\"").append("北京银行").append("\",")
		        .append("\"gonghao\":\"").append(ulEmployee.getUserNo()).append("\",")
		        .append("\"zhiwei\":\"").append(ulEmployee.getZhiwei()).append("\"")
		        .append("}");
		    }
	    }
	    
	    sb.append("}}");
//	    sb.append("{success:true,user:");
//	    JSONSerializer serializer = new JSONSerializer();
//        sb.append(serializer.exclude(new String[] { "password" }).serialize(currentUser));
//	    sb.append("}");
	    setJsonString(sb.toString());
	    return SUCCESS; 
	}
	
	/**
	 * 根据用户内码查找：工号、职务、职级、组织机构
	 * @return
	 */
	public String findInfoByUserId() {
		QueryFilter filter = new QueryFilter(getRequest());
		String userId = getRequest().getParameter("userId");
		if(StringUtils.isNotBlank(userId)) {
			AppUser appUser = appUserService.get(Long.parseLong(userId));
			if(appUser!=null) {
				String empployeeId = appUser.getEmployeeid();
				if(StringUtils.isNotBlank(empployeeId)) {
					filter.addFilter("Q_userNo_S_EQ", empployeeId);
					List<UlEmployee> list = ulemployeeServie.getAllNoRequest(filter);
					if(list.size()>0) {
						UlEmployee ulEmployee = list.get(0);
						String zhiwei = ulEmployee.getZhiwei();
						String zhiji = ulEmployee.getZhiji();
						
					}
				}
			}
		}
		
		return SUCCESS;
	}
	
	
	/***
	 * 
	 * 
	 * =======================================================================2014/06/18用户管理修改功能============
	 * 
	 * 
	 * ***/
	/*
	 * 用户的删除
	 *2014/06/18  nk 
	 * 
	 * */
	
	
public String multiDelUser() {
        
		String[] Ids = getRequest().getParameterValues("ids");
		System.out.println("=============ids"+Ids.toString());
		// Equipment eq=new Equipment();
		if (Ids != null) {
			for (String id : Ids) { 
				//String EId = null;
				System.out.println("==================Eid"+id);
				
				appUserService.getDelUser(new Long(id));
			
				System.out.println("<<u87u<<OK");
			}
		}
        
		jsonString = "{success:true}";

		return SUCCESS;
	}

	
	
	/*
	 * 管理员：超级管理员，所有的权限，
	 * 总行管理员，所有分行管理员的账号
	 * 分行管理员，本分行下的所有操作员的账号*
	 * **/
private PagingBean pagingBean = null;

public PagingBean getPagingBean() {
	return pagingBean;
}

public void setPagingBean(PagingBean pagingBean) {
	this.pagingBean = pagingBean;
}
public PagingBean paging() {
	// 取得分页的信息
	Integer start = 0;
	Integer limit = PagingBean.DEFAULT_PAGE_SIZE;

	String s_start = getRequest().getParameter("start");
	String s_limit =getRequest().getParameter("limit");
	if (StringUtils.isNotEmpty(s_start)) {
		start = new Integer(s_start);
	}
	if (StringUtils.isNotEmpty(s_limit)) {
		limit = new Integer(s_limit);
	}


	this.pagingBean = new PagingBean(start, limit);
	return pagingBean;
}
	public String userList() {
		System.out.println("userList----用户信息");
		String username = getRequest().getParameter("username"); // 办理人
		String fullname = getRequest().getParameter("fullname"); // 补录人
		String userNo = getRequest().getParameter("userNo"); // 补录时间
		String status = getRequest().getParameter("status"); // 补录结果
		System.out.println("===[ConHisAction.java]=ExamineReport()="
				+ username + fullname + userNo + status);
		Integer start = 0;
		Integer limit = PagingBean.DEFAULT_PAGE_SIZE;
		String s_start = getRequest().getParameter("start");
		String s_limit = getRequest().getParameter("limit");

		if (StringUtils.isNotEmpty(s_start)) {
			start = new Integer(s_start);
		}
		if (StringUtils.isNotEmpty(s_limit)) {
			limit = new Integer(s_limit);
		}
		System.out.println("start" + start + "limit=" + limit);
		int count = 0;// 查询记录的总数
		List<AppUser> list = new ArrayList<AppUser>();
		System.out.println("[ConHisAction.java] -if  ----- 查询所有====");
		list = appUserService.SelectUserList(start, limit, username, fullname,
				userNo, status);//根据条件查询
		count = appUserService.SelectUserListCount(username, fullname,
				userNo, status);//总数目
		StringBuffer sb = new StringBuffer();
		for (AppUser appUser : list) {
			// List<UlUgroupUser> gulist =
			// ulUgroupUserService.findByUserId(appUser.getUserId());
			// List<UlUgroupUser> gulist =
			// ulUgroupUserService.findByUserId(appUser.getUserId());
			Set<UlUsergroup> gulist = appUser.getUlUsergroups();
			for (UlUsergroup u : gulist) {
				// sb.append("["+u.getUlUsergroup().getUsergroupName()+"],");
				sb.append(u.getUsergroupName() + ",");
			}

			if (sb.length() > 0) {
				String str = sb.substring(0, sb.length() - 1);
				sb = new StringBuffer();//
				appUser.setYonghuzu(str);

			}

		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(count).append(
						",result:");
		System.out.println("===========buff" + buff);
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"accessionTime", "beginDate", "endDate" });
		buff.append(serializer.exclude(new String[] { "password" }).serialize(
				list));
		buff.append("}");
		jsonString = buff.toString();
		System.out.println("list=" + list.size()+buff.toString());
	    this.pagingBean = new PagingBean(start, limit);
		
		
//		List<AppUser> list=new ArrayList<AppUser>();
//		AppUser user = ContextUtil.getCurrentUser();
//		List<BankType> parentid = new ArrayList<BankType>();
//		List<AppRole> roles = appUserService.selectRoleName(user.getUserId());
//		System.out.println("=====roles======" + roles);
//        for(int i=0;i<roles.size();i++){
//			if (user.getUserId() == 0 || user.getBankTypeId() == 0) {
//				System.out.println("超级管理员显示所有的---admin" + user.getBankTypeId());
//				QueryFilter filter = new QueryFilter(getRequest());
//				System.out.println("========AppUser=======" + filter);
//				filter
//						.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED
//								.toString());// 显示0
//				filter.addSorted("username", "asc");
//				list = appUserService.getAll(filter);
//				StringBuffer sb = new StringBuffer();
//				for (AppUser appUser : list) {
//					// List<UlUgroupUser> gulist =
//					// ulUgroupUserService.findByUserId(appUser.getUserId());
//					// List<UlUgroupUser> gulist =
//					// ulUgroupUserService.findByUserId(appUser.getUserId());
//					Set<UlUsergroup> gulist = appUser.getUlUsergroups();
//					for (UlUsergroup u : gulist) {
//						// sb.append("["+u.getUlUsergroup().getUsergroupName()+"],");
//						sb.append(u.getUsergroupName() + ",");
//					}
//
//					if (sb.length() > 0) {
//						String str = sb.substring(0, sb.length() - 1);
//						sb = new StringBuffer();//
//						appUser.setYonghuzu(str);
//
//					}
//
//				}
//
//				StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
//						.append(filter.getPagingBean().getTotalItems()).append(
//								",result:");
//				System.out.println("===========buff" + buff);
//				JSONSerializer serializer = new JSONSerializer();
//				serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
//						"accessionTime", "beginDate", "endDate" });
//				buff.append(serializer.exclude(new String[] { "password" }).serialize(
//						list));
//				buff.append("}");
//				jsonString = buff.toString();
//			} else if("总行管理员".equals(roles.get(i).getName())){
//				System.out.println("else==parentid" + user.getBankTypeId());
//				List<AppUser> list1 = appUserService.SelectUserList();
//				System.out.println("===list1="+list1);
//				StringBuffer sb = new StringBuffer();
//				for (AppUser appUser : list1) {
//					// List<UlUgroupUser> gulist =
//					// ulUgroupUserService.findByUserId(appUser.getUserId());
//					// List<UlUgroupUser> gulist =
//					// ulUgroupUserService.findByUserId(appUser.getUserId());
//					Set<UlUsergroup> gulist = appUser.getUlUsergroups();
//					for (UlUsergroup u : gulist) {
//						// sb.append("["+u.getUlUsergroup().getUsergroupName()+"],");
//						sb.append(u.getUsergroupName() + ",");
//					}
//
//					if (sb.length() > 0) {
//						String str = sb.substring(0, sb.length() - 1);
//						sb = new StringBuffer();//
//						appUser.setYonghuzu(str);
//
//					}
//
//				}
//
//				StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
//						.append(list1.size()).append(
//								",result:");
//				System.out.println("===========buff" + buff);
//				JSONSerializer serializer = new JSONSerializer();
//				serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
//						"accessionTime", "beginDate", "endDate" });
//				buff.append(serializer.exclude(new String[] { "password" }).serialize(
//						list1));
//				buff.append("}");
//				jsonString = buff.toString();
//			}else if("分行管理员".equals(roles.get(i).getName())){
//				System.out.println("else==parentid" + user.getBankTypeId());
//				list = appUserService.SelectZHUserList();
//				System.out.println("===list1="+list);
//				StringBuffer sb = new StringBuffer();
//				for (AppUser appUser : list) {
//					// List<UlUgroupUser> gulist =
//					// ulUgroupUserService.findByUserId(appUser.getUserId());
//					// List<UlUgroupUser> gulist =
//					// ulUgroupUserService.findByUserId(appUser.getUserId());
//					Set<UlUsergroup> gulist = appUser.getUlUsergroups();
//					for (UlUsergroup u : gulist) {
//						// sb.append("["+u.getUlUsergroup().getUsergroupName()+"],");
//						sb.append(u.getUsergroupName() + ",");
//					}
//
//					if (sb.length() > 0) {
//						String str = sb.substring(0, sb.length() - 1);
//						sb = new StringBuffer();//
//						appUser.setYonghuzu(str);
//
//					}
//
//				}
//
//				StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
//						.append(list.size()).append(
//								",result:");
//				System.out.println("===========buff" + buff);
//				JSONSerializer serializer = new JSONSerializer();
//				serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
//						"accessionTime", "beginDate", "endDate" });
//				buff.append(serializer.exclude(new String[] { "password" }).serialize(
//						list));
//				buff.append("}");
//				jsonString = buff.toString();
//				
//			}
//		
//      }
//		
//		
//		
        
		return SUCCESS;

	}
	
	
	
	
	
	
	
	
	
	
}
