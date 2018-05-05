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
import com.htsoft.core.Constants;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.DozerHelper;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.communicate.PhoneGroup;

import com.ulane.base.model.xitong.SysTemType;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimMapNavigation;
import com.ulane.monitor.service.unim.UnimAgentMapService;
import com.ulane.monitor.service.unim.UnimMapNavigationService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UnimMapNavigationAction extends BaseAction {
	@Resource
	private UnimMapNavigationService unimMapNavigationService;
	@Resource
	private UnimAgentMapService unimAgentMapService;
	private UnimMapNavigation unimMapNavigation;

	private Long mapNavId;

	public Long getMapNavId() {
		return mapNavId;
	}

	public void setMapNavId(Long mapNavId) {
		this.mapNavId = mapNavId;
	}

	public UnimMapNavigation getUnimMapNavigation() {
		return unimMapNavigation;
	}

	public void setUnimMapNavigation(UnimMapNavigation unimMapNavigation) {
		this.unimMapNavigation = unimMapNavigation;
	}

	/**
	 *导航列表
	 * 
	 * @return
	 */
	public String listNavinga() {
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimMapNavigation> list = new ArrayList<UnimMapNavigation>();
		list=unimMapNavigationService.getAll(filter);
		for(UnimMapNavigation nav:list){

			UnimMapNavigation orUnimMapNavigation =unimMapNavigationService.get(nav.getParentid());
			if(nav.getMapId()!=null){
				UnimAgentMap orgUnimAgentMap=unimAgentMapService.get(nav.getMapId());
				if(orgUnimAgentMap!=null){
					nav.setMapNam(orgUnimAgentMap.getMapName());
				}
			}
			if(orUnimMapNavigation!=null){
					nav.setParentNam(orUnimMapNavigation.getNavName());
			}else{
				nav.setParentNam("地图导航树");
			}
			
		}
		list = unimMapNavigationService.getAll(filter);
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
		List<UnimMapNavigation> list = new ArrayList<UnimMapNavigation>();
		list = unimMapNavigationService.getAll();
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
		for (UnimMapNavigation pg : list) {
			buff.append("{id:'" + pg.getMapNavId() + "',text:'"
					+ pg.getNavName() + "',leaf:true},");
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
	public String list() {
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'" + 0 + "',text:'" + "地图导航树"
					+ "',expanded:true,children:[");
		}
		List<UnimMapNavigation> listParent;
		listParent = unimMapNavigationService.findByParentId(new Long(0));// 最顶层父节点
		for (UnimMapNavigation dep : listParent) {
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
		List<UnimMapNavigation> list = unimMapNavigationService
				.findByParentId(depId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UnimMapNavigation dep2 : list) {
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
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				unimMapNavigationService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		UnimMapNavigation unimMapNavigation = unimMapNavigationService
				.get(mapNavId);
		if(null!=unimMapNavigation.getMapId()){
		UnimAgentMap orgUnimAgentMap=unimAgentMapService.get(unimMapNavigation.getMapId());
		if(orgUnimAgentMap!=null){
			unimMapNavigation.setMapNam(orgUnimAgentMap.getMapName());
		}
		}
		UnimMapNavigation orUnimMapNavigation =unimMapNavigationService.get(unimMapNavigation.getParentid());
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

	// /**
	// * 添加及保存操作
	// */
	// public String save(){
	// if(unimMapNavigation.getMapNavId()==null){
	// unimMapNavigationService.save(unimMapNavigation);
	// }else{
	// UnimMapNavigation
	// orgUnimMapNavigation=unimMapNavigationService.get(unimMapNavigation.getMapNavId());
	// try{
	// BeanUtil.copyNotNullProperties(orgUnimMapNavigation, unimMapNavigation);
	// unimMapNavigationService.save(orgUnimMapNavigation);
	// }catch(Exception ex){
	// logger.error(ex.getMessage());
	// }
	// }
	// setJsonString("{success:true}");
	// return SUCCESS;
	//		
	// }

	/**
	 * 添加及保存操作
	 */
	public String save() {
		
		String mapid = getRequest().getParameter("mapid");
		if (unimMapNavigation != null
				&& unimMapNavigation.getMapNavId() != null) {
			UnimMapNavigation orgunimMapNavigation = unimMapNavigationService.get(unimMapNavigation.getMapNavId());
			
			try {
				BeanUtil.copyNotNullProperties(orgunimMapNavigation,unimMapNavigation);
//				if(mapid!=null){
//					UnimAgentMap orgUnimAgentMap=unimAgentMapService.get(orgunimMapNavigation.getParentid());
//					orgUnimAgentMap.setUnimMapNavigation(orgunimMapNavigation);
//					unimAgentMapService.save(orgUnimAgentMap);
//				}
				unimMapNavigationService.save(orgunimMapNavigation);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		} else {
			unimMapNavigationService.save(unimMapNavigation);
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
					UnimMapNavigation orgunimMapNavigation = unimMapNavigationService.get(new Long(id));
					orgunimMapNavigation.setStatus(UnimMapNavigation.STATUS_SHITU_QIYONG);
					unimMapNavigationService.save(orgunimMapNavigation);
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
					UnimMapNavigation orgunimMapNavigation = unimMapNavigationService.get(new Long(id));
					orgunimMapNavigation.setStatus(UnimMapNavigation.STATUS_SHITU_ZHUXIAO);
					unimMapNavigationService.save(orgunimMapNavigation);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}
		jsonString = "{success:true}";

		return SUCCESS;
	}
	
	//HTTP接口
	public void loadTree() {
		List<UnimMapNavigation> children = unimMapNavigationService.findByParentId(null);
		
  	  	UnimMapNavigation root = new UnimMapNavigation();
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

	public void create() {
		try {
			Long parentId = Long.valueOf(getRequest().getParameter("parentId"));
			String name = getRequest().getParameter("name");
			Long orderNo = Long.valueOf(getRequest().getParameter("orderNo"));
			// Integer createdBy = getIntegerFromParameters("createdBy");
			// Date createdTime = new Date();
			// Integer updatedBy = getIntegerFromParameters("updatedBy");
			// Date lastModifyTime = new Date();

			// UnimMapNavigation parent = null;
			// if (parentId != null) {
			// parent = unimMapNavigationService.get(parentId);
			// }

			UnimMapNavigation entity = new UnimMapNavigation();
			entity.setParentid(parentId);
			entity.setNavName(name);
			entity.setOrderno(orderNo);
			// entity.setCreatedBy(createdBy);
			// entity.setCreatedTime(createdTime);
			// entity.setUpdatedBy(updatedBy);
			// entity.setLastModifyTime(lastModifyTime);

			unimMapNavigationService.save(entity);
			writeToPage(Boolean.valueOf(true), "创建地图导航创建成功", null);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	public void getById() {
		try {
			Long id = Long.valueOf(getRequest().getParameter("id"));
			UnimMapNavigation entity = unimMapNavigationService.get(id);
			UnimMapNavigation entity2 = (UnimMapNavigation)new DozerHelper().convert(entity);
			// MapNavigation entity2 = (MapNavigation)new
			// DozerHelper().convert(entity);
			writeToPage(Boolean.valueOf(true), "根据ID查询导航查询成功", entity2);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	public void update() {
		try {
			Long id = Long.valueOf(getRequest().getParameter("id"));

			String name = getRequest().getParameter("name");
			Long orderNo = Long.valueOf(getRequest().getParameter("orderNo"));
			// Integer updatedBy = getIntegerFromParameters("updatedBy");
			// Date lastModifyTime = new Date();

			UnimMapNavigation entity = unimMapNavigationService.get(id);

			entity.setNavName(name);
			entity.setOrderno(orderNo);
			// entity.setUpdatedBy(updatedBy);
			// entity.setLastModifyTime(lastModifyTime);

			unimMapNavigationService.merge(entity);
			writeToPage(Boolean.valueOf(true), "修改地图导航修改成功", null);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	public void del() {
		try {
			Long id = Long.valueOf(getRequest().getParameter("id"));
			unimMapNavigationService.remove(id);
			writeToPage(Boolean.valueOf(true), "删除地图导航删除成功", null);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

}
