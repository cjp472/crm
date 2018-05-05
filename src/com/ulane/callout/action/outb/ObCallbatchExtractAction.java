package com.ulane.callout.action.outb;
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


import com.ulane.callout.model.outb.ObCallbatchExtract;
import com.ulane.callout.service.outb.ObCallbatchExtractService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObCallbatchExtractAction extends BaseAction{
	@Resource
	private ObCallbatchExtractService obCallbatchExtractService;
	private ObCallbatchExtract obCallbatchExtract;
	
	private Long extractId;

	public Long getExtractId() {
		return extractId;
	}

	public void setExtractId(Long extractId) {
		this.extractId = extractId;
	}

	public ObCallbatchExtract getObCallbatchExtract() {
		return obCallbatchExtract;
	}

	public void setObCallbatchExtract(ObCallbatchExtract obCallbatchExtract) {
		this.obCallbatchExtract = obCallbatchExtract;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("staDat", "desc");
		List<ObCallbatchExtract> list= obCallbatchExtractService.getAll(filter);
		
		Type type=new TypeToken<List<ObCallbatchExtract>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
//		buff.append("}");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
//		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
//			"staDat"});		
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
				obCallbatchExtractService.remove(new Long(id));
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
		ObCallbatchExtract obCallbatchExtract=obCallbatchExtractService.get(extractId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//		//将数据转成JSON格式
//		StringBuffer sb = new StringBuffer("{success:true,data:");
//		sb.append(gson.toJson(obCallbatchExtract));
//		sb.append("}");
//		setJsonString(sb.toString());
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		//Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(jsonSer.serialize(obCallbatchExtract));
		//sb.append(gson.toJson(obCallbatchAss));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obCallbatchExtract.getExtractId()==null){
			obCallbatchExtractService.save(obCallbatchExtract);
		}else{
			ObCallbatchExtract orgObCallbatchExtract=obCallbatchExtractService.get(obCallbatchExtract.getExtractId());
			try{
				BeanUtil.copyNotNullProperties(orgObCallbatchExtract, obCallbatchExtract);
				obCallbatchExtractService.save(orgObCallbatchExtract);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
