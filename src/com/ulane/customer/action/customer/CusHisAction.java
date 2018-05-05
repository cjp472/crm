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


import com.ulane.customer.model.customer.CusHis;
import com.ulane.customer.service.customer.CusHisService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CusHisAction extends BaseAction{
	@Resource
	private CusHisService cusHisService;
	private CusHis cusHis;
	
	private Long opeHisId;

	public Long getOpeHisId() {
		return opeHisId;
	}

	public void setOpeHisId(Long opeHisId) {
		this.opeHisId = opeHisId;
	}

	public CusHis getCusHis() {
		return cusHis;
	}

	public void setCusHis(CusHis cusHis) {
		this.cusHis = cusHis;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CusHis> list= cusHisService.getAll(filter);
		
		Type type=new TypeToken<List<CusHis>>(){}.getType();
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
				cusHisService.remove(new Long(id));
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
		CusHis cusHis=cusHisService.get(opeHisId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(cusHis));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(cusHis.getOpeHisId()==null){
			cusHisService.save(cusHis);
		}else{
			CusHis orgCusHis=cusHisService.get(cusHis.getOpeHisId());
			try{
				BeanUtil.copyNotNullProperties(orgCusHis, cusHis);
				cusHisService.save(orgCusHis);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
