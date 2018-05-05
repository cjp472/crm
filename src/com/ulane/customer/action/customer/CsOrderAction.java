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
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.core.plugin.client.NcSoapClientManager;
import com.ulane.customer.model.customer.CsOrder;
import com.ulane.customer.service.customer.CsOrderService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CsOrderAction extends BaseAction{
	@Resource
	private CsOrderService csOrderService;
	@Resource
	private NcSoapClientManager ncSoapClientManager;
	private CsOrder csOrder;
	
	private Long orderId;

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public CsOrder getCsOrder() {
		return csOrder;
	}

	public void setCsOrder(CsOrder csOrder) {
		this.csOrder = csOrder;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CsOrder> list= csOrderService.getAll(filter);
		
		Type type=new TypeToken<List<CsOrder>>(){}.getType();
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
				csOrderService.remove(new Long(id));
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
		CsOrder csOrder=csOrderService.get(orderId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
//		sb.append(gson.toJson(csOrder));
		
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "responseTime","orderTime","completionTime" });
		sb.append(serializer.serialize(csOrder));
		
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(csOrder.getRegionid()==null){
			csOrder.setRegion(null);
		}
		if(csOrder.getDepid()==null){
			csOrder.setUlDepartment(null);
		}
		if(csOrder.getOrderId()==null){
			csOrderService.save(csOrder);
		}else{
			CsOrder orgCsOrder=csOrderService.get(csOrder.getOrderId());
			try{
				BeanUtil.copyNotNullProperties(orgCsOrder, csOrder);
				//csOrderService.save(orgCsOrder);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	//工单接口　KYQ
	public String getGongDan(){
		String orderId = getRequest().getParameter("orderId");
		CsOrder csOrder = csOrderService.get(new Long(orderId));
		Long userId = csOrder.getUserid();
		Long customerId = csOrder.getCustomerid();
		Long regionId = csOrder.getRegionid();
		Long depId = csOrder.getDepid();
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(ser.exclude("runid").exclude("nodeName").exclude(
				"approvalStatus").exclude("appUser").exclude("customer")
				.exclude("region").exclude("ulDepartment").exclude("userid").serialize(csOrder));
		sb.deleteCharAt(sb.length() - 1);  //去掉最后的大括号
		sb.append(",\"appUser\":\"").append(userId).append(",\"customerNo\":\"")
				.append(customerId).append(",\"region\":\"").append(regionId)
				.append(",\"ulDepartment\":\"").append(depId);
        sb.append("}");
		sb.append("}");
		ncSoapClientManager.getGongDan(sb.toString());
		
		return SUCCESS;
	}
}
