package com.ulane.customer.action.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.HashMap;
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


import com.ulane.callout.model.outb.ObCom;
import com.ulane.customer.model.fee.ObFeeIndexProject;
import com.ulane.customer.service.fee.ObFeeIndexProjectService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObFeeIndexProjectAction extends BaseAction{
	@Resource
	private ObFeeIndexProjectService obFeeIndexProjectService;
	private ObFeeIndexProject obFeeIndexProject;
	
	private Long feeIndexProjectId;

	public Long getFeeIndexProjectId() {
		return feeIndexProjectId;
	}

	public void setFeeIndexProjectId(Long feeIndexProjectId) {
		this.feeIndexProjectId = feeIndexProjectId;
	}

	public ObFeeIndexProject getObFeeIndexProject() {
		return obFeeIndexProject;
	}

	public void setObFeeIndexProject(ObFeeIndexProject obFeeIndexProject) {
		this.obFeeIndexProject = obFeeIndexProject;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ObFeeIndexProject> list= obFeeIndexProjectService.getAll(filter);
		
		Type type=new TypeToken<List<ObFeeIndexProject>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
			"createDate", "effectiveTime","failureTime" });
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
				obFeeIndexProjectService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	

	/**
	 * 指标类型
	 * @author lzm
	 */
	public String getZhiBiaoLeiXing(){
//		String projId = getRequest().getParameter("projId");
		QueryFilter filter = new QueryFilter(getRequest());
//		filter.addFilter("Q_obProject.projId_L_EQ", projId);	//管理员分配
		List<ObFeeIndexProject> list = obFeeIndexProjectService.getAll(filter);
		HashMap<String,String> hsmp = new HashMap<String,String>();
		for(ObFeeIndexProject com : list) {
			hsmp.put(String.valueOf(com.getFeeIndexProjectId()), com.getFeeIndexProjectName());
		}
		setJsonString(JsonUtil.hsmp2JSONArray(hsmp));
		
//		ObFeeIndexProject obFeeIndexProject=obFeeIndexProjectService.get(feeIndexProjectId);
//		
//		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
//		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
//		buff.append(jsonSer.serialize(obFeeIndexProject));
//		buff.append("}");
//		jsonString = buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @author lzm
	 */
	public String get(){
		ObFeeIndexProject obFeeIndexProject=obFeeIndexProjectService.get(feeIndexProjectId);
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(obFeeIndexProject));
		buff.append("}");
		jsonString = buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obFeeIndexProject.getFeeIndexProjectId()==null){
			obFeeIndexProjectService.save(obFeeIndexProject);
		}else{
			ObFeeIndexProject orgObFeeIndexProject=obFeeIndexProjectService.get(obFeeIndexProject.getFeeIndexProjectId());
			try{
				BeanUtil.copyNotNullProperties(orgObFeeIndexProject, obFeeIndexProject);
				obFeeIndexProjectService.save(orgObFeeIndexProject);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
