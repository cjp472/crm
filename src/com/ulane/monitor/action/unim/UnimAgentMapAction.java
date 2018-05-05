package com.ulane.monitor.action.unim;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.io.File;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.DozerHelper;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimAgent;
import com.ulane.monitor.model.unim.UnimAgentMap;
import com.ulane.monitor.model.unim.UnimMapNavigation;
import com.ulane.monitor.service.unim.UnimAgentMapService;
import com.ulane.monitor.service.unim.UnimMapAgentService;
import com.ulane.monitor.service.unim.UnimMapNavigationService;

import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UnimAgentMapAction extends BaseAction {
	@Resource
	private UnimMapAgentService unimMapAgentService;
	@Resource
	private UnimAgentMapService unimAgentMapService;
	@Resource
	private UnimMapNavigationService unimMapNavigationService;
	private UnimAgentMap unimAgentMap;

	private File uploadImage;
	private String uploadImageFileName;

	private Long mapId;

	public Long getMapId() {
		return mapId;
	}

	public void setMapId(Long mapId) {
		this.mapId = mapId;
	}

	public UnimAgentMap getUnimAgentMap() {
		return unimAgentMap;
	}

	public void setUnimAgentMap(UnimAgentMap unimAgentMap) {
		this.unimAgentMap = unimAgentMap;
	}

	/**
	 * 地图选择器列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<UnimAgentMap> list = unimAgentMapService.getAll(filter);
		Type type = new TypeToken<List<UnimAgent>>() {
		}.getType();
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
	 * 显示班长使用的坐席地图unim/listByMonitorForUnimAgentMap.do?agentId=1,agentId为班长ID(流水号)
	 */
	public String listByMonitorFor() {

		QueryFilter filter = new QueryFilter(getRequest());
		String agentId = super.getRequest().getParameter("agentId");
		List<UnimAgentMap> list = unimAgentMapService
				.listByMonitorForUnimAgent(new Long(agentId));

		Type type = new TypeToken<List<UnimAgentMap>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		// JSONSerializer serializer = new JSONSerializer();
		// serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new
		// String[] { "applyTime"});
		// buff.append(serializer.exclude(new
		// String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));

		Gson gson = new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
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
				unimAgentMapService.remove(new Long(id));
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
		UnimAgentMap unimAgentMap = unimAgentMapService.get(mapId);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(unimAgentMap));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (unimAgentMap.getMapId() == null) {
			unimAgentMapService.save(unimAgentMap);
		} else {
			UnimAgentMap orgUnimAgentMap = unimAgentMapService.get(unimAgentMap
					.getMapId());
			try {
				BeanUtil.copyNotNullProperties(orgUnimAgentMap, unimAgentMap);
				unimAgentMapService.save(orgUnimAgentMap);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	public void create() {
		try {
			String name = URLDecoder.decode(getRequest().getParameter("name"),
					"UTF-8");
			String address = getRequest().getParameter("address");
			String desc = URLDecoder.decode(getRequest().getParameter("desc"),
					"UTF-8");
			Long mapNavigationId = Long.valueOf(getRequest().getParameter(
					"mapNavigationId"));
			String height = getRequest().getParameter("height");
			String width = getRequest().getParameter("width");
			String designXML = "";
			if (getRequest().getParameter("designXML") != null) {
				designXML = URLDecoder.decode(getRequest().getParameter(
						"designXML"), "UTF-8");
			}
//			Integer createdBy = Integer.valueOf(getRequest().getParameter(
//					"createdBy"));
//			Date createdTime = DateUtil.parse(DateUtil.getCurrentTime());
//			Integer updatedBy = createdBy;
//			Date lastModifyTime = DateUtil.parse(DateUtil.getCurrentTime());

			String bkfileURL = null;
			String UUIDfileName = null;
			if (this.uploadImage != null) {
				UUIDfileName = UUID.randomUUID().toString() + "."
						+ getFileExtendName(this.uploadImageFileName);
				String realpath = ServletActionContext.getServletContext()
						.getRealPath("images");
				bkfileURL = this.basicParamBean.getRealPath() + "images/"
						+ UUIDfileName;
				File file = new File(realpath);
				FileUtils.copyFile(this.uploadImage, new File(file,
						UUIDfileName));
			}

			UnimAgentMap entity = new UnimAgentMap();
			entity.setMapName(name);
			entity.setAddress(address);
			entity.setBkfileUrl(bkfileURL);
			entity.setHeight(height);
			entity.setWidth(width);
			entity.setDesignxml(designXML);
			entity.setReamrk(desc);
			// entity.setCreatedBy(createdBy);
			// entity.setCreatedTime(createdTime);
			// entity.setUpdatedBy(updatedBy);
			// entity.setLastModifyTime(lastModifyTime);

//			UnimMapNavigation mapNavigation = null;
//			if (mapNavigationId != null) {
//				mapNavigation = unimMapNavigationService.get(mapNavigationId);
//				entity.setUnimMapNavigation(mapNavigation);
//			}

			unimAgentMapService.save(entity);
			writeToPage(Boolean.valueOf(true), "创建地图创建成功", null);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	public void getById() {
		try {
			Long id = Long.valueOf(getRequest().getParameter("id"));
			UnimAgentMap entity = unimAgentMapService.get(id);
			// UnimAgentMap entity2 =
			// (UnimAgentMap)BeanUtil.copyNotNullProperties(entity);
			UnimAgentMap entity2 = (UnimAgentMap)new DozerHelper().convert(entity);
			writeToPage(Boolean.valueOf(true), "跟进ID查询地图查询成功", entity2);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	public void update() {
		try {
			Long id = Long.valueOf(getRequest().getParameter("id"));
			String name = URLDecoder.decode(getRequest().getParameter("name"),
					"UTF-8");
			String address = getRequest().getParameter("address");
			String desc = URLDecoder.decode(getRequest().getParameter("desc"),
					"UTF-8");

			String height = getRequest().getParameter("height");
			String width = getRequest().getParameter("width");
			String designXML = "";
			if (getRequest().getParameter("designXML") != null) {
				designXML = URLDecoder.decode(getRequest().getParameter(
						"designXML"), "UTF-8");
			}

			String bkfileURL = null;
			String UUIDfileName = null;
			if (this.uploadImage != null) {
				UUIDfileName = UUID.randomUUID().toString() + "."
						+ getFileExtendName(this.uploadImageFileName);
				String realpath = ServletActionContext.getServletContext()
						.getRealPath("images");
				bkfileURL = this.basicParamBean.getRealPath() + "images/"
						+ UUIDfileName;
				File file = new File(realpath);
				FileUtils.copyFile(this.uploadImage, new File(file,
						UUIDfileName));
			}

			Long mapNavigationId = Long.valueOf(getRequest().getParameter(
					"mapNavigationId"));
			// Integer updatedBy = getRequest().getParameter("updatedBy");
			// Date lastModifyTime = new Date();

			UnimAgentMap entity = unimAgentMapService.get(id);
			entity.setMapName(name);
			entity.setAddress(address);
			entity.setBkfileUrl(bkfileURL);
			entity.setHeight(height);
			entity.setWidth(width);
			entity.setDesignxml(designXML);
			entity.setReamrk(desc);
			// entity.setUpdatedBy(updatedBy);
			// entity.setLastModifyTime(lastModifyTime);

			UnimMapNavigation mapNavigation = null;
//			if (mapNavigationId != null) {
//				mapNavigation = unimMapNavigationService.get(mapNavigationId);
//				entity.setUnimMapNavigation(mapNavigation);
//			}

			unimAgentMapService.merge(entity);
			writeToPage(Boolean.valueOf(true), "修改地图修改成功", null);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	//HTTP接口
	public void getAgentMapByNavigationId() {
		try {
			Long navigationId = Long.valueOf(getRequest().getParameter(
					"navigationId"));
			Long monitorId = Long.valueOf(getRequest()
					.getParameter("monitorId"));
			UnimAgentMap entity = unimAgentMapService
					.getAgentMapByNavigationId(navigationId, monitorId);
			if (entity != null) {
				writeToPage(Boolean.valueOf(true), "查询导航对应的地图查询成功", entity);
			} else {
				writeToPage(Boolean.valueOf(false), "没有权限访问该地图", null);
			}
		} catch (Exception e) {
			if (e.getMessage().contains("没有权限")) {
				writeToPage(Boolean.valueOf(false), "没有权限访问该地图", null);
				return;
			}
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	//HTTP接口
	public void del() {
		try {
			Long mapId = Long.valueOf(getRequest().getParameter("id"));
			this.unimMapNavigationService.updateWhenRemoveMap(mapId);
			this.unimMapAgentService.removeWhenRemoveMap(mapId);
			unimAgentMapService.remove(mapId);
			writeToPage(Boolean.valueOf(true), "地图删除成功", null);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	  public void getAgentMapByNavigationId_Permision()
	  {
	    try
	    {
			Long navigationId = Long.valueOf(getRequest().getParameter(
			"navigationId"));
	Long monitorId = Long.valueOf(getRequest()
			.getParameter("monitorId"));
	      UnimAgentMap entity = unimAgentMapService.getAgentMapByNavigationId2(navigationId, monitorId);
	      writeToPage(Boolean.valueOf(true), "查询授权的导航对应的地图查询成功", entity);
	    }
	    catch (Exception e) {
	      if (e.getMessage().contains("没有权限"))
	      {
	        writeToPage(Boolean.valueOf(false), "没有权限访问该地图", null);
	        return;
	      }
	      e.printStackTrace();

	      writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
	    }
	  }

	//HTTP接口
	public void findAll() {
		try {
			List list = unimAgentMapService.getAll();
			List list2 = new DozerHelper().convert(list);
			writeToPage(Boolean.valueOf(true), "所有地图查询成功", list2);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	public File getUploadImage() {
		return this.uploadImage;
	}

	public void setUploadImage(File uploadImage) {
		this.uploadImage = uploadImage;
	}

	public String getUploadImageFileName() {
		return this.uploadImageFileName;
	}

	public void setUploadImageFileName(String uploadImageFileName) {
		this.uploadImageFileName = uploadImageFileName;
	}
}