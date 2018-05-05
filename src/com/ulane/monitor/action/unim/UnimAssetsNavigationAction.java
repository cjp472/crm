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
import com.ulane.monitor.model.unim.UnimAssetsMap;
import com.ulane.monitor.model.unim.UnimAssetsNavigation;
import com.ulane.monitor.model.unim.UnimMapNavigation;
import com.ulane.monitor.service.unim.UnimAssetsMapService;
import com.ulane.monitor.service.unim.UnimAssetsNavigationService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class UnimAssetsNavigationAction extends BaseAction{
	@Resource
	private UnimAssetsNavigationService unimAssetsNavigationService;
	@Resource
	private UnimAssetsMapService unimAssetsMapService;
	private UnimAssetsNavigation unimAssetsNavigation;
	
	private Long mapNavId;

	public Long getMapNavId() {
		return mapNavId;
	}

	public void setMapNavId(Long mapNavId) {
		this.mapNavId = mapNavId;
	}

	public UnimAssetsNavigation getUnimAssetsNavigation() {
		return unimAssetsNavigation;
	}

	public void setUnimAssetsNavigation(UnimAssetsNavigation unimAssetsNavigation) {
		this.unimAssetsNavigation = unimAssetsNavigation;
	}

	/**
	 *导航列表
	 * 
	 * @return
	 */
	public String listNavinga() {
		QueryFilter filter=new QueryFilter(getRequest());
		List<UnimAssetsNavigation> list = new ArrayList<UnimAssetsNavigation>();
		list=unimAssetsNavigationService.getAll(filter);
		for(UnimAssetsNavigation nav:list){
			if(nav.getMapId()!=null){
			UnimAssetsMap orunimAssetsMap=unimAssetsMapService.get(nav.getMapId());
			if(orunimAssetsMap!=null){
				nav.setMapNam(orunimAssetsMap.getMapName());
			 }
			}
			UnimAssetsNavigation orunimAssetsNavigation =unimAssetsNavigationService.get(nav.getParentid());
			if(orunimAssetsNavigation!=null){
					nav.setParentNam(orunimAssetsNavigation.getNavName());
			}else{
				nav.setParentNam("地图导航树");
			}
		}
		list = unimAssetsNavigationService.getAll(filter);
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
			buff.append("[{id:'" + 0 + "',text:'" + "监控视图树"
					+ "',expanded:true,children:[");
		}
		List<UnimAssetsNavigation> listParent;
		listParent = unimAssetsNavigationService.findByParentId(new Long(0));// 最顶层父节点
		for (UnimAssetsNavigation dep : listParent) {
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
		return SUCCESS;
	}

	/*
	 * 寻找子根节点
	 */

	public String findChild(Long depId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UnimAssetsNavigation> list = unimAssetsNavigationService
				.findByParentId(depId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UnimAssetsNavigation dep2 : list) {
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
				unimAssetsNavigationService.remove(new Long(id));
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
		UnimAssetsNavigation unimAssetsNavigation = unimAssetsNavigationService
				.get(mapNavId);
		if(null!=unimAssetsNavigation.getMapId()){
			UnimAssetsMap orgUnimAgentMap=unimAssetsMapService.get(unimAssetsNavigation.getMapId());
		if(orgUnimAgentMap!=null){
			unimAssetsNavigation.setMapNam(orgUnimAgentMap.getMapName());
		}
		}
		UnimAssetsNavigation orUnimMapNavigation =unimAssetsNavigationService.get(unimAssetsNavigation.getParentid());
		if(orUnimMapNavigation!=null){
			unimAssetsNavigation.setParentNam(orUnimMapNavigation.getNavName());
		}else{
			unimAssetsNavigation.setParentNam("监控视图树");
		}
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {});
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(unimAssetsNavigation));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		
		String mapid = getRequest().getParameter("mapid");
		if (unimAssetsNavigation != null
				&& unimAssetsNavigation.getMapNavId() != null) {
			UnimAssetsNavigation orunimAssetsNavigation = unimAssetsNavigationService.get(unimAssetsNavigation.getMapNavId());
			
			try {
				BeanUtil.copyNotNullProperties(orunimAssetsNavigation,unimAssetsNavigation);
				unimAssetsNavigationService.save(orunimAssetsNavigation);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		} else {
			unimAssetsNavigationService.save(unimAssetsNavigation);
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
					UnimAssetsNavigation orunimAssetsNavigation = unimAssetsNavigationService.get(new Long(id));
//					if(0==orunimAssetsNavigation.getStatus()){
						orunimAssetsNavigation.setStatus(UnimAssetsNavigation.STATUS_SHITU_QIYONG);
						unimAssetsNavigationService.save(orunimAssetsNavigation);
//					}

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
					UnimAssetsNavigation orunimAssetsNavigation = unimAssetsNavigationService.get(new Long(id));
//					if(orunimAssetsNavigation.getStatus()==1 ){
					orunimAssetsNavigation.setStatus(UnimAssetsNavigation.STATUS_SHITU_ZHUXIAO);
					unimAssetsNavigationService.save(orunimAssetsNavigation);
//					}
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
		Long id = Long.valueOf(getRequest().getParameter("id"));
		List<UnimAssetsNavigation> children = unimAssetsNavigationService.findByParentId(id);
		
		UnimAssetsNavigation root = new UnimAssetsNavigation();
  	  	root.setMapNavId(0L);
  	  	root.setNavName("监控导航树");
  	  	root.setOrderno(0L);
  	  	root.setChildren(children);
  	  	List all = new ArrayList();
  	  	all.add(root);
  	  	
		List<UnimMapNavigation> list2 = new DozerHelper().convert(all);
		writeToPage(Boolean.valueOf(true), "查询监控导航树查询成功", list2);
	}

}
