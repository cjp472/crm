package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.DozerHelper;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.service.system.AppUserService;


import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.monitor.model.unim.UnimAssCategory;
import com.ulane.monitor.model.unim.UnimAssType;
import com.ulane.monitor.model.unim.UnimAssets;
import com.ulane.monitor.service.unim.UnimAssCategoryService;
import com.ulane.monitor.service.unim.UnimAssTypeService;
import com.ulane.monitor.service.unim.UnimAssetsService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimAssetsAction extends BaseAction{
	@Resource
	private UnimAssetsService unimAssetsService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private UnimAssTypeService unimAssTypeService;
	@Resource
	private UlDepartmentService ulDepartmentService;
	@Resource
	private UnimAssCategoryService unimAssCategoryService;
	private UnimAssets unimAssets;
	
	private Long assetsId;

	public Long getAssetsId() {
		return assetsId;
	}

	public void setAssetsId(Long assetsId) {
		this.assetsId = assetsId;
	}

	public UnimAssets getUnimAssets() {
		return unimAssets;
	}

	public void setUnimAssets(UnimAssets unimAssets) {
		this.unimAssets = unimAssets;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimAssets> list= unimAssetsService.getAll(filter);
		for(UnimAssets ass : list) {
			if(null!=ass.getPerincharId()) {
				ass.setPerName(appUserService.get(ass.getPerincharId()).getFullname());	
			}
			if(null!=ass.getTypeId()) {
				ass.setTypName(unimAssTypeService.get(ass.getTypeId()).getTypeName());	
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer serializer = new JSONSerializer();
		serializer.exclude("unimAssCategory").exclude("unimAssType");
		buff.append(serializer.serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	public String listOnly(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimAssets> list= unimAssetsService.getAll(filter);
		StringBuffer buff = new StringBuffer();

		JSONSerializer serializer = new JSONSerializer();
		serializer.exclude("unimAssCategory").exclude("unimAssType");
		buff.append(serializer.serialize(list));

		jsonString=buff.toString();
		return SUCCESS;
	}
	
	public String listTree() {
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("assetsCode", QueryFilter.ORDER_ASC);
		List<UnimAssets> list= unimAssetsService.getAll(filter);
		StringBuilder sb = new StringBuilder();
		sb.append("[{id:'0',text:'资产',expanded:true,children:[");
		int iCount = list.size();
		for(int i=0;i<iCount;i++) {
			sb.append("{id:'"+list.get(i).getAssetsId()+"',text:'"+list.get(i).getAssetsName()+"',leaf:true}");
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
				UnimAssets ass = unimAssetsService.get(Long.parseLong(id));
				ass.setStatus(UnimAssets.STA_CANCELED);
				unimAssetsService.save(ass);
//				unimAssetsService.remove(new Long(id));
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
		UnimAssets unimAssets=unimAssetsService.get(assetsId);
		if(null!=unimAssets.getDepId()) {
			unimAssets.setDepName(ulDepartmentService.get(unimAssets.getDepId()).getDepname());	
		} else {
			unimAssets.setDepName("");
		}
		
		if(null!=unimAssets.getPerincharId()) {
			unimAssets.setPerName(appUserService.get(unimAssets.getPerincharId()).getFullname());	
		} else {
			unimAssets.setPerName("");
		}
		
		if(null!=unimAssets.getTypeId()) {
			UnimAssType type = unimAssTypeService.get(unimAssets.getTypeId());
			String typName = type.getTypeId() +"_"+ type.getTypeName(); 
			unimAssets.setTypName(typName);
		} else {
			unimAssets.setTypName("");
		}
		
		if(null!=unimAssets.getCatId()) {
			UnimAssCategory unimAssCategory = unimAssCategoryService.get(unimAssets.getCatId());
			String catName = unimAssCategory.getCatId()+"_"+unimAssCategory.getCatName();
			unimAssets.setCatName(catName);	
		} else {
			unimAssets.setCatName("");
		}
		
		JSONSerializer serializer = new JSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(serializer.serialize(unimAssets));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String assetsId = getRequest().getParameter("assetsId");
		String depId = getRequest().getParameter("depId");
		String perId = getRequest().getParameter("perId");
		String catId = getRequest().getParameter("catId");
		String typId = getRequest().getParameter("typId"); 
		
		if(StringUtils.isBlank(assetsId)){
			unimAssets.setDepId(Long.parseLong(depId));
			unimAssets.setPerincharId(Long.parseLong(perId));
			unimAssets.setCatId(Long.parseLong(catId));
			unimAssets.setTypeId(Long.parseLong(typId));
			unimAssets.setStatus(UnimAssets.STA_UNENABLE);
			unimAssetsService.save(unimAssets);
		}else{
			UnimAssets orgUnimAssets=unimAssetsService.get(Long.parseLong(assetsId));
			try{
				BeanUtil.copyNotNullProperties(orgUnimAssets, unimAssets);
				orgUnimAssets.setDepId(Long.parseLong(depId));
				orgUnimAssets.setPerincharId(Long.parseLong(perId));
				orgUnimAssets.setCatId(Long.parseLong(catId));
				orgUnimAssets.setTypeId(Long.parseLong(typId));
				unimAssetsService.save(orgUnimAssets);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String isRepeat() {
		String assetsCode = getRequest().getParameter("assetsCode");
		if(StringUtils.isNotBlank(assetsCode)) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_assetsCode_S_EQ", assetsCode);
			List<UnimAssets> list = unimAssetsService.getAll(filter);
			if(list.size()>0) {
				setJsonString("{success:true}");
			} else {
				setJsonString("{success:false}");
			}
		}
		return SUCCESS;
	}
	
	//HTPP接口
	public void findAll() {
		try {
			List list = unimAssetsService.listGeneralUnimAssets();
			List list2 = new DozerHelper().convert(list);
			writeToPage(Boolean.valueOf(true), "查询所有资产成功", list2);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}
	
	public void listMonitorAssets() {
		try {
			// 坐席分类列表
			Map<String, String> acColorMap = new HashMap();
			Long monitorId = Long.valueOf(getRequest().getParameter("id"));
			List list = unimAssetsService.listMonitorUnimAssets(monitorId);

			List list3 = new DozerHelper().convert(list);

			writeToPage(Boolean.valueOf(true), "获取班长监控的资产查询成功", list3);
		} catch (Exception e) {
			e.printStackTrace();
			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}
}
