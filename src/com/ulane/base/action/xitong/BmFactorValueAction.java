package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.ContextUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.base.model.xitong.BmFactorValue;
import com.ulane.base.service.xitong.BmFactorValueService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 陈峰
 *
 */
public class BmFactorValueAction extends BaseAction{
	@Resource
	private BmFactorValueService bmFactorValueService;
	private BmFactorValue bmFactorValue;
	
	private Long factorValueId;

	public Long getFactorValueId() {
		return factorValueId;
	}

	public void setFactorValueId(Long factorValueId) {
		this.factorValueId = factorValueId;
	}

	public BmFactorValue getBmFactorValue() {
		return bmFactorValue;
	}

	public void setBmFactorValue(BmFactorValue bmFactorValue) {
		this.bmFactorValue = bmFactorValue;
	}


	/**
	 * combo  陈峰
	 */
/**	public String combo(){
		List<BmFactorValue> list = bmFactorValueService.getAll();
		StringBuffer sb= new StringBuffer("[");
		int i=0;
		for(BmFactorValue type:list){
			if(i++>0) sb.append(",");
			sb.append("['").append(type.getBmFactorValueId()).append("','").append(type.getBmFactorValueIdName()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		logger.info("sb:"+sb.toString());
		return SUCCESS;
	}
*/


	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BmFactorValue> list= bmFactorValueService.getAll(filter);
		
//		Type type=new TypeToken<List<BmFactorValue>>(){}.getType();

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
		
    	JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));
		
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
				bmFactorValueService.remove(new Long(id));
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
		BmFactorValue bmFactorValue=bmFactorValueService.get(factorValueId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
    	JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		sb.append(jsonSer.serialize(bmFactorValue));
//		sb.append(gson.toJson(bmFactorValue));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bmFactorValue.getFactorValueId()==null){
            bmFactorValue.setCreateDate(new Date());
            bmFactorValue.setCreateBy(ContextUtil.getCurrentUser().getFamilyName());
			bmFactorValueService.save(bmFactorValue);
		}else{
			BmFactorValue orgBmFactorValue=bmFactorValueService.get(bmFactorValue.getFactorValueId());
			try{
				BeanUtil.copyNotNullProperties(orgBmFactorValue, bmFactorValue);
                orgBmFactorValue.setUpdateDate(new Date());
                orgBmFactorValue.setUpdateBy(ContextUtil.getCurrentUser().getFamilyName());
				bmFactorValueService.save(orgBmFactorValue);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
