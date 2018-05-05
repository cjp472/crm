package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimCategory;
import com.ulane.monitor.model.unim.UnimChaTarThrlevl;
import com.ulane.monitor.model.unim.UnimChannel;
import com.ulane.monitor.model.unim.UnimChannelTarget;
import com.ulane.monitor.model.unim.UnimThrlevl;
import com.ulane.monitor.service.unim.UnimChaTarThrlevlService;
import com.ulane.monitor.service.unim.UnimChannelService;
import com.ulane.monitor.service.unim.UnimChannelTargetService;
import com.ulane.monitor.service.unim.UnimThrlevlService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimChannelTargetAction extends BaseAction{
	@Resource
	private UnimChannelTargetService unimChannelTargetService;
	@Resource
	private UnimThrlevlService unimThrlevlService;
	@Resource
	private UnimChannelService unimChannelService;
	@Resource
	private UnimChaTarThrlevlService unimChaTarThrlevlService;
	private UnimChannelTarget unimChannelTarget;
	
	private Long targetId;

	public Long getTargetId() {
		return targetId;
	}

	public void setTargetId(Long targetId) {
		this.targetId = targetId;
	}

	public UnimChannelTarget getUnimChannelTarget() {
		return unimChannelTarget;
	}

	public void setUnimChannelTarget(UnimChannelTarget unimChannelTarget) {
		this.unimChannelTarget = unimChannelTarget;
	}
	/**
	 * 显示列表
	 */
	public String listevl(){
		QueryFilter filter=new QueryFilter(getRequest());
		QueryFilter filterfazhi=new QueryFilter(getRequest());
		filter.addSorted("targetId", "desc");
		List<UnimChannelTarget> list= unimChannelTargetService.getAll(filter);
		for(UnimChannelTarget cat:list){
			List<UnimChaTarThrlevl> listlevl = unimChaTarThrlevlService.getByCatId(cat.getTargetId());
			for(UnimChaTarThrlevl evl:listlevl){
				cat.setThrlevladv(evl.getExtend1());
				cat.setThrlevlwar(evl.getExtend2());
				cat.setThrlevlId(evl.getThrlevlId());
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer();
		buff.append(json.serialize(list));
		buff.append("}");

		jsonString=buff.toString();
		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("targetCode", QueryFilter.ORDER_ASC);
		List<UnimChannelTarget> list= unimChannelTargetService.getAll(filter);
		for(UnimChannelTarget target : list) {
			if(null!=target.getUnimChannel()) {
				target.setChannelIdStr(target.getUnimChannel().getChannelName());				
			}
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
		sb.append("[{id:'0',text:'指标分类树',expanded:true,children:[");
		int iCount = list.size();
		for(int i=0;i<iCount;i++) {
			sb.append("{id:'"+list.get(i).getChannelId()+"',text:'"+list.get(i).getChannelName()+"',leaf:true}");
			if(i<iCount-1) {
				sb.append(",");
			}
		}
		sb.append("]}]");
		
		jsonString=sb.toString();
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
				if(StringUtils.isNotBlank(id)) {
					UnimChannelTarget unimChannelTarget = unimChannelTargetService.get(Long.parseLong(id));
					unimChannelTarget.setStatus(UnimChannelTarget.STA_CANCELED);
					unimChannelTargetService.save(unimChannelTarget);
				}
//				unimChannelTargetService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
//	/**
//	 * 显示详细信息
//	 * @return
//	 */
//	public String get(){
//		UnimChannelTarget unimChannelTarget=unimChannelTargetService.get(targetId);
//		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//		//将数据转成JSON格式
//		StringBuffer sb = new StringBuffer("{success:true,data:");
//		sb.append(gson.toJson(unimChannelTarget));
//		sb.append("}");
//		setJsonString(sb.toString());
//		
//		return SUCCESS;
//	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		UnimChannelTarget unimChannelTarget=unimChannelTargetService.get(targetId);
		Long channelId = unimChannelTarget.getChannelId();
		if(null!=channelId) {
			unimChannelTarget.setChannelIdStr(String.valueOf(channelId));
		}
		List<UnimChaTarThrlevl> listlevl = unimChaTarThrlevlService.getByCatId(unimChannelTarget.getTargetId());
		for(UnimChaTarThrlevl evl:listlevl){
			unimChannelTarget.setThrlevladv(evl.getExtend1());
			unimChannelTarget.setThrlevlwar(evl.getExtend2());
			unimChannelTarget.setThrlevlId(evl.getThrlevlId());
		}
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"staDat", "endDat","obProject.staDat","obProject.endDat" });
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(unimChannelTarget));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String targetId = getRequest().getParameter("targetId");
		if(StringUtils.isBlank(targetId)){
			String srcTypeId = getRequest().getParameter("srcTypeIdVal");
			String channelId = getRequest().getParameter("channelId");
			if(StringUtils.isNotBlank(channelId)) {
				UnimChannel ch = unimChannelService.get(Long.parseLong(channelId));
				unimChannelTarget.setUnimChannel(ch);
			}
			unimChannelTarget.setSrcTypeId(Short.valueOf(srcTypeId));
			unimChannelTarget.setOrderno(0L);								//目前暂时给默认值：0
			unimChannelTarget.setStatus(UnimChannelTarget.STA_ENABLE);
			unimChannelTargetService.save(unimChannelTarget);
		}else{
			UnimChannelTarget orgUnimChannelTarget=unimChannelTargetService.get(Long.parseLong(targetId));
			try{
				BeanUtil.copyNotNullProperties(orgUnimChannelTarget, unimChannelTarget);
				String channelId = getRequest().getParameter("channelId");
				if(StringUtils.isNotBlank(channelId)) {
					UnimChannel ch = unimChannelService.get(Long.parseLong(channelId));
					orgUnimChannelTarget.setUnimChannel(ch);
				}
				unimChannelTargetService.save(orgUnimChannelTarget);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String getTarIdAndTarName() {
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimChannelTarget> list= unimChannelTargetService.getAll(filter);
		
		JSONSerializer serializer = new JSONSerializer();

		jsonString=serializer.serialize(list);
		return SUCCESS;
	}
}
