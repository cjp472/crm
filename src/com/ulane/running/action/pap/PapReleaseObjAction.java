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


import com.ulane.running.model.pap.PapReleaseObj;
import com.ulane.running.service.pap.PapReleaseObjService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class PapReleaseObjAction extends BaseAction{
	@Resource
	private PapReleaseObjService papReleaseObjService;
	private PapReleaseObj papReleaseObj;
	
	private Long releaseObjId;

	public Long getReleaseObjId() {
		return releaseObjId;
	}

	public void setReleaseObjId(Long releaseObjId) {
		this.releaseObjId = releaseObjId;
	}

	public PapReleaseObj getPapReleaseObj() {
		return papReleaseObj;
	}

	public void setPapReleaseObj(PapReleaseObj papReleaseObj) {
		this.papReleaseObj = papReleaseObj;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<PapReleaseObj> list= papReleaseObjService.getAll(filter);
		
		Type type=new TypeToken<List<PapReleaseObj>>(){}.getType();
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
				papReleaseObjService.remove(new Long(id));
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
		PapReleaseObj papReleaseObj=papReleaseObjService.get(releaseObjId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(papReleaseObj));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(papReleaseObj.getReleaseObjId()==null){
			papReleaseObjService.save(papReleaseObj);
		}else{
			PapReleaseObj orgPapReleaseObj=papReleaseObjService.get(papReleaseObj.getReleaseObjId());
			try{
				BeanUtil.copyNotNullProperties(orgPapReleaseObj, papReleaseObj);
				papReleaseObjService.save(orgPapReleaseObj);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}