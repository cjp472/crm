package com.ulane.customer.action.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.customer.model.fee.ObFeeRule;
import com.ulane.customer.model.fee.ObFeeRuleValue;
import com.ulane.customer.service.fee.ObFeeRuleService;
import com.ulane.customer.service.fee.ObFeeRuleValueService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObFeeRuleValueAction extends BaseAction{
	@Resource
	private ObFeeRuleValueService obFeeRuleValueService;
	
	@Resource
	private ObFeeRuleService obFeeRuleService;
	private ObFeeRuleValue obFeeRuleValue;
	
	private Long feeRuleValueId;

	public Long getFeeRuleValueId() {
		return feeRuleValueId;
	}

	public void setFeeRuleValueId(Long feeRuleValueId) {
		this.feeRuleValueId = feeRuleValueId;
	}

	public ObFeeRuleValue getObFeeRuleValue() {
		return obFeeRuleValue;
	}

	public void setObFeeRuleValue(ObFeeRuleValue obFeeRuleValue) {
		this.obFeeRuleValue = obFeeRuleValue;
	}

	
	/**
	 * 绑定佣金规则显示列表
	 * @author lzm
	 */
	public String ruleBDNamlist(){
		
		String ids=getRequest().getParameter("feeRuleId");
		if(!("null").equals(ids)){
		ObFeeRule rule=obFeeRuleService.get(new Long(ids));
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(rule.getObFeeRuleValues().size()).append(
				",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		
		buff.append(jsonSer.serialize(rule.getObFeeRuleValues()));
		buff.append("}");
		
		jsonString = buff.toString();
		}
		return SUCCESS;
	}
	/**
	 * 显示列表  您访问的URL:/ctcerp/xitong/userGroupYJBDNamlistUlUsergroup.do?comId=und
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ObFeeRuleValue> list= obFeeRuleValueService.getAll(filter);
		
		Type type=new TypeToken<List<ObFeeRuleValue>>(){}.getType();
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
				obFeeRuleValueService.remove(new Long(id));
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
		ObFeeRuleValue obFeeRuleValue=obFeeRuleValueService.get(feeRuleValueId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(obFeeRuleValue));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obFeeRuleValue.getFeeRuleValueId()==null){
			
			obFeeRuleValueService.save(obFeeRuleValue);
		}else{
			ObFeeRuleValue orgObFeeRuleValue=obFeeRuleValueService.get(obFeeRuleValue.getFeeRuleValueId());
			try{
				BeanUtil.copyNotNullProperties(orgObFeeRuleValue, obFeeRuleValue);
				obFeeRuleValueService.save(orgObFeeRuleValue);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
