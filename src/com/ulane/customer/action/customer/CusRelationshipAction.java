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


import com.ulane.customer.model.customer.CusRelationship;
import com.ulane.customer.service.customer.CusRelationshipService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CusRelationshipAction extends BaseAction{
	@Resource
	private CusRelationshipService cusRelationshipService;
	private CusRelationship cusRelationship;
	
	private Long relationshipId;

	public Long getRelationshipId() {
		return relationshipId;
	}

	public void setRelationshipId(Long relationshipId) {
		this.relationshipId = relationshipId;
	}

	public CusRelationship getCusRelationship() {
		return cusRelationship;
	}

	public void setCusRelationship(CusRelationship cusRelationship) {
		this.cusRelationship = cusRelationship;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CusRelationship> list= cusRelationshipService.getAll(filter);
		
		Type type=new TypeToken<List<CusRelationship>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
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
				cusRelationshipService.remove(new Long(id));
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
		CusRelationship cusRelationship=cusRelationshipService.get(relationshipId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(cusRelationship));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(cusRelationship.getRelationshipId()==null){
			cusRelationshipService.save(cusRelationship);
		}else{
			CusRelationship orgCusRelationship=cusRelationshipService.get(cusRelationship.getRelationshipId());
			try{
				BeanUtil.copyNotNullProperties(orgCusRelationship, cusRelationship);
				cusRelationshipService.save(orgCusRelationship);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 获取相关客户
	 * @return
	 */
	public String getCusRelation() {
		QueryFilter filter = new QueryFilter(getRequest());
		String cusId = getRequest().getParameter("cusId");
		String result = null;
		if (cusId != null && !cusId.equals("")){
			result = cusRelationshipService.getCusRelation(cusId,filter.getPagingBean());
		}else {
			result = "{success:true,'totalCounts':0,result:[]}";
		}
		
		setJsonString(result);
		return SUCCESS;
	}
}
