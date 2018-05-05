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


import com.ulane.customer.model.customer.ConLanjie;
import com.ulane.customer.service.customer.ConLanjieService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ConLanjieAction extends BaseAction{
	@Resource
	private ConLanjieService conLanjieService;
	private ConLanjie conLanjie;
	
	private Long conId;

	public Long getConId() {
		return conId;
	}

	public void setConId(Long conId) {
		this.conId = conId;
	}

	public ConLanjie getConLanjie() {
		return conLanjie;
	}

	public void setConLanjie(ConLanjie conLanjie) {
		this.conLanjie = conLanjie;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ConLanjie> list= conLanjieService.getAll(filter);
		
		Type type=new TypeToken<List<ConLanjie>>(){}.getType();
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
				conLanjieService.remove(new Long(id));
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
		ConLanjie conLanjie=conLanjieService.get(conId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(conLanjie));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(conLanjie.getConId()==null){
			conLanjieService.save(conLanjie);
		}else{
			ConLanjie orgConLanjie=conLanjieService.get(conLanjie.getConId());
			try{
				BeanUtil.copyNotNullProperties(orgConLanjie, conLanjie);
				conLanjieService.save(orgConLanjie);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
