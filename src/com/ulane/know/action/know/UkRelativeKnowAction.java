package com.ulane.know.action.know;
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


import com.ulane.know.model.know.UkRelativeKnow;
import com.ulane.know.service.know.UkRelativeKnowService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UkRelativeKnowAction extends BaseAction{
	@Resource
	private UkRelativeKnowService ukRelativeKnowService;
	private UkRelativeKnow ukRelativeKnow;
	
	private Long relativeId;

	public Long getRelativeId() {
		return relativeId;
	}

	public void setRelativeId(Long relativeId) {
		this.relativeId = relativeId;
	}

	public UkRelativeKnow getUkRelativeKnow() {
		return ukRelativeKnow;
	}

	public void setUkRelativeKnow(UkRelativeKnow ukRelativeKnow) {
		this.ukRelativeKnow = ukRelativeKnow;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UkRelativeKnow> list= ukRelativeKnowService.getAll(filter);
		
		Type type=new TypeToken<List<UkRelativeKnow>>(){}.getType();
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
				ukRelativeKnowService.remove(new Long(id));
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
		UkRelativeKnow ukRelativeKnow=ukRelativeKnowService.get(relativeId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ukRelativeKnow));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ukRelativeKnow.getRelativeId()==null){
			ukRelativeKnowService.save(ukRelativeKnow);
		}else{
			UkRelativeKnow orgUkRelativeKnow=ukRelativeKnowService.get(ukRelativeKnow.getRelativeId());
			try{
				BeanUtil.copyNotNullProperties(orgUkRelativeKnow, ukRelativeKnow);
				ukRelativeKnowService.save(orgUkRelativeKnow);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
