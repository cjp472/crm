package com.ulane.base.action.xitong;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.base.model.xitong.UlContactDep;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.service.xitong.UlContactDepService;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.customer.model.fee.ObFeeRule;
import com.ulane.customer.service.fee.ObFeeRuleService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UlDepartmentAction extends BaseAction {
	@Resource
	private UlDepartmentService ulDepartmentService;
	private UlDepartment ulDepartment;
	@Resource
	private ObFeeRuleService obFeeRuleService;
	@Resource
	private UlContactDepService ulContactDepService;
	private UlContactDep ulContactDep;

	private Long depid;

	public UlContactDep getUlContactDep() {
		return ulContactDep;
	}

	public void setUlContactDep(UlContactDep ulContactDep) {
		this.ulContactDep = ulContactDep;
	}

	public Long getDepid() {
		return depid;
	}

	public void setDepid(Long depid) {
		this.depid = depid;
	}

	public UlDepartment getUlDepartment() {
		return ulDepartment;
	}

	public void setUlDepartment(UlDepartment ulDepartment) {
		this.ulDepartment = ulDepartment;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'" + 0 + "',text:'" + AppUtil.getCompanyName()
					+ "',expanded:true,children:[");
		}
		List<UlDepartment> listParent = ulDepartmentService
				.findByParentId(new Long(0));// 最顶层父节点
		for (UlDepartment dep : removeDeleted(listParent)) {
			buff.append("{id:'" + dep.getDepid() + "',text:'"
					+ dep.getDepname() + "',");
			buff.append(findChild(dep.getDepid()));
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

	/**
	 * 显示当前部门的自部门列表
	 */
	public String list_childDep() {
		QueryFilter filter = new QueryFilter(getRequest());
		String strDepId = getRequest().getParameter("depId");
		// 表示从上级目录开始进行查找
		String path = "0.";
		if (StringUtils.isNotEmpty(strDepId)) {// strDepId为空，说明为查找根节点下的所有信息
			Long depId = Long.parseLong(strDepId);
			UlDepartment dep = ulDepartmentService.get(depId);
			if (dep != null) {
				path = dep.getPath();
				filter.addFilter("Q_path_S_LK", path);
			}
		}
		List<UlDepartment> list = ulDepartmentService.getAll(filter);

		for (UlDepartment ud : list) {// 设置父机构的名称
			UlDepartment ud_parent = ulDepartmentService.get(ud.getParentid());
			if (ud_parent != null) {
				ud.setParentName(ud_parent.getDepname());
			} else {
				ud.setParentName(AppUtil.getCompanyName());
			}
		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "appUser.accessionTime" });
		buff.append(serializer.serialize(list));

		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 寻找子根节点
	 */
	public String findChild(Long depId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UlDepartment> list = removeDeleted(ulDepartmentService
				.findByParentId(depId));
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UlDepartment dep2 : list) {
				buff1.append("{id:'" + dep2.getDepid() + "',text:'"
						+ dep2.getDepname() + "',");
				buff1.append(findChild(dep2.getDepid()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	/**
	 * 添加部门信息或者更新部门信息
	 * 
	 * @return
	 */
	public String add() {
		// 获取联系方式信息
		String details = getRequest().getParameter("details");
		// 将联系方式信息注入部门对象中
		if (StringUtils.isNotEmpty(details)) {
			Gson gson = new Gson();
			UlContactDep[] detailArr = (UlContactDep[]) gson.fromJson(details,
					UlContactDep[].class);
			ulDepartment.getContacts().clear();
			if (detailArr != null) {
				for (UlContactDep detail : detailArr) {
					detail.setUlDepartment(ulDepartment);
					detail.setDelFlag(Constants.FLAG_UNDELETED);
					ulDepartment.addContact(detail);
				}
			}
		}

		if (ulDepartment.getDepid() == null) {// 新增部门时，设置状态
			// 更新部门对象
			Long parentId = ulDepartment.getParentid();
			String depPath = "";
			if (parentId < 1) {
				parentId = new Long(0);
				depPath = "0.";
			} else {
				depPath = ulDepartmentService.get(parentId).getPath();
			}
			ulDepartment.setStatus(Constants.FLAG_DISABLE.longValue());
			ulDepartmentService.save(ulDepartment);// 新增部门的时候，必须先保存，才会获得id，然后设置path值
			ulDepartment.setPath(depPath + ulDepartment.getDepid() + ".");
			ulDepartmentService.save(ulDepartment);
		} else {
			// UlDepartment orgUlDepartment = new UlDepartment();
			// try {
			// BeanUtil.copyNotNullProperties(orgUlDepartment,ulDepartment);
			// for(UlContactDep tmp : ulDepartment.getContacts()){
			// orgUlDepartment.addContact(tmp);
			// }
			// 数据库中已有的子集
			// List<UlContactDep> con_db = ulContactDepService.getAllByDepId(
			// orgUlDepartment.getDepid());
			// //页面提交过来的子集
			// Set<UlContactDep> con_page = orgUlDepartment.getContacts();
			// for(UlContactDep tmp_db : con_db){
			// boolean have = false;
			// if(!con_page.isEmpty()){
			// for(UlContactDep ulContactDep : con_page){
			// ulContactDepService.save(ulContactDep);
			// if(tmp_db.getContactEmplId().equals(
			// ulContactDep.getContactEmplId())){
			// have = true;
			// }
			// }
			// }
			// if(!have){
			// tmp_db.setDelFlag(Constants.FLAG_DELETED);
			// orgUlDepartment.getContacts().add(tmp_db);
			// }
			// }
			// UlDepartment orgUlDepartment = new UlDepartment();
			// BeanUtil.copyNotNullProperties(orgUlDepartment,ulDepartment);
			// ulDepartmentService.flush();
			ulDepartmentService.save(ulDepartment);
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 批量删除部门
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 删除单个部门
	 * 
	 * @return
	 */
	public String del() {
		Long depId = Long.parseLong(getRequest().getParameter("depId"));
		if (remove(depId)) {
			setJsonString("{success:true}");
		} else {
			setJsonString("{success:false, message : '只能注销已启用的组织机构'}");
		}
		return SUCCESS;
	}

	/**
	 * 删除部门的方法
	 * 
	 * @param depId
	 */
	public boolean remove(long depId) {
		UlDepartment dep = ulDepartmentService.get(depId);
		if (dep.getStatus().equals(UlDepartment.FLAG_DISABLED.longValue())) {
			return false;
		}
		dep.setStatus(UlDepartment.FLAG_DELETED.longValue());
		ulDepartmentService.save(dep);
		return true;
		// 子部门不用删除，因为父被删除，子部门找不到
		// List<UlDepartment> list = ulDepartmentService.findByParentId(depId);
		// if (list != null)
		// for (UlDepartment dep : list) {
		// dep.setDelFlag((short) 1);
		// ulDepartmentService.save(dep);
		// }
	}

	/**
	 * 启用部门
	 * 
	 * @return
	 */
	public String multiEnable() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				enable(new Long(id));
			}
		}
		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 启用单个部门
	 * 
	 * @return
	 */
	public String enable() {
		Long depId = Long.parseLong(getRequest().getParameter("depId"));
		enable(depId);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 启用部门的方法
	 * 
	 * @param depId
	 */
	public void enable(long depId) {
		UlDepartment dep = ulDepartmentService.get(depId);
		dep.setStatus(UlDepartment.FLAG_ENABLED.longValue());
		ulDepartmentService.save(dep);
	}

	/**
	 * 获取部门信息
	 * 
	 * @return
	 */
	public String get() {
		Long depId = Long.parseLong(getRequest().getParameter("depId"));
		UlDepartment ulDepartment = ulDepartmentService.get(depId);

		JSONSerializer ser = JsonUtil.getJSONSerializer();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(ser.serialize(ulDepartment));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 绑定组织机构选择器显示列表
	 * 
	 * @author lzm
	 */
	public String depNamlist() {
		String feeRuleId = getRequest().getParameter("feeRuleId");
		QueryFilter filter = new QueryFilter(getRequest());
		List<UlDepartment> list = ulDepartmentService.getAll(filter);
		if (!("null").equals(feeRuleId) && feeRuleId != null) {
			ObFeeRule obFeeRule = obFeeRuleService.get(new Long(feeRuleId));
			Set<UlDepartment> deplist = obFeeRule.getUlDepartment();
			// 剔除已绑定的名单
			Iterator it = list.iterator();
			while (it.hasNext()) {
				UlDepartment o = (UlDepartment) it.next();
				for (UlDepartment dep : deplist) {
					if (dep.equals(o)) {
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
	 * 绑定组织机构显示列表
	 * 
	 * @author lzm
	 */
	public String zuZhiJiGouBDNamlist() {
		String feeRuleId = getRequest().getParameter("feeRuleId");
		if (!("null").equals(feeRuleId)) {
			ObFeeRule rule = obFeeRuleService.get(new Long(feeRuleId));
			Type type = new TypeToken<List<UlDepartment>>() {
			}.getType();
			if (rule != null) {
				StringBuffer buff = new StringBuffer(
						"{success:true,'totalCounts':").append(
						rule.getUlDepartment().size()).append(",result:");
				JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
				buff.append(jsonSer.serialize(rule.getUlDepartment()));
				buff.append("}");
				jsonString = buff.toString();
			}
		}
		return SUCCESS;

	}

	/**
	 * 显示详情
	 */
	public String detail() {
		Long depId = Long.parseLong(getRequest().getParameter("depId"));
		UlDepartment ulDepartment = ulDepartmentService.get(depId);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		// ser.transform(new DateTransformer("yyyy-MM-dd"), "");
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(ser.serialize(ulDepartment));
		sb.append("]}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 获取部门的联系方式
	 * 
	 * @return
	 */
	public String getContact() {
		UlDepartment ulDepartment;
		try {
			Long id = Long.parseLong(getRequest().getParameter("depId"));
			ulDepartment = ulDepartmentService.get(id);
		} catch (Exception e) {
			// 新建组织机构，没有联系方式
			ulDepartment = new UlDepartment();
		}
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		Iterator<UlContactDep> it = ulDepartment.getContacts().iterator();
		while (it.hasNext()) {
			if (it.next().getDelFlag().equals(Constants.FLAG_DELETED)) {
				it.remove();
			}
		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(ulDepartment.getContacts().size()).append(",result:");

		buff.append(ser.serialize(ulDepartment.getContacts()));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 删除部门的联系方式
	 * 
	 * @return
	 */
	public String multiDelContact() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				UlContactDep tmp = ulContactDepService.get(Long.parseLong(id));
				tmp.setDelFlag(Constants.FLAG_DELETED);
				ulContactDepService.save(tmp);
			}
		}
		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 将list中的已标记删除的节点去掉
	 * 
	 * @param list
	 * @return
	 */
	public List<UlDepartment> removeDeleted(List<UlDepartment> list) {
		Iterator<UlDepartment> i_list = list.iterator();
		while (i_list.hasNext()) {
			if (i_list.next().getStatus()
					.equals(UlDepartment.FLAG_DELETED.longValue()))
				i_list.remove();
		}
		return list;
	}
}
