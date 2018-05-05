package com.ulane.base.action.xitong;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.annotation.Resource;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang.StringUtils;
import org.apache.mahout.df.data.Data;
import org.hibernate.Query;

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
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppFunction;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.system.Region;
import com.htsoft.oa.model.system.RegionDetail;
import com.htsoft.oa.service.system.AppRoleService;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.DepartmentService;
import com.htsoft.oa.service.system.IndexDisplayService;
import com.htsoft.oa.service.system.UserSubService;
import com.ulane.base.model.info.QJAddCard;
import com.ulane.base.model.info.QJIssueCard;
import com.ulane.base.model.xitong.Equipment;
import com.ulane.base.model.xitong.UlContactEmpl;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.model.xitong.UlEmployeeEquipment;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.xitong.UlContactEmplService;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.base.service.xitong.UlUsergroupService;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.SysWorkattendance;
import com.ulane.monitor.model.unim.UnimExtension;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
@SuppressWarnings("unused")
public class UlEmployeeAction extends BaseAction {
	@Resource
	private AppUserService appUserService;
	@Resource
	private UlEmployeeService ulEmployeeService;	
	@Resource
	private AppRoleService appRoleService;
	private UlUsergroupService ulUsergroupService;
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
	
	@Resource
	private UlContactEmplService ulContactEmplService;

	private UlEmployee ulEmployee;
	
	private UlContactEmpl ulContactEmpl;

	private AppUser appUser;
	private Long useid;
	private Long depId;
	// 2014/4/3
	private Equipment equipment;
    private  Long EId;
    private Long roleId;
    public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}



	private String equipmentName;
    private String equipmentId;
    
    
	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public String getEquipmentId() {
		return equipmentId;
	}

	public void setEquipmentId(String equipmentId) {
		this.equipmentId = equipmentId;
	}

	public Equipment getEquipment() {
		return equipment;
	}

	public void setEquipment(Equipment equipment) {
		this.equipment = equipment;
	}

	public Long getEId() {
		return EId;
	}

	public void setEId(Long eId) {
		EId = eId;
	}

	public UlContactEmpl getUlContactEmpl() {
		return ulContactEmpl;
	}

	public void setUlContactEmpl(UlContactEmpl ulContactEmpl) {
		this.ulContactEmpl = ulContactEmpl;
	}

	public Long getUseid() {
		return useid;
	}

	public void setUseid(Long useid) {
		this.useid = useid;
	}

	public UlEmployee getUlEmployee() {
		return ulEmployee;
	}

	public void setUlEmployee(UlEmployee ulEmployee) {
		this.ulEmployee = ulEmployee;
	}

	public Long getDepId() {
		return depId;
	}

	public void setDepId(Long depId) {
		this.depId = depId;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("userNo", "asc");
		List<UlEmployee> list = ulEmployeeService.getAll(filter);
		// removeDeleted(list);
		for (UlEmployee u : list) {
			if (u.getParent() != null) {
				UlEmployee parent = ulEmployeeService.get(u.getParent());
				u.setParentName(parent.getFullname());
			}
		}
		// Type type=new TypeToken<List<UlEmployee>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		// Gson gson=new Gson();
		// buff.append(gson.toJson(list, type));
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		buff.append(ser.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String listBook() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("useid", "asc");
		filter.addFilter("Q_status_L_NEQ", UlEmployee.FLAG_DELETED.toString());
		List<UlEmployee> list = ulEmployeeService.getAll(filter);
	
		removeDeleted(list);
		for (UlEmployee u : list) {
			if (u.getParent() != null) {
				UlEmployee parent = ulEmployeeService.get(u.getParent());
				u.setParentName(parent.getFullname());
			}
		}
		// Type type=new TypeToken<List<UlEmployee>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		// Gson gson=new Gson();
		// buff.append(gson.toJson(list, type));
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		buff.append(ser.include("contacts").serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	public String getContact() {
		if (useid == null) {
			return SUCCESS;
		}
		UlEmployee ulEmployee = ulEmployeeService.get(useid);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		Iterator<UlContactEmpl> it = ulEmployee.getContacts().iterator();
		while (it.hasNext()) {
			if (it.next().getDelFlag().equals(Constants.FLAG_DELETED)) {
				it.remove();
			}
		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(ulEmployee.getContacts().size()).append(",result:");

		buff.append(ser.serialize(ulEmployee.getContacts()));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {
		StringBuffer unDelName = new StringBuffer();
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				UlEmployee tmp=ulEmployeeService.get(new Long(id));
				System.out.println("=================tmp"+tmp);
				//UlEmployee tmp = ulEmployeeService.get(Long.parseLong(id));
				//System.out.println("==========================tmp"+tmp);
				QueryFilter qf = new QueryFilter();
				qf.addFilter("Q_ulEmployee.useid_L_EQ", id);
				List<AppUser> rs = appUserService.getAllNoRequest(qf);
			if (rs.size() == 0) {
				    // tmp.setStatus(UlEmployee.FLAG_DELETED.longValue());
				//ulEmployeeService.save(tmp);
				ulEmployeeService.remove(tmp);
			} else {
					unDelName.append(tmp.getFullname() + ",");
			}
			
				
			}
		}
		if (unDelName.length() == 0) {
			jsonString = "{success:true}";
		} else {
			String data = unDelName.substring(0, unDelName.length() - 1);
			//System.out.println("===============data"+data);
			jsonString = "{success:false,data:'" + data + "'}";
		}

		return SUCCESS;
	}

	/**
	 * 批量启用
	 * 
	 * @return
	 */
	public String multiEnable() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				UlEmployee tmp = ulEmployeeService.get(Long.parseLong(id));
				// tmp.setStatus(UlEmployee.FLAG_ENABLED.longValue());
				ulEmployeeService.save(tmp);
			}
		}
		jsonString = "{success:true}";
		return SUCCESS;
	}
	
//删除
	public String multiDelContact() {
		String[] ids = getRequest().getParameterValues("ids");
		System.out.println("======ids"+ids);
		if (ids != null) {
			for (String id : ids) {
				UlContactEmpl tmp = ulContactEmplService
						.get(Long.parseLong(id));
				System.out.println("==================tmp"+tmp);
				//tmp.setDelFlag(Constants.FLAG_DELETED);
				//ulContactEmplService.save(tmp);
			ulContactEmplService.remove(tmp);
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
	
	/*
	 * 删除员工2014/3/26
	 * nk
	 * */
     @SuppressWarnings("unchecked")
	public String multidelete() {
		StringBuffer unDelName = new StringBuffer();
		String[] ids = getRequest().getParameterValues("ids");
		String str = "";
		List<AppUser> appuser = new ArrayList<AppUser>();// 对应多少个用户
		List ides = new ArrayList();// 对应员工的id
		// 1.如果员工档案信息和用户管理信息之间没有任何的关联关系，就直接删除
		if (ids != null) {
			for (String id : ids) {
				ides.add(id);
				UlEmployee tmp = ulEmployeeService.get(new Long(id));
				QueryFilter qf = new QueryFilter();
				qf.addFilter("Q_ulEmployee.useid_L_EQ", id);
				List<AppUser> rs = appUserService.getAllNoRequest(qf);
				// 判断用户与员工之间是否存在关联关系
				if (rs.size() == 0) {// 员工和用户直接没有关联关系
					System.out.println("员工和用户直接没有关联关系！");
					str += "YesAu@ul";
					//ulEmployeeService.remove(tmp);
				} else if (rs.size() != 0) {
					// 一、删除员工信息，判断用户的状态是正常或未启用状态，就不删除，否则就删除
					// 1)首先查询用户
					List<AppUser> app = ulEmployeeService.selectSome(new Long(
							id));
					appuser.addAll(app);
					for (int i = 0; i < app.size(); i++) {
						if (app.get(i).getStatus() == 1
								|| app.get(i).getStatus() == 0) {
							str += "NoAu@ul";// 不删除
							unDelName.append(tmp.getFullname() + ",");
							//System.out.println("3=不删除=="
									//+ app.get(i).getStatus());
						} else {

							//
							str += "YesAu@ul";// 删除
							//System.out.println("4删除###########"
									//+ app.get(i).getStatus());

						}

					}

				}
				// 				
				if (unDelName.length() == 0) {

					System.out.println("用户处于停用或注销状态");
					jsonString = "{success:true}";
				} else {
					String data = unDelName
							.substring(0, unDelName.length() - 1);
					System.out.println("===============data" + data);
					System.out.println("用户处于正常或者为启用状态，请删除其他状态的员工信息");
					jsonString = "{success:false,data:'" + data + "'}";
				}

			}
			System.out.println("<<<<OK");
			System.out.println("><>>>>>>>>" + ids.length);
			// System.out.println("用户：");
			System.out.println("><>>>list>>>>>" + appuser.size());
			System.out.println("><>>>list222>>>>>" + ides.size());
			System.out.println(".....str" + str);
			if (str.indexOf("NoAu@ul") >= 0) {

				System.out.println("不  删除  ");
			} else {
				for (int i = 0; i < ids.length; i++) {
					ulEmployeeService.getUpdateDelAppUser(useid);
					// ulEmployeeService.update(appuser.get(i)); //删除用户
					ulEmployeeService.remove(new Long(ides.get(i).toString())); // 删除员工
					// System.out.println(">>>>>>>>>"+au.getStatus());
					
				}
			}

		}

		return SUCCESS;
	}


	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		UlEmployee ulEmployee = ulEmployeeService.get(useid);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		if (ulEmployee.getParent() != null)
			ulEmployee.setParentName(ulEmployeeService.get(
					ulEmployee.getParent()).getFullname());
		// Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		// try {
		// BeanInfo beaninfo = java.beans.Introspector
		// .getBeanInfo(UlEmployee.class);
		// String[] fields = new
		// String[beaninfo.getPropertyDescriptors().length];
		// for (PropertyDescriptor pd : beaninfo.getPropertyDescriptors()) {
		// int i = 0;
		// if (pd.getName().equals("parentEmp")
		// || pd.getName().equals("ulDepartment")) {
		// fields[i] = pd.getName() + ".*";
		// } else {
		// fields[i] = pd.getName();
		// }
		// System.out.println("add --" + fields[i]);
		// i++;
		// }
		// ser.include(fields).exclude("*");
		// } catch (IntrospectionException e) {
		// }
		// ser.include("useid", "alias", "birthday", "biyeyuanxiao",
		// "education",
		// "email", "fullname", "gongzuodiDiqu", "gongzuodiGuojia",
		// "gongzuodiSheng", "gongzuodiShi", "hetongdaoqishijian",
		// "hujiDiqu", "hujiGuojia", "hujiSheng", "hujiShi", "note",
		// "parentEmp.*", // "ruzhifangshi", "sex", "status", "type",
		// "zhiji", "zhiwei", "zhuanzhengshijian", "ulDepartment.*")
		// .exclude("*");
		ser.transform(new DateTransformer("yyyy-MM-dd"), "zhuanzhengshijian");
		ser.transform(new DateTransformer("yyyy-MM-dd"), "birthday");
		ser.transform(new DateTransformer("yyyy-MM-dd"), "hetongdaoqishijian");
		ser.transform(new DateTransformer("yyyy-MM-dd"), "ruzhishijian");
		StringBuffer sb = new StringBuffer("{success:true,data:");
		//System.out.println("====sb"+sb);
		sb.append(ser.serialize(ulEmployee));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String save() {
		String details = getRequest().getParameter("details");
		String bankname = getRequest().getParameter("bankname");
		String bankTypeId = getRequest().getParameter("bankTypeId");
		String phone = getRequest().getParameter("phone");
		String idcard = getRequest().getParameter("idcard");
		System.out.println("============details"+details);
		System.out.println("=[UlEmployeeAction]===========bankname"+bankname);
		System.out.println("============bankTypeId"+bankTypeId);
		if (StringUtils.isNotEmpty(details)) {
			Gson gson = new Gson();
			UlContactEmpl[] detailArr = (UlContactEmpl[]) gson.fromJson(
					details, UlContactEmpl[].class);
			ulEmployee.getContacts().clear();
			if (detailArr != null) {
				for (UlContactEmpl detail : detailArr) {
					detail.setUlEmployee(ulEmployee);
					detail.setDelFlag(Constants.FLAG_UNDELETED);
					ulEmployee.addContact(detail);
				}
			}
		}
        if(StringUtils.isNotEmpty(bankname)){
        	ulEmployee.setBankname(bankname);
        }
        if(StringUtils.isNotEmpty(bankTypeId)){
        	ulEmployee.setBankTypeId(new Long(bankTypeId));
        }
        if(StringUtils.isNotEmpty(phone)){
        	ulEmployee.setPhone(phone);
        }
        if(StringUtils.isNotEmpty(idcard)){
        	ulEmployee.setIdcard(idcard);
        }
		if (ulEmployee.getUseid() == null) {
			// ulEmployee.setStatus(UlEmployee.FLAG_DISABLED.longValue());
			ulEmployeeService.save(ulEmployee);
			
			
		} else {
			// UlEmployee orgUlEmployee =
			// ulEmployeeService.get(ulEmployee.getUseid());
			// try {
			// BeanUtil.copyNotNullProperties(orgUlEmployee,ulEmployee);
			// } catch (IllegalAccessException e) {
			// e.printStackTrace();
			// } catch (InvocationTargetException e) {
			// e.printStackTrace();
			// }
			// for(UlContactEmpl tmp : rs){
			// orgUlEmployee.getContacts().clear();
			// orgUlEmployee.addContact(tmp);
			// }
			// ulEmployeeService.remove(ulEmployee);
			ulEmployeeService.merge(ulEmployee);
			QueryFilter qf = new QueryFilter();
			Long id = ulEmployee.getUseid();
			qf.addFilter("Q_ulEmployee.useid_L_EQ", id.toString());
			List<AppUser> rs = appUserService.getAllNoRequest(qf);
			for (AppUser tmp : rs) {
				tmp.setFullname(ulEmployee.getFullname());
				appUserService.save(tmp);
			}
			// //数据库中已有的子集
			// List<UlContactEmpl> con_db = ulContactEmplService.getAllByUseid(
			// ulEmployee.getUseid());
			// //页面提交过来的子集
			// Set<UlContactEmpl> con_page = ulEmployee.getContacts();
			// for(UlContactEmpl tmp_db : con_db){
			// boolean have = false;
			// if(!con_page.isEmpty()){
			// for(UlContactEmpl ulContactDep : con_page){
			// ulContactEmplService.save(ulContactDep);
			// if(tmp_db.getContactEmplId().equals(
			// ulContactDep.getContactEmplId())){
			// have = true;
			// }
			// }
			// }
			// if(!have){
			// tmp_db.setDelFlag(Constants.FLAG_DELETED);
			// ulEmployee.getContacts().add(tmp_db);
			// }
			// // waulContactDepService.save(tmp_db);
			// }
			// UlDepartment orgUlDepartment = new UlDepartment();
			// BeanUtil.copyNotNullProperties(orgUlDepartment,ulDepartment);

			// ulEmployeeService.save(ulEmployee);
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	public String selects() {
		//System.out.println("aaaaaa");
		PagingBean pb = getInitPagingBean();
		List<UlEmployee> list = new ArrayList<UlEmployee>();
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("userNo", "asc");
		// filter
		// .addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED
		// .toString());
		// query appuser

		list = ulEmployeeService.getAll(filter);
		// 员工所属部门
		for (UlEmployee employee : list) {
			UlDepartment dep = ulDepartmentService.get(employee
					.getUlDepartment().getDepid());
			employee.setDeptName(dep.getDepname());
		}

//		pb.setTotalItems(list.size());
		int count = ulEmployeeService.getEmployeeCount();
		// removeDeleted(list);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "accessionTime" });
		buff.append(serializer.exclude(new String[] { "password" }).serialize(
				list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 根据组织机构查询
	 * 
	 * @return
	 */
	public String select() {
		PagingBean pb = getInitPagingBean();
		String strDepId = getRequest().getParameter("depId");
		// 表示从上级目录开始进行查找
		String path = "0.";
		appUser = ContextUtil.getCurrentUser();
		AppUser appUsers = appUserService.get(appUser.getUserId());
		if (appUsers.getUlEmployee() != null) {
			ulEmployee = ulEmployeeService.get(new Long(appUsers
					.getUlEmployee().getUseid()));
		}

		if (StringUtils.isNotEmpty(strDepId)) {
			Long depId = Long.parseLong(strDepId);
			UlDepartment dep = ulDepartmentService.get(depId);
			if (dep != null) {
				path = dep.getPath();
			}
		} else if (ulEmployee != null) {
			UlDepartment dep = ulEmployee.getUlDepartment();
			if (dep != null) {
				path = dep.getPath();
			}
		}
		List<UlEmployee> list = ulEmployeeService.findByDepartment(path, pb);

		List<UlEmployee> list1 = new ArrayList<UlEmployee>();
		for (UlEmployee e : list) {
			try {
				UlEmployee ulEmployee = new UlEmployee();
				BeanUtil.copyNotNullProperties(ulEmployee, e);
				list1.add(ulEmployee);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		// removeDeleted(list1);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':");
		buff.append(pb.getPageSize());
		buff.append(",result:");
		
//		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
//		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "accessionTime" });
		buff.append(serializer.exclude(
				new String[] { "password", "ulDepartment" }).serialize(list1));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 在线员工
	 * 
	 * @return
	 */
	public String online() {
		Map<String, OnlineUser> onlineUsers = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByDep = new HashMap<String, OnlineUser>();

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

		Type type = new TypeToken<java.util.Collection<OnlineUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(onlineUsers.size()).append(",result:");

		Gson gson = new Gson();
		if (depId != null) {
			buff.append(gson.toJson(onlineUsersByDep.values(), type));
		} else {
			buff.append(gson.toJson(onlineUsers.values(), type));
		}
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 将list中的已标记删除的节点去掉
	 * 
	 * @param list
	 * @return
	 */
	public void removeDeleted(List<UlEmployee> list) {
		Iterator<UlEmployee> i_list = list.iterator();
		while (i_list.hasNext()) {
			if (i_list.next().getStatus()
					.equals(UlEmployee.FLAG_DELETED.longValue()))
				i_list.remove();
		}
	}

	/**
	 * lq
	 * @return
	 */
	public String contacts() {
		String ueid = getRequest().getParameter("employeeid");
		if (StringUtils.isNotEmpty(ueid)) {
			UlEmployee ue = ulEmployeeService.get(Long.parseLong(ueid));
			Set ss = ue.getContacts();
			List<UlEmployee> uelist = new ArrayList<UlEmployee>();
			// for(int i=0;i< ss.size();i++){
			// uelist.add();
			// }
			uelist = new ArrayList<UlEmployee>(ss);
			StringBuffer childlistSB = new StringBuffer("{success:true,data:");
			JSONSerializer jsonserializer = new JSONSerializer();
			jsonserializer.transform(new DateTransformer("yyyy-MM-dd"),
					new String[] {});
			childlistSB.append(jsonserializer.serialize(uelist));
			childlistSB.append("}");
			jsonString = childlistSB.toString();
		}
		return SUCCESS;
	}
	
	
	
	/*
	 * 2014_4_2  设备管理的增删改查
	 *1.设备管理，显示列表，判断equipmentId和equipmentName是否为空，
	 *2 若为空查询全部的列表   2014/4/23修改 nk
	 *3若不为空，根据条件查询 
	 * */
	
	
	
public String list4() {
		
		Integer start = 0;
		Integer limit = PagingBean.DEFAULT_PAGE_SIZE;

		String s_start = getRequest().getParameter("start");
		
		String s_limit = getRequest().getParameter("limit");
		System.out.println("===s_start"+s_start+"==========="+s_limit);
		if (StringUtils.isNotEmpty(s_start)) {
			start = new Integer(s_start);
		}
		if (StringUtils.isNotEmpty(s_limit)) {
			limit = new Integer(s_limit);
		}
		
		this.pagingBean = new PagingBean(start, limit);
		
		String equipmentId = getRequest().getParameter("id");
		String equipmentName = getRequest().getParameter("name");
		System.out.println("id=" + equipmentId + "name=" + equipmentName);
		if (equipmentId==null && equipmentName==null) {
			List<Equipment> list = ulEmployeeService.getShowEquipment();
			System.out.println(">>>>>>>All=========list" + list);
			StringBuffer buff = new StringBuffer("[");
			for (int i = 0; i < list.size(); i++) {
				buff.append("[").append(
						"" + list.get(i).getEId() + ",'"
								+ list.get(i).getEquipmentId() + "','"
								+ list.get(i).getEquipmentName() + "'],");

			}

			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			System.out.println("buff----" + buff);
			setJsonString(buff.toString());
			System.out.println("list=" + list.size());

		}else{
			/*
			 * 条件查询
			 * 当equipmentId,equipmentName为空，
			 * 查询所有的，
			 * 当不为空的时候 条件查询
			 * */
			if(equipmentId!="" || equipmentName!=""){
//			if(equipmentId!=null || equipmentName!=null){
			List<Equipment> list = ulEmployeeService.getShowEquipment(equipmentId, equipmentName);
			System.out.println(">>>>>>>>>>>>>list" + list);
			StringBuffer buff = new StringBuffer("[");
			for (int i = 0; i < list.size(); i++) {
				buff.append("[").append(
						"" + list.get(i).getEId() + ",'"
								+ list.get(i).getEquipmentId() + "','"
								+ list.get(i).getEquipmentName() + "'],");

			}

			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			System.out.println("buff----" + buff);
			setJsonString(buff.toString());
			System.out.println("list=" + list.size());
			
		}else{
			
			List<Equipment> list = ulEmployeeService.getShowEquipment();
			System.out.println(">>>>>>>All=========list" + list);
			StringBuffer buff = new StringBuffer("[");
			for (int i = 0; i < list.size(); i++) {
				buff.append("[").append(
						"" + list.get(i).getEId() + ",'"
								+ list.get(i).getEquipmentId() + "','"
								+ list.get(i).getEquipmentName() + "'],");

			}

			if (list.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			buff.append("]");
			System.out.println("buff----" + buff);
			setJsonString(buff.toString());
			System.out.println("list=" + list.size());
			
			
			
		}
		}
		return SUCCESS;

	}
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 批量删除 和单条记录的删除
	 * @return
	 */
public String multiDel3() {
        
		String[] Ids = getRequest().getParameterValues("ids");
		System.out.println("=============ids"+Ids.toString());
		 Equipment eq=new Equipment();
		if (Ids != null) {
			for (String id : Ids) {
				//String EId = null;
				System.out.println("==================Eid"+id);
				
				ulEmployeeService.getDelEquipement(new Long(id));
			
				System.out.println("<<<<OK");
			}
		}
        
		jsonString = "{success:true}";

		return SUCCESS;
	}

/**
 * 设备管理 的删除，判断是否有关连，有的不删除，没有
 * 
 * */
public String equipmentMultiDel() {
    String equipmentId=getRequest().getParameter("equipmentId");
    System.out.println("package com.ulane.base.action.xitong.UlEmployeeAction.java equipmentId="+equipmentId);
	String[] Ids = getRequest().getParameterValues("ids");
	System.out.println("=============ids"+Ids.toString());
	 Equipment eq=new Equipment();
	 String str="";
	if (Ids != null) {
		for (String id : Ids) {
		
			System.out.println("==================Eid"+id);
			
					ulEmployeeService.getDelEquipement(new Long(id));
				//}
			//}
			
		
		
			System.out.println("<<<<OK");
		}
	}
    
	jsonString = "{success:true}";

	return SUCCESS;
}






/**
 * 添加设备管理2014-4-15修改
 */
public String save4(){
	String equipmentName=getRequest().getParameter("name");
  
	String equipmentId=getRequest().getParameter("id");
	// 添加设备的时候，网点名称不能重复，机具号也不能呢过重复
	// 1 根据Eid查询出网点名称和机具号，与添加的进行比较，如果重复，就不让添加
		ulEmployeeService.addEquipment(equipmentName, equipmentId);
	 setJsonString("{success:true}");
	 return SUCCESS;
	
}


/**
 * 添加设备管理2014-4-15修改
 */
public String save3(){
	
	
	// 添加设备的时候，网点名称不能重复，机具号也不能呢过重复
	// 1 根据Eid查询出网点名称和机具号，与添加的进行比较，如果重复，就不让添加
	 String newname=getRequest().getParameter("name");
	    //System.out.println("《《《《《《《《equipmentName"+equipmentName);
	 String newId=getRequest().getParameter("id");
	 List<Equipment> list=ulEmployeeService.getShowEquipment();
	 int flag=0;
	 
	 for(int i=0;i<list.size();i++){
		 if(newId.equals("") || newId.equals(list.get(i).getEquipmentId())){
			 System.err.println("您添加机具号重复，请重新输入");
			 flag=flag+1;
			 //("{success:false}");
		 }
	 }
	 //setJsonString("{success:false}");
		 System.out.println(">>>>>>>>>flag"+flag);
		if(newId!="" && newname!="" && flag==0){
	      ulEmployeeService.addEquipment(newname, newId);
			
		}
	 
		
		if(newId!="" && newname!="" && flag==0){
			jsonString = "{success:true}";
		} else {
			jsonString = "{success:false}";
		}
	 return SUCCESS;
	
}

/**E
 * 显示详细信息
 * @return
 */
public String get3(){
    UlEmployee equipment=ulEmployeeService.get(EId);
	Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
	//将数据转成JSON格式
	StringBuffer sb = new StringBuffer("{success:true,data:");
	sb.append(gson.toJson(equipment));
	sb.append("}");
	setJsonString(sb.toString());
	
	return SUCCESS;
}


/*
 * 2014-4-11修改设备管理*/
public String check3(){
	Long EId=Long.parseLong(getRequest().getParameter("EId"));
	//System.out.println("...........EId"+EId);
	String equipmentName=getRequest().getParameter("name");
	//System.out.println("equipmentName"+equipmentName);
	String equipmentId=getRequest().getParameter("id");
		if(equipmentId!="" && equipmentName!=""){
			ulEmployeeService.updateEquipment(EId, equipmentId, equipmentName);
	    // ulEmployeeService.addEquipment(newname, newId);
	     //setJsonString("{success:true}");
		}	 
//	
//	
		if(equipmentId!="" && equipmentName!=""){
			jsonString = "{success:true}";
		} else {
			jsonString = "{success:false}";
		}
		
	return SUCCESS;
}



//==============================================================================设备管理修改
/**
 * 2014 /11/2	设备管理* 
 * 1 带条件的查询（怎么判断条件
 * a 条件为null或"" ,查询所有，b 条件不为null，条件查询）
 * 2 查询所有
 * 需要显示分页： 开始（） 结束
 * 查询总数count,(条件查询或查询所有)
 * @anthor nk 
 * */

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




public String listEquipment(){
	
	String suoshuhang = getRequest().getParameter("suoshuhang"); 
	String branchId = getRequest().getParameter("branchId"); 
	String operatorId = getRequest().getParameter("operatorId");
	System.out.println("====="+suoshuhang+branchId+operatorId);
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
	int  count=0;//查询记录的总数
	List<Equipment> list= new ArrayList<Equipment>();
		//查询总数
		System.out.println("==---if  ----- 查询所有====");
		list =ulEmployeeService.listEquipment(start, limit, suoshuhang, branchId, operatorId);
		count=ulEmployeeService.listEquipmentCount(suoshuhang, branchId, operatorId);
		System.out.println("=======count"+count);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(count).append(",result:[");
         for (int i = 0; i < list.size(); i++) {
	       if(list.get(i).getEId()!=null && !"".equals(list.get(i).getEId())){
	    	   buff.append("[").append( "" + list.get(i).getEId()+",") ;
	       }else{
	    	   buff.append("[").append( "" + ",");//是为了防止数据库中取出来的值为null
	       }
	       if(list.get(i).getBankTypeId()!=null && !"".equals(list.get(i).getBankTypeId())){
	    	   buff.append(list.get(i).getBankTypeId()+",") ;
	       }else{
	    	   buff.append(",") ;//是为了防止数据库中取出来的值为null
	       }
	       if(list.get(i).getParentId()!=null && !"".equals(list.get(i).getParentId())){
	    	   buff.append(list.get(i).getParentId()+",'") ;
	       }else{
	    	   buff.append(""+ ",'") ;//是为了防止数据库中取出来的值为null
	       }
	       if(list.get(i).getEquipmentId()!=null && !"".equals(list.get(i).getEquipmentId())){
	    	   buff.append(list.get(i).getEquipmentId()+"','") ;
	       }else{
	    	   buff.append(""+ "','") ;
	       }
	       if(list.get(i).getBranchId()!=null && !"".equals(list.get(i).getBranchId())){
	    	   buff.append(list.get(i).getBranchId() + "','");
	       }else{
	    	   buff.append(""+ "','") ;
	       }
	       if(list.get(i).getEquipmentName()!=null && !"".equals(list.get(i).getEquipmentName())){
	    	   buff.append(list.get(i).getEquipmentName() + "','");
	       }else{
	    	   buff.append(""+ "','") ;
	       }
	       
	       if(list.get(i).getBankname()!=null && !"".equals(list.get(i).getBankname())){
	    	   buff.append(list.get(i).getBankname() + "','");
	       }else{
	    	   buff.append(""+ "','") ;
	       }
	       if(list.get(i).getParentName()!=null && !"".equals(list.get(i).getParentName())){
	    	   buff.append(list.get(i).getParentName() + "','");
	       }else{
	    	   buff.append(""+ "','") ;
	       }
	       if(list.get(i).getOperatorId()!=null && !"".equals(list.get(i).getOperatorId())){
	    	   buff.append(list.get(i).getOperatorId() + "','");
	       }else{
	    	   buff.append(""+ "','") ;
	       }
	       if(list.get(i).getCurdate()!=null && !"".equals(list.get(i).getCurdate())){
	    	   buff.append(list.get(i).getCurdate() + "','");
	       }else{
	    	   buff.append(""+ "','") ;
	       }
	       if(list.get(i).getIpAddress()!=null && !"".equals(list.get(i).getIpAddress())){
	    	   buff.append(list.get(i).getIpAddress() + "','");
	       }else{
	    	   buff.append(""+ "','") ;
	       }
	       if(list.get(i).getAddress()!=null && !"".equals(list.get(i).getAddress())){
	    	   buff.append(list.get(i).getAddress() + "'],");
	       }else{
	    	   buff.append(""+ "'],") ;
	       }
	     
         }

          if (list.size() > 0) {
	        buff.deleteCharAt(buff.length() - 1);
          }
            buff.append("]}");
			System.out.println("buff----" + buff);
			setJsonString(buff.toString());
			System.out.println("list=" + list.size());
	       this.pagingBean = new PagingBean(start, limit);
	return SUCCESS;
}

	/**
	 * 添加及保存操作
	 */
	public String addlistEquipment() {
		// 添加设备的时候，网点名称不能重复，机具号也不能呢过重复
		// 1 根据Eid查询出网点名称和机具号，与添加的进行比较，如果重复，就不让添加
		String equipmentId = getRequest().getParameter("equipmentId");
		String operatorId = getRequest().getParameter("operatorId");
		String equipmentName = getRequest().getParameter("equipmentName");
		String branchId = getRequest().getParameter("branchId");
		String curdate = getRequest().getParameter("curdate");
		String bankTypeId = getRequest().getParameter("bankTypeId");
		String bankTypeName = getRequest().getParameter("bankTypeName");
		String parentName = getRequest().getParameter("parentName");
		String ip = getRequest().getParameter("ip");
		String parentId = getRequest().getParameter("parentId");
		String address = getRequest().getParameter("address");
		String UlEmpEquip = getRequest().getParameter("UlEmpEquip");
		String useid = getRequest().getParameter("useid");
		System.out.println("[UlEmployeeAction] 调用：-addlistEquipment()"+"equipmentId :"+equipmentId+"operatorId :"+operatorId+"branchId:"+branchId
				+"curdate: "+curdate+"bankTypeId :"+bankTypeId+" bankTypeName:"+bankTypeName+"parentName: "+parentName+"ip:"+ip
				+"parentId :"+parentId+"address"+address+" UlEmpEquip:"+UlEmpEquip+"useid: "+useid);
		 List<Equipment> list=ulEmployeeService.getShowEquipment();
		 int equipmentIdflag=0;
		 int operatorIdFlag=1;
		 int ipFlag=2;
		 for(int i=0;i<list.size();i++){
			 if(equipmentId.equals("") || equipmentId.equals(list.get(i).getEquipmentId())){
				 System.err.println("您添加机具号重复，请重新输入");
				 equipmentIdflag=equipmentIdflag+1;
				 System.out.println("equipmentId="+equipmentIdflag);
				 //("{success:false}");
			 }
			 if(operatorId.equals("") || operatorId.equals(list.get(i).getOperatorId())){
				 System.err.println("您添加柜员号重复，请重新输入");
				 operatorIdFlag=operatorIdFlag+1;
				 System.out.println("operatorId="+operatorId);
			 }
			 if(ip.equals("") || ip.equals(list.get(i).getIpAddress())){
				 System.err.println("您添加ip重复，请重新输入");
				 ipFlag=ipFlag+1;
				 System.out.println("ip="+ipFlag);
			 }
			 
		 }
			
		 if(equipmentId != "" && equipmentName != ""&& equipmentIdflag==0 && operatorIdFlag==1 && ipFlag==2){
		     // ulEmployeeService.addEquipment(newname, newId);
			 //ulEmployeeService.addlistEquipment(equipmentId, operatorId, equipmentName, branchId, curdate, bankTypeId, bankTypeName, ip, parentId,address);
			 ulEmployeeService.addlistEquipment(equipmentId, operatorId, equipmentName, branchId, curdate, bankTypeId, bankTypeName, ip, parentId, address, parentName)	;
			 String[] UlEmpEquips=UlEmpEquip.split(",");
			 String [] useids=useid.split(",");
			   if(StringUtils.isNotEmpty(UlEmpEquip)){ 
			         
				   for(int i=0;i<UlEmpEquips.length;i++){
					   System.err.println("list[i]"+UlEmpEquips[i]+useid);
					   Equipment  eid= ulEmployeeService.getByEquipmentId(equipmentId);
					   System.out.println("设备编号：eid"+eid.getEId());
					   ulEmployeeService.EquipmentUlEmployeesave(UlEmpEquips[i], operatorId, eid.getEId(),equipmentId,new Long (useids[i]));
					   System.out.println("支行操作员时，往员工与设备关系表中插入数据成功");
				   }
			   }
	      }
		 
		 
		 
		 System.out.println("=================" + bankTypeName + bankTypeId
				+ curdate + branchId + equipmentName + operatorId + equipmentId + ip+parentId);
		 
		 if(equipmentId != "" && operatorId!="" && ip!=""){//都不为null
			 //不为空之后，进行判断数据库是否存在当前字段值
			 //总共俩中情况：1 (都不重复)->成功     2(有任意一个重复)失败
			 //再判断具体的哪一个重复，用变量标记重复的属性，传给前台， 前台再进行判断输出相应内容
			System.out.println("======equipmentIdflag======"+equipmentIdflag+"   branchIdFlag="+operatorIdFlag + "   ipFlag="+ipFlag);
		 	String str1 = "";
		 	String str2 = "";
		 	String str3 = "";
		 	String str="";
		 	//String str1="";
		 	if(equipmentIdflag == 0 && operatorIdFlag == 1 && ipFlag == 2){//三个都重复-----反例：三个都不重复
		 		System.out.println("11111111" );
		 		jsonString = "{success:true}";
		 	} else{//任意一个重复
		 		System.out.println("22222222" );// 
		 		
			 	if(equipmentIdflag!=0){
			 		System.out.println("equipmentIdflag" );
			 		str="0";
					jsonString = "{success:"+str+"}";
				}else if(operatorIdFlag!=1){
					str="8";
					jsonString = "{success:"+str+"}";
				}else if(ipFlag!=2){
					str="2";
					jsonString = "{success:"+str+"}";
			    }else if(ipFlag!=2 && operatorIdFlag!=1 && equipmentIdflag!=0){
					str="4";
					jsonString = "{success:"+str+"}";
				}else if(ipFlag!=2&& equipmentIdflag!=0){//ip 机具号
					str="5";
					jsonString = "{success:"+str+"}";
				}else if(operatorIdFlag!=1 && equipmentIdflag!=0){//网点号 机具号
					str="6";
					jsonString = "{success:"+str+"}";
				}else if(ipFlag!=2 && operatorIdFlag!=1){//ip 网点号 
					str="7";
					jsonString = "{success:"+str+"}";
				}
				
				
				
				//jsonString = "{success:"+str1+str2+str3+"}";
		 	}
		 }else {//为null
			 //如果有任意一个为空值，就统一告诉坐席，哪3项不能为空
			 System.out.println("33333333");
			 System.out.println("给予前台提示信息：带*机具号、网点号、IP地址均不能为空，请确认！");
//			 if (equipmentIdflag==0 && branchIdFlag==1 && ipFlag==2) {
//				 System.out.println("444444444");
//				   jsonString = "{success:true}";
//			 } else {
//				 System.out.println("55555555555");
//				  jsonString = "{success:false}";
//			 }
			
			 jsonString = "{success:false}";  //表示为空
		 }
		return SUCCESS;
	}

	public String isRepeat() {
		String equipmentId = getRequest().getParameter("deviceId");
		if (StringUtils.isNotBlank(equipmentId)) {
			 List<Equipment> list=ulEmployeeService.getShowEquipment();
			 int flag=0;
			 
			 for(int i=0;i<list.size();i++){
				 if(equipmentId.equals("") || equipmentId.equals(list.get(i).getEquipmentId())){
					 System.err.println("您添加机具号重复，请重新输入");
					 flag=flag+1;
				 }
			 }
			if (list.size() > 0 && flag==0) {
				setJsonString("{success:true}");
				return SUCCESS;
			}
		}
		setJsonString("{success:false}");
		return SUCCESS;
	}


	
	

	/**
	 * 批量删除 和单条记录的删除
	 * @return
	 */
public String multiDelEquipment() {
        
		String[] Ids = getRequest().getParameterValues("ids");
		System.out.println("=============ids"+Ids.toString());
		 Equipment eq=new Equipment();
		if (Ids != null) {
			for (String id : Ids) {
				//String EId = null;
				System.out.println("==================Eid"+id);
				
				ulEmployeeService.getDelEquipement(new Long(id));
				ulEmployeeService.getDelteEquip(new Long(id));
				System.out.println("<<<<OK");
			}
		}
        
		jsonString = "{success:true}";

		return SUCCESS;
	}

	
/*
 * 2014-4-11修改设备管理*/
public String updatelistEquipment(){
		Long EId=Long.parseLong(getRequest().getParameter("EId"));
		String equipmentId = getRequest().getParameter("equipmentId");
		String operatorId = getRequest().getParameter("operatorId");
		String equipmentName = getRequest().getParameter("equipmentName");
		String branchId = getRequest().getParameter("branchId");
		String curdate = getRequest().getParameter("curdate");
		Long bankTypeId = Long.parseLong(getRequest().getParameter("bankTypeId"));
		//String bankTypeId = getRequest().getParameter("bankTypeId");
		String bankTypeName = getRequest().getParameter("bankTypeName");
		String parentName = getRequest().getParameter("parentName");
		String ip = getRequest().getParameter("ip");
		Long parentId = Long.parseLong(getRequest().getParameter("parentId"));
		String UlEmpEquip = getRequest().getParameter("UlEmpEquip");
		String address = getRequest().getParameter("address");
		String useid = getRequest().getParameter("useid");
		System.out.println("[UlEmployeeAction] 调用：updatelistEquipment()" + "EId ~"+EId+"equipmentId ~"+equipmentId+"equipmentName ~"
				+equipmentName+"branchId ~"+branchId+" curdate~"+curdate+"parentName~"+parentName+ "ip~"+ ip+"parentId"+parentId+"UlEmpEquip~"+UlEmpEquip
				+"address ~"+address+" useid~"+useid);
		ulEmployeeService.updatelistEquipment(EId, equipmentId, operatorId, equipmentName, branchId, curdate, bankTypeId, bankTypeName, ip, parentId, address, parentName);
		String[] UlEmpEquips=UlEmpEquip.split(",");
		 String [] useids=useid.split(",");
		  ulEmployeeService.getDelteEquip(EId);//先删除原来设备与员工的关联关系，在进行修改
		   if(StringUtils.isNotEmpty(UlEmpEquip)){        
			  
			   for(int i=0;i<UlEmpEquips.length;i++){
				   System.err.println("list[i]"+UlEmpEquips[i]+useid);
				  // Equipment  eid= ulEmployeeService.getByEquipmentId(equipmentId);
				   //System.out.println("设备编号：eid"+eid.getEId());
				  // ulEmployeeService.EquipmentUlEmployeesave(UlEmpEquips[i], operatorId,EId,equipmentId);
				   ulEmployeeService.EquipmentUlEmployeesave(UlEmpEquips[i],operatorId,EId,equipmentId,new Long(useids[i]));
				   System.out.println("支行操作员时，往员工与设备关系表中插入数据成功");
			   }
		   }else{
			   
		   }
		
		if(equipmentId!="" && equipmentName!=""){
				jsonString = "{success:true}";
		} else {
				jsonString = "{success:false}";
		}
		
	return SUCCESS;
}

	
/********************************************************************************************************/

				/**
				 * 显示角色名称列表
				 */
				public String getRoleName() {
					List<AppRole> list = null;
					StringBuffer buff = new StringBuffer("[");
					if (roleId != null) {
						// System.out.println("===============if");
						list = ulEmployeeService.getRoleName();
						if (list.size() > 0) {
							for (AppRole r : list) {
								buff.append("['" + r.getRoleId() + "','"
										+ r.getRoleName() + "'],");
							}
						}
					}else {
						list = ulEmployeeService.getRoleName();
						if (list.size() > 0) {
							for (AppRole r : list) {
								buff.append("['" + r.getRoleId() + "','"
										+ r.getRoleName() + "'],");
							}
					    }
					}
					buff.deleteCharAt(buff.length() - 1);
					buff.append("]");
					System.out.println("[ulEmployeeAction.java] - buff : " + buff);
					setJsonString(buff.toString());
					System.out.println("[ulEmployeeAction.java] - list.size()=" + list.size());
					return SUCCESS;
				}
					
	
		/**===修改员工档案信息**/	
				
				public String UlemployeeSave() {
					String useid = getRequest().getParameter("useid");
					String fullname = getRequest().getParameter("fullname");
					String sex = getRequest().getParameter("sex");
					String zhiwei = getRequest().getParameter("zhiwei");
					String userNo = getRequest().getParameter("userNo");
					String bankTypeId = getRequest().getParameter("bankTypeId");
					String bankTypeName = getRequest().getParameter("bankname");
					String phone = getRequest().getParameter("phone");
					String idcard = getRequest().getParameter("idcard");
					String photo = getRequest().getParameter("photo");
					System.out.println("============details"+fullname);
					System.out.println("=[UlEmployeeAction]===========bankname"+fullname+"~"+sex+"~"+zhiwei+"~"+photo);
					System.out.println("==useid:"+useid+"~sex:"+sex+"~userNo:"+userNo+"~fullname:"+fullname+"~bankTypeId:"+
										bankTypeId+"~bankTypeName:"+bankTypeName+"~phone:"+phone+"~idcard:"+idcard);
					UlEmployee ule=new UlEmployee();
					AppUser app=new AppUser();
			        if(StringUtils.isNotEmpty(fullname)){
			        	ule.setFullname(fullname);
			        }
			        if(StringUtils.isNotEmpty(sex)){
			        	ule.setSex(new Long(sex));
			        }
			        if(StringUtils.isNotEmpty(zhiwei)){
			        	ule.setZhiwei(zhiwei);
			        }
			        if(StringUtils.isNotEmpty(userNo)){
			        	ule.setUserNo(userNo);
			        }
			        if(StringUtils.isNotEmpty(idcard)){
			        	ule.setIdcard(idcard);
			        }
			        if(StringUtils.isNotEmpty(idcard)){
			        	ule.setIdcard(idcard);
			        }
			        if(StringUtils.isNotEmpty(bankTypeName)){
			        	ule.setBankname(bankTypeName);
			        }
			        if(StringUtils.isNotEmpty(bankTypeId)){
			        	ule.setBankTypeId(new Long(bankTypeId));
			        }
			        if(StringUtils.isNotEmpty(phone)){
			        	ule.setPhone(phone);
			        }
			        if(useid==null){//保存
			        	// ulEmployee.setStatus(UlEmployee.FLAG_DISABLED.longValue());
				        	System.out.println("-->判断员工useid是空的时候，证明调用添加员工方法...");
							ule.setStatus(new Long(2));
							ulEmployeeService.save(ule);
						    if(ule.getUseid()!=null){
								Long userid=ule.getUseid();
								System.out.println("==userid"+userid);
								ulEmployeeService.updateDepid(userid);
								System.out.println("-->判断员工添加成功，将进行添加用户信息...");
								
							    app.setUsername(userNo);
							    app.setTitle(new Short(sex));
							    app.setPassword("jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=");
					            Department department = departmentService.get(new Long(561));
					            app.setDepartment(department);
							  
					            app.setBeginDate(new Date());
							    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
							    String str = "9999-12-31";
							    	//format.format(new Date());
							    
							    try {
							    	Date date=format.parse(str);
									app.setEndDate(date);
								} catch (ParseException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
					            app.setDepName("北京银行");
					            app.setUserType("0");
					            app.setStatus(new Short("1"));
					            app.setDelFlag(new Short("0"));
					            app.setFullname(fullname);
					            app.setDelFlag(new Short("0"));
					            app.setBankname(bankTypeName);
					            app.setEmployeeid(userNo);
					            UlEmployee ue = ulemployeeServie.get(userid);
					            app.setUlEmployee(ue);
					            app.setBankTypeId(new Long(bankTypeId));
					            app.setDepPath("0.561");
					            Set<AppRole> roles = new HashSet<AppRole>();
					            Set<UlUsergroup> Usergroup =  new HashSet<UlUsergroup>();
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
					    		app.setRoles(roles);
					    		//UlUsergroup Ul = ulUsergroupService.get(new Long(901));
					    		//app.getUlUsergroups().add(ulUsergroupService.get(new Long(901)));
					            appUserService.save(app);
					            System.out.println("-->用户添加成功");
						   }
					} else {
						           //在编辑员工的时候，先查询用户总是否有这个用户，
						           //如果有,在根据员工的id,工号去查询用户中的useid,userno中的
						           //与员工相等的记录，并且用户的没有被删除，否则yuangon
									ule.setUseid(new Long(useid));
									ule.setStatus(new Long(2));
									ulEmployeeService.merge(ule);
									System.out.println("-->修改用户成功");
									QueryFilter qf = new QueryFilter();
									Long id = new Long(useid);
									qf.addFilter("Q_ulEmployee.useid_L_EQ", id.toString());
									List<AppUser> rs = appUserService.getAllNoRequest(qf);
									for (AppUser tmp : rs) {
										//tmp.setFullname(ule.getFullname());
										List<AppUser> listA=ulEmployeeService.selectUserid(new Long(useid));
										 Long userId = null;
										 Long usid=null;
										if(listA.size()!=0){
											for(int i=0;i<listA.size();i++){
											   userId = listA.get(i).getUserId();
											   //usid=listA.get(i).getu;
										    }
											tmp.setUsername(userNo);
											tmp.setUserId(userId);
											tmp.setTitle(new Short(sex));
											tmp.setPassword("jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=");
								            Department department = departmentService.get(new Long(561));
								            tmp.setDepartment(department);
								            tmp.setBeginDate(new Date());
										    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
										    String str = "9999-12-31";
										    	//format.format(new Date());
										    
										    try {
										    	Date date=format.parse(str);
										    	tmp.setEndDate(date);
											} catch (ParseException e) {
												// TODO Auto-generated catch block
												e.printStackTrace();
											}
											tmp.setDepName("北京银行");
											tmp.setUserType("0");
											tmp.setStatus(new Short("1"));
											tmp.setDelFlag(new Short("0"));
											tmp.setFullname(fullname);
											tmp.setDelFlag(new Short("0"));
											tmp.setBankname(bankTypeName);
											tmp.setEmployeeid(userNo);
								            //app.setu
								            UlEmployee ue = ulemployeeServie.get(new Long(useid));
								            tmp.setUlEmployee(ue);
								            tmp.setBankTypeId(new Long(bankTypeId));
								            tmp.setDepPath("0.561");
								            Set<AppRole> roles = new HashSet<AppRole>();
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
								    		tmp.setRoles(roles);
								    		tmp.setPhoto(photo);
										    appUserService.merge(tmp);
										//merge（）会判断session   pool中是否有同样的对象（id相同），有则update（），没有则save（）。
										//org.hibernate.NonUniqueObjectException:用save()的时候报的异常
									}
									 System.out.println("-->修改用户成功");
							}
								
						}
			        setJsonString("{success:true}");
					return SUCCESS;
	}
				
				//================================
				
				
				
				/**
				 * 显示列表
				 */
				public String listUlE() {
					System.out.println("userList----用户信息");
					//String username = getRequest().getParameter("username"); // 办理人
					String fullname = getRequest().getParameter("fullname"); // 补录人
					String userNo = getRequest().getParameter("userNo"); // 补录时间
					String zhiwei = getRequest().getParameter("zhiwei"); // 补录结果
					System.out.println("===[ConHisAction.java]=ExamineReport()="
							 + fullname + userNo + zhiwei);
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
					List<UlEmployee> list = new ArrayList<UlEmployee>();
					System.out.println("[ConHisAction.java] -if  ----- 查询所有====");
					list = ulEmployeeService.SelectUlempList(start, limit, fullname,
							userNo, zhiwei);//根据条件查询
					count = ulEmployeeService.SelectUlempListCount(fullname,
							userNo, zhiwei);//总数目
//					for (UlEmployee u : list) {
//						if (u.getParent() != null) {
//							UlEmployee parent = ulEmployeeService.get(u.getParent());
//							u.setParentName(parent.getFullname());
//						}
//					}
					// Type type=new TypeToken<List<UlEmployee>>(){}.getType();
					StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
							.append(count).append(
									",result:");

					// Gson gson=new Gson();
					// buff.append(gson.toJson(list, type));
					JSONSerializer ser = JsonUtil.getJSONSerializer();
					buff.append(ser.serialize(list));
					buff.append("}");

					jsonString = buff.toString();

					return SUCCESS;
				}		
	
				//判断工号是否重复
				public String isRepeatfullname() {
					
					String extCode = getRequest().getParameter("userNo");
					System.out.println("----------.>isRepeatfullname extCode"+extCode);
					if (StringUtils.isNotBlank(extCode)) {
						QueryFilter filter = new QueryFilter(getRequest());
						filter.addFilter("Q_userNo_S_LK", extCode);
						List<UlEmployee> list = ulEmployeeService.getAll(filter);
						System.out.println(" jrkrrj==="+list.size());
						if (list.size() > 0) {
							setJsonString("{success:true}");
							return SUCCESS;
						}
					}
					setJsonString("{success:false}");
					return SUCCESS;
				}		
				
				
				/****
				根据角色的权限来显示机构部门
				 显示树形列表，实际上是tree()*/
				public String BankListRoleTree() {
					System.out.println("[ConHisAction.java]-BankListTree()");
					String opt = getRequest().getParameter("opt");
					StringBuffer buff = new StringBuffer();
					if (StringUtils.isNotEmpty(opt)) {
						buff.append("[");
					} else {
						buff.append("[{id:'" + 0 + "',text:'" + "总行"
								+ "',expanded:true,checked:'none',children:[");
					}
					List<BankType> listParent = ulEmployeeService.findByParentId(new Long(0));// 最顶层父节点
					for (BankType ktp : listParent) {
						buff.append("{id:'" + ktp.getBankTypeId() + "',text:'"
								+ ktp.getBankname() + "',");
						buff.append(listChild(ktp.getBankTypeId()));
					}
					if (!listParent.isEmpty()) {
						buff.deleteCharAt(buff.length() - 1);
					}
					if (StringUtils.isNotEmpty(opt)) {
						buff.append("]");
					} else {
						buff.append("]}]");
					}
					setJsonString(buff.toString());
					return SUCCESS;
			
				}
				
				
				
				
				protected String listChild(Long id) {
					// System.out.println("[ConHisAction.java]==listChild()]");
					StringBuffer childSB = new StringBuffer("");
					List<BankType> childs = ulEmployeeService.findByParentId(id);
					// System.out.println("======"+childs);
					if (childs.size() == 0) {
						childSB.append("checked:'none',leaf:true},");
						return childSB.toString();
					}
					// System.out.println("childSB"+childSB.toString());
					childSB.append("checked:'none',children:[");
					for (BankType ukt : childs) {
						childSB.append("{id:'" + ukt.getBankTypeId() + "' ,text:'"
								+ ukt.getBankname() + "',");
						childSB.append(CollectListChildForRole(ukt.getBankTypeId()));
					}
					childSB.deleteCharAt(childSB.length() - 1);
					childSB.append("]},");
					// System.out.println("====childSB"+childSB);
					return childSB.toString();
				}
				
				protected String CollectListChildForRole(Long id) {
					StringBuffer childSB = new StringBuffer("");
					List<BankType> childs = ulEmployeeService.collectFindByParentIdForRole(id);
					if (childs.size() == 0) {
						childSB.append("checked:'none',leaf:true},");
						return childSB.toString();
					}
					// System.out.println("[ConHisAction.java]  CollectListChildForRole childs"+childSB.toString());
					childSB.append("checked:'none',children:[");
					for (BankType ukt : childs) {
						childSB.append("{id:'" + ukt.getBankTypeId() + "' ,text:'"
								+ ukt.getBankname() + "',");
						childSB.append(listChild(ukt.getBankTypeId()));
					}
					childSB.deleteCharAt(childSB.length() - 1);
					childSB.append("]},");
					// System.out.println("[ConHisAction.java]  CollectListChildForRole childs"+childSB.toString());
					return childSB.toString();
				}
				
				public String treeRoleList() {
					String bankTypeId = getRequest().getParameter("bankTypeId");
					String start = getRequest().getParameter("start");
					String limit = getRequest().getParameter("limit");

					String parentId = "0";
					if (StringUtils.isNotEmpty(bankTypeId)) {
						parentId = bankTypeId;
					}
					List<BankType> childList = ulEmployeeService.findRoleByParentIdForSql(
							new Integer(start), new Integer(limit), parentId);
					StringBuffer childlistSB = new StringBuffer(
							"{success:true,'totalCounts':").append(
									ulEmployeeService.findRoleByParentIdForSqlCount(new Integer(start),
									new Integer(limit), parentId)).append(",result:");

					JSONSerializer jsonserializer = new JSONSerializer();
					jsonserializer.transform(new DateTransformer("yyyy-MM-dd"),
							new String[] { "createDate" });
					childlistSB.append(jsonserializer.serialize(childList));
					childlistSB.append("}");
					jsonString = childlistSB.toString();
					this.pagingBean = new PagingBean(new Integer(start), new Integer(limit));
					return SUCCESS;
				}
				
				
				
				/*
				 * 修改员工的删除，删除员工的同时删除用户，不管用户处于什么状态
				 * nk
				 * */
			     @SuppressWarnings("unchecked")
				public String multideleteULM() {
			 		String[] Ids = getRequest().getParameterValues("ids");
			 		System.out.println("=======multideleteULM=====ids"+Ids.toString());
			 		if (Ids != null) {
			 			for (String id : Ids) {
			 				//String EId = null;
			 				System.out.println("==================userid"+id);
			 				ulEmployeeService.getUpdateDelAppUser(new Long(id));//删除用户
			 				// 删除员工与设备之间的关联关系
			 				
			 				ulEmployeeService.getDelteULEmpEquip(new Long(id));
			 				
			 				ulEmployeeService.remove(new Long(id));// 删除员工
			 				
			 				System.out.println("<<<<OK");
			 			}
			 		}
			         
			 		jsonString = "{success:true}";

			 		return SUCCESS;
			 	}
				
				
				
              /***
               * 显示照片
               * 
               */
				
			     public String selectPhoto(){
			    	 String userid = getRequest().getParameter("userid");
			  		List<AppUser> list = ulEmployeeService.selectPhoto(new Long(userid));
			  		String strR ="";
			  		for(int i=0;i<list.size();i++){
			  			strR=list.get(i).getPhoto();
			  		}
			  		//String strR = list.get(0).getPhoto();
			  		System.out.println("conHisService.selectRoleName , " + strR);
			  		jsonString = "{success:" + strR + "}";
			  		System.out.println("====" + jsonString);

			  		return SUCCESS;
			   
			     }
			     
			 	
			   //删除用户信息照片
			   	public String deletePh(){
			   		String userId = getRequest().getParameter("userId");
			   		if(StringUtils.isEmpty(userId)) return null;
			   		  //去后台查询useid对应的路径
			   		List<AppUser> list = ulEmployeeService.selectPhoto(new Long(userId));
			  		Long strR = null;
			  		for(int i=0;i<list.size();i++){
			  			strR=list.get(i).getUserId();
			  		}
			   		AppUser ap = appUserService.get(strR);
			   		ap.setPhone("");
			   		return SUCCESS;
			   	}
			     
				/**
				 * 删除用户照片
				 * 
				 * @return
				 */
				public String photoump() {
					//setAppUser(appUserService.get(getUserId()));
					String userId = getRequest().getParameter("userId");
					System.out.println("==userId="+userId);
			   		if(StringUtils.isEmpty(userId)) return null;
			   		  //去后台查询useid对应的路径
			   		List<AppUser> list = ulEmployeeService.selectPhoto(new Long(userId));
			  		Long strR = null;
			  		for(int i=0;i<list.size();i++){
			  			strR=list.get(i).getUserId();
			  		}
			   		AppUser ap = appUserService.get(strR);
			   		ap.setPhone("");
					//appUser.setPhoto("");
					appUserService.save(ap);
					return SUCCESS;
				}
			     
//20151025===========================维护员工时也维护设备==================================================
				
				/**
				 * 根据所选的机构查询所有的设备信息
				 * @author wangkaijuan
				 * @return 20151025
				 * */
	
   public String ulempEquipSelect(){
		System.out.println("[UlEmployeeAction.java]首先进入ulempEquipSelect");
		String busTypId = getRequest().getParameter("bankId");
		String operatorId = getRequest().getParameter("operatorId");
		String equipmentName = getRequest().getParameter("equipmentName");
		System.out.println("[UlEmployeeAction.java]busTypId="+busTypId+"operatorId"+operatorId+" equipmentName:"+equipmentName);
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
		List<Equipment> list = new ArrayList<Equipment>();
		System.out.println("[UlEmployeeAction.java] -if  ----- 查询所有====");
		list = ulEmployeeService.ulempEquipSelect(start, limit, operatorId, busTypId,equipmentName);// 根据条件查询
		count = ulEmployeeService.ulempEquipSelectCount(operatorId, busTypId,equipmentName);// 总数目
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(count).append(",result:[");
			for (int i = 0; i < list.size(); i++) {
				if (list.get(i).getEId() != null
						&& !"".equals(list.get(i).getEId())) {
					buff.append("[").append("" + list.get(i).getEId() + ",");
				} else {
					buff.append("[").append("" + ",");// 是为了防止数据库中取出来的值为null
				}
				if (list.get(i).getBankTypeId() != null
						&& !"".equals(list.get(i).getBankTypeId())) {
					buff.append(list.get(i).getBankTypeId() + ",");
				} else {
					buff.append(",");// 是为了防止数据库中取出来的值为null
				}
				if (list.get(i).getParentId() != null
						&& !"".equals(list.get(i).getParentId())) {
					buff.append(list.get(i).getParentId() + ",'");
				} else {
					buff.append("" + ",'");// 是为了防止数据库中取出来的值为null
				}
				if (list.get(i).getEquipmentId() != null
						&& !"".equals(list.get(i).getEquipmentId())) {
					buff.append(list.get(i).getEquipmentId() + "','");
				} else {
					buff.append("" + "','");
				}
				if (list.get(i).getBranchId() != null
						&& !"".equals(list.get(i).getBranchId())) {
					buff.append(list.get(i).getBranchId() + "','");
				} else {
					buff.append("" + "','");
				}
				if (list.get(i).getEquipmentName() != null
						&& !"".equals(list.get(i).getEquipmentName())) {
					buff.append(list.get(i).getEquipmentName() + "','");
				} else {
					buff.append("" + "','");
				}
			
				if (list.get(i).getBankname() != null
						&& !"".equals(list.get(i).getBankname())) {
					buff.append(list.get(i).getBankname() + "','");
				} else {
					buff.append("" + "','");
				}
				if (list.get(i).getParentName() != null
						&& !"".equals(list.get(i).getParentName())) {
					buff.append(list.get(i).getParentName() + "','");
				} else {
					buff.append("" + "','");
				}
				if (list.get(i).getOperatorId() != null
						&& !"".equals(list.get(i).getOperatorId())) {
					buff.append(list.get(i).getOperatorId() + "','");
				} else {
					buff.append("" + "','");
				}
				if (list.get(i).getCurdate() != null
						&& !"".equals(list.get(i).getCurdate())) {
					buff.append(list.get(i).getCurdate() + "','");
				} else {
					buff.append("" + "','");
				}
				if (list.get(i).getIpAddress() != null
						&& !"".equals(list.get(i).getIpAddress())) {
					buff.append(list.get(i).getIpAddress() + "','");
				} else {
					buff.append("" + "','");
				}
				if (list.get(i).getAddress() != null
						&& !"".equals(list.get(i).getAddress())) {
					buff.append(list.get(i).getAddress() + "'],");
				} else {
					buff.append("" + "'],");
				}
			
			}
		
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}");
		System.out.println("buff----" + buff);
		setJsonString(buff.toString());
		System.out.println("list=" + list.size());
		this.pagingBean = new PagingBean(start, limit);
		return SUCCESS;

	
   }
				
		///**===修改员工档案信息**/	
	
		public String UlemployeeEquipSave() {
			System.out.println("-UlemployeeEquipSave ...");
			String useid = getRequest().getParameter("useid");
			String fullname = getRequest().getParameter("fullname");
			String sex = getRequest().getParameter("sex");
			String zhiwei = getRequest().getParameter("zhiwei");
			String userNo = getRequest().getParameter("userNo");
			String bankTypeId = getRequest().getParameter("bankTypeId");
			String bankTypeName = getRequest().getParameter("bankname");
			String phone = getRequest().getParameter("phone");
			String idcard = getRequest().getParameter("idcard");
			String photo = getRequest().getParameter("photo");
			String operatorId = getRequest().getParameter("operatorId");
			String equipmentId = getRequest().getParameter("equipmentId");
			String  eqEId = getRequest().getParameter("eqEId");
			System.out.println("============detailsfullname:"+fullname+"operatorId:"+operatorId+"String equipmentId"+equipmentId);
			System.out.println("=[UlEmployeeAction]===========bankname"+fullname+"~"+sex+"~"+zhiwei+"~"+photo);
			System.out.println("==useid:"+useid+"~sex:"+sex+"~userNo:"+userNo+"~fullname:"+fullname+"~bankTypeId:"+
								bankTypeId+"~bankTypeName:"+bankTypeName+"~phone:"+phone+"~idcard:"+idcard+"eqEId设备"+eqEId);
			 
			UlEmployee ule=new UlEmployee();
			AppUser app=new AppUser();
	       if(StringUtils.isNotEmpty(fullname)){
	       	ule.setFullname(fullname);
	       }
	       if(StringUtils.isNotEmpty(sex)){
	       	ule.setSex(new Long(sex));
	       }
	       if(StringUtils.isNotEmpty(zhiwei)){
	       	ule.setZhiwei(zhiwei);
	       }
	       if(StringUtils.isNotEmpty(userNo)){
	       	ule.setUserNo(userNo);
	       }
	       if(StringUtils.isNotEmpty(idcard)){
	       	ule.setIdcard(idcard);
	       }
	       if(StringUtils.isNotEmpty(idcard)){
	       	ule.setIdcard(idcard);
	       }
	       if(StringUtils.isNotEmpty(bankTypeName)){
	       	ule.setBankname(bankTypeName);
	       }
	       if(StringUtils.isNotEmpty(bankTypeId)){
	       	ule.setBankTypeId(new Long(bankTypeId));
	       }
	       if(StringUtils.isNotEmpty(phone)){
	       	ule.setPhone(phone);
	       }
	       System.out.println("useid"+useid);
	       if(useid==null){//保存
	       	// ulEmployee.setStatus(UlEmployee.FLAG_DISABLED.longValue());
		        	System.out.println("-->判断员工useid是空的时候，证明调用添加员工方法...");
					ule.setStatus(new Long(2));
					ulEmployeeService.save(ule);				
				    if(ule.getUseid()!=null){
				    	//先判断跟设备关联的表传过来的值是否NUll,如果不为null，点击保存的时候，首先向设备与员工的表中保存数据
						  
						Long userid=ule.getUseid();
						
						if("支行操作员".equals(zhiwei)){
							System.out.println("==userid"+userid+"zhiwei "+zhiwei);
							String[] list=operatorId.split(",");
							 String []equipmentIds=equipmentId.split(",");
							 String []eqEIds=eqEId.split(",");
							   if(operatorId!=null && userid!=null){ 
							   
								   for(int i=0;i<list.length;i++){
									   System.out.println("list[i]"+list[i]+"equipmentIds[i]"+equipmentIds[i]);
									   //ulEmployeeService.UlEmployeeEquipmentsave(userNo,userid,list[i]);
									   ulEmployeeService.UlEmployeeEquipmentsave(userNo, list[i], userid,equipmentIds[i],new Long(eqEIds[i]));
									   System.out.println("支行操作员时，往员工与设备关系表中插入数据成功");
								   }
							 }
						}else{
							System.out.println(" 其他角色的员工，不插入往员工与设备关系表中插入数据");
						}
						 
						
						ulEmployeeService.updateDepid(userid);
						System.out.println("-->判断员工添加成功，将进行添加用户信息...");
						
					    app.setUsername(userNo);
					    app.setTitle(new Short(sex));
					    app.setPassword("jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=");
			            Department department = departmentService.get(new Long(561));
			            app.setDepartment(department);
					  
			            app.setBeginDate(new Date());
					    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
					    String str = "9999-12-31";
					    	//format.format(new Date());
					    
					    try {
					    	Date date=format.parse(str);
							app.setEndDate(date);
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
			            app.setDepName("北京银行");
			            app.setUserType("0");
			            app.setStatus(new Short("1"));
			            app.setDelFlag(new Short("0"));
			            app.setFullname(fullname);
			            app.setDelFlag(new Short("0"));
			            app.setBankname(bankTypeName);
			            app.setEmployeeid(userNo);
			            UlEmployee ue = ulemployeeServie.get(userid);
			            app.setUlEmployee(ue);
			            app.setBankTypeId(new Long(bankTypeId));
			            app.setDepPath("0.561");
			            Set<AppRole> roles = new HashSet<AppRole>();
			            Set<UlUsergroup> Usergroup =  new HashSet<UlUsergroup>();
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
			    		app.setRoles(roles);
			    		//UlUsergroup Ul = ulUsergroupService.get(new Long(901));
			    		//app.getUlUsergroups().add(ulUsergroupService.get(new Long(901)));
			            appUserService.save(app);
			            System.out.println("-->用户添加成功");
				   }
			} else {
				           //在编辑员工的时候，先查询用户总是否有这个用户，
				           //如果有,在根据员工的id,工号去查询用户中的useid,userno中的
				           //与员工相等的记录，并且用户的没有被删除，否则yuangon
				          System.err.println("====else=======");
				          if("支行操作员".equals(zhiwei)){
								System.out.println("==userid"+useid+"zhiwei "+zhiwei);
								String[] list=operatorId.split(",");
								 String []equipmentIds=equipmentId.split(",");
								 String []eqEIds=eqEId.split(",");
								// 删除员工与设备之间的关联关系
					 			  
								   if(operatorId!=null && useid!=null){ 
									   ulEmployeeService.getDelteULEmpEquip(new Long(useid));
									   for(int i=0;i<list.length;i++){
										   System.out.println("list[i]"+list[i]+"equipmentIds[i]"+equipmentIds[i]);
										   //ulEmployeeService.UlEmployeeEquipmentsave(userNo,userid,list[i]);
										   ulEmployeeService.UlEmployeeEquipmentsave(userNo, list[i], new Long(useid),equipmentIds[i],new Long(eqEIds[i]));
										   System.out.println("支行操作员时，往员工与设备关系表中插入数据成功");
									   }
								 }
							}else{
								System.out.println(" 其他角色的员工，不插入往员工与设备关系表中插入数据");
							}
							ule.setUseid(new Long(useid));
							ule.setStatus(new Long(2));
							ulEmployeeService.merge(ule);
							System.out.println("-->修改用户成功");
							QueryFilter qf = new QueryFilter();
							Long id = new Long(useid);
							
							qf.addFilter("Q_ulEmployee.useid_L_EQ", id.toString());
							List<AppUser> rs = appUserService.getAllNoRequest(qf);
							for (AppUser tmp : rs) {
								//tmp.setFullname(ule.getFullname());
								List<AppUser> listA=ulEmployeeService.selectUserid(new Long(useid));
								 Long userId = null;
								 Long usid=null;
								if(listA.size()!=0){
									for(int i=0;i<listA.size();i++){
									   userId = listA.get(i).getUserId();
									   //usid=listA.get(i).getu;
								    }
									tmp.setUsername(userNo);
									tmp.setUserId(userId);
									tmp.setTitle(new Short(sex));
									tmp.setPassword("jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=");
						            Department department = departmentService.get(new Long(561));
						            tmp.setDepartment(department);
						            tmp.setBeginDate(new Date());
								    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
								    String str = "9999-12-31";
								    	//format.format(new Date());
								    
								    try {
								    	Date date=format.parse(str);
								    	tmp.setEndDate(date);
									} catch (ParseException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}
									tmp.setDepName("北京银行");
									tmp.setUserType("0");
									tmp.setStatus(new Short("1"));
									tmp.setDelFlag(new Short("0"));
									tmp.setFullname(fullname);
									tmp.setDelFlag(new Short("0"));
									tmp.setBankname(bankTypeName);
									tmp.setEmployeeid(userNo);
						            //app.setu
						            UlEmployee ue = ulemployeeServie.get(new Long(useid));
						            tmp.setUlEmployee(ue);
						            tmp.setBankTypeId(new Long(bankTypeId));
						            tmp.setDepPath("0.561");
						            Set<AppRole> roles = new HashSet<AppRole>();
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
						    		tmp.setRoles(roles);
						    		tmp.setPhoto(photo);
								    appUserService.merge(tmp);
								//merge（）会判断session   pool中是否有同样的对象（id相同），有则update（），没有则save（）。
								//org.hibernate.NonUniqueObjectException:用save()的时候报的异常
							}
							 System.out.println("-->修改用户成功");
					}
						
				}
	       setJsonString("{success:true}");
			return SUCCESS;
	     }
			
		//==========================================================设备维护员工信息
		
		/**
		 *  添加设备时，根据设备所属机构，
		 *  查询该机构下的所有的员工信息
		 * */
		
		
		public String EquipmentULEmploySelect(){
			
			String UlEmpBTypeId = getRequest().getParameter("UlEmpBTypeId"); // 
			String userNo = getRequest().getParameter("userNo"); // 员工工号
			String fullname = getRequest().getParameter("fullname"); // 员工姓名
			System.out.println("EquipmentULEmploySelect----查询机构下的所有员工"+" UlEmpBTypeId " +
					" "+UlEmpBTypeId+" userNo"+userNo+" fullname "+fullname);
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
			List<UlEmployee> list = new ArrayList<UlEmployee>();
			System.out.println("[ConHisAction.java] -if  ----- 查询所有====");
			list = ulEmployeeService.EquipmentULEmploySelect(start, limit, UlEmpBTypeId,
					userNo,fullname);//根据条件查询
			count = ulEmployeeService.EquipmentULEmploySelectCount(UlEmpBTypeId,
					userNo,fullname);//总数目

			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(count).append(",result:");
			JSONSerializer ser = JsonUtil.getJSONSerializer();
			buff.append(ser.serialize(list));
			buff.append("}");
			jsonString = buff.toString();
			return SUCCESS;
		
		}
		/**
		 * 20151023 查看支行管理员管理所有设备的机具号
		 * @wkj
		 */
		public String selectEquipmentId() {
			String useid = getRequest().getParameter("useid");
		    //System.out.println("进入selectEquipmentId！ useid "+useid);
			try {
				
				List<UlEmployeeEquipment>  ulEmpEq= ulemployeeServie.selectEquipmentId(useid);
				//System.out.println("ulEmpEq.size()"+ulEmpEq.size());
				Gson gson = new Gson();
				StringBuffer sb = new StringBuffer("{success:true,data:");
				UlEmployeeEquipment equipment2 = new UlEmployeeEquipment();
				if (ulEmpEq == null) {
					
					equipment2.setUlEmployeeId(new Long("0000"));
					equipment2.setEquipmentId(" ");
					equipment2.setEquipOperatorId(" ");
					sb.append(gson.toJson(equipment2));
					//jsonString = "{success:" +str+ "}";
				} else {
					//sb.append(gson.toJson(ulEmpEq));
					//String []str;
					String str1 = null;
	                String str="";
					for(int i=0;i<ulEmpEq.size();i++){
						//System.out.println("ulEmpEq.get(i).getEquipmentId()==="+ulEmpEq.get(i).getEquipOperatorId());
						//str1=ulEmpEq.get(i).getEquipmentId()+",";
						str1=ulEmpEq.get(i).getEquipOperatorId()+",";
						//System.out.println("str1str1"+str1+"str"+str);
						if(str.contains(str1)){
							str=str+"";
						}else{
							str=str+str1;
						}
					}
					equipment2.setEquipmentId("");
					equipment2.setUlEmployeeId(new Long("0000"));
					//System.out.println("selectEquipmentId str1str1 "+str1);
					equipment2.setEquipOperatorId(str);
					sb.append(gson.toJson(equipment2));
				}
				
				sb.append("}");
				//System.out.println("sb"+sb);
				setJsonString(sb.toString());
				//System.out.println(sb);
			} catch (Exception e) {
				System.out.println(e);
			}

			return SUCCESS;
		}

		/**
		 * 20151023 查看支行管理员管理本机构下的所有的员工工号
		 * @wkj
		 */
		public String selectUserNo() {
			String useid = getRequest().getParameter("useid");
		 //System.out.println("进入selectUserNo！ useid "+useid);
			try {
				
				List<UlEmployeeEquipment>  ulEmpEq= ulemployeeServie.selectUlEmployeeId(useid);
				//System.out.println("ulEmpEq.size()"+ulEmpEq.size());
				Gson gson = new Gson();
				StringBuffer sb = new StringBuffer("{success:true,data:");
				UlEmployeeEquipment equipment2 = new UlEmployeeEquipment();
				if (ulEmpEq == null) {
					
					equipment2.setEqId(Long.parseLong("1111"));
					equipment2.setUlEmployeeNo(" ");
					equipment2.setEquipOperatorId("无");
					sb.append(gson.toJson(equipment2));
				} else {
					//sb.append(gson.toJson(ulEmpEq));
					//String []str;
					String str1 = null;
	                String str="";
					for(int i=0;i<ulEmpEq.size();i++){
						//System.out.println("ulEmpEq.get(i).getEquipmentId()==="+ulEmpEq.get(i).getUlEmployeeNo());
						str1=ulEmpEq.get(i).getUlEmployeeNo()+",";
						if(str.contains(str1)){
							str=str+"";
						}else{
							str=str+str1;
						}
						
					}
					equipment2.setUlEmployeeNo(str);
					equipment2.setEqId(Long.parseLong("1111"));
					//System.out.println("selectEquipmentId str1str1 "+str1+"str ..."+str);
					equipment2.setEquipOperatorId(" ");
					sb.append(gson.toJson(equipment2));
				}
				
				sb.append("}");
				//System.out.println("sb"+sb);
				setJsonString(sb.toString());
				//System.out.println(sb);
			} catch (Exception e) {
				System.out.println(e);
			}

			return SUCCESS;
		}

		
		/*********
		 * 在设备编辑的时候显示员工工号信息栏（查询员工的工号以及主键id）
		 */
		public String SelectEmployeeNo() {
			String useid = getRequest().getParameter("useid");
			//System.out.println("进入SelectEmployeeNo！ useid "+useid);
			List<UlEmployeeEquipment>  ulEmpEq= ulemployeeServie.selectUlEmployeeId(useid);
			
			String strUseid = "";//useid
			String str="";
			String str1="";
            String strUlEmopyeeNO="";//
            if(ulEmpEq.isEmpty()){
            	System.out.println("没有用户");
            }else{
            	for(int i=0;i<ulEmpEq.size();i++){
    				//System.out.println("ulEmpEq.get(i).getEquipmentId()==="+ulEmpEq.get(i).getUlEmployeeNo());
                	strUlEmopyeeNO=ulEmpEq.get(i).getUlEmployeeNo()+",";
                	strUseid=ulEmpEq.get(i).getUlEmployeeId()+",";
                	//System.out.println("strUlEmopyeeNO :"+strUlEmopyeeNO+" strUseid:"+strUseid);
    				if(str.contains(strUlEmopyeeNO) ||str1.contains(strUseid)){
    					str=str+"";
    					str1=str1+"";
    				}else{
    					str=str+strUlEmopyeeNO;
    					str1=str1+strUseid;
    				}
    				
    				
    			}
            }
            
			jsonString = "{success:" + str+ "~"+str1+"}";
			System.out.println("====" + jsonString);
			return SUCCESS;

		}

		/*********
		 * 在员工编辑的时候显示柜员号信息栏（查询设备的柜员号以及主键id）
		 */
		public String SelecOperatorId() {
			String useid = getRequest().getParameter("useid");
			System.out.println("进入SelecOperatorId！ useid "+useid);
			List<UlEmployeeEquipment>  ulEmpEq= ulemployeeServie.selectEquipmentId(useid);
			
			String strEId = "";//useid
			String str="";
			String str1="";
            String strOperatorId="";//
            if(ulEmpEq.isEmpty()){
            	System.out.println("没有用户");
            }else{
            	for(int i=0;i<ulEmpEq.size();i++){
    				//System.out.println("ulEmpEq.get(i).getEquipmentId()==="+ulEmpEq.get(i).getUlEmployeeNo());
            		strOperatorId=ulEmpEq.get(i).getEquipOperatorId()+",";
            		strEId=ulEmpEq.get(i).getEqId()+",";
                	//System.out.println("strUlEmopyeeNO :"+strUlEmopyeeNO+" strUseid:"+strUseid);
    				if(str.contains(strOperatorId) ||str1.contains(strEId)){
    					str=str+"";
    					str1=str1+"";
    				}else{
    					str=str+strOperatorId;
    					str1=str1+strEId;
    				}
    				
    				
    			}
            }
            
			jsonString = "{success:" + str+ "~"+str1+"}";
			System.out.println("====" + jsonString);
			return SUCCESS;

		}

		
}
