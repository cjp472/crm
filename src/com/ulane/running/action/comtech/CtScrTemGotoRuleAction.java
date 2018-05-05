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


import com.ulane.running.model.comtech.CtScrTemGotoRule;
import com.ulane.running.service.comtech.CtScrTemGotoRuleService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CtScrTemGotoRuleAction extends BaseAction{
	@Resource
	private CtScrTemGotoRuleService ctScrTemGotoRuleService;
	private CtScrTemGotoRule ctScrTemGotoRule;
	
	private Long scrTemGotoRuleId;

	public Long getScrTemGotoRuleId() {
		return scrTemGotoRuleId;
	}

	public void setScrTemGotoRuleId(Long scrTemGotoRuleId) {
		this.scrTemGotoRuleId = scrTemGotoRuleId;
	}

	public CtScrTemGotoRule getCtScrTemGotoRule() {
		return ctScrTemGotoRule;
	}

	public void setCtScrTemGotoRule(CtScrTemGotoRule ctScrTemGotoRule) {
		this.ctScrTemGotoRule = ctScrTemGotoRule;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CtScrTemGotoRule> list= ctScrTemGotoRuleService.getAll(filter);
		
		Type type=new TypeToken<List<CtScrTemGotoRule>>(){}.getType();
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
				ctScrTemGotoRuleService.remove(new Long(id));
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
		CtScrTemGotoRule ctScrTemGotoRule=ctScrTemGotoRuleService.get(scrTemGotoRuleId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ctScrTemGotoRule));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ctScrTemGotoRule.getScrTemGotoRuleId()==null){
			ctScrTemGotoRuleService.save(ctScrTemGotoRule);
		}else{
			CtScrTemGotoRule orgCtScrTemGotoRule=ctScrTemGotoRuleService.get(ctScrTemGotoRule.getScrTemGotoRuleId());
			try{
				BeanUtil.copyNotNullProperties(orgCtScrTemGotoRule, ctScrTemGotoRule);
				ctScrTemGotoRuleService.save(orgCtScrTemGotoRule);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
