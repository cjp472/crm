package com.ulane.monitor.action.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.DozerHelper;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimChannelMap;
import com.ulane.monitor.model.unim.UnimChannelNavigation;
import com.ulane.monitor.model.unim.UnimMapNavigation;
import com.ulane.monitor.service.unim.UnimChannelMapService;
import com.ulane.monitor.service.unim.UnimChannelNavigationService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimChannelNavigationAction extends BaseAction{
	@Resource
	private UnimChannelNavigationService unimChannelNavigationService;
	@Resource
	private UnimChannelMapService unimChannelMapService;
	private UnimChannelNavigation unimChannelNavigation;
	
	private Long mapNavId;

	public Long getMapNavId() {
		return mapNavId;
	}

	public void setMapNavId(Long mapNavId) {
		this.mapNavId = mapNavId;
	}

	public UnimChannelNavigation getUnimChannelNavigation() {
		return unimChannelNavigation;
	}

	public void setUnimChannelNavigation(UnimChannelNavigation unimChannelNavigation) {
		this.unimChannelNavigation = unimChannelNavigation;
	}

//	/**
//	 * 显示列表
//	 */
//	public String list(){
//		
//		QueryFilter filter=new QueryFilter(getRequest());
//		List<UnimChannelNavigation> list= unimChannelNavigationService.getAll(filter);
//		
//		Type type=new TypeToken<List<UnimChannelNavigation>>(){}.getType();
//		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
//
////		JSONSerializer serializer = new JSONSerializer();
////		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
////		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
//		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
//		buff.append("}");
//		
//		jsonString=buff.toString();
//		
//		return SUCCESS;
//	}
	/**
	 *导航列表
	 * 
	 * @return
	 */
	public String listNavinga() {
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimChannelNavigation> list = new ArrayList<UnimChannelNavigation>();
		list=unimChannelNavigationService.getAll(filter);
		for(UnimChannelNavigation nav:list){
			if(nav.getMapId()!=null){
				UnimChannelMap orgUnimAgentMap=unimChannelMapService.get(nav.getMapId());
				UnimChannelNavigation orUnimMapNavigation =unimChannelNavigationService.get(nav.getParentid());
			if(orgUnimAgentMap!=null){
				nav.setMapNam(orgUnimAgentMap.getMapName());
			}
			if(orUnimMapNavigation!=null){
					nav.setParentNam(orUnimMapNavigation.getNavName());
			}else{
				nav.setParentNam("地图导航树");
			}
			}
		}
		list = unimChannelNavigationService.getAll(filter);
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
	 * 显示列表
	 */
	public String list() {
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'" + 0 + "',text:'" + "地图导航树"
					+ "',expanded:true,children:[");
		}
		List<UnimChannelNavigation> listParent;
		listParent = unimChannelNavigationService.findByParentId(new Long(0));// 最顶层父节点UnimChannelMap
		for (UnimChannelNavigation dep : listParent) {
			buff.append("{id:'" + dep.getMapNavId() + "',text:'"
					+ dep.getNavName() + "',");
			buff.append(findChild(dep.getMapNavId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		System.out.println(buff.toString());
		return SUCCESS;
	}

	/*
	 * 寻找子根节点
	 */

	public String findChild(Long depId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UnimChannelNavigation> list = unimChannelNavigationService.findByParentId(depId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UnimChannelNavigation dep2 : list) {
				buff1.append("{id:'" + dep2.getMapNavId() + "',text:'"
						+ dep2.getNavName() + "',");
				buff1.append(findChild(dep2.getMapNavId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				unimChannelNavigationService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		UnimChannelNavigation unimMapNavigation = unimChannelNavigationService
				.get(mapNavId);
		if(null!=unimMapNavigation.getMapId()){
			UnimChannelMap orgUnimAgentMap=unimChannelMapService.get(unimMapNavigation.getMapId());
		if(orgUnimAgentMap!=null){
			unimMapNavigation.setMapNam(orgUnimAgentMap.getMapName());
		}
		}
		UnimChannelNavigation orUnimMapNavigation =unimChannelNavigationService.get(unimMapNavigation.getParentid());
		if(orUnimMapNavigation!=null){
			unimMapNavigation.setParentNam(orUnimMapNavigation.getNavName());
		}else{
			unimMapNavigation.setParentNam("地图导航树");
		}
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {});
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(unimMapNavigation));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save() {
		
		String mapid = getRequest().getParameter("mapid");
		if (unimChannelNavigation != null
				&& unimChannelNavigation.getMapNavId() != null) {
			UnimChannelNavigation orgunimMapNavigation = unimChannelNavigationService.get(unimChannelNavigation.getMapNavId());
			
			try {
				BeanUtil.copyNotNullProperties(orgunimMapNavigation,unimChannelNavigation);
				unimChannelNavigationService.save(orgunimMapNavigation);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		} else {
			unimChannelNavigationService.save(unimChannelNavigation);
		}
		jsonString = "{success:true}";
		return SUCCESS;

	}
	
	/**
	 * 启用
	 * @return
	 */
	public String qiYong() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				try {
					UnimChannelNavigation orgunimMapNavigation = unimChannelNavigationService.get(new Long(id));
					orgunimMapNavigation.setStatus(UnimChannelNavigation.STATUS_SHITU_QIYONG);
					unimChannelNavigationService.save(orgunimMapNavigation);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}
		jsonString = "{success:true}";

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
					UnimChannelNavigation orgunimMapNavigation = unimChannelNavigationService.get(new Long(id));
					orgunimMapNavigation.setStatus(UnimChannelNavigation.STATUS_SHITU_ZHUXIAO);
					unimChannelNavigationService.save(orgunimMapNavigation);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}
		jsonString = "{success:true}";

		return SUCCESS;
	}
//	/**
//	 * 显示详细信息
//	 * @return
//	 */
//	public String get(){
//		UnimChannelNavigation unimChannelNavigation=unimChannelNavigationService.get(mapNavId);
//		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//		//将数据转成JSON格式
//		StringBuffer sb = new StringBuffer("{success:true,data:");
//		sb.append(gson.toJson(unimChannelNavigation));
//		sb.append("}");
//		setJsonString(sb.toString());
//		
//		return SUCCESS;
//	}
//	/**
//	 * 添加及保存操作
//	 */
//	public String save(){
//		if(unimChannelNavigation.getMapNavId()==null){
//			unimChannelNavigationService.save(unimChannelNavigation);
//		}else{
//			UnimChannelNavigation orgUnimChannelNavigation=unimChannelNavigationService.get(unimChannelNavigation.getMapNavId());
//			try{
//				BeanUtil.copyNotNullProperties(orgUnimChannelNavigation, unimChannelNavigation);
//				unimChannelNavigationService.save(orgUnimChannelNavigation);
//			}catch(Exception ex){
//				logger.error(ex.getMessage());
//			}
//		}
//		setJsonString("{success:true}");
//		return SUCCESS;
//		
//	}
	
	//HTTP接口
	public void loadTree() {
		List<UnimChannelNavigation> children = unimChannelNavigationService.findByParentId(null);
		
		UnimChannelNavigation root = new UnimChannelNavigation();
  	  	root.setMapNavId(0L);
  	  	root.setNavName("地图导航树");
  	  	root.setOrderno(0L);
  	  	root.setChildren(children);
  	  	List all = new ArrayList();
  	  	all.add(root);
  	  	
		List<UnimMapNavigation> list2 = new DozerHelper().convert(all);
		writeToPage(Boolean.valueOf(true), "查询地图导航树查询成功", list2);
		
//	    try {
//	    	
//	    	
//	    	
//	    	List<UnimMapNavigation> list = unimMapNavigationService.findByParentId(new Long(0));
//	    	UnimMapNavigation entity=null;
//	    	if(list!=null&&list.size()>0) {
//	    		entity=list.get(0);
//	    		UnimMapNavigation entity2 = (UnimMapNavigation)new DozerHelper().convert(entity);
//	    		writeToPage(Boolean.valueOf(true), "查询成功", entity2);
//	    	} else {
//	    		writeToPage(Boolean.valueOf(true), "还未建立根节点", null);
//	    	}
//	      } catch (Exception e) {
//	        e.printStackTrace();
//	        writeToPage(Boolean.valueOf(false), "系统异常信息:" + e.getMessage(), null);
//	      }		
	      
//	      try {
//	    	  UnimMapNavigation entity = new UnimMapNavigation();
//	    	  entity.setMapNavId(0L);
//	    	  entity.setNavName("地图导航树");
//	    	  entity.setOrderno(0L);
//	    	  UnimMapNavigation entity2 = (UnimMapNavigation)new DozerHelper().convert(entity);
//	          writeToPage(Boolean.valueOf(true), "查询成功", entity2);
//	        } catch (Exception e) {
//	          e.printStackTrace();
//	          writeToPage(Boolean.valueOf(false), "系统异常信息:" + e.getMessage(), null);
//	        }	      

	}	
}
