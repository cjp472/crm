package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimAssTarPar;
import com.ulane.monitor.model.unim.UnimAssets;
import com.ulane.monitor.model.unim.UnimAssetsTarget;
import com.ulane.monitor.model.unim.UnimChannelTarget;
import com.ulane.monitor.service.unim.UnimAssTarParService;
import com.ulane.monitor.service.unim.UnimAssetsService;
import com.ulane.monitor.service.unim.UnimAssetsTargetService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimAssTarParAction extends BaseAction{
	@Resource
	private UnimAssTarParService unimAssTarParService;
	@Resource
	private UnimAssetsService unimAssetsService;
	@Resource
	private UnimAssetsTargetService unimAssetsTargetService;
	private UnimAssTarPar unimAssTarPar;
	
	private Long paraId;

	public Long getParaId() {
		return paraId;
	}

	public void setParaId(Long paraId) {
		this.paraId = paraId;
	}

	public UnimAssTarPar getUnimAssTarPar() {
		return unimAssTarPar;
	}

	public void setUnimAssTarPar(UnimAssTarPar unimAssTarPar) {
		this.unimAssTarPar = unimAssTarPar;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("orderno", QueryFilter.ORDER_ASC);
		String treeParam = getRequest().getParameter("treeParam");
		if(StringUtils.isNotBlank(treeParam)) {
			if(StringUtils.contains(treeParam, "asId")) {
				filter.addFilter("Q_unimAssets.assetsId_L_EQ", StringUtils.substringAfter(treeParam, "asId"));
			} else if(StringUtils.contains(treeParam, "trId")) {
				filter.addFilter("Q_unimAssetsTarget.targetId_L_EQ", StringUtils.substringAfter(treeParam, "trId"));
			}
		}

		List<UnimAssTarPar> list= unimAssTarParService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer serializer = new JSONSerializer();
		
		buff.append(serializer.serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	public String listTree() {
		QueryFilter filter=new QueryFilter(getRequest());
//		filter.addSorted("orderno", QueryFilter.ORDER_ASC);
		List<UnimAssets> list= unimAssetsService.getAll(filter);
		StringBuilder sb = new StringBuilder();
		sb.append("[{id:'0',text:'指标参数分类树',expanded:true,children:[");
		int iCount = list.size();
		for(int i=0;i<iCount;i++) {
			sb.append("{id:'asId"+list.get(i).getAssetsId()+"',text:'"+list.get(i).getAssetsName()+"',"+findChild(list.get(i).getAssetsId()));
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

	public String findChild(Long assetsId) {
			StringBuffer buff1 = new StringBuffer("");
			List<UnimAssetsTarget> list = unimAssetsTargetService.findByParentId(assetsId);
			if (list.size() == 0) {
				buff1.append("leaf:true}");
				return buff1.toString();
			} else {
				buff1.append("children:[");
				for (UnimAssetsTarget target : list) {
					buff1.append("{id:'trId" + target.getTargetId() + "',text:'" + target.getTargetName() + "',");
					buff1.append("leaf:true},");
//					buff1.append(findChild(target.getTargetId()));
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
				UnimAssTarPar unimAssTarPar = unimAssTarParService.get(Long.parseLong(id));
				unimAssTarPar.setStatus(UnimAssTarPar.STA_CANCELED);
				unimAssTarParService.save(unimAssTarPar);
//				unimAssTarParService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	public String multiEnable() {
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				UnimAssTarPar unimAssTarPar = unimAssTarParService.get(Long.parseLong(id));
				unimAssTarPar.setStatus(UnimAssTarPar.STA_ENABLE);
				unimAssTarParService.save(unimAssTarPar);
			}
		}
		
		return SUCCESS;
	}
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		UnimAssTarPar unimAssTarPar=unimAssTarParService.get(paraId);
		unimAssTarPar.setDataSend1(String.valueOf(unimAssTarPar.getTargetId()));
		JSONSerializer serializer = new JSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(serializer.serialize(unimAssTarPar));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(unimAssTarPar.getParaId()==null){
			String targetId = getRequest().getParameter("unimAssetsTarget.targetId");
			unimAssTarPar.setTargetId(Long.parseLong(targetId));
			UnimAssetsTarget unimAssetsTarget = unimAssetsTargetService.get(Long.parseLong(targetId));
			unimAssTarPar.setAssetsId(unimAssetsTarget.getAssetsId());
			
			unimAssTarPar.setStatus(UnimAssTarPar.STA_UNENABLE);
			unimAssTarParService.save(unimAssTarPar);
		}else{
			UnimAssTarPar orgUnimAssTarPar=unimAssTarParService.get(unimAssTarPar.getParaId());
			try{
				BeanUtil.copyNotNullProperties(orgUnimAssTarPar, unimAssTarPar);
				unimAssTarParService.save(orgUnimAssTarPar);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	public String isRepeat() {
		String paraName = getRequest().getParameter("paraName");
		try {
			if(StringUtils.isNotBlank(paraName)) {
				paraName = URLDecoder.decode(paraName,"utf-8");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}	
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_paraName_S_EQ", paraName);
		List<UnimAssTarPar> list = unimAssTarParService.getAll(filter);
		if(list.size()>0) {
			setJsonString("{success:true}");
		} else {
			setJsonString("{success:false}");
		}
		
		return SUCCESS;
	}
	
}
