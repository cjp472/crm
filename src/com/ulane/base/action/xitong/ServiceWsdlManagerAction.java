package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;


import com.ulane.base.model.xitong.ServiceWsdlManager;
import com.ulane.base.model.xitong.ServiceWsdlMethod;
import com.ulane.base.service.xitong.ServiceWsdlManagerService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ServiceWsdlManagerAction extends BaseAction{
	@Resource
	private ServiceWsdlManagerService serviceWsdlManagerService;
	@Resource
	private AppUserService appUserService;
	private ServiceWsdlManager serviceWsdlManager;
	
	private Long serviceWsdlId;

	public Long getServiceWsdlId() {
		return serviceWsdlId;
	}

	public void setServiceWsdlId(Long serviceWsdlId) {
		this.serviceWsdlId = serviceWsdlId;
	}

	public ServiceWsdlManager getServiceWsdlManager() {
		return serviceWsdlManager;
	}

	public void setServiceWsdlManager(ServiceWsdlManager serviceWsdlManager) {
		this.serviceWsdlManager = serviceWsdlManager;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		List<ServiceWsdlManager> list= serviceWsdlManagerService.getAll(filter);
		
		setName(list);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = JsonUtil.getJSONSerializer();
		buff.append(serializer.serialize(list));
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
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
				serviceWsdlManagerService.remove(new Long(id));
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
		ServiceWsdlManager serviceWsdlManager=serviceWsdlManagerService.get(serviceWsdlId);
		
		JSONSerializer json = JsonUtil.getJSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.serialize(serviceWsdlManager));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String methods = getRequest().getParameter("method");
		if (StringUtils.isNotEmpty(methods)) {
			Gson gson = new Gson();
			ServiceWsdlMethod[] methods_ = (ServiceWsdlMethod[]) gson.fromJson(methods,
					ServiceWsdlMethod[].class);
			serviceWsdlManager.getServiceWsdlMethods().clear();
			if (methods_ != null) {
				for (ServiceWsdlMethod method : methods_) {
					method.setServiceWsdlManager(serviceWsdlManager);
					serviceWsdlManager.addMethod(method);
				}
			}
		}
		
		
		if(serviceWsdlManager.getServiceWsdlId()==null){
			serviceWsdlManager.setCreateBy(ContextUtil.getCurrentUserId());
			serviceWsdlManager.setCreateDate(new Date());
			serviceWsdlManagerService.save(serviceWsdlManager);
		}else{
			ServiceWsdlManager orgServiceWsdlManager=serviceWsdlManagerService.get(serviceWsdlManager.getServiceWsdlId());
			try{
				BeanUtil.copyNotNullProperties(orgServiceWsdlManager, serviceWsdlManager);
				serviceWsdlManagerService.merge(orgServiceWsdlManager);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 获取接口方法信息
	 * @return
	 */
	public String getMethod(){
		if(serviceWsdlId == null){
			return SUCCESS;
		}
		ServiceWsdlManager serviceWsdlManager=serviceWsdlManagerService.get(serviceWsdlId);
		
		JSONSerializer json = JsonUtil.getJSONSerializer();
		//将数据转成JSON格式
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
        	.append(serviceWsdlManager.getServiceWsdlMethods().size())
        	.append(",result:");
        buff.append(json.serialize(serviceWsdlManager.getServiceWsdlMethods()));
        buff.append("}");
		setJsonString(buff.toString());
		
		return SUCCESS;
	}
	
	/**
	 * 设置创建者，修改者名字
	 * @param data
	 */
	private void setName(List<ServiceWsdlManager> data){
		for(ServiceWsdlManager swm : data){
			Long create = swm.getCreateBy();
			Long update = swm.getUpdateBy();
			if(create != null){
				AppUser au = appUserService.get(create);
				if(au != null){
					swm.setCreaterName(au.getFullname());
				}
			}
			if(update != null){
				AppUser au = appUserService.get(update);
				if(au != null){
					swm.setUpdaterName(au.getFullname());
				}
			}
		}
	}
}
