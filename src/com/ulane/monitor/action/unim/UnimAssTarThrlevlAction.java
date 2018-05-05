package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimAssTarThrlevl;
import com.ulane.monitor.model.unim.UnimAssets;
import com.ulane.monitor.model.unim.UnimAssetsTarget;
import com.ulane.monitor.service.unim.UnimAssTarThrlevlService;
import com.ulane.monitor.service.unim.UnimAssetsService;
import com.ulane.monitor.service.unim.UnimAssetsTargetService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimAssTarThrlevlAction extends BaseAction{
	@Resource
	private UnimAssetsService unimAssetsService;
	@Resource
	private UnimAssTarThrlevlService unimAssTarThrlevlService;
	@Resource
	private UnimAssetsTargetService unimAssetsTargetService;
	private UnimAssTarThrlevl unimAssTarThrlevl;
	
	private Long thrlevlId;

	public Long getThrlevlId() {
		return thrlevlId;
	}

	public void setThrlevlId(Long thrlevlId) {
		this.thrlevlId = thrlevlId;
	}

	public UnimAssTarThrlevl getUnimAssTarThrlevl() {
		return unimAssTarThrlevl;
	}

	public void setUnimAssTarThrlevl(UnimAssTarThrlevl unimAssTarThrlevl) {
		this.unimAssTarThrlevl = unimAssTarThrlevl;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimAssTarThrlevl> list= unimAssTarThrlevlService.getAll(filter);
		
		Type type=new TypeToken<List<UnimAssTarThrlevl>>(){}.getType();

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		buff.append(serializer.serialize(list));
		buff.append("}");
		
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
				unimAssTarThrlevlService.remove(new Long(id));
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
		UnimAssTarThrlevl unimAssTarThrlevl=unimAssTarThrlevlService.get(thrlevlId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(unimAssTarThrlevl));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 置空阀值操作
	 */
	public String clearFZ() {
		String[] ids = getRequest().getParameterValues("ids");
		try {
			if (ids != null) {
				for (String id : ids) {
					UnimAssetsTarget cat = unimAssetsTargetService.get(new Long(id));
					List<UnimAssTarThrlevl> listlevl = unimAssTarThrlevlService
							.getByCatId(new Long(id));
					for(UnimAssTarThrlevl levl:listlevl){
						unimAssTarThrlevlService.remove(levl);
					}
				}
			}
			// unimCategoryService.save(cat);
		} catch (Exception ex) {
			logger.error(ex.getMessage());
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
	/**
	 * 添加及保存操作
	 */
	public String save() {
		String values = getRequest().getParameter("values");
		String colors = getRequest().getParameter("colors");
		String miao = getRequest().getParameter("miao");
		String catid = getRequest().getParameter("targetId");
		String jgcolors = getRequest().getParameter("jgcolors");
		String jgvalue = getRequest().getParameter("jgvalue");
		String fazhiid = getRequest().getParameter("fazhiid");
		if (fazhiid=="") {
			unimAssTarThrlevl.setExtend1(values + "," + colors ); // 注意阀值
			unimAssTarThrlevl.setExtend2(jgvalue+ "," +jgcolors ); // 警告阀值
			if(catid!=""){
				UnimAssetsTarget cat = unimAssetsTargetService.get(new Long(catid));
				System.out.println(cat.getUnimAssets().getAssetsId());
				unimAssTarThrlevl.setUnimAssetsTarget(cat);
				UnimAssets unimAssets=unimAssetsService.get(cat.getUnimAssets().getAssetsId());
				unimAssTarThrlevl.setUnimAssets(unimAssets);
			}
			unimAssTarThrlevlService.save(unimAssTarThrlevl);
		} else {
			UnimAssTarThrlevl orgUnimThrlevl = unimAssTarThrlevlService.get(new Long(fazhiid));
			try {
				BeanUtil.copyNotNullProperties(orgUnimThrlevl, unimAssTarThrlevl); 
				orgUnimThrlevl.setExtend1(values + "," + colors); // 注意阀值
				orgUnimThrlevl.setExtend2(jgvalue+ "," +jgcolors ); // 警告阀值
				UnimAssetsTarget cat = unimAssetsTargetService.get(new Long(catid));
				orgUnimThrlevl.setUnimAssetsTarget(cat);
				unimAssTarThrlevlService.save(orgUnimThrlevl);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
//	/**
//	 * 添加及保存操作
//	 */
//	public String save(){
//		if(unimAssTarThrlevl.getThrlevlId()==null){
//			unimAssTarThrlevlService.save(unimAssTarThrlevl);
//		}else{
//			UnimAssTarThrlevl orgUnimAssTarThrlevl=unimAssTarThrlevlService.get(unimAssTarThrlevl.getThrlevlId());
//			try{
//				BeanUtil.copyNotNullProperties(orgUnimAssTarThrlevl, unimAssTarThrlevl);
//				unimAssTarThrlevlService.save(orgUnimAssTarThrlevl);
//			}catch(Exception ex){
//				logger.error(ex.getMessage());
//			}
//		}
//		setJsonString("{success:true}");
//		return SUCCESS;
//		
//	}
}
