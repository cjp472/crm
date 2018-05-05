package com.ulane.running.action.pap;
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


import com.ulane.running.model.pap.PapAnsSummary;
import com.ulane.running.service.pap.PapAnsSummaryService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class PapAnsSummaryAction extends BaseAction{
	@Resource
	private PapAnsSummaryService papAnsSummaryService;
	private PapAnsSummary papAnsSummary;
	
	private Long papAnsId;

	public Long getPapAnsId() {
		return papAnsId;
	}

	public void setPapAnsId(Long papAnsId) {
		this.papAnsId = papAnsId;
	}

	public PapAnsSummary getPapAnsSummary() {
		return papAnsSummary;
	}

	public void setPapAnsSummary(PapAnsSummary papAnsSummary) {
		this.papAnsSummary = papAnsSummary;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<PapAnsSummary> list= papAnsSummaryService.getAll(filter);
		
		Type type=new TypeToken<List<PapAnsSummary>>(){}.getType();
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
				papAnsSummaryService.remove(new Long(id));
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
		PapAnsSummary papAnsSummary=papAnsSummaryService.get(papAnsId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(papAnsSummary));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(papAnsSummary.getPapAnsId()==null){
			papAnsSummaryService.save(papAnsSummary);
		}else{
			PapAnsSummary orgPapAnsSummary=papAnsSummaryService.get(papAnsSummary.getPapAnsId());
			try{
				BeanUtil.copyNotNullProperties(orgPapAnsSummary, papAnsSummary);
				papAnsSummaryService.save(orgPapAnsSummary);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
