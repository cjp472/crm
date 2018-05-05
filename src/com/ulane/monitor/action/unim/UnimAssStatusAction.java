package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.monitor.model.unim.UnimAssCategory;
import com.ulane.monitor.model.unim.UnimAssStatus;
import com.ulane.monitor.model.unim.UnimAssType;
import com.ulane.monitor.service.unim.UnimAssCategoryService;
import com.ulane.monitor.service.unim.UnimAssStatusService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimAssStatusAction extends BaseAction{
	@Resource
	private UnimAssStatusService unimAssStatusService;
	@Resource
	private UnimAssCategoryService unimAssCategoryService;
	private UnimAssStatus unimAssStatus;
	
	private Long statusId;

	public Long getStatusId() {
		return statusId;
	}

	public void setStatusId(Long statusId) {
		this.statusId = statusId;
	}

	public UnimAssStatus getUnimAssStatus() {
		return unimAssStatus;
	}

	public void setUnimAssStatus(UnimAssStatus unimAssStatus) {
		this.unimAssStatus = unimAssStatus;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimAssStatus> list= unimAssStatusService.getAll(filter);
		
		Type type=new TypeToken<List<UnimAssStatus>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(
				",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));
		buff.append("}");
		
	    jsonString = buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 *导航菜单
	 * 
	 * @return
	 */
	public String listTree() {
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("typeCode", QueryFilter.ORDER_ASC);
		List<UnimAssCategory> list = new ArrayList<UnimAssCategory>();
		list = unimAssCategoryService.getAll();
		String method = getRequest().getParameter("method");
		StringBuffer buff = new StringBuffer();
		int i = 0;
		if (StringUtils.isNotEmpty(method)) {
			buff.append("[");
		} else {
			i++;
			buff.append("[{id:'" + 0
					+ "',text:'资产类型',expanded:true,children:[");
		}
		for (UnimAssCategory pg : list) {
			buff.append("{id:'" + pg.getCatId() + "',text:'"
					+ pg.getCatName() + "',leaf:true},");
		}
		if (!list.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (i == 0) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		jsonString = buff.toString();

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
				unimAssStatusService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 批量删除
	 * @return
	 */
	public String zhuXiao(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				UnimAssStatus unimAssType= unimAssStatusService.get(new Long(id));
				unimAssType.setStatus(UnimAssType.UNIM_ASS_STATUS_ZHUXIAO);
				unimAssStatusService.save(unimAssType);
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
		UnimAssStatus unimAssType=unimAssStatusService.get(statusId);
		if(null!=unimAssType.getUnimAssCategory()){
			UnimAssCategory	unimAssCategory=unimAssCategoryService.get(unimAssType.getUnimAssCategory().getCatId());
			unimAssType.setZiChanLx(unimAssCategory.getCatName());
		}
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {});
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(unimAssType));
		buff.append("}");
		jsonString = buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String catid=getRequest().getParameter("catid");
		if(unimAssStatus.getStatusId()==null){
			if(null!=catid ){
				UnimAssCategory	unimAssCategory=unimAssCategoryService.get(new Long(catid));
				unimAssStatus.setUnimAssCategory(unimAssCategory);
			}
			unimAssStatus.setStatus(UnimAssType.UNIM_ASS_STATUS_YYOUXIAO);
			unimAssStatusService.save(unimAssStatus);
		}else{
			UnimAssStatus orgUnimAssType=unimAssStatusService.get(unimAssStatus.getStatusId());
			try{
				if(null!=orgUnimAssType.getCatId()){
					UnimAssCategory	unimAssCategory=unimAssCategoryService.get(new Long(catid));
					orgUnimAssType.setUnimAssCategory(unimAssCategory);
				}
				BeanUtil.copyNotNullProperties(orgUnimAssType, unimAssStatus);
				unimAssStatusService.save(orgUnimAssType);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
