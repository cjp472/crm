package com.ulane.customer.action.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.service.customer.CustomerService;
import com.ulane.customer.model.customer.CusContact;
import com.ulane.customer.service.customer.CusContactService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CusContactAction extends BaseAction{
	@Resource
	private CusContactService cusContactService;
	
	@Resource
	private CustomerService customerService;
	
	private CusContact cusContact;
	
	private Long contactId;

	public Long getContactId() {
		return contactId;
	}

	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}

	public CusContact getCusContact() {
		return cusContact;
	}

	public void setCusContact(CusContact cusContact) {
		this.cusContact = cusContact;
	}
    
	/**
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		List<CusContact> list= cusContactService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:[");
        JSONSerializer serializer = JsonUtil.getJSONSerializer();
        serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "createTime","lastUpdateTime" });
        for(CusContact cusContact:list){
            buff.append(serializer.serialize(cusContact)); 
            buff.deleteCharAt(buff.length() - 1);  //去掉最后的大括号
            buff.append(",},");
        }
        if(list.size()>0){
            buff.deleteCharAt(buff.length()-1);//去掉最后的,号
        }
		buff.append("]}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
		
//		
//		QueryFilter filter=new QueryFilter(getRequest());
//		List<CusContact> list= cusContactService.getAll(filter);
//		
//		Type type=new TypeToken<List<CusContact>>(){}.getType();
//		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
//		.append(filter.getPagingBean().getTotalItems()).append(",result:");
//		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
//		buff.append("}");
//		
//		jsonString=buff.toString();
//		
//		return SUCCESS;
	}
	
	 /**
     * 批量增加
     * 
     * @return
     */
    public String mulSave() {
		String data = getRequest().getParameter("data");
		String customerId = getRequest().getParameter("customerId");
		if (StringUtils.isNotEmpty(data)) {
			Gson gson = new Gson();
			CusContact[] cons = gson.fromJson(data, CusContact[].class);

			for (int i = 0; i < cons.length; i++) {
				CusContact con = null;
				if(cons[i].getContactId()!= null){
					con = cusContactService.get(cons[i].getContactId());
					con.setLastUpdateTime(new Date());
				}else{
					con = new CusContact();
					con.setCreateTime(new Date());
				}
				try {
					BeanUtil.copyNotNullProperties(con, cons[i]);
					con.setStatusId(new Short("1"));
					con.setCustomerId(Long.parseLong(customerId));
					cusContactService.save(con);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
				;
			}
		}

		jsonString = "{success:true}";
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
				cusContactService.remove(new Long(id));
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
		CusContact cusContact=cusContactService.get(contactId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(cusContact));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(cusContact.getContactId()==null){
			cusContactService.save(cusContact);
		}else{
			CusContact orgCusContact=cusContactService.get(cusContact.getContactId());
			try{
				BeanUtil.copyNotNullProperties(orgCusContact, cusContact);
				cusContactService.save(orgCusContact);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	/**
	 * 根据客户id显示列表
	 */
	public String listByCusId(){
		QueryFilter filter=new QueryFilter(getRequest());
		StringBuffer buff = null;
		JSONSerializer serializer = JsonUtil.getJSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "createTime","lastUpdateTime" });
		
		String customerId = getRequest().getParameter("customerId");
		if (customerId != null && !customerId.equals("") && !customerId.equals("undefined")){
			filter.addFilter("Q_customer.customerId_L_EQ", customerId);
			List<CusContact> list= cusContactService.getAll(filter);
			buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:[");
	        for(CusContact cusContact:list){
	            buff.append(serializer.serialize(cusContact)); 
	            buff.deleteCharAt(buff.length() - 1);  //去掉最后的大括号
	            buff.append(",},");
	        }
	        if(list.size()>0){
	            buff.deleteCharAt(buff.length()-1);//去掉最后的,号
	        }
			buff.append("]}");
		}else {
			buff = new StringBuffer("{success:true,'totalCounts':0,result:[]}");
		}
		
		jsonString=buff.toString();
		
		return SUCCESS;

	}
	
	public String listCus() {
		String customerId = getRequest().getParameter("customerId");
		if (customerId != null && !customerId.equals("") && !customerId.equals("undefined")){
			setJsonString(cusContactService.listCus(customerId));
		} else {
			setJsonString("{success:true,'totalCounts':0,result:[]}");
		}
		return SUCCESS;
	}
	
	public String combo(){
		List<Customer> list = null;
		list = customerService.getAll();
		StringBuffer buff = new StringBuffer("[");
		for (Customer cus : list){
			buff.append("['" + cus.getCustomerId() + "','" + cus.getCustomerName() + "'],");
		}
		
		buff.deleteCharAt(buff.length() - 1);
		buff.append("]");
		setJsonString(buff.toString());
		
		return SUCCESS;
	}
}
