package com.ulane.running.action.comtech;
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


import com.ulane.running.model.comtech.CtScrChapcter;
import com.ulane.running.service.comtech.CtScrChapcterService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CtScrChapcterAction extends BaseAction{
	@Resource
	private CtScrChapcterService ctScrChapcterService;
	private CtScrChapcter ctScrChapcter;
	
	private Long queCatId;

	public Long getQueCatId() {
		return queCatId;
	}

	public void setQueCatId(Long queCatId) {
		this.queCatId = queCatId;
	}

	public CtScrChapcter getCtScrChapcter() {
		return ctScrChapcter;
	}

	public void setCtScrChapcter(CtScrChapcter ctScrChapcter) {
		this.ctScrChapcter = ctScrChapcter;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CtScrChapcter> list= ctScrChapcterService.getAll(filter);
		
		Type type=new TypeToken<List<CtScrChapcter>>(){}.getType();
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
				ctScrChapcterService.remove(new Long(id));
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
		CtScrChapcter ctScrChapcter=ctScrChapcterService.get(queCatId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ctScrChapcter));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ctScrChapcter.getQueCatId()==null){
			ctScrChapcterService.save(ctScrChapcter);
		}else{
			CtScrChapcter orgCtScrChapcter=ctScrChapcterService.get(ctScrChapcter.getQueCatId());
			try{
				BeanUtil.copyNotNullProperties(orgCtScrChapcter, ctScrChapcter);
				ctScrChapcterService.save(orgCtScrChapcter);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
