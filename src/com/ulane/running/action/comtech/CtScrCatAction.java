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


import com.ulane.running.model.comtech.CtScrCat;
import com.ulane.running.service.comtech.CtScrCatService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CtScrCatAction extends BaseAction{
	@Resource
	private CtScrCatService ctScrCatService;
	private CtScrCat ctScrCat;
	
	private Long queCatId;

	public Long getQueCatId() {
		return queCatId;
	}

	public void setQueCatId(Long queCatId) {
		this.queCatId = queCatId;
	}

	public CtScrCat getCtScrCat() {
		return ctScrCat;
	}

	public void setCtScrCat(CtScrCat ctScrCat) {
		this.ctScrCat = ctScrCat;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CtScrCat> list= ctScrCatService.getAll(filter);
		
		Type type=new TypeToken<List<CtScrCat>>(){}.getType();
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
				ctScrCatService.remove(new Long(id));
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
		CtScrCat ctScrCat=ctScrCatService.get(queCatId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ctScrCat));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ctScrCat.getQueCatId()==null){
			ctScrCatService.save(ctScrCat);
		}else{
			CtScrCat orgCtScrCat=ctScrCatService.get(ctScrCat.getQueCatId());
			try{
				BeanUtil.copyNotNullProperties(orgCtScrCat, ctScrCat);
				ctScrCatService.save(orgCtScrCat);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
