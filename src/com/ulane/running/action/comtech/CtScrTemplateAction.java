package com.ulane.running.action.comtech;

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
import com.ulane.callout.model.outb.ObComScr;
import com.ulane.callout.service.outb.ObComScrService;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.running.model.comtech.CtScrTemplate;
import com.ulane.running.service.comtech.CtScrTemplateService;

import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class CtScrTemplateAction extends BaseAction {
	@Resource
	private CtScrTemplateService ctScrTemplateService;
	@Resource
	private ObComService obComService;
	@Resource
	private ObComScrService obComScrService;
	private CtScrTemplate ctScrTemplate;

	private Long tmpId;

	public Long getTmpId() {
		return tmpId;
	}

	public void setTmpId(Long tmpId) {
		this.tmpId = tmpId;
	}

	public CtScrTemplate getCtScrTemplate() {
		return ctScrTemplate;
	}

	public void setCtScrTemplate(CtScrTemplate ctScrTemplate) {
		this.ctScrTemplate = ctScrTemplate;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<CtScrTemplate> list = ctScrTemplateService.getAll(filter);

		Type type = new TypeToken<List<CtScrTemplate>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		Gson gson = new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 话术选择器显示列表
	 */
	public String ctScrNamlist() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<CtScrTemplate> list = ctScrTemplateService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer("createtime","updatetime");
		buff.append(json.exclude(new String[]{"class"}).serialize(list));
		buff.append("}");
		
		jsonString = buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 话术绑定显示列表
	 */
	public String ctScrBDNamlist() {
		String ids=getRequest().getParameter("comId");
		if(!("null").equals(ids)){
		ObCom obCom=obComService.get(new Long(ids));
		java.util.Set<CtScrTemplate> ctScrTemplatelist = new java.util.HashSet<CtScrTemplate>();
		for(ObComScr scr:obCom.getObComScr()){
			CtScrTemplate scrtemp=ctScrTemplateService.get(scr.getTmpId());
			ctScrTemplatelist.add(scrtemp);
			
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(ctScrTemplatelist.size()).append(
				",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(ctScrTemplatelist));
		buff.append("}");
		
		jsonString = buff.toString();
		}
		return SUCCESS;
	}

	/**
	 * 删除绑定在活动中的话术
	 */

	public String shanChuHuaShu(){
		
		String ids=getRequest().getParameter("comId");
		if(ids!=null){
			ObCom obcom=obComService.get(Long.parseLong(ids));
			//删除活动绑定话术
			for(ObComScr scr:obcom.getObComScr()){
				obComScrService.remove(scr);
			}
			obComService.save(obcom);
		}
		jsonString="{success:true}";
		
		
		return SUCCESS;
	}
	
	/**
	 * 绑定注销
	 */

	public String zhuXiaoHuaShu(){
		
		String ids=getRequest().getParameter("comId");
		if(!("null").equals(ids)){
		ObCom obCom=obComService.get(new Long(ids));
		for(ObComScr scr:obCom.getObComScr() ){
			try {
			scr.setStatus(2l);//标记话术已注销
			obComScrService.save(scr);
		    obCom.getObComScr().add(scr);
		    obComService.save(obCom);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		
		}
		jsonString ="2";
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				ctScrTemplateService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		CtScrTemplate ctScrTemplate = ctScrTemplateService.get(tmpId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ctScrTemplate));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (ctScrTemplate.getTmpId() == null) {
			ctScrTemplateService.save(ctScrTemplate);
		} else {
			CtScrTemplate orgCtScrTemplate = ctScrTemplateService
					.get(ctScrTemplate.getTmpId());
			try {
				BeanUtil.copyNotNullProperties(orgCtScrTemplate, ctScrTemplate);
				ctScrTemplateService.save(orgCtScrTemplate);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
}
