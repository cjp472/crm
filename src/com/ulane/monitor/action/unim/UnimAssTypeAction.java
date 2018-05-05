package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimAssCategory;
import com.ulane.monitor.model.unim.UnimAssType;
import com.ulane.monitor.service.unim.UnimAssCategoryService;
import com.ulane.monitor.service.unim.UnimAssTypeService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimAssTypeAction extends BaseAction{
	@Resource
	private UnimAssCategoryService unimAssCategoryService;
	@Resource
	private UnimAssTypeService unimAssTypeService;
	private UnimAssType unimAssType;
	
	private Long typeId;

	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public UnimAssType getUnimAssType() {
		return unimAssType;
	}

	public void setUnimAssType(UnimAssType unimAssType) {
		this.unimAssType = unimAssType;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimAssType> list= unimAssTypeService.getAll(filter);
		
		Type type=new TypeToken<List<UnimAssType>>(){}.getType();
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
		List<UnimAssType> list = new ArrayList<UnimAssType>();
		list = unimAssTypeService.getAll();
		String method = getRequest().getParameter("method");
		StringBuffer buff = new StringBuffer();
		int i = 0;
		if (StringUtils.isNotEmpty(method)) {
			buff.append("[");
		} else {
			i++;
			buff.append("[{id:'" + 0
					+ "',text:'地图导航树',expanded:true,children:[");
		}
		for (UnimAssType pg : list) {
			buff.append("{id:'" + pg.getTypeId() + "',text:'"
					+ pg.getTypeName() + "',leaf:true},");
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
	public String listOnly(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimAssType> list= unimAssTypeService.getAll(filter);
		
		StringBuffer buff = new StringBuffer();

		JSONSerializer serializer = new JSONSerializer();
		buff.append(serializer.serialize(list));
		
		jsonString=buff.toString();
		
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
				unimAssTypeService.remove(new Long(id));
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
				UnimAssType unimAssType= unimAssTypeService.get(new Long(id));
				unimAssType.setStatus(UnimAssType.UNIM_ASS_STATUS_ZHUXIAO);
				unimAssTypeService.save(unimAssType);
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
		UnimAssType unimAssType=unimAssTypeService.get(typeId);
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
		if(unimAssType.getTypeId()==null){
			if(null!=catid ){
				UnimAssCategory	unimAssCategory=unimAssCategoryService.get(new Long(catid));
				unimAssType.setUnimAssCategory(unimAssCategory);
			}
			unimAssType.setStatus(UnimAssType.UNIM_ASS_STATUS_YYOUXIAO);
			unimAssTypeService.save(unimAssType);
		}else{
			UnimAssType orgUnimAssType=unimAssTypeService.get(unimAssType.getTypeId());
			try{
				if(null!=orgUnimAssType.getCatId()){
					UnimAssCategory	unimAssCategory=unimAssCategoryService.get(new Long(catid));
					orgUnimAssType.setUnimAssCategory(unimAssCategory);
				}
				BeanUtil.copyNotNullProperties(orgUnimAssType, unimAssType);
				unimAssTypeService.save(orgUnimAssType);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
