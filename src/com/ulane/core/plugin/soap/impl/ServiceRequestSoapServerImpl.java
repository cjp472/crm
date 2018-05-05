package com.ulane.core.plugin.soap.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import javax.jws.WebService;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.core.plugin.soap.ServiceRequestSoapServer;
import com.ulane.customer.dao.customer.ConServiceRequestDao;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.ConServiceRequest;
import com.ulane.customer.service.customer.ConServiceRequestService;

import flexjson.JSONSerializer;

/**
 * <p>
 * Company: http://www.ulane.cn
 * </p>
 * 
 * @author washingtin
 * @date 12-6-13
 * @version 1.0
 */
//@WebService(endpointInterface = "com.ulane.core.plugin.soap.ConHisSoapServer", serviceName = "conHisService")
//@WebService
public class ServiceRequestSoapServerImpl implements ServiceRequestSoapServer {
	Logger logger = Logger.getLogger(ServiceRequestSoapServerImpl.class);
	
	//添加服务请求
	@Override
	public String addConServiceRequest(String xmlStr) {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		ConServiceRequest conRequest = gson.fromJson(xmlStr, ConServiceRequest.class);
		
		@SuppressWarnings("unused")
		ConServiceRequestDao conServiceDao = (ConServiceRequestDao) AppUtil.getBean("conServiceRequestDao");
		ConServiceRequestService conServiceRequest = (ConServiceRequestService) AppUtil.getBean("conServiceRequestService");
		
		conRequest.setStatus(1L);
//		conRequest.setStarttime(new Date()); //要求完成时间
		conRequest.setCreDat(new Date());;
		conRequest.setCreUseId(ContextUtil.getCurrentUserId());
		StringBuffer strBuff = new StringBuffer();
		conRequest = conServiceRequest.save(conRequest);
		strBuff.append("{serviceRequestId : " + conRequest.getServiceRequestId() + "}");
		return strBuff.toString();
	}
	//更新服务请求
	@Override
	public String updateConServiceRequest(String xmlStr) {
		//TODO Auto-generated method stub
		Gson gson = new Gson();
		ConServiceRequest conRequest = gson.fromJson(xmlStr, ConServiceRequest.class);
		
		@SuppressWarnings("unused")
		ConServiceRequestDao conServiceDao = (ConServiceRequestDao) AppUtil.getBean("conServiceRequestDao");
		
		ConServiceRequestService conServiceRequest = (ConServiceRequestService) AppUtil.getBean("conServiceRequestService");
		
		ConServiceRequest orgServiceRequest=conServiceRequest.get(conRequest.getServiceRequestId());
		StringBuffer buffer = new StringBuffer();
		
		try{
			BeanUtil.copyNotNullProperties(orgServiceRequest,conRequest);
//			orgServiceRequest.setEndtime(new Date());//完成时间
			orgServiceRequest.setUpdDat(new Date());
			orgServiceRequest.setUpdUseId(ContextUtil.getCurrentUserId());
			
			conRequest = conServiceRequest.save(orgServiceRequest);
		}catch(Exception ex){
			logger.error(ex.getMessage());
		}
		if (conRequest != null)
		{
			buffer.append("更新服务请求成功");
		}else{
			buffer.append("更新服务请求失败");
		}
		
		return buffer.toString();
	}
	/**
	 * 根据客户Id查询服务请求
	 */
	@Override
	public List<ConServiceRequest> listConServiceRequestByCusId(String xmlStr) {
		QueryFilter filter=new QueryFilter();
//		StringBuffer buffer = new StringBuffer();
		Map<String,String> pages = getPageMessage(xmlStr);
		xmlStr = pages.get("xmlStr");
		String customerIdStr = xmlStr.substring(xmlStr.indexOf("Q_customer.customerId_L_EQ"),xmlStr.indexOf("}"));
		String customerId = customerIdStr.substring(customerIdStr.indexOf(":") + 1);
		PagingBean pb = new PagingBean(Integer.parseInt(pages.get("start")),Integer.parseInt(pages.get("limit")));
		filter.setPagingBean(pb);
		filter.addFilter("Q_customer.customerId_L_EQ", customerId);
		filter.addSorted("serviceRequestId", "DESC");
		ConServiceRequestService conServiceRequest = (ConServiceRequestService) AppUtil.getBean("conServiceRequestService");
		List<ConServiceRequest> orgServiceRequest = conServiceRequest.getAllNoRequest(filter);
//		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();		
//		buffer.append(jsonSer.serialize(orgServiceRequest));
//		return buffer.toString();
		return orgServiceRequest;
	}
	
	private Map<String,String> getPageMessage(String xmlStr){
//		拆分xmlStr，提取分页
		String str = xmlStr;
		String start = "'start':";
		String pageSize = "'limit':";
		String startStr = "";
		String pageSizeStr = "";
		if(str.substring(str.indexOf(start)).contains(",")){
			startStr = str.substring(str.indexOf(start), str.indexOf(",", str.indexOf(start))+1);
		}else{
			startStr = str.substring(str.indexOf(start),str.indexOf("}"));
		}
		if(str.substring(str.indexOf(pageSize)).contains(",")){
			pageSizeStr = str.substring(str.indexOf(pageSize), str.indexOf(",", str.indexOf(pageSize))+1);
		}else{
			pageSizeStr = str.substring(str.indexOf(pageSize),str.indexOf("}"));
		}
		Map<String,String> result = new HashMap<String,String>(); 
		xmlStr = xmlStr.replaceAll(startStr, "");
		xmlStr = xmlStr.replaceAll(pageSizeStr, "");
		if(startStr.contains(",")){
			result.put("start",startStr.substring(startStr.indexOf(":")+1,startStr.indexOf(",")));
		}else{
			result.put("start",startStr.substring(startStr.indexOf(":")+1));
		}
		if(pageSizeStr.contains(",")){
			result.put("limit",pageSizeStr.substring(pageSizeStr.indexOf(":")+1,pageSizeStr.indexOf(",")));
		}else{
			result.put("limit",pageSizeStr.substring(pageSizeStr.indexOf(":")+1));
		}
		result.put("xmlStr",xmlStr);
		return result;
	} 
	
}
