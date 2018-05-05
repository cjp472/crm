package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimAssTarThrlevl;
import com.ulane.monitor.model.unim.UnimAssetsTarget;
import com.ulane.monitor.model.unim.UnimChaTarThrlevl;
import com.ulane.monitor.service.unim.UnimAssTarThrlevlService;
import com.ulane.monitor.service.unim.UnimAssetsTargetService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimAssetsTargetAction extends BaseAction{
	@Resource
	private UnimAssetsTargetService unimAssetsTargetService;
	@Resource
	private UnimAssTarThrlevlService unimAssTarThrlevlService;
	private UnimAssetsTarget unimAssetsTarget;
	
	private Long targetId;

	public Long getTargetId() {
		return targetId;
	}

	public void setTargetId(Long targetId) {
		this.targetId = targetId;
	}

	public UnimAssetsTarget getUnimAssetsTarget() {
		return unimAssetsTarget;
	}

	public void setUnimAssetsTarget(UnimAssetsTarget unimAssetsTarget) {
		this.unimAssetsTarget = unimAssetsTarget;
	}
	
	
	/**
	 *阀值 显示列表
	 */
	public String listevl(){
		QueryFilter filter=new QueryFilter(getRequest());
		QueryFilter filterfazhi=new QueryFilter(getRequest());
		filter.addSorted("targetId", "desc");
		List<UnimAssetsTarget> list= unimAssetsTargetService.getAll(filter);
		for(UnimAssetsTarget cat:list){
			List<UnimAssTarThrlevl> listlevl = unimAssTarThrlevlService.getByCatId(cat.getTargetId());
			for(UnimAssTarThrlevl evl:listlevl){
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
		List<UnimAssetsTarget> list= unimAssetsTargetService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer serializer = new JSONSerializer();
		buff.append(serializer.serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	public String listOnly(){
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimAssetsTarget> list= unimAssetsTargetService.getAll(filter);
		StringBuffer buff = new StringBuffer();

		JSONSerializer serializer = new JSONSerializer();
		buff.append(serializer.serialize(list));
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 批量注销
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				UnimAssetsTarget unimAssetsTarget = unimAssetsTargetService.get(Long.parseLong(id));
				unimAssetsTarget.setStatus(UnimAssetsTarget.STA_CANCELED);
				unimAssetsTargetService.save(unimAssetsTarget);
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
		UnimAssetsTarget unimAssetsTarget=unimAssetsTargetService.get(targetId);
		List<UnimAssTarThrlevl> listlevl = unimAssTarThrlevlService.getByCatId(unimAssetsTarget.getTargetId());
		for(UnimAssTarThrlevl evl:listlevl){
			unimAssetsTarget.setThrlevladv(evl.getExtend1());
			unimAssetsTarget.setThrlevlwar(evl.getExtend2());
			unimAssetsTarget.setThrlevlId(evl.getThrlevlId());
		}
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"staDat", "endDat","obProject.staDat","obProject.endDat" });
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(unimAssetsTarget));
		buff.append("}");
		jsonString = buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String targetId = getRequest().getParameter("targetId");
		String srcType = getRequest().getParameter("srcType");
		String assId = getRequest().getParameter("assId");
		
		if(StringUtils.isBlank(targetId)){
			unimAssetsTarget.setStatus(UnimAssetsTarget.STA_ENABLE);
			unimAssetsTarget.setOrderno(0L);						//顺序默认为0
			if(StringUtils.isNotBlank(srcType)) {
				unimAssetsTarget.setSrcTypeId(Short.parseShort(srcType));
			}
			if(StringUtils.isNotBlank(assId)) {
				unimAssetsTarget.setAssetsId(Long.parseLong(assId));
			}
			unimAssetsTargetService.save(unimAssetsTarget);
		}else{
			UnimAssetsTarget orgUnimAssetsTarget=unimAssetsTargetService.get(Long.parseLong(targetId));
			try{
				BeanUtil.copyNotNullProperties(orgUnimAssetsTarget, unimAssetsTarget);
				if(StringUtils.isNotBlank(srcType)) {
					orgUnimAssetsTarget.setSrcTypeId(Short.parseShort(srcType));
				}
				if(StringUtils.isNotBlank(assId)) {
					orgUnimAssetsTarget.setAssetsId(Long.parseLong(assId));
				}
				unimAssetsTargetService.save(orgUnimAssetsTarget);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	
}
