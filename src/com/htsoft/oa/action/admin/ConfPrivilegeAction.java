package com.htsoft.oa.action.admin;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;

import com.htsoft.oa.model.admin.ConfPrivilege;
import com.htsoft.oa.service.admin.ConfPrivilegeService;

/**
 * @description ConfPrivilegeAction
 * @author YHZ
 * @date 2010-10-8 PM
 * 
 */
public class ConfPrivilegeAction extends BaseAction {
	@Resource
	private ConfPrivilegeService confPrivilegeService;
	private ConfPrivilege confPrivilege;

	private Long privilegeId;

	public Long getPrivilegeId() {
		return privilegeId;
	}

	public void setPrivilegeId(Long privilegeId) {
		this.privilegeId = privilegeId;
	}

	public ConfPrivilege getConfPrivilege() {
		return confPrivilege;
	}

	public void setConfPrivilege(ConfPrivilege confPrivilege) {
		this.confPrivilege = confPrivilege;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<ConfPrivilege> list = confPrivilegeService.getAll(filter);

		Type type = new TypeToken<List<ConfPrivilege>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		Gson gson = new Gson();
		buff.append(gson.toJson(list, type));
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

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				confPrivilegeService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		ConfPrivilege confPrivilege = confPrivilegeService.get(privilegeId);

		Gson gson = new Gson();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(confPrivilege));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		confPrivilegeService.save(confPrivilege);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 判断查看权限
	 */
	public String allowView() {
		String confId = getRequest().getParameter("confId");
		Short st = confPrivilegeService.getPrivilege(new Long(confId),
				(short) 1);
		if (st == 1)
			setJsonString("{success:true}");
		else
			setJsonString("{failure:true,msg:'对不起，您没有权限查看该会议内容，请原谅！'}");
		return SUCCESS;
	}

	//判断修改权限
	public String allowUpdater() {
		String confId = getRequest().getParameter("confId");
		Short st = confPrivilegeService.getPrivilege(new Long(confId),
				(short) 2);
		if (st == 2)
			setJsonString("{success:true}");
		else
			setJsonString("{failure:true,msg:'对不起，您没有权限编辑该会议内容，请原谅！'}");
		return SUCCESS;
	}
}
