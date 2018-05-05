package com.ulane.customer.action.customer;
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


import com.ulane.customer.model.customer.ConBwListTimeRul;
import com.ulane.customer.service.customer.ConBwListTimeRulService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ConBwListTimeRulAction extends BaseAction{
	@Resource
	private ConBwListTimeRulService conBwListTimeRulService;
	private ConBwListTimeRul conBwListTimeRul;
	
	private Long bwListTimeRulId;

	public Long getBwListTimeRulId() {
		return bwListTimeRulId;
	}

	public void setBwListTimeRulId(Long bwListTimeRulId) {
		this.bwListTimeRulId = bwListTimeRulId;
	}

	public ConBwListTimeRul getConBwListTimeRul() {
		return conBwListTimeRul;
	}

	public void setConBwListTimeRul(ConBwListTimeRul conBwListTimeRul) {
		this.conBwListTimeRul = conBwListTimeRul;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ConBwListTimeRul> list= conBwListTimeRulService.getAll(filter);
		

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		
        JSONSerializer serializer = new JSONSerializer();
        serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[] { "staDate","endDate"});
        buff.append(serializer.serialize(list));

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
				conBwListTimeRulService.remove(new Long(id));
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
		ConBwListTimeRul conBwListTimeRul=conBwListTimeRulService.get(bwListTimeRulId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(conBwListTimeRul));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(conBwListTimeRul.getBwListTimeRulId()==null){
			conBwListTimeRulService.save(conBwListTimeRul);
		}else{
			ConBwListTimeRul orgConBwListTimeRul=conBwListTimeRulService.get(conBwListTimeRul.getBwListTimeRulId());
			try{
				BeanUtil.copyNotNullProperties(orgConBwListTimeRul, conBwListTimeRul);
				conBwListTimeRulService.save(orgConBwListTimeRul);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
