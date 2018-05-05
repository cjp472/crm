package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimCategory;
import com.ulane.monitor.model.unim.UnimThrlevl;
import com.ulane.monitor.service.unim.UnimCategoryService;
import com.ulane.monitor.service.unim.UnimThrlevlService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimCategoryAction extends BaseAction{
	@Resource
	private UnimCategoryService unimCategoryService;
	@Resource
	private UnimThrlevlService unimThrlevlService;
	private UnimCategory unimCategory;
	
	private Long catId;

	public Long getCatId() {
		return catId;
	}

	public void setCatId(Long catId) {
		this.catId = catId;
	}

	public UnimCategory getUnimCategory() {
		return unimCategory;
	}

	public void setUnimCategory(UnimCategory unimCategory) {
		this.unimCategory = unimCategory;
	}

	
	/**
	 * 显示列表
	 */
	public String listevl(){
		QueryFilter filter=new QueryFilter(getRequest());
		QueryFilter filterfazhi=new QueryFilter(getRequest());
		filter.addSorted("typeId", "desc");
		List<UnimCategory> list= unimCategoryService.getAll(filter);
		List<UnimThrlevl> listlevls = null;
		
		for(UnimCategory cat:list){
			List<UnimThrlevl> listlevl = unimThrlevlService.getByCatId(cat.getCatId());
			for(UnimThrlevl evl:listlevl){
				listlevls.add(evl);
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
		QueryFilter filterfazhi=new QueryFilter(getRequest());
		filter.addSorted("typeId", "desc");
		List<UnimCategory> list= unimCategoryService.getAll(filter);
		List<UnimThrlevl> listlevls = null;
		
		for(UnimCategory cat:list){
			List<UnimThrlevl> listlevl = unimThrlevlService.getByCatId(cat.getCatId());
			for(UnimThrlevl evl:listlevl){
				cat.setThrlevladv(evl.getThrlevladv());
				cat.setThrlevlwar(evl.getThrlevlwar());
			}
		}
		//Type type=new TypeToken<List<UnimCategory>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer();
		buff.append(json.serialize(list));
		buff.append("}");

		jsonString=buff.toString();
		
//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
//		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
//		buff.append("}");
//		
//		jsonString=buff.toString();
//		
		return SUCCESS;
	}
	
	/**
	 * combo  刘清华
	 */
	public String loadKey(){
		String typeId= getRequest().getParameter("typeId");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_typeId_SN_EQ", typeId);
		filter.addSorted("typeId", "ASC");
		List<UnimCategory> list = unimCategoryService.getAll(filter);
		StringBuffer sb= new StringBuffer("[");
		int i=0;
		for(UnimCategory cat:list){
			if(i++>0) sb.append(",");
			sb.append("['").append(cat.getCatId()).append("','").append(cat.getCatName()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			try{
			for(String id:ids){
				//删除关联的人员阀值
				UnimCategory cat=unimCategoryService.get(new Long(id));
				if(cat.getTypeId()==2){
					 List<UnimThrlevl> evls=unimThrlevlService.getByCatId(new Long(cat.getCatId()));
					 if(evls.size()==0){
						 unimCategoryService.remove(new Long(id));
					 }else{
						 for(UnimThrlevl evl:evls){
							 unimCategoryService.remove(new Long(id));
							 unimThrlevlService.remove(evl);
						 }
					 }
				}else{
					unimCategoryService.remove(new Long(id));
				}
				
			}
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String zhuXiao(){
		UnimCategory unimCategory=unimCategoryService.get(catId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(unimCategory));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		UnimCategory unimCategory=unimCategoryService.get(catId);
			List<UnimThrlevl> listlevl = unimThrlevlService.getByCatId(unimCategory.getCatId());
			for(UnimThrlevl evl:listlevl){
				unimCategory.setThrlevladv(evl.getThrlevladv());
				unimCategory.setThrlevlwar(evl.getThrlevlwar());
			}
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(unimCategory));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(unimCategory.getCatId()==null){
			unimCategoryService.save(unimCategory);
		}else{
			UnimCategory orgUnimCategory=unimCategoryService.get(unimCategory.getCatId());
			try{
				BeanUtil.copyNotNullProperties(orgUnimCategory, unimCategory);
				unimCategoryService.save(orgUnimCategory);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	  public void findAll()
	  {
	    try {
	      Short typeId = Short.valueOf(getRequest().getParameter("typeId"));
	      List list = unimCategoryService.listGetCategory(typeId);
	      writeToPage(Boolean.valueOf(true), "根据类型"+typeId+"查询分类查询成功", list);
	    } catch (Exception e) {
	      e.printStackTrace();

	      writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
	    }
	  }	
}
