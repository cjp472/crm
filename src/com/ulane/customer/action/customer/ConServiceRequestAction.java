package com.ulane.customer.action.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.customer.Customer;
import com.ulane.core.plugin.soap.impl.ServiceRequestSoapServerImpl;
import com.ulane.customer.model.customer.ConServiceRequest;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.customer.service.customer.ConServiceRequestService;
import com.ulane.customer.service.customer.CusPersonalService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ConServiceRequestAction extends BaseAction{
	@Resource
	private ConServiceRequestService conServiceRequestService;
	private ConServiceRequest conServiceRequest;
	@Resource
	private CusPersonalService cusPersonalService;
	
	private Long serviceRequestId;

	public Long getServiceRequestId() {
		return serviceRequestId;
	}

	public void setServiceRequestId(Long serviceRequestId) {
		this.serviceRequestId = serviceRequestId;
	}

	public ConServiceRequest getConServiceRequest() {
		return conServiceRequest;
	}

	public void setConServiceRequest(ConServiceRequest conServiceRequest) {
		this.conServiceRequest = conServiceRequest;
	}

	public void setCusPersonalService(CusPersonalService cusPersonalService) {
		this.cusPersonalService = cusPersonalService;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("serviceRequestId", "DESC");
		String person = getRequest().getParameter("person");
		if(person!=null && !person.equals("")){
			 filter.addFilter("Q_creUseId_L_EQ", ContextUtil.getCurrentUserId().toString());
		}
		List<ConServiceRequest> list= conServiceRequestService.getAll(filter);
		
		List<ConServiceRequest> listRequest = new ArrayList<ConServiceRequest>();
		
		for(ConServiceRequest servicerequest : list){
			if(servicerequest.getAcceptDate() != null && servicerequest.getEndtime() != null){				//换算剩余时长  
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String date1 = format1.format(new Date());
				String date2 = format.format(servicerequest.getEndtime());
				String passDate = "";
				//如果是未完成的任务，则剩余时间=当前时间-要求完成时间
				passDate = DateUtil.getFSFromTwoDate(date1, date2, "yyyy-MM-dd HH:mm:ss");
				servicerequest.setNote(passDate);
	       	}
			
			if(servicerequest.getCustomer()!=null){
				Customer custmer = servicerequest.getCustomer();
				Long customerId = custmer.getCustomerId();
				if(customerId != null){
					CusPersonal cusPersonal = cusPersonalService.get(customerId);
					servicerequest.getCustomer().setCustomerName(cusPersonal.getNameCn());
					listRequest.add(servicerequest);
				}else{
					listRequest.add(servicerequest);
				}
			}else{
				listRequest.add(servicerequest);
			}
		}
//		for(ConServiceRequest serviceRequest : list){
//			 if(serviceRequest.getAcceptDate() != null && serviceRequest.getEndtime() != null){				//换算剩余时长  
//				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//				SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//				String date1 = format1.format(new Date());
//				String date2 = format.format(serviceRequest.getEndtime());
//				String passDate = "";
//				//如果是未完成的任务，则剩余时间=当前时间-要求完成时间
//				passDate = DateUtil.getFSFromTwoDate(date1, date2, "yyyy-MM-dd HH:mm:ss");
//				serviceRequest.setNote(passDate);
//	       	 }
//		}
		Type type=new TypeToken<List<ConServiceRequest>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "startTime","acceptDate","creDat","endtime"});
		buff.append(serializer.exclude(new String[]{"customerNo"}).serialize(listRequest));
		
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
				conServiceRequestService.remove(new Long(id));
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
		ConServiceRequest conServiceRequest=conServiceRequestService.get(serviceRequestId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		String conString = gson.toJson(conServiceRequest);
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(conString.substring(0,conString.length()-1));
		if (conServiceRequest.getCustomer()!= null){
			sb.append(",'customerNo':" + conServiceRequest.getCustomer().getCustomerNo() + "}");
		}else{
			sb.append(",'customerNo':''" + "}");
		}
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(conServiceRequest.getServiceRequestId()==null){
			conServiceRequestService.save(conServiceRequest);
		}else{
			ConServiceRequest orgConServiceRequest=conServiceRequestService.get(conServiceRequest.getServiceRequestId());
			try{
				BeanUtil.copyNotNullProperties(orgConServiceRequest, conServiceRequest);
				conServiceRequestService.save(orgConServiceRequest);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 添加服务请求
	 * 
	 */
	public String addRequest(){
		String customerId = getRequest().getParameter("customerId");
		String callNumber = getRequest().getParameter("callNumber");
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		StringBuffer buffer = new StringBuffer();
		buffer.append("{'class':'com.ulane.customer.model.customer.ConServiceRequest','callNo':" + callNumber + ",'linkType':1"+",'urgent':2");
		buffer.append(",'accept':'" + ContextUtil.getCurrentUser().getFullname()+ "','acceptDate':'" + format.format(new Date()) + "'");
		if (customerId != null && !customerId.equals("")){
			buffer.append(",'customer':{'customerId':" + new Long(customerId) + "}");
		}
		buffer.append("}");
		ServiceRequestSoapServerImpl srssi = new ServiceRequestSoapServerImpl();
		String result = srssi.addConServiceRequest(buffer.toString());
//		System.out.println(result + "====添加服务请求返回结果值");
		setJsonString(result);
		return SUCCESS;
	}
	
	/**
	 * 更新服务请求
	 */
	public String updateRequest(){
		String serRequestId = getRequest().getParameter("serviceRequestId");
		String customerId = getRequest().getParameter("customerId");
		//服务类型
		String conResId = getRequest().getParameter("conResId");
		//处理结果
		String dealResult = getRequest().getParameter("dealResult");
		String subStatus = getRequest().getParameter("subStatus");
		//联络事项
		String busiType_form = getRequest().getParameter("busiType_form");
		//联络内容
		String callContent = getRequest().getParameter("callContent");
		
//		System.out.println(serRequestId + "==" + conResId + "---" + busiType_form + "***" + callContent);
		StringBuffer buffer = new StringBuffer();
		buffer.append("{'serviceRequestId':" + Long.parseLong(serRequestId));
		if (busiType_form != null && !busiType_form.equals("")){
			buffer.append(",'busType':"+busiType_form);
		}
		if (callContent != null && !callContent.equals("")){
			buffer.append(",'content':'" + callContent + "'");
		}
		if (conResId != null && !conResId.equals("")){
			buffer.append(",'type':" + conResId);
		}
		if (customerId != null && !customerId.equals("")){
			buffer.append(",'customer':{'customerId':" + new Long(customerId) + "}");
		}
		if (dealResult != null && !dealResult.equals("")){
			buffer.append(",'status':" + dealResult);
			if(dealResult.equals("2")){
				buffer.append(",'endtime':'" + DateUtil.getFormatTime(new Date()) + "'");
			}
		}
		if (subStatus != null && !subStatus.equals("")){
			buffer.append(",'substatus':" + subStatus);
		}
		buffer.append("}");
		ServiceRequestSoapServerImpl srssi = new ServiceRequestSoapServerImpl();
		String result = srssi.updateConServiceRequest(buffer.toString());
//		System.out.println(result + "====更新服务请求返回结果值");
		setJsonString(result);
		return SUCCESS;
	}
	
	/**
	 * 更新服务请求（处理请求）
	 */
	public String updateHandleRequest(){
		String serRequestId = getRequest().getParameter("serviceRequestId");
		//处理结果（状态与子状态）
		String status = getRequest().getParameter("status");
		String subStatus = getRequest().getParameter("subStatus");
		StringBuffer buffer = new StringBuffer();
		buffer.append("{'serviceRequestId':" + Long.parseLong(serRequestId));
		if (status != null && !status.equals("")){
			buffer.append(",'status':" + status);
			if(status.equals("2")){
				buffer.append(",'endtime':'" + DateUtil.getFormatTime(new Date()) + "'");
			}
		}
		if (subStatus != null && !subStatus.equals("")){
			buffer.append(",'substatus':" + subStatus);
		}
		buffer.append("}");
		ServiceRequestSoapServerImpl srssi = new ServiceRequestSoapServerImpl();
		srssi.updateConServiceRequest(buffer.toString());
//		setJsonString(result);
		return SUCCESS;
	}
	
	/**
	 * 根据客户Id查询服务请求
	 */
	public String listServiceRequest(){
		String customerId = getRequest().getParameter("customerId");
		String start = getRequest().getParameter("start");
		String limit = getRequest().getParameter("limit");
//		QueryFilter filter=new QueryFilter(getRequest());
		if(customerId !=null && customerId.equals("-1")){
			customerId = "";
		}
		ServiceRequestSoapServerImpl chssi = new ServiceRequestSoapServerImpl();
		List<ConServiceRequest> list = chssi.listConServiceRequestByCusId("{success:true,'start':" + start + ",'limit':" + limit + ",'Q_customer.customerId_L_EQ':" + customerId + "}");
		StringBuffer buff = null;
		if(list!=null && list.size()>0){
			//Type type=new TypeToken<List<ConServiceRequest>>(){}.getType();
		    //buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			buff = new StringBuffer("{success:true,result:");
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "starttime","endtime"});
			buff.append(serializer.exclude(new String[]{"class","ConServiceRequest"}).serialize(list));
		}else{
			buff = new StringBuffer("{success:true");
		}
//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}
}

