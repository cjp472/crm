package com.ulane.running.action.pap;
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


import com.ulane.running.model.pap.PapQueOpt;
import com.ulane.running.service.pap.PapQueOptService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class PapQueOptAction extends BaseAction{
	@Resource
	private PapQueOptService papQueOptService;
	private PapQueOpt papQueOpt;
	
	private Long optId;

	public Long getOptId() {
		return optId;
	}

	public void setOptId(Long optId) {
		this.optId = optId;
	}

	public PapQueOpt getPapQueOpt() {
		return papQueOpt;
	}

	public void setPapQueOpt(PapQueOpt papQueOpt) {
		this.papQueOpt = papQueOpt;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<PapQueOpt> list= papQueOptService.getAll(filter);
		
		Type type=new TypeToken<List<PapQueOpt>>(){}.getType();
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
				papQueOptService.remove(new Long(id));
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
		PapQueOpt papQueOpt=papQueOptService.get(optId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(papQueOpt));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(papQueOpt.getOptId()==null){
			papQueOptService.save(papQueOpt);
		}else{
			PapQueOpt orgPapQueOpt=papQueOptService.get(papQueOpt.getOptId());
			try{
				BeanUtil.copyNotNullProperties(orgPapQueOpt, papQueOpt);
				papQueOptService.save(orgPapQueOpt);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
