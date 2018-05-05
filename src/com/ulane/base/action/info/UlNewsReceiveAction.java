package com.ulane.base.action.info;
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


import com.ulane.base.model.info.UlNewsReceive;
import com.ulane.base.service.info.UlNewsReceiveService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UlNewsReceiveAction extends BaseAction{
	@Resource
	private UlNewsReceiveService ulNewsReceiveService;
	private UlNewsReceive ulNewsReceive;
	
	private Long receiveId;

	public Long getReceiveId() {
		return receiveId;
	}

	public void setReceiveId(Long receiveId) {
		this.receiveId = receiveId;
	}

	public UlNewsReceive getUlNewsReceive() {
		return ulNewsReceive;
	}

	public void setUlNewsReceive(UlNewsReceive ulNewsReceive) {
		this.ulNewsReceive = ulNewsReceive;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UlNewsReceive> list= ulNewsReceiveService.getAll(filter);
		
		Type type=new TypeToken<List<UlNewsReceive>>(){}.getType();
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
				ulNewsReceiveService.remove(new Long(id));
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
		UlNewsReceive ulNewsReceive=ulNewsReceiveService.get(receiveId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ulNewsReceive));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ulNewsReceive.getReceiveId()==null){
			ulNewsReceiveService.save(ulNewsReceive);
		}else{
			UlNewsReceive orgUlNewsReceive=ulNewsReceiveService.get(ulNewsReceive.getReceiveId());
			try{
				BeanUtil.copyNotNullProperties(orgUlNewsReceive, ulNewsReceive);
				ulNewsReceiveService.save(orgUlNewsReceive);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
