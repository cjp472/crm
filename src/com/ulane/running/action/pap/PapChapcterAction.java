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


import com.ulane.running.model.pap.PapChapcter;
import com.ulane.running.service.pap.PapChapcterService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class PapChapcterAction extends BaseAction{
	@Resource
	private PapChapcterService papChapcterService;
	private PapChapcter papChapcter;
	
	private Long queCatId;

	public Long getQueCatId() {
		return queCatId;
	}

	public void setQueCatId(Long queCatId) {
		this.queCatId = queCatId;
	}

	public PapChapcter getPapChapcter() {
		return papChapcter;
	}

	public void setPapChapcter(PapChapcter papChapcter) {
		this.papChapcter = papChapcter;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<PapChapcter> list= papChapcterService.getAll(filter);
		
		Type type=new TypeToken<List<PapChapcter>>(){}.getType();
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
				papChapcterService.remove(new Long(id));
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
		PapChapcter papChapcter=papChapcterService.get(queCatId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(papChapcter));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(papChapcter.getQueCatId()==null){
			papChapcterService.save(papChapcter);
		}else{
			PapChapcter orgPapChapcter=papChapcterService.get(papChapcter.getQueCatId());
			try{
				BeanUtil.copyNotNullProperties(orgPapChapcter, papChapcter);
				papChapcterService.save(orgPapChapcter);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
