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


import com.ulane.customer.model.customer.CusPurchaseCompany;
import com.ulane.customer.service.customer.CusPurchaseCompanyService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CusPurchaseCompanyAction extends BaseAction{
	@Resource
	private CusPurchaseCompanyService cusPurchaseCompanyService;
	private CusPurchaseCompany cusPurchaseCompany;
	
	private Long customerid;

	public Long getCustomerid() {
		return customerid;
	}

	public void setCustomerid(Long customerid) {
		this.customerid = customerid;
	}

	public CusPurchaseCompany getCusPurchaseCompany() {
		return cusPurchaseCompany;
	}

	public void setCusPurchaseCompany(CusPurchaseCompany cusPurchaseCompany) {
		this.cusPurchaseCompany = cusPurchaseCompany;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CusPurchaseCompany> list= cusPurchaseCompanyService.getAll(filter);
		
		Type type=new TypeToken<List<CusPurchaseCompany>>(){}.getType();
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
				cusPurchaseCompanyService.remove(new Long(id));
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
		CusPurchaseCompany cusPurchaseCompany=cusPurchaseCompanyService.get(customerid);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(cusPurchaseCompany));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(cusPurchaseCompany.getCustomerid()==null){
			cusPurchaseCompanyService.save(cusPurchaseCompany);
		}else{
			CusPurchaseCompany orgCusPurchaseCompany=cusPurchaseCompanyService.get(cusPurchaseCompany.getCustomerid());
			try{
				BeanUtil.copyNotNullProperties(orgCusPurchaseCompany, cusPurchaseCompany);
				cusPurchaseCompanyService.save(orgCusPurchaseCompany);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
