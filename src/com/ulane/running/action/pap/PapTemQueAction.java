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


import com.ulane.running.model.pap.PapTemQue;
import com.ulane.running.service.pap.PapTemQueService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class PapTemQueAction extends BaseAction{
	@Resource
	private PapTemQueService papTemQueService;
	private PapTemQue papTemQue;
	
	private Long papQueId;

	public Long getPapQueId() {
		return papQueId;
	}

	public void setPapQueId(Long papQueId) {
		this.papQueId = papQueId;
	}

	public PapTemQue getPapTemQue() {
		return papTemQue;
	}

	public void setPapTemQue(PapTemQue papTemQue) {
		this.papTemQue = papTemQue;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<PapTemQue> list= papTemQueService.getAll(filter);
		
		Type type=new TypeToken<List<PapTemQue>>(){}.getType();
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
				papTemQueService.remove(new Long(id));
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
		PapTemQue papTemQue=papTemQueService.get(papQueId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(papTemQue));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(papTemQue.getPapQueId()==null){
			papTemQueService.save(papTemQue);
		}else{
			PapTemQue orgPapTemQue=papTemQueService.get(papTemQue.getPapQueId());
			try{
				BeanUtil.copyNotNullProperties(orgPapTemQue, papTemQue);
				papTemQueService.save(orgPapTemQue);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
