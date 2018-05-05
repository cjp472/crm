package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.monitor.model.unim.UnimChaTarPar;
import com.ulane.monitor.model.unim.UnimChannel;
import com.ulane.monitor.model.unim.UnimChannelTarget;
import com.ulane.monitor.model.unim.UnimMapNavigation;
import com.ulane.monitor.service.unim.UnimChaTarParService;
import com.ulane.monitor.service.unim.UnimChannelService;
import com.ulane.monitor.service.unim.UnimChannelTargetService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimChaTarParAction extends BaseAction{
	@Resource
	private UnimChaTarParService unimChaTarParService;
	@Resource
	private UnimChannelService unimChannelService;
	@Resource
	private UnimChannelTargetService unimChannelTargetService;
	private UnimChaTarPar unimChaTarPar;
	
	private Long paraId;

	public Long getParaId() {
		return paraId;
	}

	public void setParaId(Long paraId) {
		this.paraId = paraId;
	}

	public UnimChaTarPar getUnimChaTarPar() {
		return unimChaTarPar;
	}

	public void setUnimChaTarPar(UnimChaTarPar unimChaTarPar) {
		this.unimChaTarPar = unimChaTarPar;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("orderno", QueryFilter.ORDER_ASC);
		String queryParam = getRequest().getParameter("queryParam");
		if(StringUtils.isNotBlank(queryParam)) {
			if(StringUtils.contains(queryParam, "chId")) {
				filter.addFilter("Q_unimChannel.channelId_L_EQ", StringUtils.substringAfter(queryParam, "chId"));
			} else if(StringUtils.contains(queryParam, "trId")) {
				filter.addFilter("Q_unimChannelTarget.targetId_L_EQ", StringUtils.substringAfter(queryParam, "trId"));
			}
		}
		List<UnimChaTarPar> list= unimChaTarParService.getAll(filter);
		
		for(UnimChaTarPar par : list) {
			par.setTargetName(unimChannelTargetService.get(par.getTargetId()).getTargetName());
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		buff.append(serializer.serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	public String listTree() {
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("orderno", QueryFilter.ORDER_ASC);
		List<UnimChannel> list= unimChannelService.getAll(filter);
		StringBuilder sb = new StringBuilder();
		sb.append("[{id:'0',text:'指标参数分类树',expanded:true,children:[");
		int iCount = list.size();
		for(int i=0;i<iCount;i++) {
			sb.append("{id:'chId"+list.get(i).getChannelId()+"',text:'"+list.get(i).getChannelName()+"',"+findChild(list.get(i).getChannelId()));
			if(i<iCount-1) {
				sb.append(",");
			}
		}
		sb.append("]}]");
		
		jsonString=sb.toString();
		System.out.println(jsonString);
		return SUCCESS;
	}
	
	/*
	 * 寻找子根节点
	 */

	public String findChild(Long channelId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UnimChannelTarget> list = unimChannelTargetService.findByParentId(channelId);
		if (list.size() == 0) {
			buff1.append("leaf:true}");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UnimChannelTarget target : list) {
				buff1.append("{id:'trId" + target.getTargetId() + "',text:'" + target.getTargetName() + "',");
				buff1.append("leaf:true},");
//				buff1.append(findChild(target.getTargetId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]}");
			return buff1.toString();
		}
	}
	
	
	/**
	 * 批量注销
	 * @return
	 */
	public String multiDel(){
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				UnimChaTarPar unimChaTarPar = unimChaTarParService.get(Long.parseLong(id));
				unimChaTarPar.setStatus(UnimChaTarPar.STA_CANCELED);
				unimChaTarParService.save(unimChaTarPar);
//				unimChaTarParService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 批量启用
	 * @return
	 */
	public String multiEnable(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				UnimChaTarPar unimChaTarPar = unimChaTarParService.get(Long.parseLong(id));
				unimChaTarPar.setStatus(UnimChaTarPar.STA_ENABLE);
				unimChaTarParService.save(unimChaTarPar);
//				unimChaTarParService.remove(new Long(id));
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
		UnimChaTarPar unimChaTarPar=unimChaTarParService.get(paraId);
		unimChaTarPar.setChTargetId(String.valueOf(unimChaTarPar.getTargetId()));
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(unimChaTarPar));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String paraId = getRequest().getParameter("paraId");
		if(StringUtils.isBlank(paraId)){
			String targetId = getRequest().getParameter("targetId");
			if(StringUtils.isNotBlank(targetId)) {
				Long targetIdL = Long.parseLong(targetId);
				unimChaTarPar.setTargetId(targetIdL);
				UnimChannelTarget unimChannelTarget = unimChannelTargetService.get(targetIdL);
				if(null!=unimChannelTarget) {
					unimChaTarPar.setChannelId(unimChannelTarget.getChannelId());					
				}
			}
			unimChaTarPar.setStatus(UnimChaTarPar.STA_UNENABLE);
			unimChaTarParService.save(unimChaTarPar);
		}else{
			UnimChaTarPar orgUnimChaTarPar=unimChaTarParService.get(Long.parseLong(paraId));
			try{
				BeanUtil.copyNotNullProperties(orgUnimChaTarPar, unimChaTarPar);
				String targetId = getRequest().getParameter("targetId");
				if(StringUtils.isNotBlank(targetId)) {
					Long targetIdL = Long.parseLong(targetId);
					orgUnimChaTarPar.setTargetId(targetIdL);
					UnimChannelTarget unimChannelTarget = unimChannelTargetService.get(targetIdL);
					if(null!=unimChannelTarget) {
						orgUnimChaTarPar.setChannelId(unimChannelTarget.getChannelId());					
					}
				}
				unimChaTarParService.save(orgUnimChaTarPar);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
