package com.ulane.base.action.xitong;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppRoleService;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.xitong.UlUsergroupService;
import com.ulane.callout.model.outb.ObCalllist;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.customer.model.fee.ObFeeRule;
import com.ulane.customer.service.fee.ObFeeRuleService;

import flexjson.JSONSerializer;

/**
 * 
 * @author
 * 
 */
public class UlUsergroupAction extends BaseAction {
	@Resource
	private UlUsergroupService ulUsergroupService;
	@Resource
	private ObComService obComService;
	@Resource
	private AppRoleService appRoleService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private ObFeeRuleService obFeeRuleService;

	private UlUsergroup ulUsergroup;

	private Long pkUsergroupId;
	
	private String groupIdStrs;			//用于接收用户组选择器中传递的多个ID
	
	private String pkUsergroupStr;
	//表示用户注销后未启用的状态
	public static final Short DISABLE_STATE = 2;
	
	public static final Short ENABLE_STATE = 1;

	public String getGroupIdStrs() {
		return groupIdStrs;
	}

	public void setGroupIdStrs(String groupIdStrs) {
		this.groupIdStrs = groupIdStrs;
	}

	public String getPkUsergroupStr() {
		return pkUsergroupStr;
	}

	public void setPkUsergroupStr(String pkUsergroupStr) {
		this.pkUsergroupStr = pkUsergroupStr;
	}

	public Long getPkUsergroupId() {
		return pkUsergroupId;
	}

	public void setPkUsergroupId(Long pkUsergroupId) {
		this.pkUsergroupId = pkUsergroupId;
	}

	public UlUsergroup getUlUsergroup() {
		return ulUsergroup;
	}

	public void setUlUsergroup(UlUsergroup ulUsergroup) {
		this.ulUsergroup = ulUsergroup;
	}

	/**
	 * 显示所有的用户组信息
	 * 
	 * @param pkUsergroupId
	 * @return
	 */
	public String select() {

		String usergroupId = getRequest().getParameter("pkUsergroupId");
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_isDelete_L_EQ", Constants.FLAG_UNDELETED.toString());
		if (StringUtils.isNotEmpty(usergroupId) && !"0".equals(usergroupId)) {
			ulUsergroup = ulUsergroupService.get(new Long(usergroupId));
			filter.addFilter("Q_path_S_LFK", ulUsergroup.getPath());
		}
		filter.addSorted("path", "asc");
		List<UlUsergroup> list = ulUsergroupService.getAll(filter);
		Type type = new TypeToken<List<UlUsergroup>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString = buff.toString();

		return SUCCESS;
	}

	/*
	 * 寻找子根节点
	 */

	public String findChild(Long usergroupId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UlUsergroup> list = ulUsergroupService.findByCondition(usergroupId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UlUsergroup ulugroup : list) {
				buff1.append("{id:'" + ulugroup.getPkUsergroupId() + "',text:'"
						+ ulugroup.getUsergroupName() + "',");
				buff1.append(findChild(ulugroup.getPkUsergroupId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}
	/**
	 * 加载tree节点
	 */
	public String treeLoad() {
		StringBuffer sb = new StringBuffer("[{id:'0',text:'"
				+ AppUtil.getCompanyName() + "',expanded:true,children:[");
		// 查询顶级父节点
		List<UlUsergroup> list = ulUsergroupService.findByCondition(new Long(0));
		for (UlUsergroup ulUsergroup : list) {
			sb.append("{id:'" + ulUsergroup.getPkUsergroupId() + "',text:'" + ulUsergroup.getUsergroupName()
					+ "',");
			sb.append(findChildren(ulUsergroup.getPkUsergroupId()));
		}
		if (!list.isEmpty()) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]}]");
		jsonString = sb.toString();
		return SUCCESS;
	}
	/*
	 * 寻找子根节点
	 */

	public String findChildren(Long usergroupId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UlUsergroup> list = ulUsergroupService.findByCondition(usergroupId);
		if (list.isEmpty() || list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("expanded:true,children:[");
			for (UlUsergroup ulugroup : list) {
				buff1.append("{id:'" + ulugroup.getPkUsergroupId() + "',text:'"
						+ ulugroup.getUsergroupName() + "',");
				buff1.append(findChildren(ulugroup.getPkUsergroupId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
//		filter.addSorted("pkUsergroupId", "desc");
		filter.addSorted("usergroupName", "asc");
		String strGroupId = getRequest().getParameter("parentid");
		// 表示从上级目录开始进行查找
		String path = "0.";
		if (StringUtils.isNotEmpty(strGroupId)) {
			Long groupId = Long.parseLong(strGroupId);
			UlUsergroup userGroup = ulUsergroupService.get(groupId);
			if (userGroup != null) {
				path = userGroup.getPath();
				filter.addFilter("Q_path_S_LK", path);
			}
		}
		
		List<UlUsergroup> list = ulUsergroupService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));

		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}
	
	/**
	 * 活动绑定选择器显示列表
	 */
	public String userGroupNamlist() {
		String comid = getRequest().getParameter("comid");
		QueryFilter filter = new QueryFilter(getRequest());
		List<UlUsergroup> list = ulUsergroupService.getAll(filter);
		if(!("null").equals(comid) && comid!=null){
			ObCom obCom = obComService.get(new Long(comid));
			Set<UlUsergroup> usergoups =obCom.getUlUsergroups();
			//剔除已绑定的名单
			Iterator it = list.iterator();
			while(it.hasNext()){
				UlUsergroup o=(UlUsergroup)it.next();
				for(UlUsergroup grouptwo:usergoups){
				 if(grouptwo.equals(o)){
					it.remove();
				 }
				}
			}
			}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 活动执行人绑定显示列表
	 * @author lzm
	 */
	public String userGroupBDNamlist() {
		String ids=getRequest().getParameter("comId");
		if(!("null").equals(ids)){
		ObCom obCom=obComService.get(new Long(ids));
		Type type=new TypeToken<List<ObCalllist>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(obCom.getUlUsergroups().size()).append(
				",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(obCom.getUlUsergroups()));
		buff.append("}");
		
		jsonString = buff.toString();
		}
		return SUCCESS;
	}
	
	/**
	 * 佣金规则绑定使用对象列表
	 * @author lzm
	 */
	public String userGroupYJBDNamlist() {
		String ids=getRequest().getParameter("feeRuleId");
		if(!("null").equals(ids)){
		ObFeeRule rule=obFeeRuleService.get(new Long(ids));
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(rule.getUlUsergroups().size()).append(
				",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(rule.getUlUsergroups()));
		buff.append("}");
		
		jsonString = buff.toString();
		}
		return SUCCESS;
	}

	/**
	 * 批量删除/注销
	 * 
	 * @return
	 */
	public String multiDel() {
		String retStr = "";
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
//				ulUsergroupService.remove(new Long(id));
				UlUsergroup orgUlUsergroup = ulUsergroupService.get(new Long(id));
				List<UlUsergroup> list = ulUsergroupService.findByCondition(new Long(id));
				if(orgUlUsergroup.getUsergroupLevel() == (long)DISABLE_STATE){
					retStr = "{success:true,message:'此用户组已注销，请核实!'}";
				} 
				else if(list.size() != 0){
					retStr = "{success:true,message:'此用户组下还有子用户组不能注销，请核实!'}";
				}
				else {
//					orgUlUsergroup.setIsDelete(new Long(Constants.FLAG_DELETED));
					orgUlUsergroup.setUpdateDate(new Date());
					orgUlUsergroup.setUpdateBy(ContextUtil.getCurrentUser().getFamilyName());
					orgUlUsergroup.setUsergroupLevel(new Long(DISABLE_STATE));
					ulUsergroupService.save(orgUlUsergroup);
					retStr = "{success:true,message:'注销成功!'}";
				}
			}
		}

		jsonString = retStr;

		return SUCCESS;
	}

	
	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String getGroupName() {
		
		String[] groupId = pkUsergroupStr.trim().split(",");
		StringBuffer sbr = new StringBuffer();
		String str = "";
		for(int i=0;i<groupId.length;i++){
			UlUsergroup ulUsergroup = ulUsergroupService.get(new Long(groupId[i]));
			sbr.append(ulUsergroup.getUsergroupName()+",");
			
		}
		str = sbr.substring(0, sbr.length()-1);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:{usergroupName:");
		sb.append(gson.toJson(str));
		sb.append("}}");
		setJsonString(sb.toString());
//		System.out.println("json"+sb.toString());
		return SUCCESS;
	}
	
	
	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		UlUsergroup ulUsergroup = ulUsergroupService.get(pkUsergroupId);
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:[");
		sb.append(jsonSer.serialize(ulUsergroup));
		sb.append("]}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	
	public String getParentName() {
		if(pkUsergroupId!=0){
			UlUsergroup ulUsergroup = ulUsergroupService.get(pkUsergroupId);
			// 将数据转成JSON格式
			StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,usergroupName:'");
			sb.append(ulUsergroup.getUsergroupName());
			sb.append("'}");
			setJsonString(sb.toString());
		} else {
			StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,usergroupName:'"+"UniCC"+"'}");
			setJsonString(sb.toString());
		}
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		Set<AppRole> roles = new HashSet<AppRole>();
		Set<AppUser> users = new HashSet<AppUser>();
		//用户选择的ID串
		String userParams = getRequest().getParameter("userParams");
		//角色选择的ID串
		String rolesIds = getRequest().getParameter("UsergroupRoles");
		
		if (rolesIds != null) {
			String[] ids = rolesIds.split(",");
			for (String id : ids) {
				if (!"".equals(id)) {
					AppRole appRole = appRoleService.get(new Long(id));
					roles.add(appRole);
				}
			}
		}
		
		if (StringUtils.isNotEmpty(userParams)) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			String[] usersIds = gson.fromJson(userParams, String[].class);
			if (usersIds != null) {
				for (String id : usersIds) {
					if (!"".equals(id)) {
						AppUser appUser = appUserService.get(new Long(id));
						users.add(appUser);
					}
				}
			}
		}
		
		ulUsergroup.setRoles(roles);
		ulUsergroup.setUsers(users);
		
		Long parentId = ulUsergroup.getParentId();
		
		String groupPath = "";
		if (ulUsergroup.getPkUsergroupId() == null) {
			if(parentId == null || parentId.equals("") || parentId == 0){
				parentId = new Long(0);
				groupPath = "0.";
			} else {
				groupPath = ulUsergroupService.get(parentId).getPath();
			}
			ulUsergroup.setParentId(parentId);
			ulUsergroup.setIsDelete(new Long(Constants.FLAG_UNDELETED));
			ulUsergroup.setCreateDate(new Date());
			ulUsergroup.setCreateBy(ContextUtil.getCurrentUser().getFamilyName());
			ulUsergroup.setUsergroupLevel(new Long(Constants.ENABLED));
//			ulUsergroup.setIsHidden(new Long(0));
			ulUsergroupService.save(ulUsergroup);
			
			if(ulUsergroup != null){
				groupPath += ulUsergroup.getPkUsergroupId().toString() + ".";
				ulUsergroup.setPath(groupPath);
				ulUsergroupService.save(ulUsergroup);
			}
			setJsonString("{success:true}");
		} else {
			UlUsergroup orgUlUsergroup = ulUsergroupService.get(ulUsergroup.getPkUsergroupId());
			
			try {
				BeanUtil.copyNotNullProperties(orgUlUsergroup, ulUsergroup);
				
				if(parentId != 0){
					groupPath = ulUsergroupService.get(parentId).getPath();
					groupPath += ulUsergroup.getPkUsergroupId().toString() + ".";
				} else {
					groupPath = "0." + ulUsergroup.getPkUsergroupId().toString() + ".";
				}
				orgUlUsergroup.setParentId(parentId);
				orgUlUsergroup.setPath(groupPath);
				orgUlUsergroup.setUpdateDate(new Date());
				orgUlUsergroup.setUpdateBy(ContextUtil.getCurrentUser().getUsername());
				ulUsergroupService.save(orgUlUsergroup);
				
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 查询已有角色
	 */
	public String selectedRoles() {
		if (pkUsergroupId != null) {
			setUlUsergroup(ulUsergroupService.get(pkUsergroupId));
			Set<AppRole> ugroupRoles = ulUsergroup.getRoles();
			StringBuffer sb = new StringBuffer("[");
			for (AppRole ugrouprole : ugroupRoles) {
				sb.append("['" + ugrouprole.getRoleId() + "','"
						+ ugrouprole.getRoleName() + "'],");
			}
			if(!ugroupRoles.isEmpty()){
				sb.deleteCharAt(sb.length() - 1);
			}
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
		if (pkUsergroupId != null) {
			setUlUsergroup(ulUsergroupService.get(pkUsergroupId));
			Set<AppRole> selectedRoles = ulUsergroup.getRoles();
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
	 * 查询已有用户
	 */
	public String selectedUsers() {
		if (pkUsergroupId != null) {
			setUlUsergroup(ulUsergroupService.get(pkUsergroupId));
			Set<AppUser> ugroupUsers = ulUsergroup.getUsers();
			StringBuffer sb = new StringBuffer("[");
			for (AppUser ugroupuser : ugroupUsers) {
				if (ugroupuser.getUserId() != null
						&& !ugroupuser.getUserId().equals("")) {
					sb.append("['" + ugroupuser.getUserId() + "','"
							+ ugroupuser.getUsername() + "','" + ugroupuser.getUlEmployee().getFullname() + "','" + ugroupuser.getUlEmployee().getUserNo() + "'],");
				}

			}
			if (!ugroupUsers.isEmpty()){
				sb.deleteCharAt(sb.length() - 1);
			}
			sb.append("]");
			setJsonString(sb.toString());
		}
		return SUCCESS;
	}

	/**
	 * 查询可选用户
	 * 
	 * @return
	 */
	public String chooseUsers() {
		List<AppUser> chooseUsers = appUserService.getAll();
		if (pkUsergroupId != null) {
			setUlUsergroup(ulUsergroupService.get(pkUsergroupId));
			Set<AppUser> selectedUsers = ulUsergroup.getUsers();
			for (AppUser user : selectedUsers) {
				chooseUsers.remove(user);
			}
		}
		StringBuffer sb = new StringBuffer("[");
		for (AppUser user : chooseUsers) {
			if (user.getStatus() != 0) {
				sb.append("['" + user.getUserId() + "','" + user.getUsername()
						+ "'],");
			}
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 用户的下拉列表框
	 * @return
	 */
	public String combo() {
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_isDelete_L_EQ", Constants.FLAG_UNDELETED.toString());
		List<UlUsergroup> list = ulUsergroupService.getAll(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (UlUsergroup type : list) {
			if (i++ > 0)
				sb.append(",");
				sb.append("['").append(type.getPkUsergroupId()).append("','").append(
					type.getUsergroupName()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		logger.info("sb:" + sb.toString());
		return SUCCESS;
	}
//	/**
//	 * 显示树
//	 */
//	public String tree(){
//		String opt=getRequest().getParameter("opt");
//		StringBuffer buff = new StringBuffer();
//		if(StringUtils.isNotEmpty(opt)){
//			buff.append("[");
//		}else{
//			buff.append("[{id:'"+0+"',text:'"+AppUtil.getCompanyName()+"',expanded:true,children:[");
//		}
//		List<UlUsergroup> listParent;
//		listParent=ulUsergroupService.findByParentId(new Long(0));//最顶层父节点
//		for(UlUsergroup group:listParent){
//			buff.append("{id:'"+group.getPkUsergroupId()+"',text:'"+group.getUsergroupName()+"',");
//		    buff.append(findChild(group.getPkUsergroupId()));
//		}
//		if (!listParent.isEmpty()) {
//			buff.deleteCharAt(buff.length() - 1);
//	    }
//		if(StringUtils.isNotEmpty(opt)){
//		   buff.append("]");
//		}else{
//			buff.append("]}]");
//		}
//		setJsonString(buff.toString());
//		return SUCCESS;
//	}
	
	/**
	 * 供用户组选择器使用. 根据已有的ID加载选择器中的已选用户组
	 * @author zhangyl
	 * 2012年5月9日 17:34:20
	 */
	public String findbyGroupId() {
		if (groupIdStrs != null && groupIdStrs.length()>0) {
		String[] groupId = groupIdStrs.trim().split(",");
		List<UlUsergroup> appUserList = new ArrayList<UlUsergroup>();
		for (int i = 0; i < groupId.length; i++) {
			UlUsergroup ulUsergroup = ulUsergroupService.get(new Long(groupId[i]));
			appUserList.add(ulUsergroup);
		}

		StringBuffer sb = new StringBuffer("[");
		for (UlUsergroup usergroup : appUserList) {
			if (usergroup.getPkUsergroupId() != null
					&& !usergroup.getPkUsergroupId().equals("")) {
				sb.append("['" + usergroup.getPkUsergroupId()+ "','"
						+ usergroup.getUsergroupName() + "'],");
			}

		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		}
		return SUCCESS;
		
	}
	/**
	 * 启用用户组
	 * 
	 * @return
	 */
	public String start() {
		String retStr = "";
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				UlUsergroup orgUlUsergroup = ulUsergroupService.get(new Long(id));
				if(orgUlUsergroup.getUsergroupLevel() == (long)ENABLE_STATE){
					retStr = "{success:true,message:'此用户组已启用，请核实!'}";
				} 
				else {
					orgUlUsergroup.setUpdateDate(new Date());
					orgUlUsergroup.setUpdateBy(ContextUtil.getCurrentUser().getFamilyName());
					orgUlUsergroup.setUsergroupLevel(new Long(ENABLE_STATE));
					ulUsergroupService.save(orgUlUsergroup);
					retStr = "{success:true,message:'启用成功!'}";
				}
			}
		}

		jsonString = retStr;

		return SUCCESS;
	}
}
