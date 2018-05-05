package com.ulane.supply.action.stock;
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


import com.ulane.supply.model.stock.ScThresholdLevel;
import com.ulane.supply.service.stock.ScThresholdLevelService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ScThresholdLevelAction extends BaseAction{
	@Resource
	private ScThresholdLevelService scThresholdLevelService;
	private ScThresholdLevel scThresholdLevel;
	
	private Long threshLevelId;

	public Long getThreshLevelId() {
		return threshLevelId;
	}

	public void setThreshLevelId(Long threshLevelId) {
		this.threshLevelId = threshLevelId;
	}

	public ScThresholdLevel getScThresholdLevel() {
		return scThresholdLevel;
	}

	public void setScThresholdLevel(ScThresholdLevel scThresholdLevel) {
		this.scThresholdLevel = scThresholdLevel;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ScThresholdLevel> list= scThresholdLevelService.getAll(filter);
		
		Type type=new TypeToken<List<ScThresholdLevel>>(){}.getType();
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
				scThresholdLevelService.remove(new Long(id));
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
		ScThresholdLevel scThresholdLevel=scThresholdLevelService.get(threshLevelId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(scThresholdLevel));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(scThresholdLevel.getThreshLevelId()==null){
			scThresholdLevelService.save(scThresholdLevel);
		}else{
			ScThresholdLevel orgScThresholdLevel=scThresholdLevelService.get(scThresholdLevel.getThreshLevelId());
			try{
				BeanUtil.copyNotNullProperties(orgScThresholdLevel, scThresholdLevel);
				scThresholdLevelService.save(orgScThresholdLevel);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
