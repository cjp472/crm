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


import com.ulane.base.model.xitong.UlUgroupUser;
import com.ulane.base.service.xitong.UlUgroupUserService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class UlUgroupUserAction extends BaseAction{
	@Resource
	private UlUgroupUserService ulUgroupUserService;
	private UlUgroupUser ulUgroupUser;
	
	private Long ugUId;

	public Long getUgUId() {
		return ugUId;
	}

	public void setUgUId(Long ugUId) {
		this.ugUId = ugUId;
	}

	public UlUgroupUser getUlUgroupUser() {
		return ulUgroupUser;
	}

	public void setUlUgroupUser(UlUgroupUser ulUgroupUser) {
		this.ulUgroupUser = ulUgroupUser;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UlUgroupUser> list= ulUgroupUserService.getAll(filter);
		
		Type type=new TypeToken<List<UlUgroupUser>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer jsonser = JsonUtil.getJSONSerializer();
		buff.append(jsonser.serialize(list));
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
				ulUgroupUserService.remove(new Long(id));
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
		UlUgroupUser ulUgroupUser=ulUgroupUserService.get(ugUId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ulUgroupUser));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ulUgroupUser.getUgUserId()==null){
			ulUgroupUserService.save(ulUgroupUser);
		}else{
			UlUgroupUser orgUlUgroupUser=ulUgroupUserService.get(ulUgroupUser.getUgUserId());
			try{
				BeanUtil.copyNotNullProperties(orgUlUgroupUser, ulUgroupUser);
				ulUgroupUserService.save(orgUlUgroupUser);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
