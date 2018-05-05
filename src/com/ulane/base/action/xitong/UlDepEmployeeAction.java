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

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.base.model.xitong.UlDepEmployee;
import com.ulane.base.service.xitong.UlDepEmployeeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UlDepEmployeeAction extends BaseAction{
	@Resource
	private UlDepEmployeeService ulDepEmployeeService;
	private UlDepEmployee ulDepEmployee;
	
	private Long depuserid;

	public Long getDepuserid() {
		return depuserid;
	}

	public void setDepuserid(Long depuserid) {
		this.depuserid = depuserid;
	}

	public UlDepEmployee getUlDepEmployee() {
		return ulDepEmployee;
	}

	public void setUlDepEmployee(UlDepEmployee ulDepEmployee) {
		this.ulDepEmployee = ulDepEmployee;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UlDepEmployee> list= ulDepEmployeeService.getAll(filter);
		
		Type type=new TypeToken<List<UlDepEmployee>>(){}.getType();
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
				ulDepEmployeeService.remove(new Long(id));
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
		UlDepEmployee ulDepEmployee=ulDepEmployeeService.get(depuserid);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ulDepEmployee));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ulDepEmployee.getDepuserid()==null){
			ulDepEmployeeService.save(ulDepEmployee);
		}else{
			UlDepEmployee orgUlDepEmployee=ulDepEmployeeService.get(ulDepEmployee.getDepuserid());
			try{
				BeanUtil.copyNotNullProperties(orgUlDepEmployee, ulDepEmployee);
				ulDepEmployeeService.save(orgUlDepEmployee);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
