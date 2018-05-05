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
import com.ulane.monitor.model.unim.UnimAssType;
import com.ulane.monitor.model.unim.UnimChannelNavigation;
import com.ulane.monitor.model.unim.UnimChannel;
import com.ulane.monitor.service.unim.UnimAssCategoryService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimAssCategoryAction extends BaseAction{
	@Resource
	private UnimAssCategoryService unimAssCategoryService;
	private UnimAssCategory unimAssCategory;
	
	private Long catId;

	public Long getCatId() {
		return catId;
	}

	public void setCatId(Long catId) {
		this.catId = catId;
	}

	public UnimAssCategory getUnimAssCategory() {
		return unimAssCategory;
	}

	public void setUnimAssCategory(UnimAssCategory unimAssCategory) {
		this.unimAssCategory = unimAssCategory;
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
			buff.append("{id:'" + pg.getCatId()+ "',text:'"
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
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("catCode", "desc");
		List<UnimAssCategory> list= unimAssCategoryService.getAll(filter);
		Type type=new TypeToken<List<UnimAssCategory>>(){}.getType();
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
	public String listOnly(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimAssCategory> list= unimAssCategoryService.getAll(filter);
		
		StringBuffer buff = new StringBuffer();

		JSONSerializer serializer = new JSONSerializer();
		
		buff.append(serializer.serialize(list));
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
//	public String listTree() {
//		QueryFilter filter=new QueryFilter(getRequest());
//		filter.addSorted("orderno", QueryFilter.ORDER_ASC);
//		List<UnimAssCategory> list= unimAssCategoryService.getAll(filter);
//		StringBuilder sb = new StringBuilder();
//		sb.append("[{id:'0',text:'资产类型',expanded:true,children:[");
//		int iCount = list.size();
//		for(int i=0;i<iCount;i++) {
//			sb.append("{id:'"+list.get(i).getCatId()+"',text:'"+list.get(i).getCatName()+"',leaf:true}");
//			if(i<iCount-1) {
//				sb.append(",");
//			}
//		}
//		sb.append("]}]");
//		
//		jsonString=sb.toString();
//		return SUCCESS;
//	}
	
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				unimAssCategoryService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 注销
	 * @return
	 */
	public String zhuXiao() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				try {
					UnimAssCategory unimAssCategory = unimAssCategoryService.get(new Long(id));
					unimAssCategory.setStatus(UnimAssCategory.UNIM_ASS_STATUS_ZHUXIAO);
					unimAssCategoryService.save(unimAssCategory);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}
		jsonString = "{success:true}";

		return SUCCESS;
	}
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		UnimAssCategory unimAssCategory=unimAssCategoryService.get(catId);
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {});
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(unimAssCategory));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(unimAssCategory.getCatId()==null){
			unimAssCategory.setStatus(UnimAssCategory.UNIM_ASS_STATUS_YYOUXIAO);
			unimAssCategoryService.save(unimAssCategory);
		}else{
			UnimAssCategory orgUnimAssCategory=unimAssCategoryService.get(unimAssCategory.getCatId());
			try{
				BeanUtil.copyNotNullProperties(orgUnimAssCategory, unimAssCategory);
				unimAssCategoryService.save(orgUnimAssCategory);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
