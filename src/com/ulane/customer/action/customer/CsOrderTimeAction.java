package com.ulane.customer.action.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import java.math.BigDecimal;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.service.system.DictionaryService;


import com.ulane.core.DateUtil;
import com.ulane.customer.model.customer.CsOrderTime;
import com.ulane.customer.service.customer.CsOrderTimeService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CsOrderTimeAction extends BaseAction{
	@Resource
	private CsOrderTimeService csOrderTimeService;
	@Resource
	private DictionaryService dictionaryService;
	private CsOrderTime csOrderTime;
	
	private Long orderTimeId;

	public Long getOrderTimeId() {
		return orderTimeId;
	}

	public void setOrderTimeId(Long orderTimeId) {
		this.orderTimeId = orderTimeId;
	}

	public CsOrderTime getCsOrderTime() {
		return csOrderTime;
	}

	public void setCsOrderTime(CsOrderTime csOrderTime) {
		this.csOrderTime = csOrderTime;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("orderTimeId", "desc");
		List<CsOrderTime> list= csOrderTimeService.getAll(filter);
		
//		Type type=new TypeToken<List<CsOrderTime>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer serializer = new JSONSerializer();
		buff.append(serializer.serialize(list));
		
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
				csOrderTimeService.remove(new Long(id));
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
		CsOrderTime csOrderTime=csOrderTimeService.get(orderTimeId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
//		sb.append(gson.toJson(csOrderTime));
		
		JSONSerializer serializer = new JSONSerializer();
		sb.append(serializer.serialize(csOrderTime));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		
		if(csOrderTime.getOrderTimeId()==null){
			csOrderTime.setCreateUser(ContextUtil.getCurrentUser());
			csOrderTime.setCreateTime(new Date());
			csOrderTimeService.save(csOrderTime);
		}else{
			CsOrderTime orgCsOrderTime=csOrderTimeService.get(csOrderTime.getOrderTimeId());
			try{
				BeanUtil.copyNotNullProperties(orgCsOrderTime, csOrderTime);
				orgCsOrderTime.setUpdateUser(ContextUtil.getCurrentUser());
				orgCsOrderTime.setUpdateTime(new Date());
				csOrderTimeService.save(orgCsOrderTime);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String getDicId(){
		String LYId = getRequest().getParameter("LYId");			//来源ID
		String KHId = getRequest().getParameter("KHId");	//客户等级ID
		CsOrderTime LYCsOrderTime = csOrderTimeService.getByDicId(new Long(LYId));
		BigDecimal responseTime1 = new BigDecimal(0);
		BigDecimal completionTime1 = new BigDecimal(0);
		if(KHId!=null && !KHId.equals("") && !KHId.equals("null")){
			Dictionary  dictionary = dictionaryService.getByMapNameAndItemIndex("CONKHJB", new String[]{KHId}).get(0);
			CsOrderTime KHCsOrderTime = csOrderTimeService.getByDicId(dictionary.getDicId());
			if(KHCsOrderTime != null){
				responseTime1 = LYCsOrderTime.getResponseTime().add(KHCsOrderTime.getResponseTime());
				completionTime1 =  LYCsOrderTime.getCompletionTime().add(KHCsOrderTime.getCompletionTime());
			} else {
				responseTime1 = LYCsOrderTime.getResponseTime();
				completionTime1 =  LYCsOrderTime.getCompletionTime();
			}
		}else{
			 responseTime1 = LYCsOrderTime.getResponseTime();
			 completionTime1 =  LYCsOrderTime.getCompletionTime();
		}

		int responseTime2 = (responseTime1.multiply(new BigDecimal(60))).intValue();
		int completionTime2 = (completionTime1.multiply(new BigDecimal(60))).intValue();
		
		Date d = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(d);
		calendar.add(Calendar.MINUTE,responseTime2);
		
		Calendar calendar1 = Calendar.getInstance();
		calendar1.setTime(d);
		calendar1.add(Calendar.MINUTE,completionTime2);
		
		Date dueDate =  calendar.getTime();
		Date needsDate = calendar1.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		setJsonString("{success:true,dueDate:'"+sdf.format(dueDate)+"',needsDate:'"+sdf.format(needsDate)+"'}");
		return SUCCESS;
	}
}
