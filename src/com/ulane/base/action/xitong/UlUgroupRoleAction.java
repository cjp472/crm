package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.base.model.xitong.UlUgroupRole;
import com.ulane.base.service.xitong.UlUgroupRoleService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class UlUgroupRoleAction extends BaseAction{
	@Resource
	private UlUgroupRoleService ulUgroupRoleService;
	private UlUgroupRole ulUgroupRole;
	
	private Long ugRoleId;

	public Long getUgRoleId() {
		return ugRoleId;
	}

	public void setUgRoleId(Long ugRoleId) {
		this.ugRoleId = ugRoleId;
	}

	public UlUgroupRole getUlUgroupRole() {
		return ulUgroupRole;
	}

	public void setUlUgroupRole(UlUgroupRole ulUgroupRole) {
		this.ulUgroupRole = ulUgroupRole;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UlUgroupRole> list= ulUgroupRoleService.getAll(filter);
		
		Type type=new TypeToken<List<UlUgroupRole>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				ulUgroupRoleService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		UlUgroupRole ulUgroupRole=ulUgroupRoleService.get(ugRoleId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ulUgroupRole));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ulUgroupRole.getUgRoleId()==null){
			ulUgroupRoleService.save(ulUgroupRole);
		}else{
			UlUgroupRole orgUlUgroupRole=ulUgroupRoleService.get(ulUgroupRole.getUgRoleId());
			try{
				BeanUtil.copyNotNullProperties(orgUlUgroupRole, ulUgroupRole);
				ulUgroupRoleService.save(orgUlUgroupRole);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 联合查询
	 */
	public String combo(){
		UlUgroupRole ulUgroupRole=ulUgroupRoleService.get(ugRoleId);
		
		JSONSerializer jsonser = JsonUtil.getJSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(jsonser.serialize(ulUgroupRole));
		sb.append("}");
		setJsonString(sb.toString());
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
