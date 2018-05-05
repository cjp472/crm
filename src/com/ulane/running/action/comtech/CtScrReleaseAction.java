package com.ulane.running.action.comtech;
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


import com.ulane.running.model.comtech.CtScrRelease;
import com.ulane.running.service.comtech.CtScrReleaseService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CtScrReleaseAction extends BaseAction{
	@Resource
	private CtScrReleaseService ctScrReleaseService;
	private CtScrRelease ctScrRelease;
	
	private Long scrId;

	public Long getScrId() {
		return scrId;
	}

	public void setScrId(Long scrId) {
		this.scrId = scrId;
	}

	public CtScrRelease getCtScrRelease() {
		return ctScrRelease;
	}

	public void setCtScrRelease(CtScrRelease ctScrRelease) {
		this.ctScrRelease = ctScrRelease;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CtScrRelease> list= ctScrReleaseService.getAll(filter);
		
		Type type=new TypeToken<List<CtScrRelease>>(){}.getType();
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
				ctScrReleaseService.remove(new Long(id));
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
		CtScrRelease ctScrRelease=ctScrReleaseService.get(scrId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ctScrRelease));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ctScrRelease.getScrId()==null){
			ctScrReleaseService.save(ctScrRelease);
		}else{
			CtScrRelease orgCtScrRelease=ctScrReleaseService.get(ctScrRelease.getScrId());
			try{
				BeanUtil.copyNotNullProperties(orgCtScrRelease, ctScrRelease);
				ctScrReleaseService.save(orgCtScrRelease);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
