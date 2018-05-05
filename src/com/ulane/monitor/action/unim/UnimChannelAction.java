package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLDecoder;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.DozerHelper;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;


import com.ulane.monitor.model.unim.UnimAgent;
import com.ulane.monitor.model.unim.UnimCategory;
import com.ulane.monitor.model.unim.UnimChannel;
import com.ulane.monitor.model.unim.UnimMonitorAgent;
import com.ulane.monitor.service.unim.UnimChannelService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimChannelAction extends BaseAction{
	@Resource
	private UnimChannelService unimChannelService;
	private UnimChannel unimChannel;
	
	private Long channelId;

	public Long getChannelId() {
		return channelId;
	}

	public void setChannelId(Long channelId) {
		this.channelId = channelId;
	}

	public UnimChannel getUnimChannel() {
		return unimChannel;
	}

	public void setUnimChannel(UnimChannel unimChannel) {
		this.unimChannel = unimChannel;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("orderno", QueryFilter.ORDER_ASC);
		List<UnimChannel> list= unimChannelService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer serializer = new JSONSerializer();
		buff.append(serializer.serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	

	/**
	 * 显示列表
	 */
	public String listForIdAndName(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("orderno", QueryFilter.ORDER_ASC);
		List<UnimChannel> list= unimChannelService.getAll(filter);
		List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
		for(UnimChannel ch : list) {
			HashMap<String,String> row = new HashMap<String,String>();
			row.put("channelId", ch.getChannelId().toString());
			row.put("channelName", ch.getChannelName());
			result.add(row);
		}
		jsonString=JsonUtil.list2JSON(result);
		return SUCCESS;
	}
	
	/**
	 * 注销
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				if(StringUtils.isNotBlank(id)) {
					UnimChannel uChannel = unimChannelService.get(Long.parseLong(id));
					uChannel.setStatus(UnimChannel.STA_CANCELED);
					unimChannelService.save(uChannel);
				}
				
//				unimChannelService.remove(new Long(id));
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
		UnimChannel unimChannel=unimChannelService.get(channelId);
		JSONSerializer serializer = new JSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(serializer.serialize(unimChannel));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(unimChannel.getChannelId()==null){
			unimChannel.setStatus(UnimChannel.STA_ENABLE);
			unimChannelService.save(unimChannel);
		}else{
			UnimChannel orgUnimChannel=unimChannelService.get(unimChannel.getChannelId());
			try{
				BeanUtil.copyNotNullProperties(orgUnimChannel, unimChannel);
				unimChannelService.save(orgUnimChannel);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String isRepeat() {
		String channelName = getRequest().getParameter("channelName");
		String channelCode = getRequest().getParameter("channelCode");
		try {
			if(StringUtils.isNotBlank(channelName)) {
				channelName = URLDecoder.decode(channelName,"utf-8");	
			}
			if(StringUtils.isNotBlank(channelCode)) {
				channelCode = URLDecoder.decode(channelCode,"utf-8");				
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		QueryFilter filter = new QueryFilter(getRequest());
		
		HashMap<String,String> hsmp = new HashMap<String,String>();
		if(StringUtils.isNotBlank(channelName)) {
			filter.addFilter("Q_channelName_S_EQ", channelName);
			List<UnimChannel> list = unimChannelService.getAll(filter);
			if(list.size()>0) {
				hsmp.put("channelNameRepeat", "chNameTrue");
			} else {
				hsmp.put("channelNameRepeat", "chNameFalse");
			}
		} else {
			hsmp.put("channelNameRepeat", "chNameFalse");
		}
		
		if(StringUtils.isNotBlank(channelCode)) {
			filter.addFilter("Q_channelCode_S_EQ", channelCode);
			List<UnimChannel> list = unimChannelService.getAll(filter);
			if(list.size()>0) {
				hsmp.put("channelCodeRepeat", "chCodeTrue");
			} else {
				hsmp.put("channelCodeRepeat", "chCodeFalse");
			}
		} else {
			hsmp.put("channelCodeRepeat", "chCodeFalse");
		}
		setJsonString(JsonUtil.hsmp2JSON(hsmp));
		return SUCCESS;
	}
	
	//HTPP接口
	public void findAll() {
		try {
			List list = unimChannelService.listGeneralChannels();
			List list2 = new DozerHelper().convert(list);

			writeToPage(Boolean.valueOf(true), "查询成功", list2);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}
	
	public void listMonitorChannels() {
		try {
			// 坐席分类列表
			Map<String, String> acColorMap = new HashMap();
			Long monitorId = Long.valueOf(getRequest().getParameter("id"));
			List list = unimChannelService.listMonitorChannels(monitorId);

			List list3 = new DozerHelper().convert(list);

			writeToPage(Boolean.valueOf(true), "监控的渠道查询成功", list3);
		} catch (Exception e) {
			e.printStackTrace();
			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}
}
