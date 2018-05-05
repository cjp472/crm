package com.ulane.callout.action.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.json.JSONArray;
import com.htsoft.core.util.json.JSONObject;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObComProduct;
import com.ulane.callout.model.outb.ObComSalerul;
import com.ulane.callout.service.outb.ObComSalerulService;
import com.ulane.callout.service.outb.ObComService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObComSalerulAction extends BaseAction{
	@Resource
	private ObComSalerulService obComSalerulService;
	private ObComSalerul obComSalerul;
	@Resource
	private ObComService obComService;
	
	private Long rulId;

	public Long getRulId() {
		return rulId;
	}

	public void setRulId(Long rulId) {
		this.rulId = rulId;
	}

	public ObComSalerul getObComSalerul() {
		return obComSalerul;
	}

	public void setObComSalerul(ObComSalerul obComSalerul) {
		this.obComSalerul = obComSalerul;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ObComSalerul> list= obComSalerulService.getAll(filter);
		
		Type type=new TypeToken<List<ObComSalerul>>(){}.getType();
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
	 * 绑定规则显示列表
	 */
	public String salerulBDNamlist(){
		
		String ids=getRequest().getParameter("comId");
		if(!("null").equals(ids)){
		ObCom obCom=obComService.get(new Long(ids));
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(obCom.getObComSalerul().size()).append(
				",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(obCom.getObComSalerul()));
		buff.append("}");
//		JSONObject s=new JSONObject();
//		s.
		jsonString = buff.toString();
		}
		return SUCCESS;
	}
	
	/**
	 * 删除绑定在活动中的规则
	 */

	public String shanChuGuiZe() {
		String ids = getRequest().getParameter("comId");
		String[] rulids = getRequest().getParameterValues("ids");
		if (ids != null) {
			ObCom obcom = obComService.get(Long.parseLong(ids));
			// 删除活动绑定规则
			for (ObComSalerul salerul : obcom.getObComSalerul()) {
				if(rulids.length>=1){
				for(String rulid:rulids){
					if(!("").equals(rulid)){
					if(salerul.getRulId()==Long.parseLong(rulid)){
						obComSalerulService.remove(salerul);
					}
					}
				  }
				}
//				obcom.getObComSalerul().remove(salerul);
//				obcom.getObComSalerul().
//				obComSalerulService.remove(salerul);
			}
//			obComService.save(obcom);
		}

		jsonString = "{success:true}";

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
				obComSalerulService.remove(new Long(id));
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
		ObComSalerul obComSalerul=obComSalerulService.get(rulId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(obComSalerul));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obComSalerul.getRulId()==null){
			obComSalerulService.save(obComSalerul);
		}else{
			ObComSalerul orgObComSalerul=obComSalerulService.get(obComSalerul.getRulId());
			try{
				BeanUtil.copyNotNullProperties(orgObComSalerul, obComSalerul);
				obComSalerulService.save(orgObComSalerul);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 显示拨打时间段
	 */
	public String listDiaTimeBetween(){
		String comId = getRequest().getParameter("comId");
		String result = obComSalerulService.getTimeBetween(ObComSalerul.TYPE_TIME.toString(), comId);
		if(StringUtils.isNotBlank(result)) {
			setJsonString(result);
		}
		return SUCCESS;
	}
}
