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
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimCategory;
import com.ulane.monitor.model.unim.UnimChaTarThrlevl;
import com.ulane.monitor.model.unim.UnimChannelTarget;
import com.ulane.monitor.model.unim.UnimThrlevl;
import com.ulane.monitor.service.unim.UnimChaTarThrlevlService;
import com.ulane.monitor.service.unim.UnimChannelTargetService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimChaTarThrlevlAction extends BaseAction{
	@Resource
	private UnimChaTarThrlevlService unimChaTarThrlevlService;
	@Resource
	private UnimChannelTargetService unimChannelTargetService;
	private UnimChaTarThrlevl unimChaTarThrlevl;
	
	private Long thrlevlId;

	public Long getThrlevlId() {
		return thrlevlId;
	}

	public void setThrlevlId(Long thrlevlId) {
		this.thrlevlId = thrlevlId;
	}

	public UnimChaTarThrlevl getUnimChaTarThrlevl() {
		return unimChaTarThrlevl;
	}

	public void setUnimChaTarThrlevl(UnimChaTarThrlevl unimChaTarThrlevl) {
		this.unimChaTarThrlevl = unimChaTarThrlevl;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimChaTarThrlevl> list= unimChaTarThrlevlService.getAll(filter);
		
		Type type=new TypeToken<List<UnimChaTarThrlevl>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
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
				unimChaTarThrlevlService.remove(new Long(id));
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
		UnimChaTarThrlevl unimChaTarThrlevl=unimChaTarThrlevlService.get(thrlevlId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(unimChaTarThrlevl));
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
					UnimChannelTarget cat = unimChannelTargetService.get(new Long(id));
					List<UnimChaTarThrlevl> listlevl = unimChaTarThrlevlService
							.getByCatId(new Long(id));
					for(UnimChaTarThrlevl levl:listlevl){
						unimChaTarThrlevlService.remove(levl);
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
			unimChaTarThrlevl.setExtend1(values + "," + colors ); // 注意阀值
			unimChaTarThrlevl.setExtend2(jgvalue+ "," +jgcolors ); // 警告阀值
			if(catid!=""){
			UnimChannelTarget cat = unimChannelTargetService.get(new Long(catid));
			unimChaTarThrlevl.setUnimChannelTarget(cat);
			}
			unimChaTarThrlevlService.save(unimChaTarThrlevl);
		} else {
			UnimChaTarThrlevl orgUnimThrlevl = unimChaTarThrlevlService.get(new Long(fazhiid));
			try {
				BeanUtil.copyNotNullProperties(orgUnimThrlevl, unimChaTarThrlevl); 
				orgUnimThrlevl.setExtend1(values + "," + colors); // 注意阀值
				orgUnimThrlevl.setExtend2(jgvalue+ "," +jgcolors ); // 警告阀值
				UnimChannelTarget cat = unimChannelTargetService.get(new Long(catid));
				orgUnimThrlevl.setUnimChannelTarget(cat);
				unimChaTarThrlevlService.save(orgUnimThrlevl);
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
//		if(unimChaTarThrlevl.getThrlevlId()==null){
//			unimChaTarThrlevlService.save(unimChaTarThrlevl);
//		}else{
//			UnimChaTarThrlevl orgUnimChaTarThrlevl=unimChaTarThrlevlService.get(unimChaTarThrlevl.getThrlevlId());
//			try{
//				BeanUtil.copyNotNullProperties(orgUnimChaTarThrlevl, unimChaTarThrlevl);
//				unimChaTarThrlevlService.save(orgUnimChaTarThrlevl);
//			}catch(Exception ex){
//				logger.error(ex.getMessage());
//			}
//		}
//		setJsonString("{success:true}");
//		return SUCCESS;
//		
//	}
}
