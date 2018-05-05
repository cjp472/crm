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


import com.ulane.running.model.comtech.CtScrAnsSummary;
import com.ulane.running.service.comtech.CtScrAnsSummaryService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CtScrAnsSummaryAction extends BaseAction{
	@Resource
	private CtScrAnsSummaryService ctScrAnsSummaryService;
	private CtScrAnsSummary ctScrAnsSummary;
	
	private Long scrAnsId;

	public Long getScrAnsId() {
		return scrAnsId;
	}

	public void setScrAnsId(Long scrAnsId) {
		this.scrAnsId = scrAnsId;
	}

	public CtScrAnsSummary getCtScrAnsSummary() {
		return ctScrAnsSummary;
	}

	public void setCtScrAnsSummary(CtScrAnsSummary ctScrAnsSummary) {
		this.ctScrAnsSummary = ctScrAnsSummary;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CtScrAnsSummary> list= ctScrAnsSummaryService.getAll(filter);
		
		Type type=new TypeToken<List<CtScrAnsSummary>>(){}.getType();
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
				ctScrAnsSummaryService.remove(new Long(id));
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
		CtScrAnsSummary ctScrAnsSummary=ctScrAnsSummaryService.get(scrAnsId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ctScrAnsSummary));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ctScrAnsSummary.getScrAnsId()==null){
			ctScrAnsSummaryService.save(ctScrAnsSummary);
		}else{
			CtScrAnsSummary orgCtScrAnsSummary=ctScrAnsSummaryService.get(ctScrAnsSummary.getScrAnsId());
			try{
				BeanUtil.copyNotNullProperties(orgCtScrAnsSummary, ctScrAnsSummary);
				ctScrAnsSummaryService.save(orgCtScrAnsSummary);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
