package com.ulane.running.action.pap;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObComPap;
import com.ulane.callout.service.outb.ObComPapService;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.running.model.pap.PapRelease;
import com.ulane.running.service.pap.PapReleaseService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class PapReleaseAction extends BaseAction{
	@Resource
	private PapReleaseService papReleaseService;
	@Resource
	private ObComPapService obComPapService;
	@Resource
	private ObComService obComService;
	private PapRelease papRelease;
	
	private Long papId;

	public Long getPapId() {
		return papId;
	}

	public void setPapId(Long papId) {
		this.papId = papId;
	}

	public PapRelease getPapRelease() {
		return papRelease;
	}

	public void setPapRelease(PapRelease papRelease) {
		this.papRelease = papRelease;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<PapRelease> list= papReleaseService.getAll(filter);
		
		Type type=new TypeToken<List<PapRelease>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	
	/**
	 * 问卷选择器显示列表
	 */
	public String papReleasesNamlist(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<PapRelease> list= papReleaseService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer json = JsonUtil.getJSONSerializer("createtime","updatetime");
		buff.append(json.exclude(new String[]{"class"}).serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 绑定问卷显示列表
	 */
	public String papReleasesBDNamlist(){
		
		String ids=getRequest().getParameter("comId");
		if(!("null").equals(ids)){
		ObCom obCom=obComService.get(new Long(ids));
		java.util.Set<PapRelease> obComPaplist = new java.util.HashSet<PapRelease>();
		for(ObComPap pap:obCom.getObComPap() ){
			PapRelease papsr=papReleaseService.get(pap.getPapId());
			
			obComPaplist.add(papsr);
			
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(obComPaplist.size()).append(
				",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(obComPaplist));
		buff.append("}");
		
		jsonString = buff.toString();
		}
		return SUCCESS;
	}
	
	
	/**
	 * 删除绑定在活动中的问卷
	 */

	public String shanChuWenJuan(){
		
		String ids=getRequest().getParameter("comId");
		if(ids!=null){
			ObCom obcom=obComService.get(Long.parseLong(ids));
			//删除活动绑定问卷
			for(ObComPap paps:obcom.getObComPap()){
				obComPapService.remove(paps);
			}
			obComService.save(obcom);
		}
		
		jsonString="{success:true}";
		
		
		return SUCCESS;
	}
	
	/**
	 * 绑定问卷注销
	 */

	public String zhuXiaoWenJuan(){
		
		String ids=getRequest().getParameter("comId");
		if(!("null").equals(ids)){
		ObCom obCom=obComService.get(new Long(ids));
		for(ObComPap pap:obCom.getObComPap() ){
			try {
			if(obCom.getObComStaId()==6){
				pap.setStatus(2l);//标记问卷已注销
				obComPapService.save(pap);
			    obCom.getObComPap().add(pap);
			    obComService.save(obCom);
			    jsonString ="2";
			}else{
				jsonString ="1";
				}
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		
		}
		
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
				papReleaseService.remove(new Long(id));
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
		PapRelease papRelease=papReleaseService.get(papId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(papRelease));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(papRelease.getPapId()==null){
			papReleaseService.save(papRelease);
		}else{
			PapRelease orgPapRelease=papReleaseService.get(papRelease.getPapId());
			try{
				BeanUtil.copyNotNullProperties(orgPapRelease, papRelease);
				papReleaseService.save(orgPapRelease);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
